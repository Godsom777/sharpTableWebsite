'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faUtensils,
  faShieldHalved,
  faChartLine,
  faWifi,
  faBuildingColumns,
  faArrowRight,
  faCheck,
  faXmark,
  faReceipt,
  faClockRotateLeft,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, Container, Typography } from '@mui/material';

type OperationalCard = {
  icon: IconDefinition;
  title: string;
  body: string;
  badge?: string;
};

const restaurantOperatingLayers = [
  {
    layer: 'Layer 01',
    label: 'Front-Line Velocity',
    title: 'Instant touchscreens for servers, kitchen line & bar',
    items: [
      'Split-second order entry',
      'KDS color-coded ticket timers',
      'Table occupancy & transfer map',
      'Multi-payer bill splitting',
      'Direct WhatsApp order intake',
      'Offline table buffering',
    ],
  },
  {
    layer: 'Layer 02',
    label: 'Management Control & Anti-Theft',
    title: 'Every anomaly, void, and discount requires an audit log',
    items: [
      'Mandatory manager void PINs',
      'Reason code logging on discounts',
      'Recipe-level ingredient depletion',
      'Cash drawer opening audit',
      'Mid-shift drop reconciliations',
      'Staff privilege segregation',
    ],
  },
  {
    layer: 'Layer 03',
    label: 'System & Executive Intelligence',
    title: 'The operational truth of the shift, fully reconciled',
    items: [
      'Cross-branch comparative revenue',
      'Theoretical vs physical inventory variance',
      'Dish gross-margin analytics',
      'Server sales velocity & void trends',
      'Audit-ready EOD tax exports',
      'Real-time Telegram/WhatsApp alerts',
    ],
  },
];

const operationalCards: OperationalCard[] = [
  {
    icon: faShieldHalved,
    title: 'Tamper-Proof Void & Discount Engine',
    body: 'Cashiers cannot void bills or delete items after kitchen printing without manager authorization. Every exception is stamped with operator ID, reason, and time.',
    badge: 'Zero Leakage',
  },
  {
    icon: faUtensils,
    title: 'Recipe-Level Inventory Tracking',
    body: 'Automatic gram-by-gram stock deductions happen as orders settle. Stop guessing why 10kg of prime steak or 5 bottles of Hennessy disappeared between Friday and Sunday.',
    badge: 'Portion Control',
  },
  {
    icon: faWifi,
    title: 'Offline-Resilient Local Network',
    body: 'When Nigerian fiber or mobile network drops, local printers, kitchen display screens, and POS terminals keep running seamlessly and sync back automatically.',
    badge: 'Offline-First',
  },
  {
    icon: faBuildingColumns,
    title: 'Native Nigerian Payment Rails',
    body: 'Deeply integrated with Paystack for instantaneous POS settlements, bank transfers, USSD, and card payments without reconciliation confusion.',
    badge: 'Instant Settlement',
  },
  {
    icon: faClockRotateLeft,
    title: 'Immutable Shift Ledger',
    body: 'Every single click, tender settlement, cash drop, and ticket reprint is logged permanently into a non-alterable audit trail.',
    badge: 'Accountability',
  },
  {
    icon: faChartLine,
    title: 'Multi-Branch Consolidation',
    body: 'Monitor 2 to 20+ venues side-by-side from your phone. Compare branch revenue, inventory leakage, and labor cost efficiency in real time.',
    badge: 'Executive Command',
  },
];

