'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  OrdersIcon,
  KitchenIcon,
  InventoryIcon,
  CustomersIcon,
  InsightsIcon,
  PaymentsIcon,
} from './integrations-3-utils/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ModuleDetail {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
}

const MODULES: Record<string, ModuleDetail> = {
  orders: {
    id: 'orders',
    name: 'WhatsApp & Orders',
    badge: '01 / Channels',
    headline: 'Every order caught, none lost.',
    description: 'Capture WhatsApp, phone, and dine-in orders into a unified queue instantly.',
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen Display',
    badge: '02 / Prep',
    headline: 'Direct to the line in seconds.',
    description: 'Auto-route tickets to stations with real-time prep times and order status.',
  },
  inventory: {
    id: 'inventory',
    name: 'Smart Inventory',
    badge: '03 / Stock',
    headline: 'Deducted as plates leave.',
    description: 'Live recipe-level stock tracking with low-ingredient and wastage alerts.',
  },
  customers: {
    id: 'customers',
    name: 'Customer CRM',
    badge: '04 / Loyalty',
    headline: 'Remember every regular.',
    description: 'Order history, automated re-engagement, and VIP tagging across branches.',
  },
  insights: {
    id: 'insights',
    name: 'Financial Insights',
    badge: '05 / Audit',
    headline: 'Real-time revenue, zero leakages.',
    description: 'Live till reconciliations, void audits, and multi-branch margin tracking.',
  },
  payments: {
    id: 'payments',
    name: 'POS & Payments',
    badge: '06 / Settlement',
    headline: 'Instant split & checkout.',
    description: 'Cards, transfers, and split bills synced to accounting without manual entry.',
  },
};

const DEFAULT_OVERVIEW: ModuleDetail = {
  id: 'overview',
  name: 'SharpTable Engine',
  badge: 'Connected Operations',
  headline: 'Five operations. One continuous flow.',
  description: 'Orders, kitchen, stock, guests, and finances connected into a single real-time system.',
};

export default function IntegrationsSection() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const currentDetail = activeModuleId ? MODULES[activeModuleId] || DEFAULT_OVERVIEW : DEFAULT_OVERVIEW;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#080808]">
      {/* Background ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Honeycomb Integration Grid */}
          <div className="relative mx-auto w-fit select-none">
            {/* Radial mask overlay for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-radial from-transparent via-transparent to-[#080808] to-85%"
            />

            {/* Row 1 (Top 2) */}
            <div className="mx-auto mb-3 flex w-fit justify-center gap-3">
              <IntegrationCard
                isActive={activeModuleId === 'orders'}
                onHover={() => setActiveModuleId('orders')}
                onLeave={() => setActiveModuleId(null)}
                title="WhatsApp & Orders"
              >
                <OrdersIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>

              <IntegrationCard
                isActive={activeModuleId === 'kitchen'}
                onHover={() => setActiveModuleId('kitchen')}
                onLeave={() => setActiveModuleId(null)}
                title="Kitchen Display"
              >
                <KitchenIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>
            </div>

            {/* Row 2 (Center 3: Left, Logo, Right) */}
            <div className="mx-auto my-3 flex w-fit items-center justify-center gap-3">
              <IntegrationCard
                isActive={activeModuleId === 'inventory'}
                onHover={() => setActiveModuleId('inventory')}
                onLeave={() => setActiveModuleId(null)}
                title="Smart Inventory"
              >
                <InventoryIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>

              {/* Center SharpTable Core Hub */}
              <div
                className={cn(
                  'relative flex size-20 md:size-24 items-center justify-center transition-all duration-300',
                  'drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]',
                  'hover:drop-shadow-[0_0_45px_rgba(245,158,11,0.5)] hover:scale-105'
                )}
              >
                <Image
                  src="/sharptable-logo.png"
                  alt="SharpTable"
                  width={96}
                  height={96}
                  className="size-20 md:size-24 object-contain animate-pulse"
                  priority
                />
              </div>

              <IntegrationCard
                isActive={activeModuleId === 'customers'}
                onHover={() => setActiveModuleId('customers')}
                onLeave={() => setActiveModuleId(null)}
                title="Customer CRM"
              >
                <CustomersIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>
            </div>

            {/* Row 3 (Bottom 2) */}
            <div className="mx-auto mt-3 flex w-fit justify-center gap-3">
              <IntegrationCard
                isActive={activeModuleId === 'insights'}
                onHover={() => setActiveModuleId('insights')}
                onLeave={() => setActiveModuleId(null)}
                title="Financial Insights"
              >
                <InsightsIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>

              <IntegrationCard
                isActive={activeModuleId === 'payments'}
                onHover={() => setActiveModuleId('payments')}
                onLeave={() => setActiveModuleId(null)}
                title="POS & Payments"
              >
                <PaymentsIcon className="size-7 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </IntegrationCard>
            </div>
          </div>

          {/* Right: Dynamic Info Panel */}
          <div className="mx-auto max-w-lg space-y-6 text-center lg:text-left">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentDetail.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="size-1.5 rounded-full bg-amber-400 animate-ping" />
                  {currentDetail.badge}
                </div>

                <h2 className="display-serif text-3xl md:text-4xl text-white tracking-tight leading-tight">
                  {currentDetail.headline}
                </h2>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  {currentDetail.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <Button
                variant="accent"
                size="default"
                className="rounded-full px-6 py-5 font-bold text-black bg-amber-500 hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
                asChild
              >
                <Link href="/pricing">Get Started</Link>
              </Button>

              <Button
                variant="outline"
                size="default"
                className="rounded-full px-6 py-5 font-semibold text-white border-white/20 hover:border-white/40 hover:bg-white/5 cursor-pointer"
                asChild
              >
                <Link href="/#mechanism">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  borderClassName,
  isActive = false,
  onHover,
  onLeave,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  title?: string;
}) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
      title={title}
      className={cn(
        'group relative flex size-20 md:size-24 cursor-pointer rounded-2xl transition-all duration-300',
        'bg-[#121212] hover:bg-[#181818]',
        isActive
          ? 'scale-105 shadow-[0_0_25px_rgba(245,158,11,0.35)] -translate-y-1'
          : 'hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        className
      )}
    >
      <div
        role="presentation"
        className={cn(
          'absolute inset-0 rounded-2xl border transition-colors duration-300',
          isActive
            ? 'border-amber-500/80 ring-1 ring-amber-500/30'
            : 'border-white/10 group-hover:border-amber-500/40',
          borderClassName
        )}
      />
      <div className="relative z-20 m-auto flex size-fit items-center justify-center">
        {children}
      </div>
    </div>
  );
};
