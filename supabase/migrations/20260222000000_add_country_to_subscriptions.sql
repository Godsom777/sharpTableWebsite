-- Add country column to subscriptions table for multi-country expansion
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS country TEXT;

-- Index for filtering/analytics by country
CREATE INDEX IF NOT EXISTS idx_subscriptions_country ON subscriptions(country);
