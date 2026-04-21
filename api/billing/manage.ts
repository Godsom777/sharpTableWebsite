import { createClient } from '@supabase/supabase-js';

const APP_SUPABASE_URL = process.env.APP_SUPABASE_URL || process.env.VITE_APP_SUPABASE_URL;
const APP_SUPABASE_ANON_KEY = process.env.APP_SUPABASE_ANON_KEY || process.env.VITE_APP_SUPABASE_ANON_KEY;
const APP_SUPABASE_SERVICE_ROLE_KEY = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const PLAN_CONFIG = {
  lite: {
    name: 'Lite',
    planCode: 'PLN_mquahijhgi8tzux',
  },
  pro: {
    name: 'Pro',
    planCode: 'PLN_rknt3upbuue6dmh',
  },
  enterprise: {
    name: 'Enterprise',
    planCode: 'PLN_b36ulzsdy6d418n',
  },
  'lite-yearly': {
    name: 'Lite',
    planCode: 'PLN_2a41260dnw7z99x',
  },
  'pro-yearly': {
    name: 'Pro',
    planCode: 'PLN_lu2vu0x7b0z4esc',
  },
  'enterprise-yearly': {
    name: 'Enterprise',
    planCode: 'PLN_geld4bet9hwqca0',
  },
} as const;

type PlanType = keyof typeof PLAN_CONFIG;

interface DbSubscription {
  email: string;
  customer_code: string | null;
  plan_type: PlanType | null;
  plan_code: string | null;
  subscription_code: string | null;
  email_token: string | null;
  status: string | null;
  cancel_at_period_end: boolean;
  next_payment_date: string | null;
  scheduled_plan_type: PlanType | null;
  scheduled_plan_code: string | null;
  scheduled_subscription_code: string | null;
  scheduled_email_token: string | null;
  scheduled_change_effective_at: string | null;
}

function sendJson(response: any, status: number, body: Record<string, unknown>) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(body));
}

function getConfigError(): string | null {
  if (!APP_SUPABASE_URL || !APP_SUPABASE_ANON_KEY || !APP_SUPABASE_SERVICE_ROLE_KEY) {
    return 'Supabase server configuration is incomplete.';
  }

  if (!PAYSTACK_SECRET_KEY) {
    return 'PAYSTACK_SECRET_KEY is missing.';
  }

  return null;
}

async function authenticateRequest(authorizationHeader?: string) {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return { error: 'Missing bearer token.', user: null };
  }

  if (!APP_SUPABASE_URL || !APP_SUPABASE_ANON_KEY) {
    return { error: 'Supabase auth configuration is missing.', user: null };
  }

  const accessToken = authorizationHeader.slice('Bearer '.length);
  const authClient = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { data, error } = await authClient.auth.getUser();
  if (error || !data.user?.email) {
    return { error: 'Your session could not be verified.', user: null };
  }

  return { error: null, user: data.user };
}

function getServiceClient() {
  return createClient(APP_SUPABASE_URL!, APP_SUPABASE_SERVICE_ROLE_KEY!);
}

async function paystackRequest(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Paystack request failed.');
  }

  return data.data;
}

async function fetchSubscriptionFromPaystack(subscriptionCode: string) {
  return paystackRequest(`/subscription/${subscriptionCode}`, { method: 'GET' });
}

async function disableSubscription(subscriptionCode: string, emailToken: string) {
  return paystackRequest('/subscription/disable', {
    method: 'POST',
    body: JSON.stringify({
      code: subscriptionCode,
      token: emailToken,
    }),
  });
}

async function createScheduledSubscription(args: {
  customer: string;
  planCode: string;
  authorizationCode?: string | null;
  startDate: string;
}) {
  return paystackRequest('/subscription', {
    method: 'POST',
    body: JSON.stringify({
      customer: args.customer,
      plan: args.planCode,
      authorization: args.authorizationCode || undefined,
      start_date: args.startDate,
    }),
  });
}

