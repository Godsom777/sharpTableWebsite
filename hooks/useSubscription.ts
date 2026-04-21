import { useState, useEffect, useCallback } from 'react';
import {
  getAppSupabaseClient,
  type ManagedSubscriptionStatus,
  type SubscriptionPlanType,
} from '../lib/supabase';

export interface SubscriptionStatus extends ManagedSubscriptionStatus {}

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

      const client = getAppSupabaseClient();
      if (!client) {
        setError('Supabase not configured');
        return null;
      }

    setIsLoading(true);
    setError(null);
    setCurrentEmail(userEmail);

      try {
        const { data, error: queryError } = await client
          .from('subscriptions')
          .select(
            'status, plan_type, next_payment_date, business_name, cancel_at_period_end, scheduled_plan_type, scheduled_change_effective_at'
          )
          .eq('email', userEmail.toLowerCase())
          .maybeSingle();

      if (queryError) {
        throw queryError;
      }

      if (!data) {
        const noSub: SubscriptionStatus = {
          hasActiveSubscription: false,
          planType: null,
          status: null,
          nextPaymentDate: null,
          businessName: null,
          cancelAtPeriodEnd: false,
          scheduledPlanType: null,
          scheduledChangeEffectiveAt: null,
        };
        setSubscription(noSub);
        return noSub;
      }

      const result: SubscriptionStatus = {
        hasActiveSubscription: data.status === 'active' || data.status === 'non_renewing',
        planType: data.plan_type as SubscriptionPlanType,
        status: data.status,
        nextPaymentDate: data.next_payment_date,
        businessName: data.business_name,
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
        scheduledPlanType: (data.scheduled_plan_type as SubscriptionPlanType | null) ?? null,
        scheduledChangeEffectiveAt: data.scheduled_change_effective_at,
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
    const client = getAppSupabaseClient();
    if (!client) {
      return null;
    }

    const { data, error } = await client
      .from('subscriptions')
      .select(
        'status, plan_type, next_payment_date, business_name, cancel_at_period_end, scheduled_plan_type, scheduled_change_effective_at'
      )
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        hasActiveSubscription: false,
        planType: null,
        status: null,
        nextPaymentDate: null,
        businessName: null,
        cancelAtPeriodEnd: false,
        scheduledPlanType: null,
        scheduledChangeEffectiveAt: null,
      };
    }

    return {
      hasActiveSubscription: data.status === 'active' || data.status === 'non_renewing',
      planType: data.plan_type as SubscriptionPlanType,
      status: data.status,
      nextPaymentDate: data.next_payment_date,
      businessName: data.business_name,
      cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
      scheduledPlanType: (data.scheduled_plan_type as SubscriptionPlanType | null) ?? null,
      scheduledChangeEffectiveAt: data.scheduled_change_effective_at,
    };
  } catch (err) {
    console.error('Subscription check error:', err);
    return null;
  }
}
