'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner, faHome, faEnvelope, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography } from '@mui/material';

type PaymentStatus = 'loading' | 'success' | 'failed';

interface SubscriptionData {
  email: string; businessName: string; plan: string; planCode: string; initiatedAt: string; status: string; completedAt?: string; paystackReference?: string;
}

export const PaymentCallback: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

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
    <Box component="section" sx={{ minHeight: '100vh', bgcolor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <AnimatePresence mode="wait">
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ maxWidth: 'sm', width: '100%', bgcolor: '#111111', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          
          {status === 'loading' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" style={{ color: 'white', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', mb: 1 }}>Securing Registration</Typography>
              <Typography sx={{ color: 'grey.500', fontSize: '1rem' }}>Verifying payment layers...</Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'white', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'white', mb: 1 }}>Subscription Active.</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.6 }}>
                {subscriptionData ? (
                  <>Your enterprise, <Box component="span" sx={{ color: 'white', fontWeight: 700 }}>{subscriptionData.businessName}</Box>, is now completely secure.</>
                ) : 'Your operations are now entirely protected.'}
              </Typography>

              {subscriptionData && (
                <Box sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', p: 3, mb: 4, textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: 'grey.600', mb: 2 }}>Audit Trail</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, fontSize: '0.95rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Admin Email</Typography><Typography sx={{ color: 'white', fontWeight: 600 }}>{subscriptionData.email}</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Security Plan</Typography><Typography sx={{ color: 'white', fontWeight: 700, textTransform: 'capitalize' }}>{subscriptionData.plan}</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ color: 'grey.500' }}>Clearance Reference</Typography><Typography sx={{ color: 'grey.500', fontFamily: 'monospace', fontSize: '0.85rem' }}>{subscriptionData.paystackReference || '—'}</Typography></Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="button" onClick={() => window.location.href = 'https://app.sharptable.com.ng'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'grey.200' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={faArrowRightToBracket} /> Access Dashboard
                </Box>
                <Box component="button" onClick={() => window.location.href = '/'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: '#1a1a1a' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={faHome} /> Retrn to Surface
                </Box>
              </Box>
            </>
          )}

          {status === 'failed' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#ef4444', width: 24, height: 24 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', mb: 1, letterSpacing: '-0.02em' }}>Transaction Invalid</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.6 }}>The gate remained locked. Your payment was not processed successfully.</Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="button" onClick={() => window.location.href = '/'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', '&:hover': { bgcolor: 'grey.200' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={faHome} /> Return Home
                </Box>
                <Box component="button" onClick={() => window.location.href = 'mailto:support@sharptable.com.ng'} sx={{ width: '100%', py: 2, borderRadius: '9999px', bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={faEnvelope} /> Contact Operations
                </Box>
              </Box>
            </>
          )}
        </Box>
      </AnimatePresence>
    </Box>
  );
};
