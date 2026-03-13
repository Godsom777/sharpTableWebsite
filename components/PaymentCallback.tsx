import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faHome,
  faEnvelope,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, Button } from '@mui/material';

type PaymentStatus = 'loading' | 'success' | 'failed';

interface SubscriptionData {
  email: string;
  businessName: string;
  plan: string;
  planCode: string;
  initiatedAt: string;
  status: string;
  completedAt?: string;
  paystackReference?: string;
}

export const PaymentCallback: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    
    // Get stored subscription data
    const storedData = localStorage.getItem('sharptable_pending_subscription');
    
    if (storedData) {
      const data: SubscriptionData = JSON.parse(storedData);
      setSubscriptionData(data);
      
      if (reference) {
        // Paystack returned a reference — payment was completed
        data.status = 'completed';
        data.completedAt = new Date().toISOString();
        data.paystackReference = reference;
        
        // Store completed subscription
        localStorage.setItem('sharptable_subscription', JSON.stringify(data));
        localStorage.removeItem('sharptable_pending_subscription');
        
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } else {
      // No stored data, check if there's a reference (direct redirect from Paystack)
      if (reference) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    }
  }, []);

  const handleGoToApp = () => {
    window.location.href = 'https://app.sharptable.com.ng';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@sharptable.com.ng';
  };

  return (
    <Box component="section" sx={{ minHeight: '100vh', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <AnimatePresence mode="wait">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ maxWidth: 'sm', width: '100%', bgcolor: 'grey.900', borderRadius: '1rem', border: '1px solid', borderColor: 'grey.800', p: { xs: 4, md: 6 }, textAlign: 'center' }}
        >
          {status === 'loading' && (
            <>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" style={{ color: '#f59e0b', width: 32, height: 32 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', mb: 1 }}>Processing Payment</Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '1rem' }}>Please wait while we confirm your subscription...</Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#22c55e', width: 32, height: 32 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', mb: 1 }}>Payment Successful!</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.625 }}>
                {subscriptionData ? (
                  <>
                    Thank you, <Box component="span" sx={{ color: 'white', fontWeight: 500 }}>{subscriptionData.businessName}</Box>! Your{' '}
                    <Box component="span" sx={{ color: '#fbbf24', fontWeight: 500, textTransform: 'capitalize' }}>{subscriptionData.plan}</Box> subscription is now active.
                  </>
                ) : (
                  'Your subscription has been activated successfully.'
                )}
              </Typography>

              {subscriptionData && (
                <Box sx={{ bgcolor: 'grey.800', borderRadius: '0.75rem', p: 3, mb: 4, textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'grey.400', mb: 2 }}>Subscription Details</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'grey.500', fontSize: 'inherit' }}>Email</Typography>
                      <Typography sx={{ color: 'white', fontSize: 'inherit' }}>{subscriptionData.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'grey.500', fontSize: 'inherit' }}>Plan</Typography>
                      <Typography sx={{ color: '#fbbf24', fontWeight: 500, textTransform: 'capitalize', fontSize: 'inherit' }}>{subscriptionData.plan}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'grey.500', fontSize: 'inherit' }}>Reference</Typography>
                      <Typography sx={{ color: 'grey.300', fontFamily: 'monospace', fontSize: '0.75rem' }}>{subscriptionData.paystackReference || '—'}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', mb: 1 }}>
                  Your account is ready! Sign in with the email and password you used during registration.
                </Typography>
                <Button
                  onClick={handleGoToApp}
                  variant="contained"
                  sx={{ width: '100%', py: 1.5, borderRadius: '0.75rem', background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)' }, transition: 'all 0.2s', fontFamily: 'inherit' }}
                >
                  <FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: 16, height: 16 }} />
                  Go to App & Sign In
                </Button>
                <Button
                  onClick={handleGoHome}
                  variant="contained"
                  sx={{ width: '100%', py: 1.5, borderRadius: '0.75rem', bgcolor: 'grey.800', color: 'grey.300', fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover': { bgcolor: 'grey.700', boxShadow: 'none' }, boxShadow: 'none', transition: 'all 0.2s', fontFamily: 'inherit' }}
                >
                  <FontAwesomeIcon icon={faHome} style={{ width: 16, height: 16 }} />
                  Back to Home
                </Button>
              </Box>
            </>
          )}

          {status === 'failed' && (
            <>
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#ef4444', width: 32, height: 32 }} />
              </Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', mb: 1 }}>Payment Issue</Typography>
              <Typography sx={{ color: 'grey.400', mb: 4, lineHeight: 1.625 }}>
                We couldn't confirm your payment. This could be due to a cancelled transaction or a technical issue.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  onClick={handleGoHome}
                  variant="contained"
                  sx={{ width: '100%', py: 1.5, borderRadius: '0.75rem', bgcolor: 'grey.800', color: 'white', fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover': { bgcolor: 'grey.700', boxShadow: 'none' }, boxShadow: 'none', transition: 'all 0.2s', fontFamily: 'inherit' }}
                >
                  <FontAwesomeIcon icon={faHome} style={{ width: 16, height: 16 }} />
                  Try Again
                </Button>
                <Button
                  onClick={handleContactSupport}
                  variant="outlined"
                  sx={{ width: '100%', py: 1.5, borderRadius: '0.75rem', borderColor: 'grey.700', color: 'grey.300', fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover': { bgcolor: 'grey.800', borderColor: 'grey.700' }, transition: 'all 0.2s', fontFamily: 'inherit' }}
                >
                  <FontAwesomeIcon icon={faEnvelope} style={{ width: 16, height: 16 }} />
                  Contact Support
                </Button>
              </Box>
            </>
          )}
        </Box>
      </AnimatePresence>
    </Box>
  );
};
