# SharpTable Paystack Subscription Setup Guide

## Current Direction

SharpTable should use a single Supabase project for both the website and the app:

- Supabase project: `wwlopezoazuugxcvjgus`
- Base URL: `https://wwlopezoazuugxcvjgus.supabase.co`

This is the safest way to add website sign-in and billing management without disrupting the app flow, because:

- the same Supabase Auth users can sign in on both surfaces
- the same `subscriptions` table remains the source of truth
- website plan changes are immediately visible to the app

Do not create a second auth/database flow for the website.

## Architecture

```text
User clicks "Get Started" on website
        ->
User signs up in the shared Supabase Auth project
        ->
Paystack checkout creates subscription
        ->
Paystack webhook writes into the same shared Supabase project
        ->
Website and app both read the same subscription state
```

## What Should Stay Shared

Use the same Supabase project for:

- Auth users
- `subscriptions` table
- `subscription_payments` table
- billing-related migrations
- RLS policies

That means the SQL migrations in this repo should be run in the same SQL editor you already use for the app project.

## Step 1: Run the SQL in the App Project

Open the SQL editor for:

- `https://wwlopezoazuugxcvjgus.supabase.co`

Run these migrations there:

- `supabase/migrations/20260113000000_create_subscriptions_table.sql`
- `supabase/migrations/20260212000000_create_partners_table.sql` if you use partner referrals
- `supabase/migrations/20260222000000_add_country_to_subscriptions.sql`
- `supabase/migrations/20260421000000_add_subscription_management_fields.sql`

The last migration is required for:

- cancel at renewal
- upgrade/downgrade at next renewal
- storing the Paystack email token and scheduled plan metadata

## Step 2: Website Environment Variables

Your website frontend should keep using the shared app project:

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
VITE_APP_SUPABASE_URL=https://wwlopezoazuugxcvjgus.supabase.co
VITE_APP_SUPABASE_ANON_KEY=your_shared_project_anon_key
```

These power:

- sign in
- password recovery
- reading subscription state in the browser

## Step 3: Server-Side Billing Variables

If you use the website route `api/billing/manage.ts`, the deployed backend also needs:

```env
APP_SUPABASE_URL=https://wwlopezoazuugxcvjgus.supabase.co
APP_SUPABASE_ANON_KEY=your_shared_project_anon_key
APP_SUPABASE_SERVICE_ROLE_KEY=your_shared_project_service_role_key
PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
```

These are server-only values for:

- cancelling subscriptions
- scheduling plan switches for the next renewal
- calling Paystack securely

Do not expose `APP_SUPABASE_SERVICE_ROLE_KEY` or `PAYSTACK_SECRET_KEY` in browser code.

## Step 4: Deploy the Paystack Webhook Against the Same Project

The webhook should now be deployed against the same shared Supabase project, not the old split host.

Example:

```bash
supabase link --project-ref wwlopezoazuugxcvjgus
supabase secrets set PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
supabase secrets set SUPABASE_URL=https://wwlopezoazuugxcvjgus.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_shared_project_service_role_key
supabase functions deploy paystack-webhook --no-verify-jwt
```

Your Paystack webhook URL should then be:

```text
https://wwlopezoazuugxcvjgus.supabase.co/functions/v1/paystack-webhook
```

If Paystack still points at:

- `https://eplonlnwcuyqhgkrhqzg.supabase.co/functions/v1/paystack-webhook`

then the repo is still carrying the old split setup and should be updated in the Paystack dashboard.

## Step 5: Events to Enable in Paystack

Make sure these events are enabled:

- `subscription.create`
- `charge.success`
- `subscription.not_renew`
- `subscription.disable`
- `invoice.payment_failed`

## Existing App Flow Safety

To avoid disrupting the app:

- do not migrate users to another auth project
- do not replace the existing `subscriptions` table with a new one
- do not change existing subscription rows manually unless necessary
- only add the new columns from the migration

The changes in this repo are additive:

- website sign-in uses the same auth project the app already uses
- plan changes update the same subscription row the app already reads
- `non_renewing` should still be treated as active until the renewal date

## Backend-Added Users

Important limitation:

- if a customer exists only in `subscriptions` but does not exist in Supabase Auth, they still cannot log in

To let them use the new website sign-in flow:

- create or invite the auth user in the shared Supabase project
- keep the same email as the subscription row

That will preserve the current tier while letting them sign in and manage billing.

## Verify After Deployment

1. Sign in on `/account` with an existing shared auth user.
2. Confirm the current plan matches the app.
3. Schedule a downgrade or upgrade.
4. Confirm the `subscriptions` row gets `scheduled_plan_type` and `cancel_at_period_end`.
5. Confirm the app still treats the current plan as active until renewal.
6. Test cancellation and confirm it marks the record as non-renewing instead of cutting access immediately.

## Security Notes

- `VITE_*` values are safe for frontend use.
- `PAYSTACK_SECRET_KEY` must stay server-side only.
- `APP_SUPABASE_SERVICE_ROLE_KEY` must stay server-side only.
- The webhook must verify Paystack signatures before writing to the database.
