'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBed,
  faCashRegister,
  faClipboardCheck,
  faCreditCard,
  faFileInvoice,
  faMagnifyingGlassChart,
  faMoneyBillTransfer,
  faReceipt,
  faShieldHalved,
  faUserTie,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, Container, Typography } from '@mui/material';

type HotelCard = {
  icon: IconDefinition;
  title: string;
  body: string;
};

const heroStats = [
  { label: 'Unposted outlet charges', value: 'Flagged' },
  { label: 'Rooms with balances', value: 'Live' },
  { label: 'EOD exceptions', value: 'Visible' },
];

const heroWorkflows: HotelCard[] = [
  {
    icon: faMoneyBillTransfer,
    title: 'Capture outlet revenue before it leaks',
    body: 'Restaurant, bar, poolside, room service, laundry, minibar, and spa charges post into the guest ledger with outlet, item, staff, and timestamp records.',
  },
  {
    icon: faReceipt,
    title: 'Reduce checkout arguments',
    body: 'Front desk can show exactly what was charged, where it came from, who posted it, and which folio should carry it.',
  },
  {
    icon: faClipboardCheck,
    title: 'Give the GM a day-end truth file',
    body: 'EOD captures revenue, collections, balances, outlet charges, housekeeping readiness, voids, discounts, overrides, and control flags.',
  },
];

const operatingLayers = [
  {
    label: 'Daily Operations',
    title: 'Fast screens for front-line staff',
    items: ['Check-in', 'Checkout', 'Room service', 'Housekeeping', 'Guest requests', 'Billing'],
  },
  {
    label: 'Management Control',
    title: 'Approvals and exceptions stay visible',
    items: ['Voids', 'Rate overrides', 'Charge disputes', 'Re-issuance approvals', 'Staff activity'],
  },
  {
    label: 'System Intelligence',
    title: 'The truth of the day, reconciled',
    items: ['EOD reports', 'Revenue trends', 'Occupancy analysis', 'Fraud detection', 'Audit exports'],
  },
];

const roleCards: HotelCard[] = [
  {
    icon: faBed,
    title: 'Housekeeping',
    body: 'Mobile-first room lists, dirty-to-cleaning-to-inspected flow, maintenance flags, and supervisor-only ready status.',
  },
  {
    icon: faCashRegister,
    title: 'Restaurant Staff',
    body: 'POS-optimized active orders, kitchen sync, split payment, bar tabs, and charge-to-room confirmation before every post.',
  },
  {
    icon: faUserTie,
    title: 'Manager',
    body: 'Three focused dashboards for today overview, risk control, and operations, with drill-downs only when needed.',
  },
];

const trustControls: HotelCard[] = [
  {
    icon: faShieldHalved,
    title: 'Approval-backed exceptions',
    body: 'Voids, discounts, rate overrides, charge moves, and dispute resolutions carry reason logs and manager visibility.',
  },
  {
    icon: faWifi,
    title: 'Offline-safe operations',
    body: 'Room status updates, outlet charges, payments, and guest requests queue locally and sync when connectivity returns.',
  },
  {
    icon: faFileInvoice,
    title: 'Audit-ready exports',
    body: 'Daily closure, tax summary, staff activity, room readiness, and outlet charge logs can be viewed, printed, or exported.',
  },
  {
    icon: faCreditCard,
    title: 'Live folio control',
    body: 'Room rates, restaurant charges, adjustments, payments, and split folios stay tied to one stay record.',
  },
];

const MotionBox = motion(Box);

