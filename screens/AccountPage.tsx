'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateRight,
  faBan,
  faCalendarDay,
  faKey,
  faRightFromBracket,
  faShieldHalved,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputBase,
  Typography,
} from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { BASE_PRICES_NGN, PLAN_CONFIG, type PlanType } from '../contexts/PaymentContext';
import { useSubscription } from '../hooks/useSubscription';

const accountSymbols = ['<>', '[]', '{}', '##', '//', '||', '==', '**'];

const statusLabels: Record<string, string> = {
  active: 'Active',
  non_renewing: 'Active until renewal',
  pending: 'Pending',
  inactive: 'Inactive',
  cancelled: 'Cancelled',
  payment_failed: 'Payment failed',
};

const planGroups: Array<{
  title: string;
  key: PlanType;
  description: string;
}> = [
  {
    title: 'Lite Monthly',
    key: 'lite',
    description: 'Single-location starter plan billed monthly.',
  },
  {
    title: 'Pro Monthly',
    key: 'pro',
    description: 'Direct ordering and staff management billed monthly.',
  },
  {
    title: 'Enterprise Monthly',
    key: 'enterprise',
    description: 'Multi-branch operations billed monthly.',
  },
  {
    title: 'Lite Yearly',
    key: 'lite-yearly',
    description: 'Annual starter plan with lower effective monthly cost.',
  },
  {
    title: 'Pro Yearly',
    key: 'pro-yearly',
    description: 'Annual Pro billing with reduced churn and savings.',
  },
  {
    title: 'Enterprise Yearly',
    key: 'enterprise-yearly',
    description: 'Annual enterprise billing for operators with scale.',
  },
];

