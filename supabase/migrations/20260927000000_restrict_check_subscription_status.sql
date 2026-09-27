-- check_subscription_status runs as SECURITY DEFINER, so it bypasses row-level
-- security. It was callable by the anon role with any email, which let anyone
-- look up another customer's plan, status and country.
--
-- Keep the same signature (other apps on this project may call it), but only
-- return a row for the signed-in user's own email, and remove anon access.

CREATE OR REPLACE FUNCTION check_subscription_status(user_email TEXT)
RETURNS TABLE (
  has_active_subscription BOOLEAN,
  plan_type TEXT,
  status TEXT,
  country TEXT,
  next_payment_date TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- The service role (server-side code) may look up any email.
  IF auth.role() <> 'service_role'
     AND LOWER(COALESCE(auth.jwt() ->> 'email', '')) <> LOWER(COALESCE(user_email, '')) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    s.status IN ('active', 'non_renewing') AS has_active_subscription,
    s.plan_type,
    s.status,
    s.country,
    s.next_payment_date
  FROM subscriptions s
  WHERE s.email = LOWER(user_email)
  LIMIT 1;
END;
$$;

REVOKE ALL ON FUNCTION check_subscription_status(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION check_subscription_status(TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION check_subscription_status(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION check_subscription_status(TEXT) TO service_role;
