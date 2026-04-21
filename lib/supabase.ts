import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const appSupabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const appSupabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

let appSupabaseClient: SupabaseClient | null = null;

export type SubscriptionPlanType =
  | 'lite'
  | 'pro'
  | 'enterprise'
  | 'lite-yearly'
  | 'pro-yearly'
  | 'enterprise-yearly';

export type SubscriptionLifecycleStatus =
  | 'active'
  | 'inactive'
  | 'cancelled'
  | 'payment_failed'
  | 'pending'
  | 'non_renewing';

export interface ManagedSubscriptionStatus {
  hasActiveSubscription: boolean;
  planType: SubscriptionPlanType | null;
  status: SubscriptionLifecycleStatus | null;
  nextPaymentDate: string | null;
  businessName: string | null;
  cancelAtPeriodEnd: boolean;
  scheduledPlanType: SubscriptionPlanType | null;
  scheduledChangeEffectiveAt: string | null;
}

export function isAppSupabaseConfigured(): boolean {
  return Boolean(appSupabaseUrl && appSupabaseAnonKey);
}

export function getAppSupabaseClient(): SupabaseClient | null {
  if (!isAppSupabaseConfigured()) {
    console.warn('App Supabase credentials not configured');
    return null;
  }

  if (!appSupabaseClient) {
    appSupabaseClient = createClient(appSupabaseUrl, appSupabaseAnonKey);
  }

  return appSupabaseClient;
}
