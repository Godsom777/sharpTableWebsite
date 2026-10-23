/**
 * Supabase client for the website frontend.
 *
 * Types and the client factory come from the shared backend package.
 * This file provides a pre-configured singleton using the website's env vars.
 */

import { createAppSupabaseClient, isAppSupabaseConfigured as _isConfigured } from '@godsom777/sharptable-backend';
import type { SupabaseClient } from '@supabase/supabase-js';

// Re-export types from the shared package so existing imports keep working.
export type {
  SubscriptionPlanType,
  SubscriptionLifecycleStatus,
  ManagedSubscriptionStatus,
} from '@godsom777/sharptable-backend';

const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};

export function isAppSupabaseConfigured(): boolean {
  return _isConfigured(config);
}

let cachedClient: SupabaseClient | null = null;

export function getAppSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  cachedClient = createAppSupabaseClient(config) as unknown as SupabaseClient;
  return cachedClient;
}
