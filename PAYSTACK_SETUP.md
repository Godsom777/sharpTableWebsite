# SharpTable Paystack Subscription Setup Guide

## Overview
This guide explains how to set up the Paystack subscription payment system for SharpTable.

## Architecture
```
User clicks "Get Started" → PaymentModal collects email + business name
        ↓
Paystack Inline SDK opens payment popup
        ↓
User completes payment → Paystack creates subscription
        ↓
Paystack sends webhook → Supabase Edge Function
        ↓
Edge Function stores subscription in PostgreSQL
        ↓
Your PWA queries Supabase to check subscription status
```

## Step 1: Set Up Supabase Database

### Option A: Run Migration via Supabase Dashboard
1. Go to your Supabase project → SQL Editor
2. Copy the contents of `supabase/migrations/20260113000000_create_subscriptions_table.sql`
3. Run the SQL query

### Option B: Run Migration via CLI
```bash
npx supabase db push
```

## Step 2: Deploy the Webhook Edge Function

### Prerequisites
- Install Supabase CLI: `npm install -g supabase`
- Login: `supabase login`
- Link your project: `supabase link --project-ref your-project-ref`

### Set Secrets
```bash
# Set your Paystack secret key (IMPORTANT: Keep this secret!)
supabase secrets set PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
```

### Deploy the Function
```bash
supabase functions deploy paystack-webhook --no-verify-jwt
```

The `--no-verify-jwt` flag is important because Paystack webhooks don't include Supabase JWT tokens.

### Get Your Webhook URL
After deployment, your webhook URL will be:
```
https://your-project-ref.supabase.co/functions/v1/paystack-webhook
```

## Step 3: Configure Paystack Webhook

1. Log in to your [Paystack Dashboard](https://dashboard.paystack.com)
2. Go to **Settings** → **API Keys & Webhooks**
3. Under **Webhook URL**, enter:
   ```
   https://your-project-ref.supabase.co/functions/v1/paystack-webhook
   ```
4. Click **Update**
5. Make sure these events are enabled:
   - `subscription.create`
   - `charge.success`
   - `subscription.not_renew`
   - `subscription.disable`
   - `invoice.payment_failed`

## Step 4: Configure Environment Variables

Create a `.env` file in your project root (or `.env.local` for Vite):

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_live_e64a98438e270359d525099624bf0f096b64d17e
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 5: Using the Subscription Hook in Your App

```tsx
import { useSubscription } from './hooks/useSubscription';

function MyComponent() {
  const { subscription, isLoading, checkSubscription } = useSubscription();

  // Check subscription for a specific user
  const handleLogin = async (email: string) => {
    const sub = await checkSubscription(email);
    
    if (sub?.hasActiveSubscription) {
      // User has active subscription
      if (sub.planType === 'enterprise') {
        // Enable enterprise features
      } else {
        // Enable pro features
      }
    } else {
      // User doesn't have subscription - show pricing
    }
  };

  return (
    <div>
      {isLoading && <p>Checking subscription...</p>}
      {subscription?.hasActiveSubscription && (
        <p>Plan: {subscription.planType}</p>
      )}
    </div>
  );
}
```

## Step 6: Protecting Routes/Features

```tsx
// Example: Protect a route based on subscription
function ProtectedFeature() {
  const { subscription, isLoading } = useSubscription(userEmail);

  if (isLoading) return <LoadingSpinner />;
  
  if (!subscription?.hasActiveSubscription) {
    return <Navigate to="/pricing" />;
  }

  if (subscription.planType !== 'enterprise' && isEnterpriseFeature) {
    return <UpgradePrompt currentPlan={subscription.planType} />;
  }

  return <YourFeatureComponent />;
}
```

## Testing

### Test Mode
1. Use Paystack test keys (`pk_test_...` and `sk_test_...`)
2. Use Paystack test cards:
   - Success: `4084 0841 1111 1111`
   - Failed: `4084 0841 2222 2222`

### Verify Webhook
1. Make a test payment
2. Check Supabase function logs: `supabase functions logs paystack-webhook`
3. Check your `subscriptions` table in Supabase

## Subscription Statuses

| Status | Description |
|--------|-------------|
| `active` | Subscription is active and paid |
| `pending` | Subscription initiated but not confirmed |
| `inactive` | Subscription disabled (manual or failed payment) |
| `cancelled` | User cancelled subscription |
| `payment_failed` | Recurring payment failed |

## Plan Codes Reference

| Plan | Code | Price |
|------|------|-------|
| Pro | `PLN_rknt3upbuue6dmh` | ₦49,999/month |
| Enterprise | `PLN_b36ulzsdy6d418n` | ₦79,999/month |

## Security Notes

1. **Never expose `sk_live_...`** - Only use in server-side code (Edge Functions)
2. **`pk_live_...` is safe** - Designed to be used in frontend
3. **Always verify webhook signatures** - The Edge Function does this automatically
4. **Use Row Level Security** - Already configured in the migration

## Troubleshooting

### Webhook not receiving events
- Verify webhook URL in Paystack dashboard
- Check Edge Function logs for errors
- Ensure `--no-verify-jwt` flag was used during deployment

### Subscription not showing in database
- Check Edge Function logs: `supabase functions logs paystack-webhook`
- Verify PAYSTACK_SECRET_KEY is set correctly
- Check for RLS policy issues

### Payment modal not opening
- Ensure Paystack script is loaded in `index.html`
- Check browser console for errors
- Verify public key is correct
