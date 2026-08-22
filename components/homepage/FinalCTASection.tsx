'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/**
 * Final CTA Section
 * "Run the restaurant. We'll keep the orders together."
 */
export const FinalCTASection: React.FC = () => {
  return (
    <Box
      component="section"
      id="final-cta"
      sx={{
        position: 'relative',
        py: { xs: 14, md: 22 },
        overflow: 'hidden',
      }}
    >
      {/* Warm gradient wash background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.08) 0%, transparent 60%), ' +
            'radial-gradient(ellipse at 20% 20%, rgba(245,158,11,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top border accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)',
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: { xs: 3, md: 4 },
        }}
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            className="display-serif"
            sx={{
              fontSize: { xs: 'var(--text-4xl)', sm: 'var(--text-5xl)', md: 'var(--text-6xl)' },
              color: 'white',
              mb: 3,
              lineHeight: 1.1,
            }}
          >
            Run the restaurant.
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
              fontSize: { xs: 'var(--text-lg)', md: 'var(--text-xl)' },
              color: 'var(--color-text-secondary)',
              mb: 6,
              lineHeight: 1.6,
            }}
          >
            We&apos;ll keep the orders together.
          </Typography>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={motion.a}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(245,158,11,0.35)' }}
              whileTap={{ scale: 0.97 }}
              href="/pricing"
              sx={{
                bgcolor: 'var(--color-accent)',
                color: '#000',
                px: 5,
                py: 2,
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'var(--color-accent-hover)' },
              }}
            >
              Get started
            </Button>
            <Button
              component={motion.a}
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              href="#mechanism"
              sx={{
                color: 'white',
                px: 5,
                py: 2,
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { borderColor: 'rgba(255,255,255,0.4)', bgcolor: 'rgba(255,255,255,0.04)' },
              }}
            >
              See how it works
            </Button>
          </Box>
        </motion.div>

        {/* Trust signal */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            sx={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              mt: 6,
              letterSpacing: '0.02em',
            }}
          >
            No setup fees · Cancel anytime · Live in under 24 hours
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FinalCTASection;
