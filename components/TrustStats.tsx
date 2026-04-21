import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faUtensils, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

const LAUNCH_DATE = new Date('2025-06-01');
const BASE_RESTAURANTS = 47;

function getRestaurantsSecured(): number {
  const now = new Date();
  const weeksSinceLaunch = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(BASE_RESTAURANTS, BASE_RESTAURANTS + weeksSinceLaunch * 3);
}

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
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
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
  const restaurantsCounter = useCounter(restaurantsTarget, 2000, false);

  useEffect(() => {
    if (isInView) {
      restaurantsCounter.start();
    }
  }, [isInView]);

  return (
    <Box component="section" ref={ref} sx={{ py: { xs: 16, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', px: 2, py: 1, mb: 4 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ width: 14, height: 14, color: 'white' }} />
            <Box component="span" sx={{ color: 'white', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise Adoption</Box>
          </Box>
          <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 3 }}>
            Defending global margins.
          </Typography>
          <Typography sx={{ color: 'grey.500', maxWidth: 'md', mx: 'auto', fontSize: '1.25rem' }}>
            Elite operations don't tolerate leakage. They eradicate it completely.
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', maxWidth: '700px', mx: 'auto' }}>
          <Box sx={{ position: 'relative', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2.5rem', p: { xs: 6, md: 8 }, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
              <Box sx={{ width: 80, height: 80, mx: 'auto', mb: 5, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <FontAwesomeIcon icon={faUtensils} style={{ width: 32, height: 32, color: 'white' }} />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ fontSize: { xs: '5rem', md: '8rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {restaurantsCounter.count}+
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                  Locations Locked Down
                </Typography>
              </Box>

              <Box sx={{ color: 'grey.500', fontSize: '1rem', fontWeight: 500 }}>
                Operating with zero walkouts
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, fontSize: '0.85rem', color: 'grey.600', fontWeight: 600 }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ width: 14, height: 14, color: 'white' }} />
            <Box component="span">We process zero revenue directly. We enforce the unyielding operational gate.</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
