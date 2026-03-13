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
  faCircleInfo,
  faClock,
  faWallet,
  faShieldHalved,
  faCalendarCheck,
  faCalculator,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

/* ── How-It-Works steps ──────────────────────────────────── */
const steps = [
  { icon: faUser, title: 'Apply', desc: 'Complete the short form with your details and get a referral link immediately.' },
  { icon: faLink, title: 'Get Your Link', desc: 'You will receive a unique referral link to share with restaurant owners.' },
  { icon: faHandshake, title: 'They Subscribe', desc: 'When a restaurant subscribes through your link, we attribute it automatically.' },
  { icon: faMoneyBillTrendUp, title: 'You Get Paid', desc: 'Earn commissions on every referral — 50% + 20% recurring for monthly, or 30% one-time for yearly plans.' },
];

/* ── Commission cards ────────────────────────────────────── */
const commissions = [
  { rate: '50%', label: 'Upfront', desc: "Monthly plans: 50% of one month's subscription price, paid once after the first successful charge.", icon: faGift, accent: 'amber' as const },
  { rate: '20%', label: 'Recurring', desc: "Monthly plans: 20% of one month's subscription price, paid monthly for 6 consecutive months. Yearly plans earn 30% one-time instead.", icon: faRepeat, accent: 'emerald' as const },
];

/* ── Earnings examples ───────────────────────────────────── */
const earnings = [
  { plan: 'Control · Monthly', price: '₦99,999/mo', upfront: '₦49,999', recurring: '₦20,000 × 6', total: '₦169,999' },
  { plan: 'Command · Monthly', price: '₦199,999/mo', upfront: '₦99,999', recurring: '₦40,000 × 6', total: '₦339,999' },
  { plan: 'Control · Yearly', price: '₦1,000,000/yr', upfront: '₦300,000', recurring: '—', total: '₦300,000' },
  { plan: 'Command · Yearly', price: '₦2,000,000/yr', upfront: '₦600,000', recurring: '—', total: '₦600,000' },
];

/* ── FAQ items ───────────────────────────────────────────── */
const faqs = [
  { q: 'How much can I earn?', a: 'There is no cap. For example, 10 referrals on the Command monthly plan can generate about ₦3.4 million over 7 months. 10 referrals on the Command yearly plan earn ₦6 million in one-time payouts. Earnings scale with the number of referrals you make.', icon: faWallet },
  { q: 'What if the restaurant subscribes for a yearly plan?', a: 'Yearly referrals earn a one-time 30% commission with no recurring payments. For example, a Command yearly referral earns you ₦600,000 in a single payout. Monthly referrals follow the standard 50% upfront plus 20% recurring for 6 months.', icon: faCalendarCheck },
  { q: 'When do I get paid?', a: "Payouts are processed within 7 business days after each qualifying event. The upfront commission is paid after the restaurant's first successful charge. Recurring commissions are paid after subsequent renewals.", icon: faClock },
  { q: 'How do I track my referrals and earnings?', a: 'After you sign up, you will be able to view referrals and earnings in the partner dashboard, including subscription status and total earnings.', icon: faChartLine },
  { q: 'Is there a minimum payout threshold?', a: 'No. Commissions are paid according to the payout schedule, with no minimum threshold.', icon: faCalculator },
  { q: 'Do I need to be technical or own a restaurant?', a: 'No. Partners typically succeed by having access to restaurant owners and managers who can benefit from SharpTable.', icon: faUser },
  { q: 'What happens if a restaurant cancels?', a: 'You keep all commissions already earned. Recurring commissions stop from the next billing cycle after cancellation, and there is no clawback.', icon: faShieldHalved },
  { q: 'Can I refer restaurants outside Nigeria?', a: 'SharpTable currently operates in Nigeria. As new markets are supported, your referral link will remain valid under the same commission structure.', icon: faCircleInfo },
];

