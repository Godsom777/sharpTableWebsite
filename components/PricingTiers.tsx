'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { usePayment, PlanType, BillingCycle, BASE_PRICES_NGN } from '../contexts/PaymentContext';
import { useCurrency } from '../hooks/useCurrency';
import { Box, Container, Typography } from '@mui/material';

const PricingTiers: React.FC = () => {
  const { openPaymentModal } = usePayment();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const { convertFromNaira, isLoading: isCurrencyLoading } = useCurrency();

  const tierConfigs = useMemo(() => {
    const periodLabel = billingCycle === 'monthly' ? '1 Month' : '1 Year';

    return [
      {
        name: 'Lite Plan',
        periodDelay: periodLabel,
        price: convertFromNaira(billingCycle === 'monthly' ? BASE_PRICES_NGN.lite : BASE_PRICES_NGN['lite-yearly']),
        description: 'QR code order viewing, perfect for single locations getting started.',
        features: [
          '1 Location Included',
          'QR Code Digital Menus',
          'Real-time KDS Access'
        ],
        active: false,
        key: (billingCycle === 'monthly' ? 'lite' : 'lite-yearly') as PlanType
      },
      {
        name: 'Pro Plan',
        periodDelay: periodLabel,
        price: convertFromNaira(billingCycle === 'monthly' ? BASE_PRICES_NGN.pro : BASE_PRICES_NGN['pro-yearly']),
        description: 'Tight control with complete direct ordering features.',
        features: [
          'Everything in Lite, plus:',
          'Up to 2 Locations',
          'Guest Ordering & Room Service',
          'Staff & Role Management'
        ],
        active: true,
        key: (billingCycle === 'monthly' ? 'pro' : 'pro-yearly') as PlanType
      },
      {
        name: 'Enterprise Plan',
        periodDelay: periodLabel,
        price: convertFromNaira(billingCycle === 'monthly' ? BASE_PRICES_NGN.enterprise : BASE_PRICES_NGN['enterprise-yearly']),
        description: 'Built for serious operators with multiple branches.',
        features: [
          'Everything in Pro, plus:',
          'Unlimited Locations Max',
          'Enterprise WhatsApp Ordering',
          'Hotel Visitor Tracking Suite',
          'Food Inventory & Tracking'
        ],
        active: false,
        key: (billingCycle === 'monthly' ? 'enterprise' : 'enterprise-yearly') as PlanType
      }
    ];
  }, [billingCycle, convertFromNaira]);

  return (
    <Box component="section" id="pricing" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2.5, md: 4 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: { xs: 8, md: 16 } }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', mb: 2 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
              Our Pricing
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '5rem', lg: '6.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1 }}>
              Pricing
              <Box component="sup" sx={{ fontSize: '2rem', ml: 1, color: 'grey.500', fontWeight: 700 }}>(3)</Box>
            </Typography>
          </Box>

          {/* Pill Toggle like "Standard / Premium" */}
          <Box sx={{ display: 'flex', bgcolor: '#1a1a1a', borderRadius: '999px', p: 0.75, mt: { xs: 4, md: 0 } }}>
            <Box
              component="button"
              onClick={() => setBillingCycle('monthly')}
              sx={{
                px: 3, py: 1.5, borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                transition: 'all 0.3s',
                ...(billingCycle === 'monthly' ? { bgcolor: '#2a2a2a', color: 'white', border: '1px solid #C9A84C' } : { bgcolor: 'transparent', color: 'grey.500' }),
              }}
            >
              Monthly
            </Box>
            <Box
              component="button"
              onClick={() => setBillingCycle('yearly')}
              sx={{
                px: 3, py: 1.5, borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                transition: 'all 0.3s',
                ...(billingCycle === 'yearly' ? { bgcolor: '#2a2a2a', color: 'white', border: '1px solid #C9A84C' } : { bgcolor: 'transparent', color: 'grey.500' }),
              }}
            >
              Yearly
            </Box>
          </Box>
        </Box>

        {isCurrencyLoading ? (
            <Box sx={{ height: 600, bgcolor: 'grey.900', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        ) : (
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Box
                component="a"
                href="/account"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 1.25,
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                <FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12 }} />
                Existing customer? Log in to manage your plan
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
              {tierConfigs.map((config, index) => (
                <Box
                  key={config.name}
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  sx={{ 
                    bgcolor: '#111111', 
                    borderRadius: '2rem', 
                    p: { xs: 3, md: 5 },
                    border: config.active ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                       <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
                       <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{config.name}</Typography>
                    </Box>
                    <Box sx={{ px: 2, py: 0.5, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', color: 'grey.400', fontSize: '0.75rem', fontWeight: 600 }}>
                      {config.periodDelay}
                    </Box>
                  </Box>

                  <Typography sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1, mb: 1 }}>
                    {config.price}
                    <Box component="span" sx={{ fontSize: '1rem', fontWeight: 500, color: 'grey.500', display: 'inline-block', ml: 1 }}>
                      {billingCycle === 'monthly' ? '/mo' : '/yr'}
                    </Box>
                  </Typography>
                  
                  <Typography sx={{ color: 'grey.400', fontSize: '0.9rem', mb: 6, minHeight: 40 }}>
                    {config.description}
                  </Typography>

                  <Box
                    component="button"
                    onClick={() => openPaymentModal(config.key)}
                    sx={{
                      w: '100%',
                      py: 2,
                      borderRadius: '999px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      mb: 8,
                      cursor: 'pointer',
                      border: 'none',
                      ...(config.active
                        ? { bgcolor: '#C9A84C', color: 'black', '&:hover': { transform: 'scale(1.02)', bgcolor: '#b8933f' } }
                        : { bgcolor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }),
                    }}
                  >
                    Choose Plan
                  </Box>

                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1rem', mb: 4 }}>
                    What's included:
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {config.features.map(feat => {
                      const isCumulative = feat.includes('Everything in');
                      return (
                        <Box key={feat} sx={{ display: 'flex', alignItems: 'center', gap: 2, color: isCumulative ? 'white' : 'grey.400', fontSize: '0.9rem', fontWeight: isCumulative ? 700 : 400 }}>
                          <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: isCumulative ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faCheck} style={{ width: 10, height: 10, color: isCumulative ? '#C9A84C' : 'white' }} />
                          </Box>
                          {feat}
                        </Box>
                      );
                    })}
                  </Box>

                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export { PricingTiers };
