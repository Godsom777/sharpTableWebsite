'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Banknote, CalendarCheck, Calculator, Clock, Gift, Handshake, LineChart, Link2, Repeat, ShieldCheck, User, Wallet,
} from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const steps = [
  { icon: User, title: 'Apply', desc: 'Secure your partner node instantly without arbitrary waiting periods.' },
  { icon: Link2, title: 'Get Your Link', desc: 'Acquire your traceable link to track performance securely.' },
  { icon: Handshake, title: 'They Subscribe', desc: 'When franchises lock down via your link, the ledger attributes them to you.' },
  { icon: Banknote, title: 'You Get Paid', desc: 'Earn aggressive upfront and recurring capital for securing operations.' },
];

const commissions = [
  { rate: '50%', label: 'Upfront Capital', desc: "Monthly plans: 50% of the first month's payment.", icon: Gift },
  { rate: '20%', label: 'Recurring Royalty', desc: 'Monthly plans: 20% recurring for 6 consecutive months. Yearly plans earn 30% flat upfront immediately.', icon: Repeat },
];

const earnings = [
  { plan: 'Solo · Monthly', price: '₦50,000/mo', upfront: '₦25,000', recurring: '₦10,000 × 6', total: '₦85,000' },
  { plan: 'Growth · Monthly', price: '₦99,999/mo', upfront: '₦50,000', recurring: '₦20,000 × 6', total: '₦170,000' },
  { plan: 'Group · Monthly', price: '₦199,999/mo', upfront: '₦100,000', recurring: '₦40,000 × 6', total: '₦340,000' },
  { plan: 'Group · Yearly', price: '₦1,999,990/yr', upfront: '₦600,000', recurring: '-', total: '₦600,000' },
];

const faqs = [
  { q: 'How much can I earn?', a: 'There is zero ceiling. 10 Group Monthly referrals nets you ₦3.4 million over 6 months.', icon: Wallet },
  { q: 'Yearly Plan Impact?', a: 'Yearly subscriptions execute an immediate 30% flush payment with no recurring delay. Sell a Group Yearly and secure about ₦600,000 at once.', icon: CalendarCheck },
  { q: 'Payout Logistics?', a: 'Funds clear within 7 business days following every successful client charge.', icon: Clock },
  { q: 'Dashboard Tracking?', a: 'Full real-time visibility over your converted venues and inbound streams.', icon: LineChart },
  { q: 'Are there thresholds?', a: 'No minimums. Earn immediately on execution.', icon: Calculator },
  { q: 'Is technical capacity required?', a: 'No. Just operational influence over restaurant chains.', icon: User },
  { q: 'Cancellation Policy?', a: 'You keep all acquired upfront capital. No clawbacks on what you successfully hunt.', icon: ShieldCheck },
];

const h2 = 'display-serif mb-3 text-4xl leading-[1.05] text-white md:text-6xl';
const lead = 'mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground';

