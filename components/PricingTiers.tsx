import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faXmark, 
  faStar, 
  faCrown, 
  faRocket, 
  faBuilding, 
  faQrcode, 
  faCartShopping, 
  faGauge, 
  faRobot, 
  faCreditCard, 
  faFileLines, 
  faReceipt, 
  faShield, 
  faCode, 
  faUsers, 
  faClock, 
  faTableCells,
  faArrowRight,
  faInfinity,
  faBolt,
  faUtensils,
  faChartPie,
  faClockRotateLeft,
  faLocationDot,
  faChartLine,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { usePayment, PlanType } from '../contexts/PaymentContext';

interface Feature {
  key: string;
  label: string;
  icon: IconDefinition;
  pro: boolean | string;
  enterprise: boolean | string;
}

const features: Feature[] = [
  // Command-first (enterprise-only)
  { key: 'multi_location_control', label: 'Multi-location Control', icon: faLocationDot, pro: false, enterprise: true },
  { key: 'unified_view', label: 'Unified View Across Branches', icon: faChartPie, pro: false, enterprise: true },
  { key: 'advanced_analytics', label: 'Advanced Analytics', icon: faChartLine, pro: false, enterprise: true },

  // Most "Control"-aligned first
  { key: 'audit_trail', label: 'Audit Trail', icon: faLock, pro: true, enterprise: true },

  // Pro (Control)
  { key: 'super_admin', label: 'Admin', icon: faShield, pro: true, enterprise: true },
  { key: 'marshall_dashboard', label: 'Marshall Dashboard', icon: faGauge, pro: true, enterprise: true },
  { key: 'chef_dashboard', label: 'Chef/KDS Dashboard', icon: faUtensils, pro: true, enterprise: true },
  { key: 'staff_management', label: 'Staff Management', icon: faUsers, pro: true, enterprise: true },
  { key: 'daily_summary', label: 'Daily Summary', icon: faFileLines, pro: true, enterprise: true },

  // Enterprise-only (Command)
  { key: 'feature_overrides', label: 'Feature Overrides', icon: faCode, pro: false, enterprise: true },
  { key: 'multi_admin_pos', label: 'Multi Admin POS', icon: faUsers, pro: false, enterprise: true },
];

interface Limit {
  key: string;
  label: string;
  icon: IconDefinition;
  pro: string;
  enterprise: string;
}

const limits: Limit[] = [
  { key: 'max_tables', label: 'Max Tables', icon: faTableCells, pro: '50', enterprise: 'Unlimited' },
  { key: 'max_locations', label: 'Multi-location', icon: faLocationDot, pro: '1', enterprise: 'Unlimited' },
  { key: 'max_staff', label: 'Max Staff', icon: faUsers, pro: '15', enterprise: 'Unlimited' },
  { key: 'order_history_days', label: 'Order History', icon: faClock, pro: '90 days', enterprise: 'Unlimited' },
];

interface TierCardProps {
  name: string;
  icon: IconDefinition;
  description: string;
  price: string;
  period: string;
  tierKey: 'pro' | 'enterprise';
  popular?: boolean;
  accentColor: string;
  delay: number;
  priceNote?: React.ReactNode;
  onGetStarted: (plan: PlanType) => void;
}

// Memoized Feature Row for performance
const FeatureRow = memo<{ feature: Feature; tierKey: 'pro' | 'enterprise'; delay: number; idx: number }>(
  ({ feature, tierKey, delay, idx }) => {
    const value = feature[tierKey];
    const isIncluded = value === true;

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1 + idx * 0.03 }}
        className={`flex items-center gap-3 ${isIncluded ? 'text-gray-300' : 'text-gray-600'}`}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isIncluded ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-gray-600'}`}>
          <FontAwesomeIcon icon={isIncluded ? faCheck : faXmark} className="w-3 h-3" />
        </div>
        <span className="flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={feature.icon} className="w-4 h-4" />
          {feature.label}
        </span>
      </motion.div>
    );
  }
);

// Memoized Limit Row for performance
const LimitRow = memo<{ limit: Limit; tierKey: 'pro' | 'enterprise'; delay: number; idx: number }>(
  ({ limit, tierKey, delay, idx }) => {
    const value = limit[tierKey];
    const isInfinite = value === '∞';

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 + idx * 0.05 }}
        className="flex items-center justify-between text-sm"
      >
        <span className="flex items-center gap-2 text-gray-400">
          <FontAwesomeIcon icon={limit.icon} className="w-4 h-4" />
          {limit.label}
        </span>
        <span className={`font-semibold ${isInfinite ? 'text-amber-400' : 'text-white'}`}>
          {isInfinite ? (
            <FontAwesomeIcon icon={faInfinity} className="w-4 h-4" />
          ) : value}
        </span>
      </motion.div>
    );
  }
);