const comparisonRows = [
  {
    feature: 'Built for Nigerian Connectivity (Offline-First)',
    sharptable: 'Full local cache; keeps printing and billing during outages',
    samba: 'Local-only database; no seamless cloud synchronization',
    square: 'Severe lag or blocked features outside US/UK',
  },
  {
    feature: 'Integrated Nigerian Payments (Paystack/Transfers)',
    sharptable: 'Native integration; automated receipt confirmation & settlement',
    samba: 'Requires external merchant card terminals with manual reconciliation',
    square: 'Unsupported for direct Nigerian Naira processing',
  },
  {
    feature: 'Anti-Theft Void & Exception Audit Ledger',
    sharptable: 'Tamper-proof cloud + local record with manager authorization',
    samba: 'Can be manipulated directly in local database by technician',
    square: 'Basic reporting without fraud-focused cashier tracking',
  },
  {
    feature: 'Direct WhatsApp Ordering (0% Commission)',
    sharptable: 'Integrated automated menu bot and direct kitchen injection',
    samba: 'No native WhatsApp ordering capability',
    square: 'No native WhatsApp ordering capability',
  },
  {
    feature: 'Recipe-Level Ingredient Depletion',
    sharptable: 'Standard feature; deduces grams/ml per plate sold automatically',
    samba: 'Requires complex custom scripting or paid 3rd-party add-on',
    square: 'Available only on expensive foreign enterprise add-ons',
  },
  {
    feature: 'Multi-Branch Executive Command from Phone',
    sharptable: 'Centralized live overview comparing all venues in real time',
    samba: 'Requires manual daily database exports or remote desktop logins',
    square: 'High monthly USD subscription per terminal',
  },
];

const MotionBox = motion(Box);

