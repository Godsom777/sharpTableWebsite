import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const WhoIsThisFor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" sx={{ bgcolor: 'black' }}>
      <Container maxWidth="lg" sx={{ px: 3, pb: 6 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          sx={{ maxWidth: 'md', mx: 'auto' }}
        >
          <Box sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ height: '1px', width: 40, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />
              <Typography sx={{ color: 'white', fontWeight: 700, letterSpacing: '0.025em', fontSize: '0.875rem', textTransform: 'uppercase' }}>Who is SharpTable for?</Typography>
              <Box sx={{ height: '1px', width: 40, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Built for you if */}
              <Box sx={{ borderRadius: '0.75rem', border: '1px solid rgba(34,197,94,0.2)', bgcolor: 'rgba(34,197,94,0.05)', p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <FontAwesomeIcon icon={faCircleCheck} style={{ width: 16, height: 16, color: '#4ade80' }} />
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>Built for you if:</Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1, color: 'grey.300', fontSize: '0.875rem' }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(74,222,128,0.8)', flexShrink: 0 }} />You run a busy kitchen with high order volume
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(74,222,128,0.8)', flexShrink: 0 }} />You've had walkouts or "missing cash" before
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(74,222,128,0.8)', flexShrink: 0 }} />You want staff accountability without micromanaging
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(74,222,128,0.8)', flexShrink: 0 }} />You want to know exactly where every dollar went
                  </Box>
                </Box>
              </Box>

              {/* Not the right fit if */}
              <Box sx={{ borderRadius: '0.75rem', border: '1px solid rgba(239,68,68,0.2)', bgcolor: 'rgba(239,68,68,0.05)', p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <FontAwesomeIcon icon={faLock} style={{ width: 16, height: 16, color: '#f87171' }} />
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>Not the right fit if:</Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1, color: 'grey.300', fontSize: '0.875rem' }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(248,113,113,0.8)', flexShrink: 0 }} />You run a quiet cafe with 10 orders a day
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(248,113,113,0.8)', flexShrink: 0 }} />You're fine with "pay later" or running tabs
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Box component="span" sx={{ mt: 1, width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(248,113,113,0.8)', flexShrink: 0 }} />You don't mind chasing customers after they've eaten
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.75rem', color: 'grey.500' }}>
              SharpTable works best for restaurants, kitchen bars, and food courts where speed, volume, and payment control matter.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