const SectionIntro = ({ label, title, body }: { label: string; title: string; body: string }) => (
  <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 820 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', mb: 2, fontWeight: 700 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#C9A84C' }} />
      {label}
    </Box>
    <Typography sx={{ fontSize: { xs: '2.25rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.02, letterSpacing: '-0.04em' }}>
      {title}
    </Typography>
    <Typography sx={{ mt: 3, color: 'grey.400', lineHeight: 1.7, fontSize: { xs: '1rem', md: '1.125rem' } }}>
      {body}
    </Typography>
  </Box>
);

const IconCard = ({ card, index }: { card: HotelCard; index: number }) => (
  <MotionBox
    initial={false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, delay: index * 0.05 }}
    sx={{
      border: '1px solid rgba(255,255,255,0.07)',
      bgcolor: '#0f0f0f',
      borderRadius: { xs: '1.25rem', md: '1.75rem' },
      p: { xs: 3, md: 4 },
      minHeight: '100%',
    }}
  >
    <Box sx={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.35)', color: '#fcd34d', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
      <FontAwesomeIcon icon={card.icon} style={{ width: 18, height: 18 }} />
    </Box>
    <Typography sx={{ color: 'white', fontSize: '1.25rem', fontWeight: 850, lineHeight: 1.25, mb: 1.5 }}>
      {card.title}
    </Typography>
    <Typography sx={{ color: 'grey.500', fontSize: '0.95rem', lineHeight: 1.65 }}>
      {card.body}
    </Typography>
  </MotionBox>
);

export const HotelsPage: React.FC = () => {
  return (
    <>
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'black', pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 16 } }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 10%, rgba(201,168,76,0.15), transparent 34%), radial-gradient(ellipse at 80% 40%, rgba(255,255,255,0.06), transparent 32%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.02fr 0.98fr' }, gap: { xs: 7, md: 8 }, alignItems: 'center' }}>
            <Box>
              <Typography component="h1" sx={{ color: 'white', fontSize: { xs: '3rem', sm: '4rem', md: '5.8rem' }, lineHeight: 0.95, letterSpacing: '-0.055em', fontWeight: 950, maxWidth: 720 }}>
                Stop hotel revenue from disappearing between outlets and checkout.
              </Typography>
              <Typography sx={{ mt: 4, color: 'grey.300', fontSize: { xs: '1.05rem', md: '1.28rem' }, lineHeight: 1.65, maxWidth: 650, fontWeight: 300 }}>
                SharpTable gives owners and GMs live control over room ledgers, restaurant charges, service postings, housekeeping readiness, staff actions, and end-of-day closure.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 5 }}>
                <Button
                  href="/pricing"
                  sx={{ bgcolor: 'white', color: 'black', borderRadius: '999px', px: 3, py: 1.4, fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: 'grey.200' } }}
                  endIcon={<FontAwesomeIcon icon={faArrowRight} style={{ width: 14, height: 14 }} />}
                >
                  Start Free Trial
                </Button>
                <Button
                  href="mailto:info@sharptable.com.ng"
                  sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '999px', px: 3, py: 1.4, fontWeight: 800, textTransform: 'none' }}
                >
                  Talk to Sales
                </Button>
              </Box>
            </Box>

            <Box sx={{ border: '1px solid rgba(255,255,255,0.08)', bgcolor: '#0b0b0b', borderRadius: { xs: '1.5rem', md: '2.25rem' }, p: { xs: 3, md: 4 }, boxShadow: '0 30px 90px rgba(0,0,0,0.5)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ color: 'white', fontWeight: 850, fontSize: '1.2rem' }}>Today at a glance</Typography>
                <Box sx={{ color: '#fcd34d', fontSize: '0.78rem', fontWeight: 800 }}>LIVE</Box>
              </Box>
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                {heroStats.map((stat) => (
                  <Box key={stat.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', p: 2, bgcolor: 'rgba(255,255,255,0.03)' }}>
                    <Typography sx={{ color: 'grey.400', fontSize: '0.92rem' }}>{stat.label}</Typography>
                    <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 850 }}>{stat.value}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 3, p: 3, borderRadius: '1.25rem', bgcolor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.18)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <FontAwesomeIcon icon={faMagnifyingGlassChart} style={{ color: '#fcd34d', width: 18, height: 18 }} />
                  <Typography sx={{ color: 'white', fontWeight: 850 }}>Revenue command center</Typography>
                </Box>
                <Typography sx={{ color: 'grey.400', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  See what was sold, what was posted, what was collected, what is still owed, and what needs manager attention before the day is closed.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 18 }, bgcolor: '#000' }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <SectionIntro
            label="Hero workflows"
            title="Built around the moments where hotel margins leak."
            body="The sharper positioning is not a giant PMS replacement. It is the control layer for charge capture, staff accountability, balance recovery, housekeeping readiness, and formal EOD closure."
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {heroWorkflows.map((card, index) => <IconCard key={card.title} card={card} index={index} />)}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 18 }, bgcolor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <SectionIntro
            label="Architecture"
            title="Powerful system. Low-thinking screens."
            body="Hotel complexity is separated into layers so front-line teams see only the action they need, while management keeps the controls, approvals, and reports."
          />
          <Box sx={{ display: 'grid', gap: 2.5 }}>
            {operatingLayers.map((layer, index) => (
              <Box key={layer.label} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 2, md: 4 }, alignItems: 'center', p: { xs: 3, md: 4 }, borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.07)', bgcolor: index === 1 ? 'rgba(201,168,76,0.08)' : '#0d0d0d' }}>
                <Box>
                  <Typography sx={{ color: '#fcd34d', fontWeight: 800, fontSize: '0.82rem', mb: 1 }}>{layer.label}</Typography>
                  <Typography sx={{ color: 'white', fontWeight: 850, fontSize: { xs: '1.35rem', md: '1.65rem' }, lineHeight: 1.2 }}>{layer.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {layer.items.map((item) => (
                    <Box key={item} sx={{ px: 2, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.82rem', fontWeight: 700 }}>
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 18 }, bgcolor: '#000' }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <SectionIntro
            label="Role views"
            title="Different staff, different pressure, different interface."
            body="Front desk and hotel admin stay as existing modules. The hotel expansion gives housekeeping, restaurant staff, and managers focused views instead of one crowded dashboard."
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {roleCards.map((card, index) => <IconCard key={card.title} card={card} index={index} />)}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 18 }, bgcolor: '#050505' }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <SectionIntro
            label="Trust engine"
            title="Designed for operational truth, not software theater."
            body="Every sensitive action needs a usable record. SharpTable makes leakage, misposting, unexplained discounts, and end-of-day uncertainty harder to hide."
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            {trustControls.map((card, index) => <IconCard key={card.title} card={card} index={index} />)}
          </Box>
          <Box sx={{ mt: { xs: 8, md: 10 }, p: { xs: 3, md: 5 }, borderRadius: '2rem', border: '1px solid rgba(201,168,76,0.2)', bgcolor: 'rgba(201,168,76,0.08)', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'center' }}>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '1.6rem', md: '2rem' }, letterSpacing: '-0.03em', mb: 1 }}>
                Start with the workflows that protect revenue first.
              </Typography>
              <Typography sx={{ color: 'grey.400', lineHeight: 1.6 }}>
                Charge capture, balance recovery, staff accountability, offline-safe operations, EOD closure, and housekeeping readiness are the v1 center of gravity.
              </Typography>
            </Box>
            <Button href="/pricing" sx={{ bgcolor: 'white', color: 'black', borderRadius: '999px', px: 3, py: 1.4, fontWeight: 850, textTransform: 'none', '&:hover': { bgcolor: 'grey.200' } }}>
              See pricing
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
