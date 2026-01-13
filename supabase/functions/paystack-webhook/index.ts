// @ts-nocheck
// This file runs on Deno (Supabase Edge Functions), not Node.js
// TypeScript errors from VS Code can be ignored - it works correctly when deployed

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

// CORS headers for preflight requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
};

// Verify Paystack webhook signature
function verifyPaystackSignature(payload: string, signature: string, secret: string): boolean {
  const hash = createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the raw body for signature verification
    const payload = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Get Paystack secret key from environment
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify signature
    if (!signature || !verifyPaystackSignature(payload, signature, paystackSecretKey)) {
      console.error('Invalid Paystack signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the event
    const event = JSON.parse(payload);
    console.log('Received Paystack event:', event.event);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different event types
    switch (event.event) {
      case 'subscription.create': {
        // New subscription created
        const data = event.data;
        const customer = data.customer;
        const plan = data.plan;
        
        // Extract custom fields from metadata
        const metadata = data.metadata || {};
        const customFields = metadata.custom_fields || [];
        const businessName = customFields.find((f: any) => f.variable_name === 'business_name')?.value || '';
        const planType = customFields.find((f: any) => f.variable_name === 'plan_type')?.value || '';

        // Upsert subscription record
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            email: customer.email.toLowerCase(),
            customer_code: customer.customer_code,
            business_name: businessName,
            plan_type: planType,
            plan_code: plan.plan_code,
            plan_name: plan.name,
            subscription_code: data.subscription_code,
            status: data.status,
            amount: plan.amount / 100, // Convert from kobo to naira
            currency: plan.currency,
            next_payment_date: data.next_payment_date,
            created_at: data.createdAt || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email',
          });

        if (error) {
          console.error('Error upserting subscription:', error);
          throw error;
        }

        console.log(`Subscription created for ${customer.email}`);
        break;
      }

      case 'charge.success': {
        // Successful charge (including recurring payments)
        const data = event.data;
        const customer = data.customer;

        // Check if this is a subscription charge
        if (data.plan && data.plan.plan_code) {
          // Update subscription status and next payment date
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              last_payment_date: new Date().toISOString(),
              last_payment_reference: data.reference,
              updated_at: new Date().toISOString(),
            })
            .eq('email', customer.email.toLowerCase());

          if (error) {
            console.error('Error updating subscription on charge:', error);
          }

          // Log the payment
          await supabase.from('subscription_payments').insert({
            email: customer.email.toLowerCase(),
            reference: data.reference,
            amount: data.amount / 100,
            currency: data.currency,
            status: 'success',
            paid_at: data.paid_at || new Date().toISOString(),
          });

          console.log(`Payment successful for ${customer.email}`);
        }
        break;
      }

      case 'subscription.not_renew': {
        // Subscription will not renew (customer cancelled)
        const data = event.data;
        const customer = data.customer;

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('email', customer.email.toLowerCase());

        if (error) {
          console.error('Error updating cancelled subscription:', error);
        }

        console.log(`Subscription cancelled for ${customer.email}`);
        break;
      }

      case 'subscription.disable': {
        // Subscription disabled (payment failed or manually disabled)
        const data = event.data;
        const customer = data.customer;

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'inactive',
            updated_at: new Date().toISOString(),
          })
          .eq('email', customer.email.toLowerCase());

        if (error) {
          console.error('Error updating disabled subscription:', error);
        }

        console.log(`Subscription disabled for ${customer.email}`);
        break;
      }

      case 'invoice.payment_failed': {
        // Payment failed for subscription
        const data = event.data;
        const customer = data.customer;

        // Log failed payment
        await supabase.from('subscription_payments').insert({
          email: customer.email.toLowerCase(),
          reference: data.reference || `failed_${Date.now()}`,
          amount: data.amount / 100,
          currency: data.currency,
          status: 'failed',
          paid_at: new Date().toISOString(),
        });

        // Update subscription status
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'payment_failed',
            updated_at: new Date().toISOString(),
          })
          .eq('email', customer.email.toLowerCase());

        if (error) {
          console.error('Error updating failed payment subscription:', error);
        }

        console.log(`Payment failed for ${customer.email}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
