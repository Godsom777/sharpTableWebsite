import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faHeadset, faMobileScreenButton, faRotateLeft, faBoxesStacked, faSliders, faUsers, faMask, faBuilding, faUserShield, faArrowRight, faLayerGroup, faMessage, faChartSimple } from '@fortawesome/free-solid-svg-icons';
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
  features: FeatureItem[];
}

const tiers: Tier[] = [
  {
    id: 'foundation',
    label: 'Foundation',
    tagline: 'Reliability and stability for absolute daily operations',
    features: [
      { icon: faShieldHalved, title: 'Reliable Daily Operations', description: 'Run service on a dependable workflow where orders and payments stay locked through every shift.' },
      { icon: faHeadset, title: 'Responsive Support', description: 'Your team is never alone. SharpTable is engineered as infrastructure you can lean on entirely.' },
      { icon: faMobileScreenButton, title: 'Live Phone Command', description: 'Update items and intercept activity instantly from your phone without chasing staff for answers.' },
      { icon: faRotateLeft, title: 'Strict Void Tracking', description: 'Reversals and voids are explicitly logged so unusual backroom activity stands out immediately.' },
    ],
  },
  {
    id: 'control',
    label: 'Command Matrix',
    tagline: 'Tighter fraud prevention and unapologetic oversight',
    features: [
      { icon: faSliders, title: 'Live Control', description: 'Adjust menus, pricing, and availability in real time without waiting on branch managers to call back.' },
      { icon: faBoxesStacked, title: 'Inventory Visibility', description: 'Keep a practical view of menu depletion and stock pressure precisely as service unfolds.' },
      { icon: faUsers, title: 'Cashier Activities', description: 'Identify who processed what and exactly when. Expose undocumented discrepancies before closing.' },
      { icon: faMask, title: 'Expose Internal Theft', description: 'When patterns break, the permanent audit trail makes it drastically easier to pinpoint staff fraud.' },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise Node',
    tagline: 'Multi-branch dominance and granular cross-restaurant oversight',
    features: [
      { icon: faMessage, title: 'WhatsApp Ordering', description: 'Attach an elegant WhatsApp flow to each branch so customers can order directly avoiding third-party apps.' },
      { icon: faBoxesStacked, title: 'Aggregated Inventory', description: 'Track consumption across all locations simultaneously. Identify which branches are bleeding margins.' },
      { icon: faChartSimple, title: 'Movement Tracker', description: 'Follow inventory and usage velocity so losses, waste, and suspicious patterns are rapidly isolated.' },
      { icon: faBuilding, title: 'Cross-Branch Supremacy', description: 'Compare branches side-by-side. Stop visiting every restaurant just to understand daily performance.' },
      { icon: faUserShield, title: 'Role Architecture', description: 'Grant precise access control to managers while maintaining total oversight from a singular executive view.' },
    ],
  },
];

const FeatureCard: React.FC<{ feature: FeatureItem; index: number }> = ({ feature, index }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, delay: index * 0.06 }}
    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3, borderRadius: '1rem', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s', '&:hover': { bgcolor: '#111111' }, '.group': { '&:hover .icon-box': { transform: 'scale(1.1)' } } }}
    className="group"
  >
    <Box
      className="icon-box"
      sx={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
    >
      <FontAwesomeIcon icon={feature.icon} style={{ width: 16, height: 16 }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1.375, mb: 0.5 }}>{feature.title}</Typography>
      <Typography sx={{ color: 'grey.500', fontSize: '0.875rem', lineHeight: 1.625 }}>{feature.description}</Typography>
    </Box>
  </Box>
);

export const FeatureStack: React.FC = () => {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <Box component="section" id="capabilities" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: 10 }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', px: 2, py: 0.75, mb: 4 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
            <Box component="span" sx={{ color: 'grey.300', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Platform Depth
            </Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Control what matters.
            <Box component="span" sx={{ display: 'block', color: 'grey.600' }}>Maintain absolute authority.</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
          <Box sx={{ display: 'inline-flex', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', p: 1, gap: 1 }}>
            {tiers.map((tier, index) => (
              <Box
                component="button"
                key={tier.id}
                onClick={() => setActiveTier(index)}
                sx={{ position: 'relative', px: { xs: 3, md: 4 }, py: 1.5, borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700, transition: 'all 0.3s', bgcolor: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeTier === index ? 'black' : 'grey.500', '&:hover': { color: activeTier === index ? 'black' : 'white' } }}
              >
                {activeTier === index && (
                  <Box
                    component={motion.div}
                    layoutId="tierHighlight"
                    sx={{ position: 'absolute', inset: 0, borderRadius: '9999px', bgcolor: 'white' }}
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
            <Box sx={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 4, md: 6 } }}>
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography sx={{ color: 'grey.400', fontSize: '1rem', fontWeight: 500 }}>{tiers[activeTier].tagline}</Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <AnimatePresence mode="wait">
                  {tiers[activeTier].features.map((feature, index) => (
                    <FeatureCard key={`${tiers[activeTier].id}-${index}`} feature={feature} index={index} />
                  ))}
                </AnimatePresence>
              </Box>

              {activeTier < tiers.length - 1 && (
                <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <Box component="button" onClick={() => setActiveTier((prev) => prev + 1)} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, fontSize: '0.85rem', color: 'grey.400', fontWeight: 600, bgcolor: 'transparent', border: 'none', cursor: 'pointer', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                    Unlock more with <Box component="span" sx={{ fontWeight: 800, color: 'white' }}>{tiers[activeTier + 1].label}</Box>
                    <FontAwesomeIcon icon={faArrowRight} style={{ width: 14, height: 14 }} />
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
