import { useState, useEffect, useCallback } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client lazily
// Replace with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials are available
let supabase: SupabaseClient | null = null;
function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured');
    return null;
  }
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

export interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  planType: 'pro' | 'enterprise' | null;
  status: 'active' | 'inactive' | 'cancelled' | 'payment_failed' | 'pending' | null;
  nextPaymentDate: string | null;
  businessName: string | null;
}

interface UseSubscriptionResult {
  subscription: SubscriptionStatus | null;
  isLoading: boolean;
  error: string | null;
  checkSubscription: (email: string) => Promise<SubscriptionStatus | null>;
  refetch: () => Promise<void>;
}

export function useSubscription(email?: string): UseSubscriptionResult {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | undefined>(email);

  const checkSubscription = useCallback(async (userEmail: string): Promise<SubscriptionStatus | null> => {
    if (!userEmail) {
      setError('Email is required');
      return null;
    }

    const client = getSupabaseClient();
    if (!client) {
      setError('Supabase not configured');
      return null;
    }

    setIsLoading(true);
    setError(null);
    setCurrentEmail(userEmail);

    try {
      // Query the subscriptions table directly
      const { data, error: queryError } = await client
        .from('subscriptions')
        .select('status, plan_type, next_payment_date, business_name')
        .eq('email', userEmail.toLowerCase())
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // No subscription found
          const noSub: SubscriptionStatus = {
            hasActiveSubscription: false,
            planType: null,
            status: null,
            nextPaymentDate: null,
            businessName: null,
          };
          setSubscription(noSub);
          return noSub;
        }
        throw queryError;
      }

      const result: SubscriptionStatus = {
        hasActiveSubscription: data.status === 'active',
        planType: data.plan_type as 'pro' | 'enterprise',
        status: data.status,
        nextPaymentDate: data.next_payment_date,
        businessName: data.business_name,
      };

      setSubscription(result);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check subscription';
      setError(errorMessage);
      console.error('Subscription check error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (currentEmail) {
      await checkSubscription(currentEmail);
    }
  }, [currentEmail, checkSubscription]);

  // Auto-check if email is provided
  useEffect(() => {
    if (email) {
      checkSubscription(email);
    }
  }, [email, checkSubscription]);

  return {
    subscription,
    isLoading,
    error,
    checkSubscription,
    refetch,
  };
}

// Utility function to check subscription without hook (for non-React code)
export async function checkSubscriptionStatus(email: string): Promise<SubscriptionStatus | null> {
  if (!email) return null;

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status, plan_type, next_payment_date, business_name')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return {
          hasActiveSubscription: false,
          planType: null,
          status: null,
          nextPaymentDate: null,
          businessName: null,
        };
      }
      throw error;
    }

    return {
      hasActiveSubscription: data.status === 'active',
      planType: data.plan_type as 'pro' | 'enterprise',
      status: data.status,
      nextPaymentDate: data.next_payment_date,
      businessName: data.business_name,
    };
  } catch (err) {
    console.error('Subscription check error:', err);
    return null;
  }
}

// Export Supabase client for other uses
export { supabase };
