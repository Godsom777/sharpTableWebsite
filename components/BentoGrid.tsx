import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const BentoGrid: React.FC = () => {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 16, md: 32 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 60%)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: 600, height: 600, background: 'linear-gradient(to bottom right, rgba(245,158,11,0.1), rgba(249,115,22,0.05), transparent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.6, zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 500, height: 500, background: 'linear-gradient(to top right, rgba(59,130,246,0.1), rgba(168,85,247,0.05), transparent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.6, zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          sx={{ mb: { xs: 10, md: 20 } }}
        >
          <Box sx={{ maxWidth: '4xl', mx: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.22em', color: 'rgba(252,211,77,0.8)', textTransform: 'uppercase' }}>
                Operational control without the drama
              </Typography>
              <Typography variant="h3" sx={{ mt: 3, fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 800, color: 'white' }}>
                A system your team can trust from day one
              </Typography>
              <Typography sx={{ mt: 3, color: 'grey.400', maxWidth: 'md', mx: 'auto', lineHeight: 1.625 }}>
                SharpTable gives you reliable workflows, cleaner handoffs, and supportable operations without weeks of training or fragile setup.
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Box sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d', fontWeight: 800 }}>1</Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>Every order starts clean</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', lineHeight: 1.625 }}>
                  Customers order from their phone, and the order enters your system the same way every time. No missing tickets, no verbal mistakes, no side handling.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.875rem', color: 'grey.300', fontWeight: 500 }}>Consistency at the front creates control at the back.</Typography>
              </Box>

              <Box sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d', fontWeight: 800 }}>2</Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>Fraud prevention starts before prep</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', lineHeight: 1.625 }}>
                  Orders do not move until payment is confirmed, which helps stop unpaid tickets, suspicious void patterns, and end-of-day cash gaps before they spread.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.875rem', color: 'grey.300', fontWeight: 500 }}>Less leakage. More confidence in the numbers.</Typography>
              </Box>

              <Box sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d', fontWeight: 800 }}>3</Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>Cashier and staff actions stay visible</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', lineHeight: 1.625 }}>
                  Confirmations, cashier activity, and staff handoffs are logged clearly, giving you the evidence to spot weak controls and expose theft early.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.875rem', color: 'grey.300', fontWeight: 500 }}>Accountability without standing in the restaurant all day.</Typography>
              </Box>

              <Box sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d', fontWeight: 800 }}>4</Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>One view across service, stock, and repeat guests</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', lineHeight: 1.625 }}>
                  Inventory stays current, customer patterns become visible, and retention gets easier because you can finally see what is happening across every location.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.875rem', color: 'grey.300', fontWeight: 500 }}>From one branch to many, the system stays stable and connected.</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 5, borderRadius: '1rem', border: '1px solid rgba(245,158,11,0.2)', background: 'linear-gradient(to right, rgba(245,158,11,0.1), rgba(249,115,22,0.05), transparent)', p: 4, textAlign: 'center' }}>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.875rem' }, lineHeight: 1.25 }}>
                Reliable control for today.
                <Box component="span" sx={{ color: '#fcd34d' }}> Long-term stability for every restaurant you add tomorrow.</Box>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{ mt: { xs: 10, md: 20 }, textAlign: 'center' }}
        >
          <Box
            component={motion.button}
            onClick={() => window.location.href = 'mailto:info@sharptable.com.ng'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 1.5,
              background: 'linear-gradient(to right, #f59e0b, #f97316, #f59e0b)', backgroundSize: '200% 100%',
              color: 'white', px: 5, py: 2.5, borderRadius: '1rem', fontWeight: 700, fontSize: '1.125rem',
              transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.4)', backgroundPosition: '100% 50%' }
            }}
          >
            <Box component="span">Book a Demo</Box>
            <Box
              component={motion.div}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 20, height: 20 }} />
            </Box>
          </Box>
          <Typography sx={{ color: 'grey.500', fontSize: '0.875rem', mt: 1 }}>Usually responds within 2 hours</Typography>
        </Box>
      </Container>
    </Box>
  );
};
