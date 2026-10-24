'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { Nav } from '@/components/apple/Nav';
import { Foot } from '@/components/apple/Foot';
import { Motion } from '@/components/apple/Motion';
import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';
import '@/components/apple/apple.css';

// The sign-up/payment modal is closed on first paint, so load its code after hydration.
const PaymentModal = dynamic(
  () => import('@/components/PaymentModal').then((m) => m.PaymentModal),
  { ssr: false }
);

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PaymentProvider>
        <MotionConfig reducedMotion="user">
          <div className="ap">
            <Nav />
            <main>{children}</main>
            <Foot />
            <Motion />
          </div>
          <PaymentModal />
        </MotionConfig>
      </PaymentProvider>
    </AuthProvider>
  );
}
