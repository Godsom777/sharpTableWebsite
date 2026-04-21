ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS email_token TEXT,
  ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS scheduled_plan_type TEXT,
  ADD COLUMN IF NOT EXISTS scheduled_plan_code TEXT,
  ADD COLUMN IF NOT EXISTS scheduled_plan_name TEXT,
  ADD COLUMN IF NOT EXISTS scheduled_subscription_code TEXT,
  ADD COLUMN IF NOT EXISTS scheduled_email_token TEXT,
  ADD COLUMN IF NOT EXISTS scheduled_change_effective_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_subscriptions_scheduled_change_effective_at
  ON subscriptions(scheduled_change_effective_at);
