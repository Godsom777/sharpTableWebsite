-- Subscriptions table to track all SharpTable subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  customer_code TEXT,
  business_name TEXT,
  plan_type TEXT NOT NULL, -- 'pro' or 'enterprise'
  plan_code TEXT NOT NULL,
  plan_name TEXT,
  subscription_code TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'active', 'inactive', 'cancelled', 'payment_failed', 'pending'
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  next_payment_date TIMESTAMPTZ,
  last_payment_date TIMESTAMPTZ,
  last_payment_reference TEXT,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_type ON subscriptions(plan_type);

-- Subscription payments log
CREATE TABLE IF NOT EXISTS subscription_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  reference TEXT UNIQUE NOT NULL,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  status TEXT NOT NULL, -- 'success', 'failed'
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for payment lookups
CREATE INDEX IF NOT EXISTS idx_subscription_payments_email ON subscription_payments(email);
CREATE INDEX IF NOT EXISTS idx_subscription_payments_reference ON subscription_payments(reference);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_payments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to read their own subscription
CREATE POLICY "Users can read own subscription" ON subscriptions
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Service role can do everything (for webhook)
CREATE POLICY "Service role full access to subscriptions" ON subscriptions
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to payments" ON subscription_payments
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to check if a user has an active subscription
CREATE OR REPLACE FUNCTION check_subscription_status(user_email TEXT)
RETURNS TABLE (
  has_active_subscription BOOLEAN,
  plan_type TEXT,
  status TEXT,
  next_payment_date TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.status = 'active' AS has_active_subscription,
    s.plan_type,
    s.status,
    s.next_payment_date
  FROM subscriptions s
  WHERE s.email = LOWER(user_email)
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION check_subscription_status(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION check_subscription_status(TEXT) TO anon;
