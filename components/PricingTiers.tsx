import React, { memo, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faXmark, faStar, faCrown, faRocket, faBuilding, faQrcode, faCartShopping, faGauge, faRobot, faCreditCard, faFileLines, faReceipt, faShield, faCode, faUsers, faClock, faTableCells, faArrowRight, faInfinity, faBolt, faUtensils, faChartPie, faClockRotateLeft, faLocationDot, faChartLine, faLock, faTag
} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { usePayment, PlanType, BillingCycle, PLAN_CONFIG } from '../contexts/PaymentContext';
import { useCurrency } from '../hooks/useCurrency';
import { Box, Container, Typography } from '@mui/material';

interface Feature {
  key: string;
  label: string;
  icon: IconDefinition;
  pro: boolean | string;
  enterprise: boolean | string;
}

const features: Feature[] = [
  { key: 'multi_location_control', label: 'Multi-location Control', icon: faLocationDot, pro: false, enterprise: true },
  { key: 'unified_view', label: 'Unified View Across Branches', icon: faChartPie, pro: false, enterprise: true },
  { key: 'advanced_analytics', label: 'Advanced Analytics', icon: faChartLine, pro: false, enterprise: true },
  { key: 'audit_trail', label: 'Audit Trail', icon: faLock, pro: true, enterprise: true },
  { key: 'super_admin', label: 'Admin', icon: faShield, pro: true, enterprise: true },
  { key: 'marshall_dashboard', label: 'Marshall Dashboard', icon: faGauge, pro: true, enterprise: true },
  { key: 'chef_dashboard', label: 'Chef/KDS Dashboard', icon: faUtensils, pro: true, enterprise: true },
  { key: 'staff_management', label: 'Staff Management', icon: faUsers, pro: true, enterprise: true },
  { key: 'daily_summary', label: 'Daily Summary', icon: faFileLines, pro: true, enterprise: true },
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
  billingCycle: BillingCycle;
  yearlyPrice?: string;
  yearlySavings?: string;
}

const FeatureRow = memo<{ feature: Feature; tierKey: 'pro' | 'enterprise'; delay: number; idx: number }>(
  ({ feature, tierKey, delay, idx }) => {
    const value = feature[tierKey];
    const isIncluded = value === true;

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1 + idx * 0.03 }}
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: isIncluded ? 'grey.300' : 'grey.600' }}
      >
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(isIncluded ? { bgcolor: 'rgba(34,197,94,0.2)', color: '#4ade80' } : { bgcolor: 'grey.800', color: 'grey.600' }) }}>
          <FontAwesomeIcon icon={isIncluded ? faCheck : faXmark} style={{ width: 12, height: 12 }} />
        </Box>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
          <FontAwesomeIcon icon={feature.icon} style={{ width: 16, height: 16 }} />
          {feature.label}
        </Box>
      </Box>
    );
  }
);

const LimitRow = memo<{ limit: Limit; tierKey: 'pro' | 'enterprise'; delay: number; idx: number }>(
  ({ limit, tierKey, delay, idx }) => {
    const value = limit[tierKey];
    const isInfinite = value === '∞' || value === 'Unlimited';

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 + idx * 0.05 }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}
      >
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.400' }}>
          <FontAwesomeIcon icon={limit.icon} style={{ width: 16, height: 16 }} />
          {limit.label}
        </Box>
        <Box component="span" sx={{ fontWeight: 600, color: isInfinite ? '#fbbf24' : 'white' }}>
          {isInfinite ? <FontAwesomeIcon icon={faInfinity} style={{ width: 16, height: 16 }} /> : value}
        </Box>
      </Box>
    );
  }
);