const TierCard = memo<TierCardProps>(({ 
  name, 
  icon, 
  description, 
  price, 
  period, 
  tierKey, 
  popular, 
  accentColor,
  delay,
  priceNote,
  onGetStarted
}) => {
  const visibleFeatures = useMemo(
    () => features.filter((f) => f[tierKey] !== false),
    [tierKey]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative group ${popular ? 'md:-mt-4 md:mb-4' : ''}`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/30">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Card */}
      <div className={`relative h-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-900/80 border ${popular ? 'border-amber-500/50' : 'border-zinc-800'} hover:border-amber-500/40 rounded-3xl p-8 transition-all duration-500 overflow-hidden`}>
        {/* Shine Effect */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-amber-500/50 transition-all duration-500" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
              <FontAwesomeIcon icon={icon} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-zinc-800">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{price}</span>
              <span className="text-gray-500">{period}</span>
            </div>
            {priceNote && (
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                {priceNote}
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Features</p>
            {visibleFeatures.map((feature, idx) => (
              <FeatureRow 
                key={feature.key} 
                feature={feature} 
                tierKey={tierKey} 
                delay={delay} 
                idx={idx} 
              />
            ))}
          </div>

          {/* Limits */}
          <div className="space-y-3 mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Limits</p>
            {limits.map((limit, idx) => (
              <LimitRow 
                key={limit.key} 
                limit={limit} 
                tierKey={tierKey} 
                delay={delay} 
                idx={idx} 
              />
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onGetStarted(tierKey)}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
              popular 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600'
            }`}
          >
            Get Started
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export const PricingTiers: React.FC = () => {
  const { openPaymentModal } = usePayment();

  // Memoize tier configurations to prevent recreation
  const tierConfigs = useMemo(
    () => [
      {
        name: "Control",
        icon: faCrown,
        description: "Keep operations steady, clean, and predictable — with the oversight you need.",
        price: "₦99,999",
        period: "/month",
        tierKey: "pro" as const,
        popular: true,
        accentColor: "from-amber-500 to-orange-500",
        delay: 0,
        priceNote: (
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Monthly</span>
              <span className="text-white font-semibold">₦99,999</span>
            </div>
            <div className="text-xs text-gray-500">Built for clarity, consistency, and day-to-day control.</div>
          </div>
        )
      },
      {
        name: "Command",
        icon: faBuilding,
        description: "Lead across locations with confidence — set the pace and keep every branch aligned.",
        price: "₦199,999",
        period: "/month",
        tierKey: "enterprise" as const,
        accentColor: "from-purple-500 to-pink-500",
        delay: 0.1,
        priceNote: (
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Enterprise</span>
              <span className="text-white font-semibold">₦199,999<span className="text-gray-500 font-normal">/mo</span></span>
            </div>
            <div className="text-xs text-gray-500">Unlimited locations, tables, staff, and order history — plus feature overrides.</div>
          </div>
        )
      }
    ],
    []
  );

  return (
    <section id="pricing" className="py-32 bg-black relative overflow-hidden">
      {/* Background Effects - Simplified for performance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      
      {/* Static Orbs - No animation for better performance */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 border border-amber-500/30 rounded-full px-5 py-2 mb-6">
            <FontAwesomeIcon icon={faBolt} className="w-4 h-4 text-amber-500" />
            <span className="text-amber-400 font-semibold text-sm tracking-wide">TRANSPARENT PRICING</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Choose Your{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Growth Plan
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Scale your restaurant operations with the right tools. 
            <span className="text-white font-medium"> Upgrade anytime as you grow.</span>
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tierConfigs.map((config) => (
            <TierCard key={config.tierKey} {...config} onGetStarted={openPaymentModal} />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            All plans include 24/7 support, secure cloud hosting, and automatic updates.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
              Free migration
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
              Secure payments powered by Paystack
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCcVisa} className="w-10 h-10 text-gray-400 hover:text-[#1A1F71] transition-colors" />
              <FontAwesomeIcon icon={faCcMastercard} className="w-10 h-10 text-gray-400 hover:text-[#EB001B] transition-colors" />
              <FontAwesomeIcon icon={faCcAmex} className="w-10 h-10 text-gray-400 hover:text-[#006FCF] transition-colors" />
              <div className="px-2 py-1 bg-gray-700 hover:bg-[#00425F] rounded text-[10px] font-bold text-gray-400 hover:text-white transition-colors">VERVE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
