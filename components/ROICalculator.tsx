'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRight, faChartLine, faUtensils, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const ROICalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(25000000);
  const [estimatedLeakage, setEstimatedLeakage] = useState<number>(10);

  const calculations = useMemo(() => {
    const annualRevenue = monthlyRevenue * 12;
    const currentLeakage = (annualRevenue * estimatedLeakage) / 100;
    const recoveredWithSharpTable = currentLeakage * 0.90; // 90% strict recovery
    const annualCost = 200000 * 12; // Enterprise tier (200k/mo)
    const netSavings = recoveredWithSharpTable - annualCost;
    const roi = ((netSavings / annualCost) * 100).toFixed(0);

    return { annualRevenue, currentLeakage, recoveredWithSharpTable, annualCost, netSavings, roi: Number(roi) > 0 ? roi : '0' };
  }, [monthlyRevenue, estimatedLeakage]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <Box component="section" sx={{ py: { xs: 16, md: 24 }, bgcolor: '#000000', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 10, md: 16 } }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', px: 2, py: 1, mb: 4 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
            <Box component="span" sx={{ color: 'grey.300', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projection Model</Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 3 }}>
            Unmask your margin leakage.
          </Typography>
          <Typography sx={{ color: 'grey.500', maxWidth: 'md', mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6 }}>
            Run the undeniable math. Fraud, unregulated voids, and unaccounted tickets devour enterprise revenue silently. See exactly what you recover when the gate is locked.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 4, lg: 8 }, alignItems: 'start' }}>
          {/* Input Section */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2rem', p: { xs: 4, md: 6 } }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
              <FontAwesomeIcon icon={faUtensils} style={{ width: 20, height: 20, color: 'white' }} />
              Operational Parameters
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.95rem' }}>Aggregated Monthly Revenue</Typography>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>{formatCurrency(monthlyRevenue)}</Typography>
              </Box>
              <Box
                component="input"
                type="range"
                min="5000000"
                max="250000000"
                step="1000000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                sx={{
                  width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '2px', appearance: 'none', outline: 'none', cursor: 'pointer',
                  '&::-webkit-slider-thumb': { appearance: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: 'white' }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'grey.600', mt: 1.5, fontWeight: 500 }}>
                <Box component="span">₦5M</Box>
                <Box component="span">₦250M</Box>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.95rem' }}>Estimated Leakage (Theft, Comps, Voids)</Typography>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>{estimatedLeakage}%</Typography>
              </Box>
              <Box
                component="input"
                type="range"
                min="3"
                max="20"
                step="1"
                value={estimatedLeakage}
                onChange={(e) => setEstimatedLeakage(Number(e.target.value))}
                sx={{
                  width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '2px', appearance: 'none', outline: 'none', cursor: 'pointer',
                  '&::-webkit-slider-thumb': { appearance: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: 'white' }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'grey.600', mt: 1.5, fontWeight: 500 }}>
                <Box component="span">3% (Optimistic)</Box>
                <Box component="span">20% (Critical)</Box>
              </Box>
            </Box>

            <Box sx={{ p: 4, borderRadius: '1.5rem', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ width: 24, height: 24, color: 'grey', marginTop: 4 }} />
                <Box>
                  <Typography sx={{ color: 'grey.400', fontWeight: 600, fontSize: '0.85rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projected Capital Hemorrhage</Typography>
                  <Typography sx={{ color: 'white', fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 900 }}>{formatCurrency(calculations.currentLeakage)}<Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'grey.600' }}>/year</Box></Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Results Section */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            sx={{ bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem', p: { xs: 4, md: 6 } }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
              <FontAwesomeIcon icon={faChartLine} style={{ width: 20, height: 20, color: 'white' }} />
              Executive Recovery Strategy
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderRadius: '1rem', bgcolor: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography sx={{ color: 'grey.500', fontSize: '0.95rem' }}>Strict Target Recovery (90%)</Typography>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.125rem' }}>{formatCurrency(calculations.recoveredWithSharpTable)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderRadius: '1rem', bgcolor: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography sx={{ color: 'grey.500', fontSize: '0.95rem' }}>Technology Allocation (Enterprise Plan)</Typography>
                <Typography sx={{ color: 'grey.300', fontWeight: 600 }}>-{formatCurrency(calculations.annualCost)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderRadius: '1rem', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography sx={{ color: 'white', fontWeight: 800 }}>Net Capital Preserved</Typography>
                <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.75rem' }}>{formatCurrency(calculations.netSavings)}</Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center', p: 4, borderRadius: '1.5rem', bgcolor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', mb: 6 }}>
              <Typography sx={{ color: 'grey.500', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, mb: 1 }}>Guaranteed ROI</Typography>
              <Typography sx={{ fontSize: '4rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>{calculations.roi}%</Typography>
            </Box>

            <Box
              component="button"
              onClick={() => window.location.href = 'mailto:info@sharptable.com.ng'}
              sx={{ width: '100%', py: 3, borderRadius: '9999px', bgcolor: 'white', color: 'black', fontWeight: 800, fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, cursor: 'pointer', border: 'none', '&:hover': { bgcolor: 'grey.200' } }}
            >
              Seal the Leakage Today
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
