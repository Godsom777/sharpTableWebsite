import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faHeadset,
  faMobileScreenButton,
  faRotateLeft,
  faBoxesStacked,
  faSliders,
  faUsers,
  faMask,
  faHeart,
  faBuilding,
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
    id: 'foundation',
    label: 'Foundation',
    tagline: 'Reliability, support, and long-term stability for daily restaurant operations',
    accent: '#f59e0b',
    bgGradient: 'linear-gradient(to bottom, rgba(245,158,11,0.1), rgba(245,158,11,0.05), transparent)',
    borderColor: 'rgba(245,158,11,0.25)',
    iconBgColor: 'rgba(245,158,11,0.15)',
    iconTextColor: '#fbbf24',
    features: [
      {
        icon: faShieldHalved,
        title: 'Reliable Daily Operations',
        description: 'Run service on a dependable workflow where orders, payments, and handoffs stay consistent through every shift.',
      },
      {
        icon: faHeadset,
        title: 'Responsive Support',
        description: 'Your team is not left alone with a fragile setup. SharpTable is positioned as software you can lean on over time.',
      },
      {
        icon: faMobileScreenButton,
        title: 'Phone-First Control',
        description: 'Update items, follow activity, and keep tabs on operations from your phone without chasing staff for answers.',
      },
      {
        icon: faRotateLeft,
        title: 'Void Tracking',
        description: 'Track voids and reversals clearly so unusual activity stands out instead of disappearing into the noise.',
      },
    ],
  },
  {
    id: 'control',
    label: 'Control Room',
    tagline: 'Tighter fraud prevention and clearer oversight inside every restaurant',
    accent: '#3b82f6',
    bgGradient: 'linear-gradient(to bottom, rgba(59,130,246,0.1), rgba(59,130,246,0.05), transparent)',
    borderColor: 'rgba(59,130,246,0.25)',
    iconBgColor: 'rgba(59,130,246,0.15)',
    iconTextColor: '#60a5fa',
    features: [
      {
        icon: faSliders,
        title: 'Live Operational Control',
        description: 'Adjust menus, pricing, and availability in real time without waiting on branch managers to call you back.',
      },
      {
        icon: faBoxesStacked,
        title: 'Total Inventory Tracking',
        description: 'See stock movement as service happens, catch shortages early, and keep a tighter grip on what is actually on hand.',
      },
      {
        icon: faUsers,
        title: 'Cashier Activities',
        description: 'Know who processed what, when they did it, and which transactions need a second look before the day closes.',
      },
      {
        icon: faMask,
        title: 'Expose Staff Theft',
        description: 'When patterns break, the audit trail makes it easier to investigate discrepancies and identify internal leakage.',
      },
    ],
  },
  {
    id: 'command',
    label: 'Command Center',
    tagline: 'One stable system for customer retention and multi-restaurant visibility',
    accent: '#a855f7',
    bgGradient: 'linear-gradient(to bottom, rgba(168,85,247,0.1), rgba(168,85,247,0.05), transparent)',
    borderColor: 'rgba(168,85,247,0.25)',
    iconBgColor: 'rgba(168,85,247,0.15)',
    iconTextColor: '#c084fc',
    features: [
      {
        icon: faBoxesStacked,
        title: 'Multi-Restaurant Inventory',
        description: 'Track stock across locations from one view so you can see which branches are tight, which are overstocked, and where action is needed.',
      },
      {
        icon: faHeart,
        title: 'Customer Retention',
        description: 'See repeat-customer behavior and ordering patterns so good service turns into stronger loyalty over time.',
      },
      {
        icon: faBuilding,
        title: 'Cross-Branch Oversight',
        description: 'Compare branches side by side without visiting each restaurant just to understand what happened that day.',
      },
      {
        icon: faUserShield,
        title: 'Role-Based Control',
        description: 'Give each manager the right access while you keep the full picture across all restaurants from one command view.',
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
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at top right, rgba(139,92,246,0.06) 0%, transparent 50%)' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
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
            Control what matters.
            <Box component="br" sx={{ display: { sm: 'none' } }} /> Keep it stable as you grow.
          </Typography>
          <Typography sx={{ mt: 2, color: 'grey.400', maxWidth: 'md', mx: 'auto', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            SharpTable brings reliability, support, fraud prevention, inventory visibility, staff accountability, and multi-restaurant control into one coherent operating system.
          </Typography>
        </Box>

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
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem' }}>{tiers[activeTier].tagline}</Typography>
              </Box>

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
