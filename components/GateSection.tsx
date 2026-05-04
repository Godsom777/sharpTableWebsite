'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';

export const GateSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" sx={{ bgcolor: 'black' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          sx={{
            borderRadius: '1.5rem',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.1), rgba(255, 255, 255, 0.05), transparent)',
            p: { xs: 3, md: 5 },
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: '1rem',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              bgcolor: 'rgba(245, 158, 11, 0.1)',
              px: 2.5,
              py: 1.5,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Typography component="span" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              This is not a POS.
            </Typography>
            <Typography component="span" sx={{ color: '#fcd34d', fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              This is a payment gate.
            </Typography>
          </Box>

          <Typography
            sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem' }, color: 'text.secondary', maxWidth: 'md', mx: 'auto', lineHeight: 1.625 }}
          >
            Your team doesn't see the order until money is confirmed.
            No more "I will transfer later". No more chasing customers. No more staff pocketing cash.
          </Typography>

          <Typography
            sx={{ mt: 1.5, fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: 'grey.500', maxWidth: 'md', mx: 'auto' }}
          >
            Unpaid order? It stays right where it is. Simple.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
