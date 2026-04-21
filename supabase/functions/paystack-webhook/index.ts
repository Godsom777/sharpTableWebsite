// @ts-nocheck

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

const APP_SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const APP_SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function verifyPaystackSignature(payload: string, signature: string, secret: string): boolean {
  const hash = createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
}

function normalizeEmail(email?: string | null) {
  return (email || '').trim().toLowerCase();
}

function normalizeStatus(status?: string | null) {
  if (!status) return 'pending';
  return status === 'non-renewing' ? 'non_renewing' : status;
}

function isoFromUnix(value?: number | null) {
  if (!value || Number.isNaN(value)) {
    return null;
  }

  return new Date(value * 1000).toISOString();
}

function extractCustomField(customFields: any[], variableName: string) {
  return customFields.find((field: any) => field.variable_name === variableName)?.value || null;
}

function isFutureDate(value?: string | null) {
  if (!value) {
    return false;
  }

  return new Date(value).getTime() > Date.now();
}

async function fetchPaystackSubscription(subscriptionCode: string) {
  const response = await fetch(`https://api.paystack.co/subscription/${subscriptionCode}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Unable to fetch subscription from Paystack');
  }

  return data.data;
}

async function getExistingSubscription(supabase: any, email: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function upsertCurrentSubscription(supabase: any, payload: Record<string, unknown>) {
  const { error } = await supabase.from('subscriptions').upsert(payload, {
    onConflict: 'email',
  });

  if (error) {
    throw error;
  }
}

async function updateSubscription(supabase: any, email: string, payload: Record<string, unknown>) {
  const { error } = await supabase
    .from('subscriptions')
    .update(payload)
    .eq('email', email);

  if (error) {
    throw error;
  }
}

async function logPayment(supabase: any, payload: Record<string, unknown>) {
  const { error } = await supabase.from('subscription_payments').upsert(payload, {
    onConflict: 'reference',
  });

  if (error) {
    throw error;
  }
}

async function maybeFetchPaystackDetails(subscriptionCode?: string | null) {
  if (!subscriptionCode || !PAYSTACK_SECRET_KEY) {
    return null;
  }

  try {
    return await fetchPaystackSubscription(subscriptionCode);
  } catch (error) {
    console.error('Failed to fetch Paystack subscription details:', error);
    return null;
  }
}

async function processPartnerUpfrontCommission(args: {
  supabase: any;
  referralCode: string | null;
  email: string;
  planType: string | null;
  plan: any;
  subscriptionId: string | null;
}) {
  const { supabase, referralCode, email, planType, plan, subscriptionId } = args;
  if (!referralCode) {
    return;
  }

  try {
    const { data: partner } = await supabase
      .from('partners')
      .select('id, status')
      .eq('referral_code', referralCode)
      .eq('status', 'active')
      .single();

    if (!partner) {
      return;
    }

    const subscriptionAmount = plan.amount / 100;
    const isYearly =
      (planType || '').includes('yearly') ||
      plan.interval === 'annually' ||
      plan.plan_code === 'PLN_lu2vu0x7b0z4esc' ||
      plan.plan_code === 'PLN_geld4bet9hwqca0' ||
      plan.plan_code === 'PLN_2a41260dnw7z99x';

    const commissionRate = isYearly ? 0.3 : 0.5;
    const commissionType = isYearly ? 'one-time' : 'upfront';
    const commission = subscriptionAmount * commissionRate;

    await supabase.from('partner_referrals').insert({
      partner_id: partner.id,
      subscription_email: email,
      subscription_id: subscriptionId,
      plan_type: planType,
      plan_amount: subscriptionAmount,
      commission_type: commissionType,
      commission_rate: commissionRate,
      commission_amount: commission,
      currency: plan.currency,
      status: 'pending',
      recurring_month: null,
    });

    await supabase.rpc('increment_partner_earnings', {
      p_partner_id: partner.id,
      p_amount: commission,
    });
  } catch (error) {
    console.error('Error processing upfront partner commission:', error);
  }
}

async function processPartnerRecurringCommission(args: {
  supabase: any;
  email: string;
  planCode: string | null;
  amount: number;
  currency: string;
}) {
  const { supabase, email, planCode, amount, currency } = args;

  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id, referral_code, plan_type')
      .eq('email', email)
      .single();

    if (!subscription?.referral_code) {
      return;
    }

    const isYearly =
      (subscription.plan_type || '').includes('yearly') ||
      planCode === 'PLN_lu2vu0x7b0z4esc' ||
      planCode === 'PLN_geld4bet9hwqca0' ||
      planCode === 'PLN_2a41260dnw7z99x';

    if (isYearly) {
      return;
    }

    const { data: partner } = await supabase
      .from('partners')
      .select('id, status')
      .eq('referral_code', subscription.referral_code)
      .eq('status', 'active')
      .single();

    if (!partner) {
      return;
    }

    const { count } = await supabase
      .from('partner_referrals')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partner.id)
      .eq('subscription_email', email)
      .eq('commission_type', 'recurring');

    const recurringMonth = (count || 0) + 1;
    if (recurringMonth > 6) {
      return;
    }

    const commissionAmount = amount * 0.2;

    await supabase.from('partner_referrals').insert({
      partner_id: partner.id,
      subscription_email: email,
      subscription_id: subscription.id,
      plan_type: planCode,
      plan_amount: amount,
      commission_type: 'recurring',
      commission_rate: 0.2,
      commission_amount: commissionAmount,
      currency,
      status: 'pending',
      recurring_month: recurringMonth,
    });

    await supabase.rpc('increment_partner_earnings', {
      p_partner_id: partner.id,
      p_amount: commissionAmount,
    });
  } catch (error) {
    console.error('Error processing recurring partner commission:', error);
  }
}

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (!APP_SUPABASE_URL || !APP_SUPABASE_SERVICE_KEY || !PAYSTACK_SECRET_KEY) {
    return jsonResponse({ error: 'Server configuration error' }, 500);
  }

  try {
    const payload = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature || !verifyPaystackSignature(payload, signature, PAYSTACK_SECRET_KEY)) {
      return jsonResponse({ error: 'Invalid signature' }, 401);
    }

    const event = JSON.parse(payload);
    const supabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_SERVICE_KEY);
    const now = new Date().toISOString();

    switch (event.event) {
      case 'subscription.create': {
        const data = event.data;
        const customer = data.customer || {};
        const plan = data.plan || {};
        const email = normalizeEmail(customer.email);
        const metadata = data.metadata || {};
        const customFields = metadata.custom_fields || [];
        const businessName = extractCustomField(customFields, 'business_name');
        const planType = extractCustomField(customFields, 'plan_type');
        const country = extractCustomField(customFields, 'country');
        const referralCode = extractCustomField(customFields, 'referral_code');
        const existing = await getExistingSubscription(supabase, email);

        const currentPayload = {
          email,
          customer_code: customer.customer_code || existing?.customer_code || null,
          business_name: businessName || existing?.business_name || null,
          country: country || existing?.country || null,
          plan_type: planType || existing?.plan_type || null,
          plan_code: plan.plan_code,
          plan_name: plan.name,
          subscription_code: data.subscription_code,
          email_token: data.email_token || null,
          status: normalizeStatus(data.status),
          amount: typeof plan.amount === 'number' ? plan.amount / 100 : null,
          currency: plan.currency || existing?.currency || 'NGN',
          referral_code: referralCode || existing?.referral_code || null,
          next_payment_date: data.next_payment_date || existing?.next_payment_date || null,
          subscription_started_at: isoFromUnix(data.start),
          updated_at: now,
        };

        const isScheduledCreate =
          existing &&
          existing.subscription_code !== data.subscription_code &&
          (existing.scheduled_subscription_code === data.subscription_code ||
            existing.scheduled_plan_code === plan.plan_code ||
            (existing.cancel_at_period_end && isFutureDate(data.next_payment_date)));

        if (!existing || !existing.subscription_code || existing.subscription_code === data.subscription_code) {
          await upsertCurrentSubscription(supabase, {
            ...currentPayload,
            created_at: data.createdAt || existing?.created_at || now,
          });

          if (!existing?.subscription_code) {
            const inserted = await getExistingSubscription(supabase, email);
            await processPartnerUpfrontCommission({
              supabase,
              referralCode,
              email,
              planType,
              plan,
              subscriptionId: inserted?.id || null,
            });
          }
        } else if (isScheduledCreate) {
          await updateSubscription(supabase, email, {
            customer_code: currentPayload.customer_code,
            business_name: currentPayload.business_name,
            country: currentPayload.country,
            referral_code: currentPayload.referral_code,
            scheduled_plan_type: planType || existing?.scheduled_plan_type || null,
            scheduled_plan_code: plan.plan_code,
            scheduled_plan_name: plan.name,
            scheduled_subscription_code: data.subscription_code,
            scheduled_email_token: data.email_token || null,
            scheduled_change_effective_at:
              existing?.scheduled_change_effective_at || existing?.next_payment_date || data.next_payment_date || null,
            updated_at: now,
          });
        } else {
          await upsertCurrentSubscription(supabase, {
            ...currentPayload,
            cancel_at_period_end: false,
            scheduled_plan_type: null,
            scheduled_plan_code: null,
            scheduled_plan_name: null,
            scheduled_subscription_code: null,
            scheduled_email_token: null,
            scheduled_change_effective_at: null,
            created_at: data.createdAt || existing?.created_at || now,
          });
        }

        break;
      }

      case 'charge.success': {
        const data = event.data;
        if (!data.plan?.plan_code) {
          break;
        }

        const customer = data.customer || {};
        const email = normalizeEmail(customer.email);
        const existing = await getExistingSubscription(supabase, email);

        await logPayment(supabase, {
          email,
          reference: data.reference,
          amount: data.amount / 100,
          currency: data.currency,
          status: 'success',
          paid_at: data.paid_at || now,
        });

        if (existing?.scheduled_plan_code && existing.scheduled_plan_code === data.plan.plan_code) {
          const scheduledDetails = await maybeFetchPaystackDetails(existing.scheduled_subscription_code);

          await updateSubscription(supabase, email, {
            customer_code: customer.customer_code || existing.customer_code || null,
            plan_type: existing.scheduled_plan_type || existing.plan_type,
            plan_code: existing.scheduled_plan_code || data.plan.plan_code,
            plan_name:
              scheduledDetails?.plan?.name ||
              existing.scheduled_plan_name ||
              data.plan.name ||
              existing.plan_name,
            subscription_code:
              existing.scheduled_subscription_code ||
              scheduledDetails?.subscription_code ||
              existing.subscription_code,
            email_token:
              scheduledDetails?.email_token ||
              existing.scheduled_email_token ||
              existing.email_token ||
              null,
            status: 'active',
            amount: data.amount / 100,
            currency: data.currency,
            next_payment_date:
              scheduledDetails?.next_payment_date ||
              existing.scheduled_change_effective_at ||
              existing.next_payment_date,
            last_payment_date: data.paid_at || now,
            last_payment_reference: data.reference,
            cancel_at_period_end: false,
            scheduled_plan_type: null,
            scheduled_plan_code: null,
            scheduled_plan_name: null,
            scheduled_subscription_code: null,
            scheduled_email_token: null,
            scheduled_change_effective_at: null,
            updated_at: now,
          });
        } else {
          const currentDetails = await maybeFetchPaystackDetails(existing?.subscription_code);

          await updateSubscription(supabase, email, {
            customer_code: customer.customer_code || existing?.customer_code || null,
            email_token: currentDetails?.email_token || existing?.email_token || null,
            status: 'active',
            amount: data.amount / 100,
            currency: data.currency,
            next_payment_date: currentDetails?.next_payment_date || existing?.next_payment_date || null,
            last_payment_date: data.paid_at || now,
            last_payment_reference: data.reference,
            updated_at: now,
          });
        }

        await processPartnerRecurringCommission({
          supabase,
          email,
          planCode: data.plan.plan_code,
          amount: data.amount / 100,
          currency: data.currency,
        });

        break;
      }

      case 'subscription.not_renew': {
        const data = event.data;
        const customer = data.customer || {};
        const email = normalizeEmail(customer.email);
        const existing = await getExistingSubscription(supabase, email);
        if (!existing) {
          break;
        }

        if (existing.subscription_code === data.subscription_code) {
          await updateSubscription(supabase, email, {
            status: 'non_renewing',
            cancel_at_period_end: true,
            updated_at: now,
          });
        } else if (existing.scheduled_subscription_code === data.subscription_code) {
          await updateSubscription(supabase, email, {
            scheduled_plan_type: null,
            scheduled_plan_code: null,
            scheduled_plan_name: null,
            scheduled_subscription_code: null,
            scheduled_email_token: null,
            scheduled_change_effective_at: null,
            updated_at: now,
          });
        }

        break;
      }

      case 'subscription.disable': {
        const data = event.data;
        const customer = data.customer || {};
        const email = normalizeEmail(customer.email);
        const existing = await getExistingSubscription(supabase, email);
        if (!existing) {
          break;
        }

        if (existing.subscription_code === data.subscription_code) {
          await updateSubscription(supabase, email, {
            status: existing.scheduled_subscription_code ? 'pending' : 'cancelled',
            cancelled_at: now,
            cancel_at_period_end: Boolean(existing.scheduled_subscription_code),
            next_payment_date: existing.scheduled_subscription_code ? existing.next_payment_date : null,
            updated_at: now,
          });
        } else if (existing.scheduled_subscription_code === data.subscription_code) {
          await updateSubscription(supabase, email, {
            scheduled_plan_type: null,
            scheduled_plan_code: null,
            scheduled_plan_name: null,
            scheduled_subscription_code: null,
            scheduled_email_token: null,
            scheduled_change_effective_at: null,
            updated_at: now,
          });
        }

        break;
      }

      case 'invoice.payment_failed': {
        const data = event.data;
        const customer = data.customer || {};
        const email = normalizeEmail(customer.email);
        const existing = await getExistingSubscription(supabase, email);

        await logPayment(supabase, {
          email,
          reference: data.reference || `failed_${Date.now()}`,
          amount: data.amount / 100,
          currency: data.currency,
          status: 'failed',
          paid_at: now,
        });

        if (existing?.scheduled_plan_code && existing.scheduled_plan_code === data.plan?.plan_code) {
          await updateSubscription(supabase, email, {
            status: 'payment_failed',
            cancel_at_period_end: false,
            scheduled_plan_type: null,
            scheduled_plan_code: null,
            scheduled_plan_name: null,
            scheduled_subscription_code: null,
            scheduled_email_token: null,
            scheduled_change_effective_at: null,
            updated_at: now,
          });
        } else {
          await updateSubscription(supabase, email, {
            status: 'payment_failed',
            updated_at: now,
          });
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return jsonResponse({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return jsonResponse({ error: 'Webhook processing failed' }, 500);
  }
});
