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
  faChartPie,
  faRankingStar,
  faUserShield,
  faArrowRight,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Box, Container, Typography } from '@mui/material';

interface FeatureItem {
  icon: IconDefinition;
  title: string;
  description: string;
}

interface Tier {
  id: string;
  label: string;
  tagline: string;
  accent: string;
  bgGradient: string;
  borderColor: string;
  iconBgColor: string;
  iconTextColor: string;
  features: FeatureItem[];
}

const tiers: Tier[] = [
  {
    id: 'floor',
    label: 'The Floor',
    tagline: 'Your customers order and pay without hassle — your staff move faster',
    accent: '#f59e0b',
    bgGradient: 'linear-gradient(to bottom, rgba(245,158,11,0.1), rgba(245,158,11,0.05), transparent)',
    borderColor: 'rgba(245,158,11,0.25)',
    iconBgColor: 'rgba(245,158,11,0.15)',
    iconTextColor: '#fbbf24',
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
    accent: '#3b82f6',
    bgGradient: 'linear-gradient(to bottom, rgba(59,130,246,0.1), rgba(59,130,246,0.05), transparent)',
    borderColor: 'rgba(59,130,246,0.25)',
    iconBgColor: 'rgba(59,130,246,0.15)',
    iconTextColor: '#60a5fa',
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
    accent: '#a855f7',
    bgGradient: 'linear-gradient(to bottom, rgba(168,85,247,0.1), rgba(168,85,247,0.05), transparent)',
    borderColor: 'rgba(168,85,247,0.25)',
    iconBgColor: 'rgba(168,85,247,0.15)',
    iconTextColor: '#c084fc',
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

const FeatureCard: React.FC<{ feature: FeatureItem; tier: Tier; index: number }> = ({
  feature,
  tier,
  index,
}) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, delay: index * 0.06 }}
    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: '0.75rem', transition: 'background-color 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '.group': { '&:hover .icon-box': { transform: 'scale(1.1)' } } }}
    className="group"
  >
    <Box
      className="icon-box"
      sx={{ flexShrink: 0, width: 40, height: 40, borderRadius: '0.5rem', bgcolor: tier.iconBgColor, color: tier.iconTextColor, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
    >
      <FontAwesomeIcon icon={feature.icon} style={{ width: 16, height: 16 }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.375 }}>{feature.title}</Typography>
      <Typography sx={{ color: 'grey.400', fontSize: '0.75rem', lineHeight: 1.625, mt: 0.5 }}>{feature.description}</Typography>
    </Box>
  </Box>
);

export const FeatureStack: React.FC = () => {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <Box component="section" id="capabilities" sx={{ py: { xs: 12, md: 16 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at top right, rgba(139,92,246,0.06) 0%, transparent 50%)' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: 7 }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', px: 2, py: 0.75, mb: 2.5 }}>
            <FontAwesomeIcon icon={faLayerGroup} style={{ width: 14, height: 14, color: '#fbbf24' }} />
            <Box component="span" sx={{ color: 'grey.300', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Full Platform
            </Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '3rem' }, fontWeight: 800, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Everything you need.<Box component="br" sx={{ display: { sm: 'none' } }} /> Nothing you don't.
          </Typography>
          <Typography sx={{ mt: 2, color: 'grey.400', maxWidth: 'md', mx: 'auto', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            Most POS systems give you 100 features you'll never touch and charge you for all of them. SharpTable gives you what actually matters — from the table to the back office.
          </Typography>
        </Box>

        {/* Tier Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Box sx={{ display: 'inline-flex', bgcolor: 'rgba(24,24,27,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', p: 0.75, gap: 0.5 }}>
            {tiers.map((tier, index) => (
              <Box
                component="button"
                key={tier.id}
                onClick={() => setActiveTier(index)}
                sx={{
                  position: 'relative', px: 2.5, py: 1.25, borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: 600, transition: 'all 0.3s', bgcolor: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  color: activeTier === index ? 'white' : 'grey.500',
                  '&:hover': { color: activeTier === index ? 'white' : 'grey.300' }
                }}
              >
                {activeTier === index && (
                  <Box
                    component={motion.div}
                    layoutId="tierHighlight"
                    sx={{ position: 'absolute', inset: 0, borderRadius: '0.75rem', background: tiers[index].bgGradient, border: '1px solid', borderColor: tiers[index].borderColor }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Box component="span" sx={{ position: 'relative', zIndex: 10 }}>{tier.label}</Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Active Tier Content */}
        <AnimatePresence mode="wait">
          <Box
            component={motion.div}
            key={activeTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              sx={{
                borderRadius: '1.5rem',
                border: '1px solid',
                borderColor: tiers[activeTier].borderColor,
                background: tiers[activeTier].bgGradient,
                p: { xs: 3, md: 5 }
              }}
            >
              {/* Tier Tagline */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem' }}>{tiers[activeTier].tagline}</Typography>
              </Box>

              {/* Features Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>
                <AnimatePresence mode="wait">
                  {tiers[activeTier].features.map((feature, index) => (
                    <FeatureCard
                      key={`${tiers[activeTier].id}-${index}`}
                      feature={feature}
                      tier={tiers[activeTier]}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </Box>

              {/* Tier Footer — visual connector */}
              {activeTier < tiers.length - 1 && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
                >
                  <Box
                    component="button"
                    onClick={() => setActiveTier((prev) => prev + 1)}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontSize: '0.75rem', color: 'grey.500', fontWeight: 500, bgcolor: 'transparent', border: 'none', cursor: 'pointer', '&:hover': { color: 'grey.300' }, transition: 'color 0.2s' }}
                  >
                    Unlock more with{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: 'white' }}>{tiers[activeTier + 1].label}</Box>
                    <FontAwesomeIcon icon={faArrowRight} style={{ width: 12, height: 12 }} />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </AnimatePresence>
      </Container>
    </Box>
  );
};