const TierCard = memo<TierCardProps>(({ 
  name, icon, description, price, period, tierKey, popular, accentColor, delay, priceNote, onGetStarted, billingCycle, yearlyPrice, yearlySavings
}) => {
  const visibleFeatures = useMemo(() => features.filter((f) => f[tierKey] !== false), [tierKey]);
  const displayPrice = billingCycle === 'yearly' && yearlyPrice ? yearlyPrice : price;
  const displayPeriod = billingCycle === 'yearly' ? '/year' : period;
  const planKey: PlanType = billingCycle === 'yearly' ? `${tierKey}-yearly` : tierKey;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      sx={{ position: 'relative', ...(popular ? { '@media (min-width:900px)': { mt: -2, mb: 2 } } : {}) }}
      className="group"
    >
      {/* Popular Badge */}
      {popular && (
        <Box sx={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
          <Box sx={{ background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', fontSize: '0.75rem', fontWeight: 700, px: 2, py: 0.75, borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: 0.75, boxShadow: '0 10px 15px -3px rgba(245,158,11,0.3)' }}>
            <FontAwesomeIcon icon={faStar} style={{ width: 12, height: 12 }} />
            MOST POPULAR
          </Box>
        </Box>
      )}

      {/* Yearly Savings Badge */}
      {billingCycle === 'yearly' && yearlySavings && (
        <Box sx={{ position: 'absolute', top: -16, right: 16, zIndex: 20 }}>
          <Box sx={{ background: 'linear-gradient(to right, #22c55e, #10b981)', color: 'white', fontSize: '0.75rem', fontWeight: 700, px: 1.5, py: 0.75, borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: 0.75, boxShadow: '0 10px 15px -3px rgba(34,197,94,0.3)' }}>
            <FontAwesomeIcon icon={faTag} style={{ width: 12, height: 12 }} />
            {yearlySavings}
          </Box>
        </Box>
      )}

      {/* Card */}
      <Box sx={{ position: 'relative', height: '100%', background: 'linear-gradient(to bottom right, rgba(24,24,27,1), rgba(24,24,27,1), rgba(24,24,27,0.8))', border: '1px solid', borderColor: popular ? 'rgba(245,158,11,0.5)' : 'grey.800', transition: 'border-color 0.5s', borderRadius: '1.5rem', p: 4, overflow: 'hidden', '&:hover': { borderColor: 'rgba(245,158,11,0.4)' } }}>
        {/* Shine Effect */}
        <Box sx={{ position: 'absolute', top: 0, left: 32, right: 32, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', transition: 'background 0.5s', '.group:hover &': { background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)' } }} />

        <Box sx={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '0.75rem', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s', '.group:hover &': { transform: 'scale(1.1)' } }}>
              <FontAwesomeIcon icon={icon} style={{ width: 20, height: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{name}</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'grey.500' }}>{description}</Typography>
            </Box>
          </Box>

          {/* Price */}
          <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid', borderColor: 'grey.800' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography sx={{ fontSize: '2.25rem', fontWeight: 700, color: 'white' }}>{displayPrice}</Typography>
              <Typography sx={{ color: 'grey.500' }}>{displayPeriod}</Typography>
            </Box>
            {billingCycle === 'yearly' && (
              <Typography sx={{ fontSize: '0.875rem', color: '#4ade80', mt: 1 }}>Billed annually</Typography>
            )}
            {priceNote && billingCycle === 'monthly' && (
              <Box sx={{ mt: 1.5, borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: 2 }}>
                {priceNote}
              </Box>
            )}
          </Box>

          {/* Features List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'grey.500', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>Features</Typography>
            {visibleFeatures.map((feature, idx) => (
              <FeatureRow key={feature.key} feature={feature} tierKey={tierKey} delay={delay} idx={idx} />
            ))}
          </Box>

          {/* Limits */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'grey.500', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>Limits</Typography>
            {limits.map((limit, idx) => (
              <LimitRow key={limit.key} limit={limit} tierKey={tierKey} delay={delay} idx={idx} />
            ))}
          </Box>

          {/* CTA Button */}
          <Box
            component="button"
            onClick={() => onGetStarted(planKey)}
            sx={{
              width: '100%', py: 2, borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              ...(popular ? {
                background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)', '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.4)', transform: 'scale(1.02)' }, '&:active': { transform: 'scale(0.98)' }
              } : {
                bgcolor: 'grey.800', color: 'white', border: '1px solid', borderColor: 'grey.700', '&:hover': { bgcolor: 'grey.700', borderColor: 'grey.600', transform: 'scale(1.02)' }, '&:active': { transform: 'scale(0.98)' }
              })
            }}
          >
            Get Started
            <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export const PricingTiers: React.FC = () => {
  const { openPaymentModal } = usePayment();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const { convertFromNaira, isLoading: isCurrencyLoading } = useCurrency();

  // Memoize tier configurations to prevent recreation
  const tierConfigs = useMemo(
    () => {
      // Get prices from config and convert
      const proMonthly = parseInt(PLAN_CONFIG.pro.price);
      const proYearly = parseInt(PLAN_CONFIG['pro-yearly'].price);
      const enterpriseMonthly = parseInt(PLAN_CONFIG.enterprise.price);
      const enterpriseYearly = parseInt(PLAN_CONFIG['enterprise-yearly'].price);

      return [
        {
          name: "Control",
          icon: faCrown,
          description: "Everything you need to run a tight, leak-free restaurant — nothing extra.",
          price: convertFromNaira(proMonthly),
          period: "/month",
          tierKey: "pro" as const,
          popular: true,
          accentColor: "linear-gradient(to bottom right, #f59e0b, #f97316)",
          delay: 0,
          billingCycle,
          yearlyPrice: convertFromNaira(proYearly),
          yearlySavings: "Save ~17%",
          priceNote: (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1.5, fontSize: '0.875rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box component="span" sx={{ color: 'grey.400' }}>Monthly</Box>
                <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{convertFromNaira(proMonthly)}</Box>
              </Box>
              <Box sx={{ fontSize: '0.75rem', color: 'grey.500' }}>For single-location restaurants that want clarity and control.</Box>
            </Box>
          )
        },
        {
          name: "Command",
          icon: faBuilding,
          description: "Multiple branches? See everything, control everything — from one place.",
          price: convertFromNaira(enterpriseMonthly),
          period: "/month",
          tierKey: "enterprise" as const,
          accentColor: "linear-gradient(to bottom right, #a855f7, #ec4899)",
          delay: 0.1,
          billingCycle,
          yearlyPrice: convertFromNaira(enterpriseYearly),
          yearlySavings: "Save ~17%",
          priceNote: (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1.5, fontSize: '0.875rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box component="span" sx={{ color: 'grey.400' }}>Enterprise</Box>
                <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{convertFromNaira(enterpriseMonthly)}<Box component="span" sx={{ color: 'grey.500', fontWeight: 400 }}>/mo</Box></Box>
              </Box>
              <Box sx={{ fontSize: '0.75rem', color: 'grey.500' }}>Unlimited locations, tables, staff, and history — for owners who are expanding.</Box>
            </Box>
          )
        }
      ];
    },
    [billingCycle, convertFromNaira]
  );

  return (
    <Box component="section" id="pricing" sx={{ py: { xs: 16, md: 24 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects - Simplified for performance */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.05) 0%, transparent 50%)' }} />
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at bottom, rgba(139,92,246,0.05) 0%, transparent 50%)' }} />
      
      {/* Static Orbs - No animation for better performance */}
      <Box sx={{ position: 'absolute', top: 80, left: 40, width: 288, height: 288, bgcolor: 'rgba(245,158,11,0.1)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }} />
      <Box sx={{ position: 'absolute', bottom: 80, right: 40, width: 384, height: 384, bgcolor: 'rgba(168,85,247,0.1)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}
        >
          {/* Badge */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, background: 'linear-gradient(to right, rgba(245,158,11,0.2), rgba(249,115,22,0.1), rgba(245,158,11,0.2))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '9999px', px: 2.5, py: 1, mb: 3 }}>
            <FontAwesomeIcon icon={faBolt} style={{ width: 16, height: 16, color: '#f59e0b' }} />
            <Box component="span" sx={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.025em' }}>TRANSPARENT PRICING</Box>
          </Box>

          {/* Title */}
          <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' }, fontWeight: 700, mb: 3, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Simple pricing.{' '}
            <Box component="span" sx={{ position: 'relative', display: 'inline-block' }}>
              <Box component="span" sx={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #fbbf24, #f97316, #ef4444)' }}>
                No surprises.
              </Box>
              <Box sx={{ position: 'absolute', bottom: -8, left: 0, right: 0, height: 4, background: 'linear-gradient(to right, #fbbf24, #f97316, #ef4444)', borderRadius: '9999px' }} />
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: 'grey.400', maxWidth: 'md', mx: 'auto', mb: 2 }}>
            Pick the plan that fits your restaurant today. 
            <Box component="span" sx={{ color: 'white', fontWeight: 500 }}>{" "}You can always upgrade later — no pressure.</Box>
          </Typography>

          {/* Prices always shown in USD */}
          <Typography sx={{ fontSize: '0.875rem', color: 'grey.500', mb: 4 }}>
            Prices in USD • billed via Paystack at current rates
          </Typography>

          {/* Billing Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Box
              component="button"
              onClick={() => setBillingCycle('monthly')}
              sx={{
                px: 3, py: 1.5, borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.3s', cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                ...(billingCycle === 'monthly'
                  ? { background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)' }
                  : { bgcolor: 'grey.800', color: 'grey.400', '&:hover': { bgcolor: 'grey.700' }, border: '1px solid', borderColor: 'grey.700' })
              }}
            >
              Monthly
            </Box>
            <Box
              component="button"
              onClick={() => setBillingCycle('yearly')}
              sx={{
                px: 3, py: 1.5, borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                ...(billingCycle === 'yearly'
                  ? { background: 'linear-gradient(to right, #22c55e, #10b981)', color: 'white', boxShadow: '0 10px 15px -3px rgba(34,197,94,0.25)' }
                  : { bgcolor: 'grey.800', color: 'grey.400', '&:hover': { bgcolor: 'grey.700' }, border: '1px solid', borderColor: 'grey.700' })
              }}
            >
              Yearly
              <Box component="span" sx={{
                px: 1, py: 0.25, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                ...(billingCycle === 'yearly' ? { bgcolor: 'rgba(255,255,255,0.2)', color: 'white' } : { bgcolor: 'rgba(34,197,94,0.2)', color: '#4ade80' })
              }}>
                Save up to 35%
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Pricing Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, lg: 4 }, maxWidth: 'lg', mx: 'auto' }}>
          {isCurrencyLoading ? (
            <>
              <Box sx={{ height: 600, bgcolor: 'grey.900', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <Box sx={{ height: 600, bgcolor: 'grey.900', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </>
          ) : (
            tierConfigs.map((config) => (
              <TierCard key={`${config.tierKey}-${billingCycle}`} {...config} onGetStarted={openPaymentModal} />
            ))
          )}
        </Box>

        {/* Quick Comparison Table */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ mt: { xs: 10, md: 12 }, maxWidth: 'md', mx: 'auto' }}
        >
          <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', textAlign: 'center', mb: 4 }}>Quick Comparison</Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
              <Box component="thead">
                <Box component="tr" sx={{ borderBottom: '1px solid', borderColor: 'grey.800' }}>
                  <Box component="th" sx={{ textAlign: 'left', py: 2, px: 2, color: 'grey.400', fontWeight: 500, fontSize: '0.875rem' }}>Feature</Box>
                  <Box component="th" sx={{ textAlign: 'center', py: 2, px: 2, color: '#fbbf24', fontWeight: 700 }}>Control<Box component="br" /><Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 400, color: 'grey.500' }}>{convertFromNaira(99999)}/mo</Box></Box>
                  <Box component="th" sx={{ textAlign: 'center', py: 2, px: 2, color: '#c084fc', fontWeight: 700 }}>Command<Box component="br" /><Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 400, color: 'grey.500' }}>{convertFromNaira(199999)}/mo</Box></Box>
                </Box>
              </Box>
              <Box component="tbody">
                {[
                  { feature: 'Payment Gate System', control: true, command: true },
                  { feature: 'Marshall Dashboard', control: true, command: true },
                  { feature: 'Full Audit Trail', control: true, command: true },
                  { feature: 'Staff Management', control: true, command: true },
                  { feature: 'Daily Summary Reports', control: true, command: true },
                  { feature: 'Max Tables', control: '50', command: 'Unlimited' },
                  { feature: 'Max Staff', control: '15', command: 'Unlimited' },
                  { feature: 'Locations', control: '1', command: 'Unlimited' },
                  { feature: 'Order History', control: '90 days', command: 'Unlimited' },
                  { feature: 'Multi-location Control', control: false, command: true },
                  { feature: 'Advanced Analytics', control: false, command: true },
                  { feature: 'Feature Overrides', control: false, command: true },
                ].map((row, idx) => (
                  <Box component="tr" key={idx} sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                    <Box component="td" sx={{ py: 1.5, px: 2, color: 'grey.300', fontSize: '0.875rem' }}>{row.feature}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: 'center' }}>
                      {typeof row.control === 'boolean' ? (
                        row.control ? (
                          <FontAwesomeIcon icon={faCheck} style={{ width: 16, height: 16, color: '#22c55e' }} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} style={{ width: 16, height: 16, color: '#4b5563' }} />
                        )
                      ) : (
                        <Box component="span" sx={{ color: 'grey.300', fontSize: '0.875rem' }}>{row.control}</Box>
                      )}
                    </Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: 'center' }}>
                      {typeof row.command === 'boolean' ? (
                        row.command ? (
                          <FontAwesomeIcon icon={faCheck} style={{ width: 16, height: 16, color: '#22c55e' }} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} style={{ width: 16, height: 16, color: '#4b5563' }} />
                        )
                      ) : (
                        <Box component="span" sx={{ fontSize: '0.875rem', ...(row.command === 'Unlimited' ? { color: '#fbbf24', fontWeight: 500 } : { color: 'grey.300' }) }}>{row.command}</Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Note */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{ mt: { xs: 10, md: 12 }, textAlign: 'center' }}
        >
          <Typography sx={{ color: 'grey.500', fontSize: '0.875rem', mb: 2 }}>
            Every plan includes 24/7 support, secure cloud hosting, and automatic updates. No hidden fees.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, fontSize: '0.875rem', color: 'grey.400' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FontAwesomeIcon icon={faCheck} style={{ width: 16, height: 16, color: '#22c55e' }} />
              No setup fees
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FontAwesomeIcon icon={faCheck} style={{ width: 16, height: 16, color: '#22c55e' }} />
              Cancel anytime — no lock-in
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FontAwesomeIcon icon={faCheck} style={{ width: 16, height: 16, color: '#22c55e' }} />
              Free migration from any system
            </Box>
          </Box>

          {/* Payment Methods */}
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.75rem', color: 'grey.500' }}>
              <FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12 }} />
              Secure payments powered by Paystack
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ color: '#9ca3af', '&:hover': { color: '#1A1F71' }, transition: 'color 0.2s', cursor: 'pointer', lineHeight: 0 }}>
                <FontAwesomeIcon icon={faCcVisa} style={{ width: 40, height: 40, color: 'inherit' }} />
              </Box>
              <Box sx={{ color: '#9ca3af', '&:hover': { color: '#EB001B' }, transition: 'color 0.2s', cursor: 'pointer', lineHeight: 0 }}>
                <FontAwesomeIcon icon={faCcMastercard} style={{ width: 40, height: 40, color: 'inherit' }} />
              </Box>
              <Box sx={{ color: '#9ca3af', '&:hover': { color: '#006FCF' }, transition: 'color 0.2s', cursor: 'pointer', lineHeight: 0 }}>
                <FontAwesomeIcon icon={faCcAmex} style={{ width: 40, height: 40, color: 'inherit' }} />
              </Box>
              <Box sx={{ px: 1, py: 0.5, bgcolor: 'grey.700', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: 'grey.400', transition: 'all 0.2s', '&:hover': { bgcolor: '#00425F', color: 'white' } }}>VERVE</Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
