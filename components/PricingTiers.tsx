'use client';

// Growth card badge. Owner hasn't picked yet: 'Best value', 'Most popular', or '' (no badge).
const GROWTH_BADGE = 'Best value';

import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { usePayment, PlanType, BillingCycle } from '../contexts/PaymentContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

const CONTACT_HREF = 'mailto:info@sharptable.com.ng';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

// Display prices for the by-branch model.
// Checkout uses the legacy plan keys ('lite' / 'pro' / 'enterprise' and '-yearly' variants) with the Paystack plan
// codes and amounts in contexts/PaymentContext.tsx (Solo -> lite, Growth -> pro, Group -> enterprise); amounts match.
const PLANS: {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  badge: string;
  checkoutKey: { monthly: PlanType; yearly: PlanType };
}[] = [
  { name: 'Solo', description: 'For one branch.', monthly: 50_000, yearly: 500_000, badge: '', checkoutKey: { monthly: 'lite', yearly: 'lite-yearly' } },
  { name: 'Growth', description: 'For 2 to 5 branches.', monthly: 99_999, yearly: 999_990, badge: GROWTH_BADGE, checkoutKey: { monthly: 'pro', yearly: 'pro-yearly' } },
  { name: 'Group', description: 'For 6 to 10 branches.', monthly: 199_999, yearly: 1_999_990, badge: '', checkoutKey: { monthly: 'enterprise', yearly: 'enterprise-yearly' } },
];

const INCLUDED = [
  'QR ordering and digital menus',
  'Live kitchen display',
  'Admin app: sales, voids and discounts across every branch, with alerts',
  'Audit log: every void, discount and price edit, with staff name, table and time',
  'WhatsApp ordering, paid orders straight to the kitchen',
  'Staff roles and permissions',
  'Inventory and low-stock alerts',
  'Table payments and split bills',
];

const card = 'flex min-w-0 flex-col rounded-3xl border border-white/10 bg-navy-900 p-6 md:p-7';
const outlineBtn = 'w-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white sm:w-full';

const PricingTiers: React.FC = () => {
  const { openPaymentModal } = usePayment();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const yearly = billingCycle === 'yearly';

  return (
    <section id="pricing" className="relative overflow-hidden bg-navy-950 py-16 md:py-28">
      <div className="container relative">
        <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="sr-only">Plans</h2>
            <p className="text-base text-muted-foreground md:text-lg">Every plan includes everything. You only pick the size.</p>
          </div>
          <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as BillingCycle)} aria-label="Billing period">
            <TabsList className="h-auto w-full rounded-full bg-navy-800 p-1 md:w-auto">
              <TabsTrigger value="monthly" className="min-h-11 flex-1 rounded-full px-5 text-sm text-muted-foreground data-[state=active]:bg-brand-yellow data-[state=active]:text-navy-950">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="min-h-11 flex-1 gap-2 rounded-full px-5 text-sm text-muted-foreground data-[state=active]:bg-brand-yellow data-[state=active]:text-navy-950">
                Yearly
                <span className="whitespace-nowrap rounded-full bg-brand-blue/20 px-2 py-0.5 text-[11px] font-bold text-brand-blue-soft">2 months free</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-4 flex md:justify-end">
          <Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal py-2 text-center leading-snug border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white md:w-auto">
            <a href="/account"><Lock aria-hidden />Existing customer? Log in to manage your plan</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, index) => {
            const highlighted = Boolean(plan.badge);
            return (
              <Reveal key={plan.name} delay={index * 0.05} className={cn(card, highlighted && 'border-brand-yellow')}>
                <div className="mb-6 flex min-h-7 items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  {plan.badge && <span className="whitespace-nowrap rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-extrabold text-brand-yellow">{plan.badge}</span>}
                </div>
                <p className="mb-1 break-words text-4xl font-black leading-none tracking-tight text-white">
                  {formatPrice(yearly ? plan.yearly : plan.monthly)}
                  <span className="ml-1 text-base font-medium text-muted-foreground">{yearly ? '/year' : '/month'}</span>
                </p>
                <p className="mb-8 text-[0.95rem] text-muted-foreground">{plan.description}</p>
                {/* TODO(Back-end Developer): checkout wiring unchanged; key still maps to legacy plan code. */}
                <Button
                  size="lg"
                  variant={highlighted ? 'default' : 'outline'}
                  className={cn('mt-auto w-full sm:w-full', !highlighted && outlineBtn)}
                  onClick={() => openPaymentModal(yearly ? plan.checkoutKey.yearly : plan.checkoutKey.monthly)}
                >
                  Get started
                </Button>
              </Reveal>
            );
          })}
          <Reveal delay={0.15} className={card}>
            <h3 className="mb-6 flex min-h-7 items-center text-lg font-bold text-white">11+ branches</h3>
            <p className="mb-8 text-[0.95rem] text-muted-foreground">Custom pricing for larger groups.</p>
            <Button asChild size="lg" variant="outline" className={cn('mt-auto', outlineBtn)}>
              <a href={CONTACT_HREF}>Talk to us</a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-navy-900/60 p-6 md:p-10">
          <h3 className="mb-5 text-lg font-bold text-white">Included in every plan</h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex min-w-0 items-start gap-3 text-[0.95rem] text-white/85">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15"><Check className="size-3 text-brand-yellow" aria-hidden /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">Coming soon: listing in the SharpTable customer app.</p>
        </div>

        <div className={cn(card, 'mt-4 gap-6 md:flex-row md:items-center')}>
          <div className="min-w-0 flex-1">
            <h3 className="display-serif mb-3 text-3xl text-white md:text-4xl">Hotels</h3>
            <p className="mb-2 text-lg font-bold text-white">₦3,000 per room per month, minimum ₦75,000.</p>
            <p className="mb-2 text-[0.95rem] text-muted-foreground">Your restaurant, bar and other on-property outlets are included, plus the hotel tools.</p>
            <p className="text-sm text-muted-foreground">Example: 40 rooms = ₦120,000/month.</p>
          </div>
          <Button asChild size="lg" variant="outline" className={cn(outlineBtn, 'md:w-56')}>
            <a href={CONTACT_HREF}>Get a quote</a>
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">No setup fees. Cancel anytime. All prices in naira.</p>
      </div>
    </section>
  );
};

export { PricingTiers };
