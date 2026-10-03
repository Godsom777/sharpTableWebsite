'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Typography } from '@mui/material';

/** Scroll distance owned by each screen while the tablet is pinned. */
const CHAPTER_VH = 160;

const pressable =
  'bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-left w-full transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-0.5 active:border-amber-400/70 active:bg-white/[0.08] active:scale-[0.99]';

const branches = [
  { name: 'Victoria Island', week: '₦4,200,000', lead: true },
  { name: 'Lekki', week: '₦2,800,000', lead: false },
  { name: 'Ogun', week: '₦1,600,000', lead: false },
];

const captions = [
  'The order lands in a chat they already have.',
  "The marshal sees the bill while it's still queued.",
  'Victoria Island, Lekki and Ogun, on one screen.',
];

const BranchRows: React.FC = () => (
  <div className="grid gap-2">
    {branches.map((branch) => (
      <button
        key={branch.name}
        type="button"
        className={`${pressable} flex items-start gap-2.5 ${branch.lead ? 'border-amber-400/40 bg-white/[0.05]' : ''}`}
      >
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="block font-semibold text-sm tracking-tight text-white">{branch.name}</span>
            <span className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-white/60">Active</span>
              {branch.lead ? (
                <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                  Highest sales
                </span>
              ) : null}
            </span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-sm font-semibold tabular-nums text-white">{branch.week}</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-white/45">this week</span>
          </span>
        </span>
      </button>
    ))}
  </div>
);

function WhatsAppOrder() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
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
}

function MarshalScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] p-5 text-white md:p-8">
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
}

function ManagerWide() {
  return (
    <div className="flex h-full flex-col justify-center p-4 md:p-6">
      <div className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gray-500">
        Manager
      </div>
      <BranchRows />
    </div>
  );
}

const screenBodies = [WhatsAppOrder, MarshalScreen, ManagerWide];

function TabletFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl">
      <div className="relative h-[min(68vh,560px)] overflow-hidden rounded-2xl bg-[#0a0a0a]">
        {children}
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 text-center md:pt-24">
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
      <Typography
        sx={{
          fontSize: { xs: 'var(--text-base)', md: 'var(--text-lg)' },
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
        }}
      >
        SharpTable makes sure the restaurant knows what to do next.
      </Typography>
    </div>
  );
}

function StackedScreens() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-16 px-4 py-12">
      {screenBodies.map((Screen, index) => (
        <div key={captions[index]}>
          <p className="mb-4 text-center text-xl leading-snug text-white md:text-left md:text-2xl">
            {captions[index]}
          </p>
          <TabletFrame>
            <Screen />
          </TabletFrame>
        </div>
      ))}
    </div>
  );
}

function PinnedScreens() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Each chapter is a long hold, then a short push in the last 30%.
  // The first pixels of a chapter keep the current screen in place.
  const chapter = 1 / 3;
  const holdEnd0 = 0.7 * chapter;
  const slideEnd0 = chapter;
  const holdEnd1 = chapter + 0.7 * chapter;
  const slideEnd1 = 2 * chapter;

  const stackY = useTransform(
    scrollYProgress,
    [0, holdEnd0, slideEnd0, holdEnd1, slideEnd1, 1],
    ['0%', '0%', '-100%', '-100%', '-200%', '-200%']
  );

  // Parallax inside the glass so the hold is not a frozen frame. Clipped per screen,
  // so the next UI does not peek in until the push.
  const drift0 = useTransform(scrollYProgress, [0, holdEnd0, 1], [0, -40, -40]);
  const drift1 = useTransform(scrollYProgress, [0, slideEnd0, holdEnd1, 1], [0, 0, -40, -40]);
  const drift2 = useTransform(scrollYProgress, [0, slideEnd1, 1], [0, 0, -40]);
  const drifts = [drift0, drift1, drift2];
  const shells = ['bg-[#efeae2]', 'bg-[#0a0a0a]', 'bg-[#0a0a0a]'];

  return (
    <div ref={trackRef} style={{ height: `calc(${CHAPTER_VH * 3}vh + 100vh)` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-8 px-6 lg:gap-14">
          <div className="relative h-40 overflow-hidden">
            <motion.div style={{ y: stackY }} className="absolute inset-0">
              {captions.map((caption, index) => (
                <p
                  key={caption}
                  className="absolute inset-x-0 flex h-full items-center text-2xl leading-snug text-white lg:text-3xl"
                  style={{ top: `${index * 100}%` }}
                >
                  {caption}
                </p>
              ))}
            </motion.div>
          </div>
          <TabletFrame>
            <motion.div style={{ y: stackY }} className="absolute inset-0">
              {screenBodies.map((Screen, index) => (
                <div
                  key={captions[index]}
                  className={`absolute inset-x-0 h-full overflow-hidden ${shells[index]}`}
                  style={{ top: `${index * 100}%` }}
                >
                  <motion.div className="h-full" style={{ y: drifts[index] }}>
                    <Screen />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </TabletFrame>
        </div>
      </div>
    </div>
  );
}

export const WhatsAppDemoSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="whatsapp-demo"
      className="whatsapp-pin-section relative overflow-x-hidden"
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
      <style>{`
        .whatsapp-pin-track { display: none; }
        .whatsapp-pin-stack { display: block; }
        @media (min-width: 768px) {
          .whatsapp-pin-track { display: block; }
          .whatsapp-pin-stack { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-pin-track { display: none !important; }
          .whatsapp-pin-stack { display: block !important; }
        }
      `}</style>
      <Heading />
      <div className="whatsapp-pin-track">
        <PinnedScreens />
      </div>
      <div className="whatsapp-pin-stack">
        <StackedScreens />
      </div>
    </Box>
  );
};

export default WhatsAppDemoSection;