export const RestaurantLayers: React.FC = () => {
  return (
    <Box component="section" sx={{ py: { xs: 12, md: 20 }, bgcolor: '#050505', color: 'white', position: 'relative' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Section Header */}
        <Box sx={{ maxWidth: 840, mb: { xs: 8, md: 12 } }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#fcd34d', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 2 }}>
            <FontAwesomeIcon icon={faLayerGroup} style={{ width: 14, height: 14 }} />
            The 3-Layer Restaurant OS
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3.75rem' }, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'white', mb: 3 }}>
            Structured for operational truth, not software theater.
          </Typography>
          <Typography sx={{ color: 'grey.400', fontSize: { xs: '1.05rem', md: '1.25rem' }, lineHeight: 1.65, fontWeight: 300 }}>
            Most restaurant software is built for an ideal world where internet never drops, cashiers never take shortcuts, and staff never void bills after printing. SharpTable is engineered for real Nigerian venue realities.
          </Typography>
        </Box>

        {/* 3 Architecture Layers */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 4, mb: { xs: 12, md: 18 } }}>
          {restaurantOperatingLayers.map((layer, idx) => (
            <MotionBox
              key={layer.layer}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              sx={{
                bgcolor: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.75rem',
                p: { xs: 3.5, md: 4.5 },
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ color: '#fcd34d', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  {layer.layer}
                </Typography>
                <Box sx={{ px: 1.5, py: 0.5, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.400', fontSize: '0.725rem', fontWeight: 700 }}>
                  {layer.label}
                </Box>
              </Box>

              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', mb: 3, lineHeight: 1.3 }}>
                {layer.title}
              </Typography>

              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {layer.items.map((item, i) => (
                  <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'grey.300', fontSize: '0.925rem' }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FontAwesomeIcon icon={faCheck} style={{ width: 10, height: 10, color: '#fcd34d' }} />
                    </Box>
                    <span>{item}</span>
                  </Box>
                ))}
              </Box>
            </MotionBox>
          ))}
        </Box>

        {/* Operational Capabilities Grid */}
        <Box sx={{ mb: { xs: 12, md: 20 } }}>
          <Box sx={{ maxWidth: 700, mb: 6 }}>
            <Typography sx={{ color: '#fcd34d', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1.5 }}>
              Defensive Architecture
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 850, color: 'white', letterSpacing: '-0.03em' }}>
              Where traditional POS systems bleed revenue, SharpTable enforces discipline.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
            {operationalCards.map((card, index) => (
              <MotionBox
                key={card.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                sx={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  bgcolor: '#0c0c0c',
                  borderRadius: '1.5rem',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.18)',
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d' }}>
                    <FontAwesomeIcon icon={card.icon} style={{ width: 20, height: 20 }} />
                  </Box>
                  {card.badge && (
                    <Box sx={{ px: 1.5, py: 0.4, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                      {card.badge}
                    </Box>
                  )}
                </Box>

                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', mb: 1.5 }}>
                  {card.title}
                </Typography>
                <Typography sx={{ color: 'grey.400', fontSize: '0.925rem', lineHeight: 1.6, fontWeight: 300 }}>
                  {card.body}
                </Typography>
              </MotionBox>
            ))}
          </Box>
        </Box>

        {/* Direct Competitive Comparison Matrix */}
        <Box sx={{ mb: { xs: 10, md: 16 } }}>
          <Box sx={{ maxWidth: 760, mb: 6 }}>
            <Typography sx={{ color: '#fcd34d', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1.5 }}>
              Direct Comparison
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 850, color: 'white', letterSpacing: '-0.03em', mb: 2 }}>
              Why Nigerian hospitality operators choose SharpTable over foreign or legacy software.
            </Typography>
            <Typography sx={{ color: 'grey.400', fontSize: '1rem', lineHeight: 1.6 }}>
              You don&apos;t need generic Western point-of-sale systems with fragile cloud dependencies. Here is how SharpTable stacks up against the tools operators commonly evaluate:
            </Typography>
          </Box>

          <Box sx={{ overflowX: 'auto', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: '#0a0a0a' }}>
            <Box component="table" sx={{ width: '100%', minWidth: 700, borderCollapse: 'collapse', textAlign: 'left' }}>
              <Box component="thead">
                <Box component="tr" sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Box component="th" sx={{ p: 3, color: 'grey.400', fontWeight: 700, fontSize: '0.85rem', width: '30%' }}>Operational Capability</Box>
                  <Box component="th" sx={{ p: 3, color: '#fcd34d', fontWeight: 900, fontSize: '0.95rem', width: '32%', bgcolor: 'rgba(245,158,11,0.05)' }}>
                    SharpTable
                  </Box>
                  <Box component="th" sx={{ p: 3, color: 'grey.400', fontWeight: 700, fontSize: '0.85rem', width: '19%' }}>SambaPOS / Legacy</Box>
                  <Box component="th" sx={{ p: 3, color: 'grey.400', fontWeight: 700, fontSize: '0.85rem', width: '19%' }}>Square / Western Cloud</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {comparisonRows.map((row, i) => (
                  <Box component="tr" key={i} sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                    <Box component="td" sx={{ p: 3, color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                      {row.feature}
                    </Box>
                    <Box component="td" sx={{ p: 3, color: 'grey.200', fontSize: '0.875rem', bgcolor: 'rgba(245,158,11,0.03)', fontWeight: 500 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <FontAwesomeIcon icon={faCheck} style={{ width: 14, height: 14, color: '#fcd34d', marginTop: 3, flexShrink: 0 }} />
                        <span>{row.sharptable}</span>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ p: 3, color: 'grey.400', fontSize: '0.85rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <FontAwesomeIcon icon={faXmark} style={{ width: 14, height: 14, color: '#ef4444', marginTop: 3, flexShrink: 0 }} />
                        <span>{row.samba}</span>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ p: 3, color: 'grey.400', fontSize: '0.85rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <FontAwesomeIcon icon={faXmark} style={{ width: 14, height: 14, color: '#ef4444', marginTop: 3, flexShrink: 0 }} />
                        <span>{row.square}</span>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Feature Page Action Banner */}
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '2rem',
            border: '1px solid rgba(245,158,11,0.3)',
            bgcolor: 'rgba(245,158,11,0.06)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.6rem', md: '2.2rem' }, letterSpacing: '-0.03em', mb: 1.5 }}>
              Ready to eliminate leakage and command your venue?
            </Typography>
            <Typography sx={{ color: 'grey.300', fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.6, maxWidth: 650 }}>
              Join forward-thinking Nigerian hospitality brands using SharpTable to run seamless shifts with zero surprises.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              href="/pricing"
              sx={{
                bgcolor: 'white',
                color: 'black',
                borderRadius: '999px',
                px: 4,
                py: 1.6,
                fontWeight: 850,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': { bgcolor: 'grey.200' },
              }}
              endIcon={<FontAwesomeIcon icon={faArrowRight} style={{ width: 14, height: 14 }} />}
            >
              See Pricing & Plans
            </Button>
            <Button
              href="mailto:info@sharptable.com.ng"
              sx={{
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '999px',
                px: 3.5,
                py: 1.6,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              Talk to Sales
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default RestaurantLayers;
