'use client';

// Growth card badge. Owner hasn't picked yet: 'Best value', 'Most popular', or '' (no badge).
const GROWTH_BADGE = 'Best value';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { usePayment, PlanType, BillingCycle } from '../contexts/PaymentContext';
import { Box, Container, Typography } from '@mui/material';

const ACCENT = '#C9A84C';
const CONTACT_HREF = 'mailto:info@sharptable.com.ng';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

// Display prices for the by-branch model.
// Checkout uses the legacy plan keys ('lite' / 'pro' / 'enterprise' and '-yearly' variants) with the Paystack plan
// codes and amounts in contexts/PaymentContext.tsx (Solo -> lite, Growth -> pro, Group -> enterprise); amounts match.
const PLANS: {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  badge: string;
  checkoutKey: { monthly: PlanType; yearly: PlanType };
}[] = [
  { name: 'Solo', description: 'For one branch.', monthly: 50_000, yearly: 500_000, badge: '', checkoutKey: { monthly: 'lite', yearly: 'lite-yearly' } },
  { name: 'Growth', description: 'For 2 to 5 branches.', monthly: 99_999, yearly: 999_990, badge: GROWTH_BADGE, checkoutKey: { monthly: 'pro', yearly: 'pro-yearly' } },
  { name: 'Group', description: 'For 6 to 10 branches.', monthly: 199_999, yearly: 1_999_990, badge: '', checkoutKey: { monthly: 'enterprise', yearly: 'enterprise-yearly' } },
];

const INCLUDED = [
  'QR ordering and digital menus',
  'Live kitchen display',
  'Admin app: sales, voids and discounts across every branch, with alerts',
  'Audit log: every void, discount and price edit, with staff name, table and time',
  'WhatsApp ordering, paid orders straight to the kitchen',
  'Staff roles and permissions',
  'Inventory and low-stock alerts',
  'Table payments and split bills',
];

const cardSx = {
  bgcolor: '#111111',
  borderRadius: '2rem',
  p: { xs: 3, md: 4 },
  border: '1px solid rgba(255,255,255,0.05)',
  display: 'flex',
  flexDirection: 'column' as const,
  minWidth: 0,
};

const buttonSx = (primary: boolean) => ({
  display: 'block',
  width: '100%',
  boxSizing: 'border-box' as const,
  textAlign: 'center' as const,
  textDecoration: 'none',
  py: 1.75,
  borderRadius: '999px',
  fontWeight: 800,
  fontSize: '1rem',
  fontFamily: 'inherit',
  transition: 'all 0.3s',
  cursor: 'pointer',
  mt: 'auto',
  ...(primary
    ? { bgcolor: ACCENT, color: 'black', border: 'none', '&:hover': { bgcolor: '#b8933f' } }
    : { bgcolor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }),
});

