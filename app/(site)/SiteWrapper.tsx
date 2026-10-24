'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';

// The sign-up/payment modal is closed on first paint, so load its code after hydration.
const PaymentModal = dynamic(
  () => import('@/components/PaymentModal').then((m) => m.PaymentModal),
  { ssr: false }
);

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PaymentProvider>
        {/* reducedMotion="user": visitors with prefers-reduced-motion get no movement animations */}
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen overflow-x-clip bg-navy-950 text-white selection:bg-brand-yellow/30">
            <NavBar />
            <main className="relative z-[1] bg-navy-950">{children}</main>
            <Footer />
            <PaymentModal />
          </div>
        </MotionConfig>
      </PaymentProvider>
    </AuthProvider>
  );
}
