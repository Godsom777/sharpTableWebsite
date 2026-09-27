'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';

// The sign-up/payment modal is closed on first paint, so load its code after hydration
// instead of shipping it in every page's first-load bundle. Behaviour is unchanged.
const PaymentModal = dynamic(
  () => import('@/components/PaymentModal').then((m) => m.PaymentModal),
  { ssr: false }
);

export default function SiteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PaymentProvider>
        {/* reducedMotion="user": visitors with prefers-reduced-motion get no movement animations */}
        <MotionConfig reducedMotion="user">
        <Box sx={{
          bgcolor: 'black',
          minHeight: '100vh',
          color: 'white',
          '& ::selection': { bgcolor: 'rgba(245, 158, 11, 0.3)' }
        }}>
          <NavBar />
          <Box component="main" sx={{ position: 'relative', zIndex: 1, bgcolor: 'black' }}>
            {children}
          </Box>
          <Footer />
          <PaymentModal />
        </Box>
        </MotionConfig>
      </PaymentProvider>
    </AuthProvider>
  );
}