const PricingTiers: React.FC = () => {
  const { openPaymentModal } = usePayment();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const yearly = billingCycle === 'yearly';

  const toggleSx = (active: boolean) => ({
    px: { xs: 2.25, sm: 3 }, py: 1.25, borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 1.25, transition: 'all 0.3s',
    ...(active ? { bgcolor: '#2a2a2a', color: 'white', border: `1px solid ${ACCENT}` } : { bgcolor: 'transparent', color: 'grey.500', border: '1px solid transparent' }),
  });

  return (
    <Box component="section" id="pricing" sx={{ py: { xs: 10, md: 20 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2.5, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 4, mb: { xs: 6, md: 10 } }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h2" className="display-serif" sx={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: { xs: '2.5rem', md: '4.5rem' }, color: 'white', lineHeight: 1.05, mb: 2 }}>
              Simple pricing, by branch
            </Typography>
            <Typography sx={{ color: 'grey.400', fontSize: { xs: '1rem', md: '1.15rem' } }}>
              Every plan includes everything. You only pick the size.
            </Typography>
          </Box>

          <Box role="group" aria-label="Billing period" sx={{ display: 'flex', bgcolor: '#1a1a1a', borderRadius: '999px', p: 0.75, flexShrink: 0 }}>
            <Box component="button" type="button" aria-pressed={!yearly} onClick={() => setBillingCycle('monthly')} sx={toggleSx(!yearly)}>Monthly</Box>
            <Box component="button" type="button" aria-pressed={yearly} onClick={() => setBillingCycle('yearly')} sx={toggleSx(yearly)}>
              Yearly
              <Box component="span" sx={{ bgcolor: 'rgba(201,168,76,0.15)', color: ACCENT, px: 1.25, py: 0.25, borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, whiteSpace: 'nowrap' }}>2 months free</Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mb: 3 }}>
          <Box component="a" href="/account" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1.25, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.16)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
            <FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12 }} />
            Existing customer? Log in to manage your plan
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 3 }}>
          {PLANS.map((plan, index) => {
            const highlighted = Boolean(plan.badge);
            return (
              <Box key={plan.name} component={motion.div} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
                sx={{ ...cardSx, ...(highlighted ? { border: `1px solid ${ACCENT}` } : {}) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 4, minHeight: 28 }}>
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{plan.name}</Typography>
                  {plan.badge && (
                    <Box component="span" sx={{ px: 1.5, py: 0.5, borderRadius: '999px', bgcolor: 'rgba(201,168,76,0.15)', color: ACCENT, fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' }}>{plan.badge}</Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: { xs: '2.25rem', md: '2.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1, mb: 1, overflowWrap: 'anywhere' }}>
                  {formatPrice(yearly ? plan.yearly : plan.monthly)}
                  <Box component="span" sx={{ fontSize: '1rem', fontWeight: 500, color: 'grey.500', ml: 0.75 }}>{yearly ? '/year' : '/month'}</Box>
                </Typography>
                <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', mb: 5 }}>{plan.description}</Typography>
                {/* TODO(Back-end Developer): checkout wiring unchanged; key still maps to legacy plan code. */}
                <Box component="button" type="button" onClick={() => openPaymentModal(yearly ? plan.checkoutKey.yearly : plan.checkoutKey.monthly)} sx={buttonSx(highlighted)}>
                  Get started
                </Box>
              </Box>
            );
          })}

          <Box component={motion.div} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} sx={cardSx}>
            <Box sx={{ mb: 4, minHeight: 28, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>11+ branches</Typography>
            </Box>
            <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', mb: 5 }}>Custom pricing for larger groups.</Typography>
            <Box component="a" href={CONTACT_HREF} sx={buttonSx(false)}>Talk to us</Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, p: { xs: 3, md: 5 }, borderRadius: '2rem', bgcolor: '#0b0b0b', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography component="h3" sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', mb: 3 }}>Included in every plan</Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
            {INCLUDED.map((item) => (
              <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, color: 'grey.300', fontSize: '0.95rem', minWidth: 0 }}>
                <Box sx={{ width: 20, height: 20, mt: '2px', flexShrink: 0, borderRadius: '50%', bgcolor: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={faCheck} style={{ width: 10, height: 10, color: ACCENT }} />
                </Box>
                <span>{item}</span>
              </Box>
            ))}
          </Box>
          <Typography sx={{ mt: 3, color: 'grey.600', fontSize: '0.85rem' }}>Coming soon: listing in the SharpTable customer app.</Typography>
        </Box>

        <Box sx={{ mt: 3, ...cardSx, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, gap: 3 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h3" className="display-serif" sx={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'white', fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 1.5 }}>Hotels</Typography>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>₦3,000 per room per month, minimum ₦75,000.</Typography>
            <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', mb: 1 }}>Your restaurant, bar and other on-property outlets are included, plus the hotel tools.</Typography>
            <Typography sx={{ color: 'grey.500', fontSize: '0.9rem' }}>Example: 40 rooms = ₦120,000/month.</Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', md: 220 }, flexShrink: 0, display: 'flex' }}>
            <Box component="a" href={CONTACT_HREF} sx={buttonSx(false)}>Get a quote</Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 5, textAlign: 'center', color: 'grey.500', fontSize: '0.9rem' }}>
          No setup fees. Cancel anytime. All prices in naira.
        </Typography>
      </Container>
    </Box>
  );
};

export { PricingTiers };
