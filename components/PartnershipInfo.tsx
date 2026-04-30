import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faMoneyBillTrendUp,
  faLink,
  faRepeat,
  faUser,
  faGift,
  faChartLine,
  faArrowRight,
  faChevronDown,
  faClock,
  faWallet,
  faShieldHalved,
  faCalendarCheck,
  faCalculator,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const steps = [
  { icon: faUser, title: 'Apply', desc: 'Secure your partner node instantly without arbitrary waiting periods.' },
  { icon: faLink, title: 'Get Your Link', desc: 'Acquire your traceable link to track performance securely.' },
  { icon: faHandshake, title: 'They Subscribe', desc: 'When franchises lock down via your link, the ledger attributes them to you.' },
  { icon: faMoneyBillTrendUp, title: 'You Get Paid', desc: 'Earn aggressive upfront and recurring capital for securing operations.' },
];

const commissions = [
  { rate: '50%', label: 'Upfront Capital', desc: "Monthly plans: 50% of the first month's payment.", icon: faGift },
  { rate: '20%', label: 'Recurring Royalty', desc: 'Monthly plans: 20% recurring for 6 consecutive months. Yearly plans earn 30% flat upfront immediately.', icon: faRepeat },
];

const earnings = [
  { plan: 'Lite · Monthly', price: '₦50,000/mo', upfront: '₦25,000', recurring: '₦10,000 × 6', total: '₦85,000' },
  { plan: 'Pro · Monthly', price: '₦150,000/mo', upfront: '₦75,000', recurring: '₦30,000 × 6', total: '₦255,000' },
  { plan: 'Enterprise · Monthly', price: '₦200,000/mo', upfront: '₦100,000', recurring: '₦40,000 × 6', total: '₦340,000' },
  { plan: 'Enterprise · Yearly', price: '₦2,400,000/yr', upfront: '₦720,000', recurring: '-', total: '₦720,000' },
];

const faqs = [
  { q: 'How much can I earn?', a: 'There is zero ceiling. 10 Enterprise Monthly referrals nets you ₦3.4 million over 6 months.', icon: faWallet },
  { q: 'Yearly Plan Impact?', a: 'Yearly subscriptions execute an immediate 30% flush payment with no recurring delay. Sell an Enterprise Yearly and secure ₦720,000 at once.', icon: faCalendarCheck },
  { q: 'Payout Logistics?', a: 'Funds clear within 7 business days following every successful client charge.', icon: faClock },
  { q: 'Dashboard Tracking?', a: 'Full real-time visibility over your converted venues and inbound streams.', icon: faChartLine },
  { q: 'Are there thresholds?', a: 'No minimums. Earn immediately on execution.', icon: faCalculator },
  { q: 'Is technical capacity required?', a: 'No. Just operational influence over restaurant chains.', icon: faUser },
  { q: 'Cancellation Policy?', a: 'You keep all acquired upfront capital. No clawbacks on what you successfully hunt.', icon: faShieldHalved },
];

