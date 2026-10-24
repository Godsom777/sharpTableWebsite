'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BASE_PRICES_NGN } from '../contexts/PaymentContext';

const formatNaira = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Homepage pricing block.
 * The "from" price is read from BASE_PRICES_NGN so it can never disagree with checkout.
 */
export const PricingAnchor: React.FC = () => {
  const fromPrice = formatNaira(Math.min(BASE_PRICES_NGN.lite, BASE_PRICES_NGN.pro, BASE_PRICES_NGN.enterprise));

  return (
    <section
      id="pricing-anchor"
      className="section-padding relative overflow-hidden"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,197,24,0.07) 0%, transparent 60%)' }}
      />
      <motion.div
        initial={{ opacity: 1, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <span className="editorial-label mb-4 inline-block" style={{ color: 'var(--color-accent)' }}>
          Pricing
        </span>
        <h2
          className="display-serif text-white mb-6"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.1 }}
        >
          Simple monthly plans
        </h2>
        <p className="text-white font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          Plans from {fromPrice}/month
        </p>
        <p className="mx-auto mb-10 max-w-xl text-base md:text-lg" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          One flat price, whatever your sales. No hidden fees, cancel anytime.
        </p>
        <Button asChild size="lg">
          <Link href="/pricing">See all plans</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default PricingAnchor;