function isPlanType(value: string): value is PlanType {
  return value in PLAN_CONFIG;
}

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const configError = getConfigError();
  if (configError) {
    sendJson(response, 500, { error: configError });
    return;
  }

  const { error: authError, user } = await authenticateRequest(request.headers.authorization);
  if (authError || !user?.email) {
    sendJson(response, 401, { error: authError || 'Unauthenticated.' });
    return;
  }

  const payload = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
  const service = getServiceClient();
  const email = user.email.toLowerCase();

  const { data: subscriptionData, error: subscriptionError } = await service
    .from('subscriptions')
    .select(
      'email, customer_code, plan_type, plan_code, subscription_code, email_token, status, cancel_at_period_end, next_payment_date, scheduled_plan_type, scheduled_plan_code, scheduled_subscription_code, scheduled_email_token, scheduled_change_effective_at'
    )
    .eq('email', email)
    .maybeSingle();

  const subscription = subscriptionData as DbSubscription | null;

  if (subscriptionError) {
    sendJson(response, 500, { error: subscriptionError.message });
    return;
  }

  if (!subscription) {
    sendJson(response, 404, { error: 'No subscription record exists for this account.' });
    return;
  }

  try {
    if (payload.action === 'cancel') {
      if (!subscription.subscription_code) {
        sendJson(response, 400, { error: 'This account does not have a cancellable subscription code yet.' });
        return;
      }

      const currentPaystackSubscription = await fetchSubscriptionFromPaystack(subscription.subscription_code);
      const currentToken = subscription.email_token || currentPaystackSubscription.email_token;

      if (!currentToken) {
        sendJson(response, 400, { error: 'The active subscription is missing its Paystack email token.' });
        return;
      }

      if (subscription.scheduled_subscription_code && subscription.scheduled_email_token) {
        await disableSubscription(subscription.scheduled_subscription_code, subscription.scheduled_email_token);
      }

      if (!subscription.cancel_at_period_end) {
        await disableSubscription(subscription.subscription_code, currentToken);
      }

      const { error } = await service
        .from('subscriptions')
        .update({
          email_token: currentToken,
          status: 'non_renewing',
          cancel_at_period_end: true,
          scheduled_plan_type: null,
          scheduled_plan_code: null,
          scheduled_plan_name: null,
          scheduled_subscription_code: null,
          scheduled_email_token: null,
          scheduled_change_effective_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);

      if (error) {
        throw new Error(error.message);
      }

      sendJson(response, 200, {
        message: `Cancellation scheduled. ${subscription.plan_type ? PLAN_CONFIG[subscription.plan_type].name : 'Current'} access remains until the renewal date.`,
      });
      return;
    }

    if (payload.action === 'schedule_change') {
      const targetPlan = payload.targetPlan;
      if (typeof targetPlan !== 'string' || !isPlanType(targetPlan)) {
        sendJson(response, 400, { error: 'The requested target plan is invalid.' });
        return;
      }

      if (!subscription.subscription_code) {
        sendJson(response, 400, {
          error: 'This account does not have an active Paystack subscription code yet, so a next-renewal switch cannot be scheduled.',
        });
        return;
      }

      if (subscription.plan_type === targetPlan && !subscription.scheduled_plan_type) {
        sendJson(response, 409, { error: 'This is already the current plan.' });
        return;
      }

      if (subscription.scheduled_plan_type === targetPlan) {
        sendJson(response, 409, { error: 'That plan is already queued for the next renewal.' });
        return;
      }

      const currentPaystackSubscription = await fetchSubscriptionFromPaystack(subscription.subscription_code);
      const currentToken = subscription.email_token || currentPaystackSubscription.email_token;
      const authorizationCode = currentPaystackSubscription.authorization?.authorization_code || null;
      const nextPaymentDate = currentPaystackSubscription.next_payment_date || subscription.next_payment_date;
      const customerCode =
        currentPaystackSubscription.customer?.customer_code || subscription.customer_code || subscription.email;

      if (!currentToken) {
        sendJson(response, 400, { error: 'The active subscription is missing its Paystack email token.' });
        return;
      }

      if (!nextPaymentDate) {
        sendJson(response, 400, { error: 'The next renewal date is missing, so the change cannot be scheduled safely.' });
        return;
      }

      if (subscription.scheduled_subscription_code && subscription.scheduled_email_token) {
        await disableSubscription(subscription.scheduled_subscription_code, subscription.scheduled_email_token);
      }

      const scheduledSubscription = await createScheduledSubscription({
        customer: customerCode,
        planCode: PLAN_CONFIG[targetPlan].planCode,
        authorizationCode,
        startDate: nextPaymentDate,
      });

      if (!subscription.cancel_at_period_end) {
        await disableSubscription(subscription.subscription_code, currentToken);
      }

      const { error } = await service
        .from('subscriptions')
        .update({
          customer_code: customerCode,
          email_token: currentToken,
          status: 'non_renewing',
          cancel_at_period_end: true,
          next_payment_date: nextPaymentDate,
          scheduled_plan_type: targetPlan,
          scheduled_plan_code: PLAN_CONFIG[targetPlan].planCode,
          scheduled_plan_name: PLAN_CONFIG[targetPlan].name,
          scheduled_subscription_code: scheduledSubscription.subscription_code,
          scheduled_email_token: scheduledSubscription.email_token,
          scheduled_change_effective_at: nextPaymentDate,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);

      if (error) {
        throw new Error(error.message);
      }

      sendJson(response, 200, {
        message: `${PLAN_CONFIG[targetPlan].name} has been scheduled for the next renewal date.`,
      });
      return;
    }

    sendJson(response, 400, { error: 'Unsupported billing action.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Billing action failed.';
    sendJson(response, 500, { error: message });
  }
}
