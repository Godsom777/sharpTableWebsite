import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQrcode,
  faReceipt,
  faUtensils,
  faBell,
  faCommentDots,
  faSliders,
  faBoxesStacked,
  faUsers,
  faAddressBook,
  faLocationDot,
  faChartPie,
  faRankingStar,
  faUserShield,
  faArrowRight,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FeatureItem {
  icon: IconDefinition;
  title: string;
  description: string;
}

interface Tier {
  id: string;
  label: string;
  tagline: string;
  accent: string;      // tailwind color token e.g. "amber"
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  features: FeatureItem[];
}

const tiers: Tier[] = [
  {
    id: 'floor',
    label: 'The Floor',
    tagline: 'Your customers order and pay without hassle — your staff move faster',
    accent: 'amber',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    borderColor: 'border-amber-500/25',
    iconBg: 'bg-amber-500/15 text-amber-400',
    features: [
      {
        icon: faQrcode,
        title: 'QR Code Menu',
        description: 'Customer sits down, scans a code, sees your full menu. No printing costs, no app download, no waiting.',
      },
      {
        icon: faReceipt,
        title: 'Split Billing',
        description: 'A table of 6 wants to split? They handle it themselves — per item, equal, or custom. Your staff don\'t touch it.',
      },
      {
        icon: faUtensils,
        title: 'Centralized Menu',
        description: 'Change a price or 86 an item once — it updates on every table, every screen, instantly. No reprinting menus.',
      },
      {
        icon: faCommentDots,
        title: 'Message to Kitchen',
        description: '"No pepper", "Extra sauce", "Allergy: nuts" — the customer types it, the kitchen sees it. Nothing gets lost in translation.',
      },
      {
        icon: faBell,
        title: 'Food Ready Alert',
        description: 'Kitchen taps "ready" — your floor team knows instantly. No shouting across the room, no cold food sitting on the pass.',
      },
    ],
  },
  {
    id: 'control',
    label: 'The Control Room',
    tagline: 'Stop guessing, start knowing — manage your restaurant without the chaos',
    accent: 'blue',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    borderColor: 'border-blue-500/25',
    iconBg: 'bg-blue-500/15 text-blue-400',
    features: [
      {
        icon: faSliders,
        title: 'Real-time Menu Adjustments',
        description: 'Ran out of chicken? Mark it sold out from your phone. Price change? Done in 5 seconds. No need to call anyone.',
      },
      {
        icon: faBoxesStacked,
        title: 'Real-time Inventory',
        description: 'You always know what you have. Stock updates as orders come in. Get alerts before you run out during a Friday rush.',
      },
      {
        icon: faUsers,
        title: 'Staff Management',
        description: 'See who\'s working, what they collected, and which tables they handled. Accountability without standing over their shoulder.',
      },
      {
        icon: faAddressBook,
        title: 'Customer Info Collection',
        description: 'Know who comes back, what they order, and how much they spend — automatically. No loyalty cards, no sign-up forms.',
      },
    ],
  },
  {
    id: 'command',
    label: 'Command Center',
    tagline: 'Own 2 locations or 20 — see everything from one screen without visiting each one',
    accent: 'purple',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    borderColor: 'border-purple-500/25',
    iconBg: 'bg-purple-500/15 text-purple-400',
    features: [
      {
        icon: faBoxesStacked,
        title: 'Multi-Branch Inventory',
        description: 'One branch is low on drinks but another has plenty? You\'ll see it before your manager calls you.',
      },
      {
        icon: faChartPie,
        title: 'Cross-Branch Metrics',
        description: 'Revenue, order count, average spend — compare all your locations side by side without driving around town.',
      },
      {
        icon: faRankingStar,
        title: 'Top Sellers per Branch',
        description: 'Jollof rice flies in one branch but flops in another. Now you know — and you can act on it.',
      },
      {
        icon: faUserShield,
        title: 'Admin Management',
        description: 'Give your branch managers exactly the access they need. No more, no less. Add or remove them in seconds.',
      },
    ],
  },
];

const FeatureCard: React.FC<{ feature: FeatureItem; iconBg: string; index: number }> = ({
  feature,
  iconBg,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, delay: index * 0.06 }}
    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
  >
    <div
      className={`shrink-0 w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
    >
      <FontAwesomeIcon icon={feature.icon} className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <h4 className="text-white font-semibold text-sm leading-snug">{feature.title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed mt-1">{feature.description}</p>
    </div>
  </motion.div>
);

export const FeatureStack: React.FC = () => {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-gray-300 font-semibold text-xs uppercase tracking-widest">
              Full Platform
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything you need.<br className="sm:hidden" /> Nothing you don't.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Most POS systems give you 100 features you'll never touch and charge you for all of them. SharpTable gives you what actually matters — from the table to the back office.
          </p>
        </motion.div>

        {/* Tier Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-zinc-900/80 border border-white/10 rounded-2xl p-1.5 gap-1">
            {tiers.map((tier, index) => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(index)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTier === index
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {activeTier === index && (
                  <motion.div
                    layoutId="tierHighlight"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tiers[index].bgGradient} border ${tiers[index].borderColor}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tier.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Tier Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`rounded-3xl border ${tiers[activeTier].borderColor} bg-gradient-to-b ${tiers[activeTier].bgGradient} p-6 md:p-10`}
            >
              {/* Tier Tagline */}
              <div className="mb-8 text-center">
                <p className="text-gray-400 text-sm">{tiers[activeTier].tagline}</p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <AnimatePresence mode="wait">
                  {tiers[activeTier].features.map((feature, index) => (
                    <FeatureCard
                      key={`${tiers[activeTier].id}-${index}`}
                      feature={feature}
                      iconBg={tiers[activeTier].iconBg}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Tier Footer — visual connector */}
              {activeTier < tiers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-white/5 text-center"
                >
                  <button
                    onClick={() => setActiveTier((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium"
                  >
                    Unlock more with{' '}
                    <span className="font-bold text-white">{tiers[activeTier + 1].label}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
