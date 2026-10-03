'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { ContainerScroll, useContainerScrollProgress } from '@/components/ui/container-scroll-animation';

const pressable =
  'bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-left w-full transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-0.5 active:border-amber-400/70 active:bg-white/[0.08] active:scale-[0.99]';

function stepFromProgress(value: number) {
  if (value >= 2 / 3) return 2;
  if (value >= 1 / 3) return 1;
  return 0;
}

const branches = [
  { line: 'Victoria Island · Active', dot: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' },
  { line: 'Lekki · Active', dot: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' },
  { line: 'Ogun · Active', dot: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' },
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
      <div className="flex h-full min-h-[22rem] flex-col overflow-hidden">
        <div className="flex items-center bg-[#075E54] px-5 py-4 text-white">
          <div className="text-xl font-semibold tracking-tight">SharpTable</div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-3 bg-[#efeae2] p-4 md:p-6">
          <div className="max-w-[85%] self-end rounded-lg bg-[#d9fdd3] px-4 py-3 text-lg leading-snug text-[#111b21]">
            Beans and Plantain
          </div>
          <div className="max-w-[92%] self-start rounded-lg bg-white px-4 py-3 text-lg leading-snug text-[#111b21] shadow-sm">
            <div className="text-xl font-semibold">Table T-30</div>
            <div className="mt-1">Beans and Plantain</div>
            <div className="mt-1 text-xl font-semibold">₦7,000</div>
            <div className="mt-1 text-base text-[#667781]">Queued</div>
          </div>
        </div>
      </div>
    );
  },
  function MarshalScreen() {
    return (
      <div className="flex h-full min-h-[22rem] flex-col bg-[#0a0a0a] p-5 text-white md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Marshall</h3>
          <span className="text-base font-semibold text-green-500">Live</span>
        </div>
        <div className="mb-3 text-base font-semibold uppercase tracking-[0.08em] text-gray-400">
          Approved Open Bills
        </div>
        <button type="button" className={pressable}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-bold">T-30</div>
              <div className="mt-0.5 text-base text-white/70">Guest</div>
            </div>
            <span className="rounded bg-amber-500 px-2 py-1 text-sm font-bold tracking-wider text-black">
              QUEUED
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between text-lg">
            <span>Beans and Plantain</span>
            <span className="font-semibold">₦7,000</span>
          </div>
        </button>
        <button
          type="button"
          className="mt-4 inline-flex items-center rounded-full bg-amber-500 px-5 py-2.5 text-base font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 active:scale-[0.98] active:bg-amber-300"
        >
          Edit Order Items
        </button>
      </div>
    );
  },
  function ManagerWide() {
    return (
      <div className="mx-auto w-full max-w-xl p-4 md:p-6">
        <div className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gray-500">
          Manager
        </div>
        <BranchRows />
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
    <div className="h-full w-full overflow-hidden bg-[#0a0a0a] font-body text-white">
      <Screen />
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
