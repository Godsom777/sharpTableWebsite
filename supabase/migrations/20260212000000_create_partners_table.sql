-- Partners table to store affiliate/partner accounts
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  referral_code TEXT UNIQUE NOT NULL,        -- e.g. "PARTNER_abc123" — used in subscription links
  bank_name TEXT,
  account_number TEXT,
  account_name TEXT,
  paystack_subaccount_code TEXT,             -- Paystack subaccount for split payments
  status TEXT NOT NULL DEFAULT 'active',    -- 'active', 'suspended'
  total_earned DECIMAL(12, 2) DEFAULT 0,
  total_paid_out DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner referrals / commissions log
CREATE TABLE IF NOT EXISTS partner_referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES partners(id),
  subscription_email TEXT NOT NULL,           -- the restaurant that subscribed
  subscription_id UUID REFERENCES subscriptions(id),
  plan_type TEXT NOT NULL,
  plan_amount DECIMAL(10, 2) NOT NULL,        -- the subscription price
  commission_type TEXT NOT NULL,              -- 'upfront' or 'recurring'
  commission_rate DECIMAL(5, 4) NOT NULL,    -- 0.50 for 50%, 0.20 for 20%
  commission_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_reference TEXT,                     -- paystack transfer reference if paid
  status TEXT NOT NULL DEFAULT 'pending',    -- 'pending', 'paid', 'failed'
  recurring_month INT,                        -- NULL for upfront, 1-6 for recurring months
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_partners_email ON partners(email);
CREATE INDEX IF NOT EXISTS idx_partners_referral_code ON partners(referral_code);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_partner_id ON partner_referrals(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_subscription_email ON partner_referrals(subscription_email);

-- Add referral_code column to subscriptions table (to track which partner referred)
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS referral_code TEXT;
CREATE INDEX IF NOT EXISTS idx_subscriptions_referral_code ON subscriptions(referral_code);

-- RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_referrals ENABLE ROW LEVEL SECURITY;

-- Partners can read their own record
CREATE POLICY "Partners can read own record" ON partners
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Partners can read their own referrals
CREATE POLICY "Partners can read own referrals" ON partner_referrals
  FOR SELECT
  USING (partner_id IN (SELECT id FROM partners WHERE email = auth.jwt() ->> 'email'));

-- Service role full access
CREATE POLICY "Service role full access to partners" ON partners
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to partner_referrals" ON partner_referrals
  FOR ALL
  USING (auth.role() = 'service_role');

-- Public can insert into partners (for sign-up form — service role validates later)
CREATE POLICY "Public can register as partner" ON partners
  FOR INSERT
  WITH CHECK (true);

-- Function to atomically increment a partner's total_earned
CREATE OR REPLACE FUNCTION increment_partner_earnings(p_partner_id UUID, p_amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE partners
  SET total_earned = total_earned + p_amount,
      updated_at = NOW()
  WHERE id = p_partner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to service role (webhook uses this)
GRANT EXECUTE ON FUNCTION increment_partner_earnings(UUID, DECIMAL) TO service_role;
