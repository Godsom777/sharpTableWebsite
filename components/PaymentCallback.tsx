'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { CheckCircle2Icon, HomeIcon, Loader2Icon, LogInIcon, MailIcon, XCircleIcon } from 'lucide-react';
import { Box, Typography } from '@mui/material';
import { getAppSupabaseClient } from '../lib/supabase';

const HANDOFF_ENDPOINT = 'https://app.sharptable.com.ng/api/onboarding/handoff';
const SETUP_FALLBACK_URL = 'https://app.sharptable.com.ng/setup';
const HANDOFF_TIMEOUT_MS = 10000;
const AUTO_REDIRECT_MS = 1800;

type HandoffState = 'pending' | 'ready' | 'fallback';

// Never logs or renders the access token or the returned token_hash link.
async function requestSetupLink(): Promise<string | null> {
  try {
    const supabase = getAppSupabaseClient();
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), HANDOFF_TIMEOUT_MS);
    try {
      const res = await fetch(HANDOFF_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      });
      if (res.status !== 200) return null;
      const body = (await res.json()) as { url?: unknown };
      if (typeof body.url !== 'string') return null;
      const url = new URL(body.url);
      if (url.origin !== 'https://app.sharptable.com.ng' || url.pathname !== '/setup') return null;
      return url.toString();
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

type PaymentStatus = 'loading' | 'success' | 'failed';

interface SubscriptionData {
  email: string; businessName: string; plan: string; planName?: string; planCode: string; initiatedAt: string; status: string; completedAt?: string; paystackReference?: string;
}

export const PaymentCallback: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [handoff, setHandoff] = useState<HandoffState>('pending');
  const setupLinkRef = useRef<string | null>(null);
  const redirectedRef = useRef(false);

  const goToSetup = () => {
    if (redirectedRef.current) return;
    const link = setupLinkRef.current;
    if (link) {
      redirectedRef.current = true;
      setupLinkRef.current = null; // one-time link: use once
      window.location.assign(link);
    } else {
      window.location.assign(SETUP_FALLBACK_URL);
    }
  };

  useEffect(() => {
    if (status !== 'success') return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    requestSetupLink().then((link) => {
      if (cancelled) return;
      if (link) {
        setupLinkRef.current = link;
        setHandoff('ready');
        timer = setTimeout(goToSetup, AUTO_REDIRECT_MS);
      } else {
        setHandoff('fallback');
      }
    });
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    const storedData = localStorage.getItem('sharptable_pending_subscription');
    
    if (storedData) {
      const data: SubscriptionData = JSON.parse(storedData);
      setSubscriptionData(data);
      if (reference) {
        data.status = 'completed'; data.completedAt = new Date().toISOString(); data.paystackReference = reference;
        localStorage.setItem('sharptable_subscription', JSON.stringify(data));
        localStorage.removeItem('sharptable_pending_subscription');
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } else {
      setStatus(reference ? 'success' : 'failed');
    }
  }, []);

  return (
    <Box component="section" sx={{ minHeight: '100vh', bgcolor: '#050B1F', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <AnimatePresence mode="wait">
        <Box component={motion.div} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ maxWidth: 'sm', width: '100%', bgcolor: '#111E47', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          
          {status === 'loading' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Loader2Icon} className="animate-spin" style={{ color: 'white', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', mb: 1 }}>Securing Registration</Typography>
              <Typography sx={{ color: 'grey.500', fontSize: '1rem' }}>Verifying payment layers...</Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={CheckCircle2Icon} style={{ color: 'white', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'white', mb: 1 }}>Subscription Active.</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.6 }}>
                {subscriptionData ? (
                  <>Your enterprise, <Box component="span" sx={{ color: 'white', fontWeight: 700 }}>{subscriptionData.businessName}</Box>, is now completely secure.</>
                ) : 'Your operations are now entirely protected.'}
              </Typography>

              {subscriptionData && (
                <Box sx={{ bgcolor: '#0A1433', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', p: 3, mb: 4, textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: 'grey.600', mb: 2 }}>Audit Trail</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, fontSize: '0.95rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Admin Email</Typography><Typography sx={{ color: 'white', fontWeight: 600 }}>{subscriptionData.email}</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Security Plan</Typography><Typography sx={{ color: 'white', fontWeight: 700, textTransform: 'capitalize' }}>{subscriptionData.planName || ({ lite: 'Solo', pro: 'Growth', enterprise: 'Group' } as Record<string, string>)[subscriptionData.plan.replace(/-yearly$/, '')] || subscriptionData.plan}</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Clearance Reference</Typography><Typography sx={{ color: 'grey.500', fontFamily: 'monospace', fontSize: '0.85rem' }}>{subscriptionData.paystackReference || '—'}</Typography></Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {handoff === 'ready' && (
                  <Typography sx={{ color: 'grey.400', fontSize: '0.95rem' }}>Taking you to setup…</Typography>
                )}
                <Box component="button" disabled={handoff === 'pending'} onClick={goToSetup} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'grey.200' }, '&:disabled': { opacity: 0.6, cursor: 'wait' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Icon icon={handoff === 'pending' ? Loader2Icon : LogInIcon} className={handoff === 'pending' ? 'animate-spin' : undefined} /> Set up your restaurant
                </Box>
                {handoff === 'fallback' && (
                  <Typography sx={{ color: 'grey.400', fontSize: '0.9rem' }}>Sign in with the email and password you just used.</Typography>
                )}
                <Box component="button" onClick={() => window.location.href = '/'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: '#0A1433', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: '#1A2A5C' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Icon icon={HomeIcon} /> Retrn to Surface
                </Box>
              </Box>
            </>
          )}

          {status === 'failed' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={XCircleIcon} style={{ color: '#ef4444', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', mb: 1, letterSpacing: '-0.02em' }}>Transaction Invalid</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.6 }}>The gate remained locked. Your payment was not processed successfully.</Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="button" onClick={() => window.location.href = '/'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', '&:hover': { bgcolor: 'grey.200' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Icon icon={HomeIcon} /> Return Home
                </Box>
                <Box component="button" onClick={() => window.location.href = 'mailto:support@sharptable.com.ng'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Icon icon={MailIcon} /> Contact Operations
                </Box>
              </Box>
            </>
          )}
        </Box>
      </AnimatePresence>
    </Box>
  );
};

