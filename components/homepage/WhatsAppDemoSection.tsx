'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { ContainerScroll, useContainerScrollProgress } from '@/components/ui/container-scroll-animation';

const pressable =
  'bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-left w-full transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-0.5 active:border-amber-400/70 active:bg-white/[0.08] active:scale-[0.99]';

function stepFromProgress(value: number) {
  if (value >= 0.75) return 3;
  if (value >= 0.5) return 2;
  if (value >= 0.25) return 1;
  return 0;
}

const branches = [
  { line: 'Old English · Open', dot: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' },
  { line: 'Site 2 · Quiet', dot: 'bg-white/40' },
  { line: 'Site 3 · Busy', dot: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]' },
];

const BranchRows: React.FC = () => (
  <div className="grid gap-2">
    {branches.map((branch) => (
      <button key={branch.line} type="button" className={`${pressable} flex items-center gap-2.5`}>
        <span className={`w-2 h-2 rounded-full shrink-0 ${branch.dot}`} />
        <span className="font-semibold text-sm text-white tracking-tight">{branch.line}</span>
      </button>
    ))}
  </div>
);

const screens = [
  function WhatsAppOrder() {
    return (
      <div>
        <div className="text-[0.7rem] font-semibold text-gray-500 tracking-[0.1em] uppercase mb-3">
          WhatsApp order
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <div className="flex justify-between items-center gap-3 mb-3">
            <span className="font-semibold text-sm text-white tracking-tight">1 order</span>
            <span className="text-[0.7rem] font-bold text-black bg-amber-500 px-2 py-0.5 rounded tracking-wider uppercase">
              Paid
            </span>
          </div>
          <div className="grid gap-2">
            <button type="button" className={pressable}>
              <span className="flex justify-between text-sm text-white">
                <span>Jollof rice</span>
                <span className="text-gray-400">1</span>
              </span>
            </button>
            <button type="button" className={pressable}>
              <span className="flex justify-between text-sm text-white">
                <span>Grilled chicken</span>
                <span className="text-gray-400">1</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  },
  function MarshalScreen() {
    return (
      <div>
        <div className="text-[0.7rem] font-semibold text-gray-500 tracking-[0.1em] uppercase mb-3">
          Marshal
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <div className="text-base font-bold text-white tracking-tight mb-1">Table 4</div>
          <p className="text-sm text-white/80 mb-4">1 jollof rice, 1 grilled chicken</p>
          <button
            type="button"
            className="inline-flex items-center px-5 py-2 rounded-full font-bold text-sm text-black bg-amber-500 transition-all duration-300 hover:bg-amber-400 hover:-translate-y-0.5 active:bg-amber-300 active:scale-[0.98]"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  },
  function ManagerWide() {
    return (
      <div>
        <div className="text-[0.7rem] font-semibold text-gray-500 tracking-[0.1em] uppercase mb-3">
          Manager
        </div>
        <BranchRows />
      </div>
    );
  },
  function ManagerPhone() {
    return (
      <div>
        <div className="text-[0.7rem] font-semibold text-gray-500 tracking-[0.1em] uppercase mb-3">
          Manager
        </div>
        <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-white/15 bg-black p-4 shadow-[0_0_0_8px_rgba(255,255,255,0.04)]">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/15" />
          <BranchRows />
        </div>
      </div>
    );
  },
];

const TabletScreens: React.FC = () => {
  const progress = useContainerScrollProgress();
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(stepFromProgress(progress.get()));
  }, [progress]);

  useMotionValueEvent(progress, 'change', (value) => {
    const next = stepFromProgress(value);
    setStep((current) => (current === next ? current : next));
  });

  const Screen = screens[step];

  return (
    <div className="h-full w-full bg-[#0a0a0a] text-white p-4 md:p-6 overflow-y-auto font-body flex items-center">
      <div className="w-full max-w-xl mx-auto">
        <Screen />
      </div>
    </div>
  );
};

export const WhatsAppDemoSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="whatsapp-demo"
      className="relative overflow-hidden"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 30% 60%, rgba(37,211,102,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 px-4 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 1, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography
                className="display-serif"
                sx={{
                  fontSize: { xs: 'var(--text-2xl)', md: 'var(--text-3xl)', lg: 'var(--text-4xl)' },
                  color: 'white',
                  mb: 2.5,
                }}
              >
                Your customers already know how to reach you.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 'var(--text-base)', md: 'var(--text-lg)' },
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                SharpTable makes sure the restaurant knows what to do next.
              </Typography>
            </motion.div>
          </div>
        }
      >
        <TabletScreens />
      </ContainerScroll>
    </Box>
  );
};

export default WhatsAppDemoSection;