const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      sx={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden', bgcolor: '#111111' }}
    >
      <Box
        component="button"
        onClick={() => setOpen(!open)}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2.5,
          textAlign: 'left',
          bgcolor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          '&:hover span': { color: 'white' },
        }}
      >
        <Box sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon icon={item.icon} style={{ width: 14, height: 14, color: 'white' }} />
        </Box>
        <Typography component="span" sx={{ flex: 1, fontSize: '0.95rem', fontWeight: 600, color: 'grey.300', transition: 'color 0.2s', letterSpacing: '-0.02em' }}>
          {item.q}
        </Typography>
        <Box component={motion.div} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <FontAwesomeIcon icon={faChevronDown} style={{ width: 14, height: 14, color: 'grey.600' }} />
        </Box>
      </Box>
      <AnimatePresence initial={false}>
        {open && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            sx={{ overflow: 'hidden' }}
          >
            <Typography sx={{ px: 3, pb: 3, pl: '4.5rem', fontSize: '0.95rem', color: 'grey.500', lineHeight: 1.6 }}>
              {item.a}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export const PartnershipInfo: React.FC = () => {
  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: '#000000' }}>
      <Container maxWidth="md" sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 10, md: 16 }, px: 3 }}>
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900, color: 'white', mb: 2, letterSpacing: '-0.04em' }}>
            Capital Protocol
          </Typography>
          <Typography sx={{ color: 'grey.500', maxWidth: 500, mx: 'auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
            Expand the network. Capitalize on the operational gap.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {steps.map((step, i) => (
            <Box component={motion.div} key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} sx={{ position: 'relative', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: 4, textAlign: 'center' }}>
              <Box sx={{ position: 'absolute', top: 12, right: 16, color: 'grey.800', fontSize: '2rem', fontWeight: 900, userSelect: 'none' }}>{i + 1}</Box>
              <Box sx={{ width: 48, height: 48, mx: 'auto', mb: 3, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={step.icon} style={{ width: 16, height: 16, color: 'white' }} />
              </Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1, fontSize: '1.125rem' }}>{step.title}</Typography>
              <Typography sx={{ color: 'grey.500', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Box sx={{ bgcolor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="md" sx={{ py: { xs: 12, md: 16 }, px: 3 }}>
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 2 }}>
              The Returns
            </Typography>
            <Typography sx={{ color: 'grey.500', maxWidth: 600, mx: 'auto', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Aggressive compounding on recurring monthly execution, and heavy flat-fee payouts for yearly commitments.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4, mb: 6 }}>
            {commissions.map((commission, i) => (
              <Box component={motion.div} key={commission.label} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} sx={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 4, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={commission.icon} style={{ width: 24, height: 24, color: 'white' }} />
                </Box>
                <Typography sx={{ fontSize: '4rem', fontWeight: 900, mb: 1, color: 'white', lineHeight: 1 }}>{commission.rate}</Typography>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', mb: 1.5 }}>{commission.label}</Typography>
                <Typography sx={{ color: 'grey.500', fontSize: '1rem', lineHeight: 1.6 }}>{commission.desc}</Typography>
              </Box>
            ))}
          </Box>

          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} sx={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#111111', px: 4, py: 3, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography sx={{ color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.125rem' }}>
                <FontAwesomeIcon icon={faChartLine} style={{ width: 18, height: 18, color: 'white' }} /> Revenue Projections
              </Typography>
            </Box>
            <Box sx={{ overflowX: 'auto', bgcolor: '#000000' }}>
              <Box component="table" sx={{ width: '100%', fontSize: '0.95rem', borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ color: 'grey.600', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Box component="th" sx={{ textAlign: 'left', px: 4, py: 3, fontWeight: 700 }}>Plan Format</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 4, py: 3, fontWeight: 700 }}>Client Price</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 4, py: 3, fontWeight: 700 }}>Upfront</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 4, py: 3, fontWeight: 700 }}>Recurring</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 4, py: 3, fontWeight: 800, color: 'white' }}>Total Return</Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {earnings.map((earning, index) => (
                    <Box component="tr" key={earning.plan} sx={{ borderBottom: index < earnings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', '&:hover': { bgcolor: '#111111' } }}>
                      <Box component="td" sx={{ px: 4, py: 3 }}>
                        <Typography component="span" sx={{ color: 'white', fontWeight: 600 }}>{earning.plan}</Typography>
                      </Box>
                      <Box component="td" sx={{ px: 4, py: 3, color: 'grey.500', textAlign: 'right' }}>{earning.price}</Box>
                      <Box component="td" sx={{ px: 4, py: 3, color: 'grey.300', textAlign: 'right', fontWeight: 600 }}>{earning.upfront}</Box>
                      <Box component="td" sx={{ px: 4, py: 3, color: 'grey.300', textAlign: 'right', fontWeight: 600 }}>{earning.recurring}</Box>
                      <Box component="td" sx={{ px: 4, py: 3, color: 'white', textAlign: 'right', fontWeight: 900 }}>{earning.total}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ px: 3, py: { xs: 12, md: 16 }, textAlign: 'center' }}>
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ width: 80, height: 80, mx: 'auto', mb: 4, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faHandshake} style={{ width: 32, height: 32, color: 'white' }} />
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 2 }}>
            Infiltrate the market.
          </Typography>
          <Typography sx={{ color: 'grey.500', maxWidth: 500, mx: 'auto', fontSize: '1.25rem', lineHeight: 1.6, mb: 6 }}>
            The process takes two minutes. Secure massive multi-branch clients and secure the upside.
          </Typography>
          <Link to="/partnership/apply" style={{ textDecoration: 'none' }}>
            <Box component="button" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, bgcolor: 'white', color: 'black', px: 5, py: 2.5, borderRadius: '9999px', fontWeight: 900, fontSize: '1.125rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s', '&:hover': { bgcolor: 'grey.300' }, fontFamily: 'inherit' }}>
              Initiate Application
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
            </Box>
          </Link>
        </Box>
      </Container>

      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: '#000000' }}>
        <Container maxWidth="md" sx={{ px: 3, py: { xs: 12, md: 16 } }}>
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 900, letterSpacing: '-0.02em', color: 'white', mb: 2 }}>
              Directives
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
