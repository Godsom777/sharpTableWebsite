'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getAppSupabaseClient } from '../lib/supabase';

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

export const GoogleOnboardingPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [status, setStatus] = useState<'initializing' | 'updating_profile' | 'securing_payment' | 'error'>('initializing');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerPaystack = useCallback(async () => {
    const storedData = localStorage.getItem('sharptable_google_pending');
    if (!storedData) {
      setStatus('error');
      setErrorMessage('Missing registration data. Please return home and try again.');
      return;
    }

    const data = JSON.parse(storedData);
    const client = getAppSupabaseClient();

    if (!client || !user) return;

    setStatus('updating_profile');
    
    // Update user metadata first
    const { error: updateError } = await client.auth.updateUser({
      data: {
        business_name: data.businessName,
        country: data.country,
        plan_type: data.plan
      }
    });

    if (updateError) {
      setStatus('error');
      setErrorMessage('Failed to configure business profile: ' + updateError.message);
      return;
    }

    setStatus('securing_payment');

    // Trigger Paystack
    const customFields = [
      { display_name: 'Business Name', variable_name: 'business_name', value: data.businessName },
      { display_name: 'Plan', variable_name: 'plan_type', value: data.plan },
      { display_name: 'Country', variable_name: 'country', value: data.country },
    ];
    
    if (data.referralCode) {
      customFields.push({ display_name: 'Partner Referral', variable_name: 'referral_code', value: data.referralCode });
    }

    const subscriptionData = {
      email: user.email,
      businessName: data.businessName,
      country: data.country,
      plan: data.plan,
      planCode: data.planCode,
      referralCode: data.referralCode,
      initiatedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save pending structure exactly how PaymentCallback expects it
    localStorage.setItem('sharptable_pending_subscription', JSON.stringify(subscriptionData));

    const paystackConfig = {
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      plan: data.planCode,
      channels: ['card'],
      metadata: { custom_fields: customFields },
      callback: (response: any) => {
        // Complete the payment and jump to standard callback handler
        window.location.href = `/payment/callback?reference=${response.reference}`;
      },
      onClose: () => {
        // If they close Paystack without paying, they stay on this screen to retry.
        setStatus('securing_payment');
      },
    };

    window.PaystackPop.setup(paystackConfig).openIframe();

  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        triggerPaystack();
      } else {
        setStatus('error');
        setErrorMessage('Authentication failed or session expired. Please return home.');
      }
    }
  }, [user, isLoading, triggerPaystack]);

  if (status === 'error') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: '#ef4444', width: 24, height: 24 }} />
        </Box>
        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', mb: 1 }}>Setup Interrupted</Typography>
        <Typography sx={{ color: 'grey.500', mb: 4 }}>{errorMessage}</Typography>
        <Box component="button" onClick={() => window.location.href = '/'} sx={{ py: 1.5, px: 4, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Return Home
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Box component={motion.div} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <FontAwesomeIcon icon={status === 'securing_payment' ? faLock : faSpinner} className={status === 'securing_payment' ? '' : 'animate-spin'} style={{ color: 'white', width: 24, height: 24 }} />
        </Box>
        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', mb: 1 }}>
          {status === 'initializing' && 'Authenticating Session...'}
          {status === 'updating_profile' && 'Configuring Business Profile...'}
          {status === 'securing_payment' && 'Awaiting Payment Clearance...'}
        </Typography>
        <Typography sx={{ color: 'grey.500', textAlign: 'center', maxWidth: '400px', mb: 4 }}>
          {status === 'securing_payment' 
            ? 'Please complete the secure subscription payment popup to finalize your registration and access the dashboard.' 
            : 'Please wait while we establish your secure connection to the SharpTable network.'}
        </Typography>

        {status === 'securing_payment' && (
          <Box component="button" onClick={triggerPaystack} sx={{ py: 1.5, px: 4, borderRadius: '9999px', bgcolor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} /> Retry Secure Payment
          </Box>
        )}
      </Box>
    </Box>
  );
};
