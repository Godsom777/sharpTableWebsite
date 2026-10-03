-- check_subscription_status(user_email text) runs as SECURITY DEFINER, so it
-- bypasses row-level security. It was callable by the anon role with any email,
-- which let anyone look up another customer's plan and status.
--
-- This database is shared with app.sharptable.com.ng and other projects, so the
-- signature, return columns and query below are kept exactly as they are live
-- (checked 27 Sep 2026). The only changes are:
--   1. a caller can only look up their own email (service role can look up any),
--   2. anon and PUBLIC lose EXECUTE; authenticated and service_role keep it,
--   3. search_path is pinned, as recommended for SECURITY DEFINER functions.
-- The separate check_subscription_status(p_tenant_id uuid) is not touched.

BEGIN;

CREATE OR REPLACE FUNCTION public.check_subscription_status(user_email text)
 RETURNS TABLE(has_active_subscription boolean, plan_type text, status text, next_payment_date timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF auth.role() IS DISTINCT FROM 'service_role'
     AND LOWER(COALESCE(auth.jwt() ->> 'email', '')) <> LOWER(COALESCE(user_email, '')) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    s.status = 'active' AS has_active_subscription,
    s.plan_type,
    s.status,
    s.next_payment_date
  FROM subscriptions s
  WHERE LOWER(s.email) = LOWER(user_email)
  LIMIT 1;
END;
$function$;

REVOKE ALL ON FUNCTION public.check_subscription_status(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_subscription_status(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_subscription_status(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_subscription_status(text) TO service_role;

COMMIT;