export const PartnershipInfo: React.FC = () => (
  <section className="relative bg-navy-950">
    <div className="container max-w-5xl py-14 md:py-24">
      <Reveal className="mb-10 text-center">
        <h2 className={h2}>Capital Protocol</h2>
        <p className={lead}>Expand the network. Capitalize on the operational gap.</p>
      </Reveal>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05} className="relative rounded-3xl border border-white/10 bg-navy-900 p-6">
            <span aria-hidden className="absolute right-5 top-4 text-3xl font-black text-white/10">{i + 1}</span>
            <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow"><step.icon className="size-5" aria-hidden /></span>
            <h3 className="mb-1 text-lg font-extrabold text-white">{step.title}</h3>
            <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{step.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>

    <div className="border-y border-white/10 bg-navy-900/60">
      <div className="container max-w-5xl py-14 md:py-24">
        <Reveal className="mb-10 text-center">
          <h2 className={h2}>The Returns</h2>
          <p className={lead}>Aggressive compounding on recurring monthly execution, and heavy flat-fee payouts for yearly commitments.</p>
        </Reveal>
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {commissions.map((c) => (
            <Reveal key={c.label} className="rounded-3xl border border-white/10 bg-navy-900 p-7 text-center md:p-10">
              <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue"><c.icon className="size-6" aria-hidden /></span>
              <p className="mb-1 text-6xl font-black leading-none text-brand-yellow">{c.rate}</p>
              <h3 className="mb-2 text-xl font-extrabold text-white">{c.label}</h3>
              <p className="text-muted-foreground">{c.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="overflow-hidden rounded-3xl border border-white/10">
          <h3 className="flex items-center gap-3 bg-navy-900 px-5 py-4 text-lg font-extrabold text-white md:px-8">
            <LineChart className="size-5 text-brand-yellow" aria-hidden /> Revenue Projections
          </h3>
          {/* Phones: swipeable cards */}
          <div className="bg-navy-950 py-5 md:hidden">
            <Carousel opts={{ align: 'start' }} aria-label="Revenue projections">
              <CarouselContent className="-ml-3 px-5">
                {earnings.map((e) => (
                  <CarouselItem key={e.plan} className="basis-[85%] pl-3">
                    <dl className="h-full rounded-2xl border border-white/10 bg-navy-900 p-5 text-sm">
                      <dt className="sr-only">Plan Format</dt>
                      <dd className="mb-4 text-base font-bold text-white">{e.plan}</dd>
                      {([['Client Price', e.price], ['Upfront', e.upfront], ['Recurring', e.recurring]] as const).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-t border-white/10 py-2">
                          <dt className="text-muted-foreground">{k}</dt><dd className="font-semibold text-white/90">{v}</dd>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-white/10 pt-3">
                        <dt className="font-bold text-white">Total Return</dt><dd className="text-lg font-black text-brand-yellow">{e.total}</dd>
                      </div>
                    </dl>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <p className="mt-3 px-5 text-xs text-muted-foreground">Swipe to see each plan.</p>
          </div>
          {/* Tablet/desktop: table */}
          <div className="hidden bg-navy-950 md:block">
            <table className="w-full border-collapse text-[0.95rem]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-8 py-4 text-left font-bold">Plan Format</th>
                  <th className="px-6 py-4 text-right font-bold">Client Price</th>
                  <th className="px-6 py-4 text-right font-bold">Upfront</th>
                  <th className="px-6 py-4 text-right font-bold">Recurring</th>
                  <th className="px-8 py-4 text-right font-extrabold text-white">Total Return</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.plan} className="border-b border-white/10 last:border-0 hover:bg-navy-900">
                    <td className="px-8 py-4 font-semibold text-white">{e.plan}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{e.price}</td>
                    <td className="px-6 py-4 text-right font-semibold text-white/85">{e.upfront}</td>
                    <td className="px-6 py-4 text-right font-semibold text-white/85">{e.recurring}</td>
                    <td className="px-8 py-4 text-right font-black text-brand-yellow">{e.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </div>

    <div className="container max-w-3xl py-14 text-center md:py-24">
      <Reveal>
        <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow"><Handshake className="size-8" aria-hidden /></span>
        <h2 className={h2}>Infiltrate the market.</h2>
        <p className={`${lead} mb-8`}>The process takes two minutes. Secure massive multi-branch clients and secure the upside.</p>
        <Button asChild size="lg">
          <Link href="/partnership/apply">Initiate Application <ArrowRight aria-hidden /></Link>
        </Button>
      </Reveal>
    </div>

    <div className="border-t border-white/10">
      <div className="container max-w-3xl py-14 md:py-24">
        <h2 className="mb-8 text-center text-2xl font-black text-white md:text-3xl">Directives</h2>
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="rounded-2xl border border-white/10 bg-navy-900 px-4">
              <AccordionTrigger className="min-h-14 gap-3 text-left text-[0.95rem] font-semibold text-white hover:no-underline">
                <span className="flex flex-1 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10"><f.icon className="size-4" aria-hidden /></span>
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-12 text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
