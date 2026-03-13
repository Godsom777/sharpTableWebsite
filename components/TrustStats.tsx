import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faCoins,
  faArrowTrendUp,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

// Calculate restaurants secured: starts at base, +3 every week since launch
const LAUNCH_DATE = new Date('2025-06-01'); // Adjust to your actual launch date
const BASE_RESTAURANTS = 47; // Starting number

function getRestaurantsSecured(): number {
  const now = new Date();
  const weeksSinceLaunch = Math.floor(
    (now.getTime() - LAUNCH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return BASE_RESTAURANTS + weeksSinceLaunch * 3;
}

// Calculate revenue saved: base amount + growth over time
const BASE_REVENUE_SAVED = 12.5; // Starting millions
const WEEKLY_REVENUE_GROWTH = 0.8; // Millions per week

function getRevenueSaved(): number {
  const now = new Date();
  const weeksSinceLaunch = Math.floor(
    (now.getTime() - LAUNCH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return BASE_REVENUE_SAVED + weeksSinceLaunch * WEEKLY_REVENUE_GROWTH;
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, start: () => setHasStarted(true) };
}

export const TrustStats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const restaurantsTarget = getRestaurantsSecured();
  const revenueTarget = getRevenueSaved();

  const restaurantsCounter = useCounter(restaurantsTarget, 2000, false);
  const revenueCounter = useCounter(Math.floor(revenueTarget * 10), 2500, false); // x10 for decimal precision

  useEffect(() => {
    if (isInView) {
      restaurantsCounter.start();
      revenueCounter.start();
    }
  }, [isInView]);

  return (
    <Box component="section" ref={ref} sx={{ py: { xs: 10, md: 14 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.03) 0%, transparent 50%)' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '9999px', px: 2, py: 0.75, mb: 2 }}>
            <FontAwesomeIcon icon={faArrowTrendUp} style={{ width: 16, height: 16, color: '#4ade80' }} />
            <Box component="span" sx={{ color: '#4ade80', fontWeight: 600, fontSize: '0.875rem' }}>Live Impact</Box>
          </Box>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>
            Already stopping leaks worldwide
          </Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 'md', mx: 'auto' }}>
            Restaurants using SharpTable don't chase payments. They collect them upfront.
          </Typography>
        </Box>

        {/* Dramatic Stat Display */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          sx={{ position: 'relative', maxWidth: '672px', mx: 'auto' }}
        >
          {/* Animated background glow */}
          <Box
            component={motion.div}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, #f59e0b, #ea580c)', filter: 'blur(100px)', borderRadius: '50%' }}
          />

          {/* Main card */}
          <Box sx={{ position: 'relative', background: 'linear-gradient(to bottom right, rgba(24,24,27,0.9), rgba(24,24,27,0.95), black)', border: '2px solid rgba(245,158,11,0.3)', borderRadius: '1.5rem', p: { xs: 6, md: 8 }, overflow: 'hidden', boxShadow: 24 }}>
            {/* Animated background pattern */}
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
              <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </Box>

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
              {/* Icon */}
              <Box
                component={motion.div}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                sx={{ width: { xs: 80, md: 96 }, height: { xs: 80, md: 96 }, mx: 'auto', mb: 4, borderRadius: '1rem', background: 'linear-gradient(to bottom right, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 25px 50px -12px rgba(245,158,11,0.5)' }}
              >
                <FontAwesomeIcon icon={faUtensils} style={{ width: 40, height: 40, color: 'white' }} />
              </Box>

              {/* Counter */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                sx={{ mb: 2 }}
              >
                <Box sx={{ fontSize: { xs: '4.5rem', md: '6rem' }, fontWeight: 900, color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to bottom right, #fbbf24, #f59e0b, #ea580c)', mb: 1, lineHeight: 1 }}>
                  {restaurantsCounter.count}+
                </Box>
              </Box>

              {/* Label */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                sx={{ mb: 1.5 }}
              >
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', letterSpacing: '-0.025em' }}>
                  Restaurants Protected
                </Typography>
              </Box>

              {/* Subtext */}
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                sx={{ color: 'grey.400', fontSize: '1.125rem' }}
              >
                No more unpaid orders
              </Box>

              {/* Decorative line */}
              <Box
                component={motion.div}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                sx={{ mt: 4, height: 1, width: 128, mx: 'auto', background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)' }}
              />
            </Box>

            {/* Corner accents */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, borderTop: '2px solid rgba(245,158,11,0.3)', borderLeft: '2px solid rgba(245,158,11,0.3)', borderTopLeftRadius: '1.5rem' }} />
            <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderBottom: '2px solid rgba(245,158,11,0.3)', borderRight: '2px solid rgba(245,158,11,0.3)', borderBottomRightRadius: '1.5rem' }} />
          </Box>
        </Box>

        {/* Privacy message */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontSize: '0.875rem', color: 'grey.500' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ width: 16, height: 16, color: '#f59e0b' }} />
            <Box component="span">We don't see your revenue. We don't touch your money. We just lock the gate.</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
