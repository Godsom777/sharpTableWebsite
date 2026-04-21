import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const WhoIsThisFor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" sx={{ bgcolor: '#000000' }}>
      <Container maxWidth="lg" sx={{ px: 3, pb: 12 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          sx={{ maxWidth: 'md', mx: 'auto' }}
        >
          <Box sx={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 4, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 5 }}>
              <Box sx={{ height: '1px', width: 40, bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Typography sx={{ color: 'grey.300', fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Who is SharpTable for?</Typography>
              <Box sx={{ height: '1px', width: 40, bgcolor: 'rgba(255,255,255,0.2)' }} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              {/* Built for you if */}
              <Box sx={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: '#131313', p: 3.5, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ width: 14, height: 14, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Built for you if:</Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2, color: 'grey.300', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'white', flexShrink: 0 }} />You manage massive multi-branch luxury operations
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'white', flexShrink: 0 }} />Staff theft and zero inventory oversight are destroying your margins
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'white', flexShrink: 0 }} />You want frictionless ordering without cheapening the guest experience
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'white', flexShrink: 0 }} />You demand absolute real-time command across every location
                  </Box>
                </Box>
              </Box>

              {/* Not the right fit if */}
              <Box sx={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.02)', bgcolor: '#0a0a0a', p: 3.5, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, opacity: 0.5 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Not the right fit if:</Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2, color: 'grey.500', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'grey.600', flexShrink: 0 }} />You run a single small neighbourhood cafe
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'grey.600', flexShrink: 0 }} />You are satisfied with messy ordering and chaotic handoffs
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box component="span" sx={{ mt: 0.75, width: 4, height: 4, borderRadius: '50%', bgcolor: 'grey.600', flexShrink: 0 }} />Absolute operational efficiency is simply not your priority
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography sx={{ mt: 5, textAlign: 'center', fontSize: '0.85rem', color: 'grey.500', fontWeight: 500 }}>
              SharpTable is explicitly engineered for ambitious operators where precision, speed, and uncompromising revenue control are required.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
