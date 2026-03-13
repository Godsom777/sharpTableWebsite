import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faCoins, 
  faArrowRight, 
  faChartLine,
  faUtensils,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const ROICalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000);
  const [estimatedLeakage, setEstimatedLeakage] = useState<number>(8);

  const calculations = useMemo(() => {
    const annualRevenue = monthlyRevenue * 12;
    const currentLeakage = (annualRevenue * estimatedLeakage) / 100;
    const recoveredWithSharpTable = currentLeakage * 0.85; // 85% recovery rate
    const annualCost = 65 * 12; // Control tier
    const netSavings = recoveredWithSharpTable - annualCost;
    const roi = ((netSavings / annualCost) * 100).toFixed(0);

    return {
      annualRevenue,
      currentLeakage,
      recoveredWithSharpTable,
      annualCost,
      netSavings,
      roi: Number(roi) > 0 ? roi : '0'
    };
  }, [monthlyRevenue, estimatedLeakage]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box component="section" sx={{ py: { xs: 16, md: 24 }, bgcolor: '#09090b', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom, rgba(251,191,36,0.05) 0%, transparent 50%)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 10, md: 12 } }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '9999px', px: 2, py: 0.75, mb: 2 }}>
            <FontAwesomeIcon icon={faCalculator} style={{ width: 16, height: 16, color: '#fbbf24' }} />
            <Box component="span" sx={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.875rem' }}>ROI Calculator</Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>
            "We're not losing money." Are you sure?
          </Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 'md', mx: 'auto', fontSize: { xs: '1rem', md: '1.125rem' } }}>
            Walkouts, cash that doesn't add up, orders with no record — most owners don't realize the total. Slide the numbers and see for yourself.
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
            sx={{ bgcolor: 'rgba(24,24,27,0.8)', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', p: { xs: 4, md: 5 } }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
              <FontAwesomeIcon icon={faUtensils} style={{ width: 20, height: 20, color: '#fbbf24' }} />
              Plug in your numbers
            </Typography>

            {/* Monthly Revenue Slider */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem' }}>What you make monthly</Typography>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(monthlyRevenue)}</Typography>
              </Box>
              <Box
                component="input"
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                sx={{
                  width: '100%', height: 8, bgcolor: 'grey.700', borderRadius: '4px', appearance: 'none', cursor: 'pointer', outline: 'none',
                  '&::-webkit-slider-thumb': { appearance: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: '#f59e0b' }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'grey.500', mt: 1 }}>
                <Box component="span">$5k</Box>
                <Box component="span">$100k</Box>
              </Box>
            </Box>

            {/* Leakage Estimate Slider */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                  What's slipping through the cracks
                  <Box component="span" sx={{ color: '#fbbf24', fontSize: '0.75rem' }}>(walkouts + errors + theft)</Box>
                </Typography>
                <Typography sx={{ color: '#f87171', fontWeight: 700, fontSize: '1.125rem' }}>{estimatedLeakage}%</Typography>
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
                  width: '100%', height: 8, bgcolor: 'grey.700', borderRadius: '4px', appearance: 'none', cursor: 'pointer', outline: 'none',
                  '&::-webkit-slider-thumb': { appearance: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: '#ef4444' }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'grey.500', mt: 1 }}>
                <Box component="span">3% (Low)</Box>
                <Box component="span">20% (High)</Box>
              </Box>
            </Box>

            {/* Warning Box */}
            <Box sx={{ p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ width: 20, height: 20, color: '#f87171', marginTop: 2 }} />
                <Box>
                  <Typography sx={{ color: '#f87171', fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>That's money walking out your door</Typography>
                  <Typography sx={{ color: '#fca5a5', fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700 }}>{formatCurrency(calculations.currentLeakage)}<Box component="span" sx={{ fontSize: '1rem', fontWeight: 400 }}>/year</Box></Typography>
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
            sx={{ background: 'linear-gradient(to bottom right, rgba(245,158,11,0.1), rgba(24,24,27,0.8), rgba(24,24,27,0.8))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '1.5rem', p: { xs: 4, md: 5 } }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
              <FontAwesomeIcon icon={faChartLine} style={{ width: 20, height: 20, color: '#4ade80' }} />
              What SharpTable recovers
            </Typography>

            {/* Recovery Stats */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem' }}>Money recovered per year</Typography>
                <Typography sx={{ color: '#4ade80', fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(calculations.recoveredWithSharpTable)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem' }}>What SharpTable costs you (Control plan)</Typography>
                <Typography sx={{ color: 'grey.300', fontWeight: 500 }}>-{formatCurrency(calculations.annualCost)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Typography sx={{ color: '#4ade80', fontWeight: 600 }}>What stays in your pocket</Typography>
                <Typography sx={{ color: '#4ade80', fontWeight: 700, fontSize: '1.5rem' }}>{formatCurrency(calculations.netSavings)}</Typography>
              </Box>
            </Box>

            {/* ROI Highlight */}
            <Box sx={{ textAlign: 'center', p: 3, borderRadius: '1rem', bgcolor: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)', mb: 4 }}>
              <Typography sx={{ color: '#fcd34d', fontSize: '0.875rem', mb: 0.5 }}>Your return on investment</Typography>
              <Typography sx={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>{calculations.roi}%</Typography>
              <Typography sx={{ color: 'rgba(252,211,77,0.7)', fontSize: '0.75rem', mt: 1 }}>Based on 85% leakage recovery — most owners see results in the first month</Typography>
            </Box>

            {/* CTA */}
            <Box
              component="button"
              onClick={() => window.location.href = 'mailto:info@sharptable.com.ng'}
              sx={{ width: '100%', py: 2, borderRadius: '0.75rem', background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)', transition: 'all 0.3s', cursor: 'pointer', border: 'none', '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.4)', transform: 'scale(1.02)' }, '&:active': { transform: 'scale(0.98)' } }}
            >
              Stop the leakage — talk to us
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
            </Box>
          </Box>
        </Box>

        {/* Bottom Note */}
        <Box
          component={motion.p}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{ textAlign: 'center', color: 'grey.500', fontSize: '0.75rem', mt: 6 }}
        >
          * These numbers are estimates based on industry averages. Your actual results depend on your restaurant — but the leakage is real.
        </Box>
      </Container>
    </Box>
  );
};
