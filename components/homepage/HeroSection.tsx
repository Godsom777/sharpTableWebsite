'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

/* ----------------------------------------------------------------
   Mock Dashboard — Multi-branch overview
   ---------------------------------------------------------------- */

const branches = [
  {
    name: 'Lekki',
    sales: '₦385,500',
    orders: 127,
    avgOrder: '₦3,035',
    status: 'Active',
    alerts: 1,
    topItem: 'Chicken & Chips',
  },
  {
    name: 'Victoria Island',
    sales: '₦512,800',
    orders: 203,
    avgOrder: '₦2,526',
    status: 'Active',
    alerts: 0,
    topItem: 'Grilled Fish Platter',
  },
  {
    name: 'Ikeja',
    sales: '₦198,200',
    orders: 84,
    avgOrder: '₦2,360',
    status: 'Active',
    alerts: 2,
    topItem: 'Jollof Rice Special',
  },
];

/* ----------------------------------------------------------------
   Branch Card Component
   ---------------------------------------------------------------- */
const BranchCard: React.FC<{ branch: (typeof branches)[0]; index: number }> = ({ branch, index }) => (
  <motion.div
    initial={{ opacity: 1, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-0.5">
      {/* Branch header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2 h-2 rounded-full ${
              branch.alerts > 0
                ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]'
            }`}
          />
          <span className="font-body font-semibold text-sm text-white tracking-tight">
            {branch.name}
          </span>
        </div>
        <span className="text-[0.7rem] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded tracking-wider uppercase">
          {branch.status}
        </span>
      </div>

      {/* Branch sales */}
      <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter leading-none mb-3">
        {branch.sales}
      </div>

      {/* Branch metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[0.7rem] text-gray-500 font-medium">Orders</div>
          <div className="text-sm text-white font-bold">{branch.orders}</div>
        </div>
        <div>
          <div className="text-[0.7rem] text-gray-500 font-medium">Avg order</div>
          <div className="text-sm text-white font-bold">{branch.avgOrder}</div>
        </div>
      </div>

      {/* Alert indicator */}
      {branch.alerts > 0 && (
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2">
          <span className="text-[0.65rem] font-bold text-amber-500 bg-amber-500/15 px-1.5 py-0.5 rounded">
            {branch.alerts} ALERT{branch.alerts > 1 ? 'S' : ''}
          </span>
          <span className="text-[0.7rem] text-gray-500">
            {branch.alerts > 1 ? 'Stock low on 2 items' : 'Void override logged'}
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

/* ----------------------------------------------------------------
   Dashboard Content (rendered inside the 3D scroll card)
   ---------------------------------------------------------------- */
const DashboardContent: React.FC = () => (
  <div className="h-full w-full bg-[#0a0a0a] text-white p-4 md:p-6 overflow-y-auto font-body">
    {/* Dashboard header */}
    <div className="flex justify-between items-center mb-5">
      <div>
        <div className="text-[0.7rem] font-semibold text-gray-500 tracking-[0.1em] uppercase mb-1">
          Live Overview
        </div>
        <div className="text-base font-bold text-white tracking-tight">
          All Branches
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-green-500 font-semibold bg-green-500/10 px-3 py-1 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        Live
      </div>
    </div>

    {/* Total sales */}
    <div className="mb-5 pb-5 border-b border-white/[0.06]">
      <div className="text-[0.7rem] text-gray-500 font-medium mb-1">
        Total sales today
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-white tracking-[-0.04em] leading-none">
        ₦1,096,500
      </div>
      <div className="text-xs text-green-500 font-semibold mt-2">
        +18.2% vs last Friday
      </div>
    </div>

    {/* Branch cards */}
    <div className="grid gap-3">
      {branches.map((branch, i) => (
        <BranchCard key={branch.name} branch={branch} index={i} />
      ))}
    </div>
  </div>
);

/* ----------------------------------------------------------------
   Hero Section
   ---------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 1, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-16 md:pt-0"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Subtle warm gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 25%, rgba(245,158,11,0.06) 0%, transparent 65%)',
        }}
      />

      <ContainerScroll
        titleComponent={
          <div className="relative z-10 px-4">
            {/* Editorial label */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <span
                className="editorial-label mb-4 inline-block"
                style={{ color: 'var(--color-accent)' }}
              >
                For restaurants, bars, lounges and hotels
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h1
                className="display-serif text-white mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                  lineHeight: 1.05,
                }}
              >
                Every naira.
                <br />
                Every branch.
                <br />
                Every shift.
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <p
                className="text-lg md:text-xl mx-auto mb-8 max-w-2xl"
                style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                Guests order and pay from their table. Your kitchen only cooks paid orders. You see every sale, void and discount from your phone, at every branch.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex gap-3 justify-center flex-wrap mb-8">
                <motion.a
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(245,158,11,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  href="/pricing"
                  className="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-sm text-black cursor-pointer transition-colors"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                  }}
                >
                  Get started
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  href="#mechanism"
                  className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-white/20 cursor-pointer transition-colors hover:border-white/40 hover:bg-white/[0.04]"
                >
                  See how it works
                </motion.a>
              </div>
            </motion.div>
          </div>
        }
      >
        {/* Dashboard inside the 3D card */}
        <DashboardContent />
      </ContainerScroll>
    </section>
  );
};

export default HeroSection;