function formatDate(value: string | null): string {
  if (!value) {
    return 'Unavailable';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

async function sendBillingAction(
  accessToken: string,
  payload: { action: 'schedule_change'; targetPlan: PlanType } | { action: 'cancel' }
): Promise<{ message?: string; error?: string }> {
  const response = await fetch('/api/billing/manage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { error: data.error || 'The billing request failed.' };
  }

  return { message: data.message };
}

export const AccountPage: React.FC = () => {
  const { user, session, isLoading, isConfigured, signInWithPassword, signOut, sendPasswordRecovery } = useAuth();
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const { subscription, isLoading: isSubscriptionLoading, error: subscriptionError, refetch } = useSubscription(
    user?.email
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSendingRecovery, setIsSendingRecovery] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<'cancel' | PlanType | null>(null);

  const normalizedCurrentPlan = subscription?.planType ?? null;
  const normalizedScheduledPlan = subscription?.scheduledPlanType ?? null;

  const availablePlans = useMemo(
    () =>
      planGroups.map((plan) => ({
        ...plan,
        displayPrice: formatPrice(BASE_PRICES_NGN[plan.key]),
        period: PLAN_CONFIG[plan.key].period,
      })),
    []
  );

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setIsSigningIn(true);

    const { error } = await signInWithPassword(email, password);
    setIsSigningIn(false);

    if (error) {
      setAuthError(error);
      return;
    }

    setPassword('');
  };

  const handleRecovery = async () => {
    if (!email.trim()) {
      setAuthError('Enter your email first so the recovery link goes to the correct account.');
      return;
    }

    setIsSendingRecovery(true);
    setAuthError(null);
    setAuthMessage(null);
    const { error } = await sendPasswordRecovery(email);
    setIsSendingRecovery(false);

    if (error) {
      setAuthError(error);
      return;
    }

    setAuthMessage('If that email matches an account, a password link has been sent.');
  };

  const handlePlanChange = async (targetPlan: PlanType) => {
    if (!session?.access_token) {
      setActionError('Your session is missing. Sign in again before changing plans.');
      return;
    }

    if (
      !window.confirm(
        `Schedule ${PLAN_CONFIG[targetPlan].name} ${PLAN_CONFIG[targetPlan].period} for the next renewal date?`
      )
    ) {
      return;
    }

    setActionError(null);
    setActionMessage(null);
    setActiveAction(targetPlan);

    const { error, message } = await sendBillingAction(session.access_token, {
      action: 'schedule_change',
      targetPlan,
    });

    setActiveAction(null);

    if (error) {
      setActionError(error);
      return;
    }

    setActionMessage(message || 'Plan change scheduled.');
    await refetch();
  };

  const handleCancel = async () => {
    if (!session?.access_token) {
      setActionError('Your session is missing. Sign in again before cancelling.');
      return;
    }

    if (
      !window.confirm(
        'Cancel auto-renewal at the next billing date? Your current tier remains active until the renewal date.'
      )
    ) {
      return;
    }

    setActionError(null);
    setActionMessage(null);
    setActiveAction('cancel');

    const { error, message } = await sendBillingAction(session.access_token, {
      action: 'cancel',
    });

    setActiveAction(null);

    if (error) {
      setActionError(error);
      return;
    }

    setActionMessage(message || 'Cancellation scheduled.');
    await refetch();
  };

  return (
    <>
      <PageHeader
        title="Account & Billing"
        subtitle="Log in to review your current plan and schedule upgrades, downgrades, or cancellation without changing access before renewal."
        badge="Customer Access"
        symbols={accountSymbols}
      />

      <Box component="section" sx={{ bgcolor: 'black', pb: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          {!isConfigured && (
            <Alert severity="error" sx={{ mb: 4 }}>
              App Supabase is not configured on this website. Add `VITE_APP_SUPABASE_URL` and `VITE_APP_SUPABASE_ANON_KEY`.
            </Alert>
          )}

          {isLoading ? (
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          ) : !user ? (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              sx={{
                maxWidth: 560,
                mx: 'auto',
                bgcolor: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                p: { xs: 3, md: 5 },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
                Existing customer login
              </Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.7 }}>
                Log in to manage your subscription, update your plan, or cancel renewal.
              </Typography>

              {authError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {authError}
                </Alert>
              )}

              {authMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {authMessage}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSignIn} sx={{ display: 'grid', gap: 2.5 }}>
                <Box>
                  <Typography sx={{ color: 'grey.400', fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>
                    Email
                  </Typography>
                  <InputBase
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    sx={{
                      width: '100%',
                      bgcolor: '#050505',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '0.85rem',
                      color: 'white',
                      input: { px: 2, py: 1.6 },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: 'grey.400', fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>
                    Password
                  </Typography>
                  <InputBase
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    sx={{
                      width: '100%',
                      bgcolor: '#050505',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '0.85rem',
                      color: 'white',
                      input: { px: 2, py: 1.6 },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={isSigningIn || !isConfigured}
                  sx={{
                    mt: 1,
                    bgcolor: 'white',
                    color: 'black',
                    borderRadius: '999px',
                    py: 1.5,
                    fontWeight: 800,
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  {isSigningIn ? <CircularProgress size={18} sx={{ color: 'inherit' }} /> : 'Log In'}
                </Button>

                <Button
                  type="button"
                  onClick={handleRecovery}
                  disabled={isSendingRecovery || !isConfigured}
                  sx={{
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    py: 1.5,
                    fontWeight: 700,
                  }}
                  startIcon={
                    isSendingRecovery ? (
                      <CircularProgress size={16} sx={{ color: 'inherit' }} />
                    ) : (
                      <FontAwesomeIcon icon={faKey} />
                    )
                  }
                >
                  Send Password Setup / Recovery Link
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gap: 4 }}>
              <Box
                sx={{
                  bgcolor: '#111111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.5rem',
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  gap: 3,
                }}
              >
                <Box>
                  <Typography sx={{ color: 'grey.500', textTransform: 'uppercase', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', mb: 1 }}>
                    Signed In
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.8rem' } }}>
                    {subscription?.businessName || user.email}
                  </Typography>
                  <Typography sx={{ color: 'grey.400', mt: 0.75 }}>{user.email}</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: { xs: 'stretch', md: 'center' }, flexWrap: 'wrap' }}>
                  <Button
                    onClick={() => refetch()}
                    sx={{
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '999px',
                      px: 2.5,
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowRotateRight} />}
                  >
                    Refresh
                  </Button>
                  <Button
                    onClick={signOut}
                    sx={{
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '999px',
                      px: 2.5,
                    }}
                    startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                  >
                    Log Out
                  </Button>
                </Box>
              </Box>

              {(actionError || subscriptionError) && (
                <Alert severity="error">{actionError || subscriptionError}</Alert>
              )}

              {actionMessage && <Alert severity="success">{actionMessage}</Alert>}

              {isSubscriptionLoading ? (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
                  <CircularProgress sx={{ color: 'white' }} />
                </Box>
              ) : !subscription?.planType ? (
                <Alert severity="warning">
                  We could not find an active subscription for this account yet.
                </Alert>
              ) : (
                <>
                  <Box
                    sx={{
                      bgcolor: '#111111',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '1.5rem',
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Typography sx={{ color: 'grey.500', textTransform: 'uppercase', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', mb: 1 }}>
                      Current Access
                    </Typography>
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.4rem', md: '2rem' }, mb: 1 }}>
                      {PLAN_CONFIG[normalizedCurrentPlan].name} plan
                    </Typography>
                    <Typography sx={{ color: 'grey.400', mb: 2 }}>
                      Status: {statusLabels[subscription.status || 'pending'] || subscription.status}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                      <Box sx={{ bgcolor: '#070707', borderRadius: '1rem', p: 2.5 }}>
                        <Typography sx={{ color: 'grey.500', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, mb: 1 }}>
                          Renewal Date
                        </Typography>
                        <Typography sx={{ color: 'white', fontWeight: 700 }}>{formatDate(subscription.nextPaymentDate)}</Typography>
                      </Box>
                      <Box sx={{ bgcolor: '#070707', borderRadius: '1rem', p: 2.5 }}>
                        <Typography sx={{ color: 'grey.500', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, mb: 1 }}>
                          Current Billing
                        </Typography>
                        <Typography sx={{ color: 'white', fontWeight: 700 }}>
                          {formatPrice(BASE_PRICES_NGN[normalizedCurrentPlan])} {PLAN_CONFIG[normalizedCurrentPlan].period}
                        </Typography>
                      </Box>
                      <Box sx={{ bgcolor: '#070707', borderRadius: '1rem', p: 2.5 }}>
                        <Typography sx={{ color: 'grey.500', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, mb: 1 }}>
                          Access Behavior
                        </Typography>
                        <Typography sx={{ color: 'white', fontWeight: 700 }}>
                          {subscription.hasActiveSubscription ? 'App access remains on for the current cycle.' : 'Access is not currently active.'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {(subscription.cancelAtPeriodEnd || subscription.scheduledPlanType) && (
                    <Alert
                      severity={subscription.scheduledPlanType ? 'info' : 'warning'}
                      icon={
                        <FontAwesomeIcon
                          icon={subscription.scheduledPlanType ? faCalendarDay : faTriangleExclamation}
                        />
                      }
                    >
                      {subscription.scheduledPlanType
                        ? `${PLAN_CONFIG[subscription.scheduledPlanType].name} is scheduled for ${formatDate(subscription.scheduledChangeEffectiveAt)}. Your current tier remains unchanged until then.`
                        : `Auto-renewal is cancelled. Your current plan remains usable until ${formatDate(subscription.nextPaymentDate)}.`}
                    </Alert>
                  )}

                  <Box
                    sx={{
                      bgcolor: '#111111',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '1.5rem',
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.8rem' }, mb: 1 }}>
                      Schedule a different plan
                    </Typography>
                    <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.7 }}>
                      Upgrades and downgrades are queued for the next renewal date.
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }, gap: 2.5 }}>
                      {availablePlans.map((plan) => {
                        const isCurrent = normalizedCurrentPlan === plan.key;
                        const isScheduled = normalizedScheduledPlan === plan.key;
                        const isBusy = activeAction === plan.key;

                        return (
                          <Box
                            key={plan.key}
                            sx={{
                              borderRadius: '1.2rem',
                              p: 2.5,
                              bgcolor: isCurrent ? 'rgba(201,168,76,0.12)' : '#070707',
                              border: isCurrent
                                ? '1px solid rgba(201,168,76,0.45)'
                                : '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <Typography sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>{plan.title}</Typography>
                            <Typography sx={{ color: 'grey.400', fontSize: '0.92rem', mb: 2 }}>{plan.description}</Typography>
                            <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.3rem', mb: 2 }}>
                              {plan.displayPrice}
                              <Box component="span" sx={{ color: 'grey.500', fontWeight: 600, fontSize: '0.95rem', ml: 0.75 }}>
                                {plan.period}
                              </Box>
                            </Typography>
                            <Button
                              disabled={isCurrent || isScheduled || Boolean(activeAction)}
                              onClick={() => handlePlanChange(plan.key)}
                              sx={{
                                width: '100%',
                                borderRadius: '999px',
                                py: 1.3,
                                fontWeight: 800,
                                bgcolor: isCurrent ? 'rgba(201,168,76,0.2)' : 'white',
                                color: isCurrent ? '#f1d38b' : 'black',
                                '&:hover': { bgcolor: isCurrent ? 'rgba(201,168,76,0.24)' : 'grey.200' },
                              }}
                            >
                              {isBusy ? (
                                <CircularProgress size={16} sx={{ color: 'inherit' }} />
                              ) : isScheduled ? (
                                'Scheduled'
                              ) : isCurrent ? (
                                'Current Plan'
                              ) : (
                                'Switch On Next Renewal'
                              )}
                            </Button>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: '#111111',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '1.5rem',
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.8rem' }, mb: 1 }}>
                      Cancel auto-renewal
                    </Typography>
                    <Typography sx={{ color: 'grey.400', mb: 3, lineHeight: 1.7 }}>
                      This does not strip the current tier immediately. It marks the subscription as non-renewing and the app should keep honoring the current tier until the next payment date.
                    </Typography>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <FontAwesomeIcon icon={faShieldHalved} style={{ marginTop: 4, color: '#fbbf24' }} />
                        <Typography sx={{ color: 'grey.400', lineHeight: 1.7 }}>
                          Cancelling here stops the next renewal. Your current plan stays active until the end of the billing period.
                        </Typography>
                      </Box>

                      <Button
                        onClick={handleCancel}
                        disabled={subscription.cancelAtPeriodEnd || activeAction !== null}
                        sx={{
                          minWidth: { md: 220 },
                          borderRadius: '999px',
                          py: 1.3,
                          px: 3,
                          fontWeight: 800,
                          bgcolor: 'rgba(239,68,68,0.14)',
                          color: '#fca5a5',
                          border: '1px solid rgba(239,68,68,0.35)',
                        }}
                        startIcon={
                          activeAction === 'cancel' ? (
                            <CircularProgress size={16} sx={{ color: 'inherit' }} />
                          ) : (
                            <FontAwesomeIcon icon={faBan} />
                          )
                        }
                      >
                        {subscription.cancelAtPeriodEnd ? 'Already Cancelling' : 'Cancel At Renewal'}
                      </Button>
                    </Box>
                  </Box>

                </>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};
