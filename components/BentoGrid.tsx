import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const BentoGrid: React.FC = () => {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2.5, md: 4 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 8, md: 10 } }}
        >
          <Box sx={{ maxWidth: '4xl' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', mb: 2 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
              Operational Control
            </Box>
            <Typography sx={{ fontSize: { xs: '2rem', md: '4rem', lg: '5rem' }, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.04em' }}>
              Built For Scale
            </Typography>
            <Typography sx={{ mt: 3, color: 'grey.400', maxWidth: 'md', lineHeight: 1.625, fontSize: '1.125rem' }}>
              SharpTable protects your multi-branch enterprise from staff theft, inventory blindness, and slow turnarounds with a system that feels warm, clear, and flawlessly engineered for luxury hospitality.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 3, md: 4 } }}>
          <Box sx={{ borderRadius: { xs: '1.5rem', md: '2.5rem' }, border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column' }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, letterSpacing: '-0.02em', maxWidth: '70%' }}>Enterprise WhatsApp</Typography>
                <Box sx={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ width: 16, height: 16 }} />
                </Box>
             </Box>
             <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Chat Ordering</Box>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Integrated</Box>
             </Box>
             <Typography sx={{ fontSize: '1.05rem', color: 'grey.400', lineHeight: 1.6, mt: 'auto' }}>Elevate your guest communications. Turn WhatsApp into a premium, integrated remote channel that routes directly to your kitchen.</Typography>
          </Box>

          <Box sx={{ borderRadius: { xs: '1.5rem', md: '2.5rem' }, border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column' }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, letterSpacing: '-0.02em', maxWidth: '70%' }}>Food Tracking</Typography>
                <Box sx={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ width: 16, height: 16 }} />
                </Box>
             </Box>
             <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Stock Visibility</Box>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Waste Control</Box>
             </Box>
             <Typography sx={{ fontSize: '1.05rem', color: 'grey.400', lineHeight: 1.6, mt: 'auto' }}>Absolute inventory oversight. Pinpoint exact ingredient usage, anticipate shortages, and brutally track waste down to the gram across every single branch.</Typography>
          </Box>

          <Box sx={{ borderRadius: { xs: '1.5rem', md: '2.5rem' }, border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column' }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, letterSpacing: '-0.02em', maxWidth: '70%' }}>Owner Monitoring</Typography>
                <Box sx={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ width: 16, height: 16 }} />
                </Box>
             </Box>
             <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Real-time</Box>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Multi-Branch</Box>
             </Box>
             <Typography sx={{ fontSize: '1.05rem', color: 'grey.400', lineHeight: 1.6, mt: 'auto' }}>Real-time visibility into your entire empire. No more guessing. Watch live sales and cashier inputs as they happen, from absolutely anywhere.</Typography>
          </Box>

          <Box sx={{ borderRadius: { xs: '1.5rem', md: '2.5rem' }, border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column' }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, letterSpacing: '-0.02em', maxWidth: '70%' }}>Fraud Prevention</Typography>
                <Box sx={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ width: 16, height: 16 }} />
                </Box>
             </Box>
             <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Audit Trail</Box>
                <Box sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.06)', color: 'grey.300', fontSize: '0.85rem', fontWeight: 600 }}>Security</Box>
             </Box>
             <Typography sx={{ fontSize: '1.05rem', color: 'grey.400', lineHeight: 1.6, mt: 'auto' }}>A rigid, undisputable audit trail. We track every void, catch suspicious ticket patterns instantly, and secure your revenue with absolute confidence.</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