/* ── FAQ accordion item ──────────────────────────────────── */
const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      sx={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', overflow: 'hidden' }}
    >
      <Box
        component="button"
        onClick={() => setOpen(!open)}
        sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 2, textAlign: 'left', bgcolor: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', '&:hover span': { color: '#fcd34d' } }}
        className="group"
      >
        <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '0.5rem', bgcolor: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon icon={item.icon} style={{ width: 14, height: 14, color: '#fbbf24' }} />
        </Box>
        <Typography component="span" sx={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'white', transition: 'color 0.2s' }}>
          {item.q}
        </Typography>
        <Box component={motion.div} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <FontAwesomeIcon icon={faChevronDown} style={{ width: 14, height: 14, color: '#6b7280' }} />
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
            <Typography sx={{ px: 2.5, pb: 2, pl: 8, fontSize: '0.875rem', color: 'grey.400', lineHeight: 1.625 }}>
              {item.a}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

/* ================================================================
   PartnershipInfo — main component
   ================================================================ */

export const PartnershipInfo: React.FC = () => {
  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'black' }}>
      {/* ─── How It Works ─── */}
      <Container maxWidth="md" sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 10, md: 12 }, px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mb: 7 }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>How It Works</Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 400, mx: 'auto', fontSize: '0.875rem', lineHeight: 1.625 }}>
            Four simple steps, start earning immediately.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
          {steps.map((s, i) => (
            <Box
              component={motion.div}
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              sx={{ position: 'relative', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)', p: 3, textAlign: 'center', transition: 'border-color 0.2s', '&:hover': { borderColor: 'rgba(245,158,11,0.2)' }, '&:hover .icon-box': { bgcolor: 'rgba(245,158,11,0.25)' } }}
              className="group"
            >
              <Box sx={{ position: 'absolute', top: 12, right: 16, color: 'rgba(245,158,11,0.15)', fontSize: '1.875rem', fontWeight: 900, userSelect: 'none' }}>{i + 1}</Box>
              <Box className="icon-box" sx={{ width: 48, height: 48, mx: 'auto', mb: 2, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
                <FontAwesomeIcon icon={s.icon} style={{ width: 20, height: 20, color: '#fbb117' }} />
              </Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 0.75, fontSize: '1rem' }}>{s.title}</Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '0.875rem', lineHeight: 1.625 }}>{s.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ─── Commission Structure ─── */}
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="md" sx={{ py: { xs: 10, md: 12 }, px: 3 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>Commission</Typography>
            <Typography sx={{ color: 'grey.400', maxWidth: 500, mx: 'auto', fontSize: '0.875rem', lineHeight: 1.625 }}>
              Clear terms, consistent payouts. Whether a restaurant bills monthly or yearly, your commission is calculated the same way.
            </Typography>
          </Box>

          {/* Commission cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            {commissions.map((c, i) => (
              <Box
                component={motion.div}
                key={c.label}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                sx={{
                  borderRadius: '1rem', border: '1px solid', p: 4, textAlign: 'center',
                  ...(c.accent === 'amber'
                    ? { borderColor: 'rgba(245,158,11,0.25)', bgcolor: 'rgba(245,158,11,0.03)' }
                    : { borderColor: 'rgba(16,185,129,0.25)', bgcolor: 'rgba(16,185,129,0.03)' })
                }}
              >
                <Box sx={{
                  width: 56, height: 56, mx: 'auto', mb: 2, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  ...(c.accent === 'amber' ? { bgcolor: 'rgba(245,158,11,0.15)' } : { bgcolor: 'rgba(16,185,129,0.15)' })
                }}>
                  <FontAwesomeIcon icon={c.icon} style={{ width: 24, height: 24, ...(c.accent === 'amber' ? { color: '#fbbf24' } : { color: '#34d399' }) }} />
                </Box>
                <Typography sx={{ fontSize: '3rem', fontWeight: 900, mb: 1, ...(c.accent === 'amber' ? { color: '#fbbf24' } : { color: '#34d399' }) }}>
                  {c.rate}
                </Typography>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', mb: 0.5 }}>{c.label}</Typography>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem', lineHeight: 1.625 }}>{c.desc}</Typography>
              </Box>
            ))}
          </Box>

          {/* Yearly plan callout */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ borderRadius: '0.75rem', border: '1px solid rgba(245,158,11,0.15)', bgcolor: 'rgba(245,158,11,0.04)', px: 3, py: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 5 }}
          >
            <FontAwesomeIcon icon={faStar} style={{ width: 16, height: 16, color: '#fbbf24', marginTop: 2, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.875rem', color: 'grey.300', lineHeight: 1.625 }}>
              <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>Yearly plans pay differently.</Box> Annual referrals earn a flat 30% one-time commission — ₦300,000 for Control and ₦600,000 for Command — with no recurring payments. Monthly referrals follow the 50% upfront + 20% recurring structure.
            </Typography>
          </Box>

          {/* Earnings table */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}
          >
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', px: 3, py: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
                <FontAwesomeIcon icon={faChartLine} style={{ width: 16, height: 16, color: '#fbbf24' }} />
                Example Earnings Per Referral
              </Typography>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ color: 'grey.500', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Box component="th" sx={{ textAlign: 'left', px: 3, py: 1.5, fontWeight: 500 }}>Plan</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 3, py: 1.5, fontWeight: 500 }}>Price</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 3, py: 1.5, fontWeight: 500 }}>Upfront</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 3, py: 1.5, fontWeight: 500 }}>Recurring</Box>
                    <Box component="th" sx={{ textAlign: 'right', px: 3, py: 1.5, fontWeight: 500, color: '#fbbf24' }}>You Earn</Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {earnings.map((e, index) => (
                    <Box component="tr" key={e.plan} sx={{ borderBottom: index < earnings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background-color 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                      <Box component="td" sx={{ px: 3, py: 1.75 }}>
                        <Typography component="span" sx={{ color: 'white', fontWeight: 500 }}>{e.plan}</Typography>
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 1.75, color: 'grey.400', textAlign: 'right' }}>{e.price}</Box>
                      <Box component="td" sx={{ px: 3, py: 1.75, color: '#fbbf24', textAlign: 'right', fontWeight: 500 }}>{e.upfront}</Box>
                      <Box component="td" sx={{ px: 3, py: 1.75, color: '#34d399', textAlign: 'right', fontWeight: 500 }}>{e.recurring}</Box>
                      <Box component="td" sx={{ px: 3, py: 1.75, color: 'white', textAlign: 'right', fontWeight: 700 }}>{e.total}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── CTA ─── */}
      <Container maxWidth="md" sx={{ px: 3, py: { xs: 10, md: 12 }, textAlign: 'center' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 3, borderRadius: '1rem', bgcolor: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faHandshake} style={{ width: 28, height: 28, color: '#fbbf24' }} />
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>Get Started</Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 400, mx: 'auto', fontSize: '0.875rem', lineHeight: 1.625, mb: 4 }}>
            The application takes less than 2 minutes. There are no fees and no long term commitments.
          </Typography>
          <Link to="/partnership/apply" style={{ textDecoration: 'none' }}>
            <Box
              component={motion.button}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(245,158,11,0.15)' }}
              whileTap={{ scale: 0.97 }}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.25, bgcolor: 'white', color: 'black', px: 4, py: 2, borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', border: 'none', transition: 'background-color 0.2s', '&:hover': { bgcolor: 'grey.100' }, fontFamily: 'inherit'
              }}
            >
              Apply Now
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
            </Box>
          </Link>
        </Box>
      </Container>

      {/* ─── Partnership FAQ ─── */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="md" sx={{ px: 3, py: { xs: 10, md: 12 } }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>Partnership FAQ</Typography>
            <Typography sx={{ color: 'grey.400', maxWidth: 400, mx: 'auto', fontSize: '0.875rem' }}>
              Everything you need to know before you start.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {faqs.map((f, i) => (
              <FAQItem key={i} item={f} index={i} />
            ))}
          </Box>

          {/* Bottom CTA */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            sx={{ mt: 6, textAlign: 'center' }}
          >
            <Typography sx={{ color: 'grey.500', fontSize: '0.875rem', mb: 2 }}>Still have questions?</Typography>
            <Box
              component="a"
              href="mailto:support@sharptable.com.ng"
              sx={{ color: '#fbbf24', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.875rem', fontWeight: 500, '&:hover': { color: '#fcd34d' } }}
            >
              support@sharptable.com.ng
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
