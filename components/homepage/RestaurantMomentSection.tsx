'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';

// Load InteractiveParticles with ssr: false for client canvas rendering
const InteractiveParticles = dynamic(
  () => import('./InteractiveParticles'),
  { ssr: false, loading: () => <Box sx={{ width: '100%', height: '60vh', bgcolor: '#080808', borderRadius: '1.25rem' }} /> }
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/**
 * Restaurant Moment — Section 2
 * Full-width restaurant photography with signature InteractiveParticles (chaos→calm)
 * and editorial storytelling.
 */
export const RestaurantMomentSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="restaurant-moment"
      className="section-padding"
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Signature Interactive Particle Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <Box sx={{ mb: { xs: 6, md: 8 }, position: 'relative' }}>
            {/* TODO: Replace with real photo of busy Nigerian restaurant during Friday night service */}
            <InteractiveParticles
              fallbackImageUrl="/assets/restaurant-moment.jpg"
              height="60vh"
              particleCount={1800}
              color="#f5c57a"
            />
          </Box>
        </motion.div>

        {/* Editorial copy */}
        <Box sx={{ maxWidth: 'var(--max-width-narrow)' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              className="editorial-label"
              sx={{ mb: 2.5, color: 'var(--color-accent)' }}
            >
              Friday. 8:17 PM.
            </Typography>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 'var(--text-xl)', md: 'var(--text-2xl)' },
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                mb: 3.5,
              }}
            >
              Three branches are running service at once.
              <br />
              Three WhatsApp orders just came in.
              <br />
              A manager is short at the till.
            </Typography>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              className="display-serif"
              sx={{
                fontSize: { xs: 'var(--text-3xl)', md: 'var(--text-4xl)' },
                color: 'white',
              }}
            >
              This is where SharpTable lives.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default RestaurantMomentSection;
