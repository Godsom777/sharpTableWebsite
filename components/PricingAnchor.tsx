'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const PricingAnchor: React.FC = () => {
  return (
    <Box component="section" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Dramatic background gradient */}
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(0,0,0,1) 60%)', zIndex: 0, pointerEvents: 'none' }} />
      
      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: '9999px', border: '1px solid rgba(201,168,76,0.3)', bgcolor: 'rgba(201,168,76,0.05)', px: 2, py: 1, color: '#C9A84C', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 4 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#C9A84C' }} />
            One Simple Plan
          </Box>

          <Typography variant="h2" sx={{ fontSize: { xs: '3rem', md: '5.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', mb: 2, lineHeight: 1 }}>
            Transparent pricing.<br />
            <Box component="span" sx={{ color: '#C9A84C' }}>No surprises.</Box>
          </Typography>

          <Typography sx={{ color: 'white', fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 900, mb: 4, letterSpacing: '-0.02em', mt: 4 }}>
            Starting at ₦49,999 <Box component="span" sx={{ fontSize: '1.25rem', color: 'grey.500', fontWeight: 600 }}>/ month</Box>
          </Typography>

          <Typography sx={{ color: 'grey.400', fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.6, mb: 8, mx: 'auto', maxWidth: '500px' }}>
            For a single branch. Includes QR ordering, kitchen sync, split payments, and staff oversight. No hidden fees. Cancel anytime.
          </Typography>

          <Button
            component={motion.button}
            onClick={() => window.location.href = '/pricing'}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.95 }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #C9A84C 0%, #A68A3D 100%)',
              color: 'black',
              px: 6,
              py: 2.5,
              fontWeight: 800,
              fontSize: '1.125rem',
              border: 'none',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B661 0%, #C9A84C 100%)',
              }
            }}
          >
            Start Free Trial
            <Box sx={{ bgcolor: 'black', color: '#C9A84C', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 12, height: 12 }} />
            </Box>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
