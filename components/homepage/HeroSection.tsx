'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, CheckCircle2, ChefHat, Clock3, Wifi } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';

/* Illustrative, non-numeric order feed shown inside the phone mockup. */
const orders = [
  { table: 'Table A', items: 'Jollof Rice Special, Chapman', status: 'Paid', tone: 'paid' },
  { table: 'Table C', items: 'Grilled Fish Platter', status: 'In kitchen', tone: 'kitchen' },
  { table: 'Lounge', items: 'Chicken & Chips', status: 'Paid', tone: 'paid' },
  { table: 'Table F', items: 'Void requested', status: 'Needs approval', tone: 'alert' },
] as const;

const toneClass = {
  paid: 'bg-emerald-400/15 text-emerald-300',
  kitchen: 'bg-brand-blue/15 text-brand-blue',
  alert: 'bg-brand-yellow/15 text-brand-yellow',
};

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] md:max-w-[340px]" aria-label="Product preview (demo data)" role="img">
      <div className="rounded-[2.5rem] border border-white/15 bg-navy-800 p-2.5 shadow-[0_30px_80px_-20px_rgba(142,197,255,0.35)]">
        <div className="overflow-hidden rounded-[2rem] bg-navy-950">
          <div className="flex items-center justify-between px-5 pb-2 pt-3 text-[11px] text-muted-foreground">
            <span>SharpTable</span>
            <Wifi className="size-3.5" aria-hidden />
          </div>
          <div className="px-4 pb-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Live overview</p>
                <p className="text-base font-bold text-white">All branches</p>
              </div>
              <span className="rounded-full border border-brand-yellow/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-yellow">
                Demo data
              </span>
            </div>
            <ul className="space-y-2.5">
              {orders.map((o) => (
                <li key={o.table} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{o.table}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass[o.tone]}`}>{o.status}</span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{o.items}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
              <span className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.03] py-2"><CheckCircle2 className="size-4 text-emerald-300" aria-hidden />Paid</span>
              <span className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.03] py-2"><ChefHat className="size-4 text-brand-blue" aria-hidden />Kitchen</span>
              <span className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.03] py-2"><Clock3 className="size-4 text-brand-yellow" aria-hidden />Approvals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const HeroSection: React.FC = () => (
  <section id="hero" className="relative overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 20% 10%, rgba(142,197,255,0.14), transparent 55%), radial-gradient(ellipse at 90% 60%, rgba(245,197,24,0.10), transparent 50%)' }}
    />
    <div className="container relative grid items-center gap-12 py-12 md:grid-cols-2 md:py-24">
      <div className="text-center md:text-left">
        <Reveal>
          <span className="editorial-label mb-4 inline-block !text-brand-yellow">For restaurants, bars, lounges and hotels</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display-serif mb-5 text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Every naira.
            <br />
            Every branch.
            <br />
            <span className="text-brand-yellow">Every shift.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0 md:text-xl">
            Guests order and pay from their table. Your kitchen only cooks paid orders. You see every sale, void and discount from your phone, at every branch.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild size="lg">
              <Link href="/pricing">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white">
              <a href="#mechanism">
                See how it works <ArrowDown aria-hidden />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <PhoneMockup />
      </Reveal>
    </div>
  </section>
);

export default HeroSection;
