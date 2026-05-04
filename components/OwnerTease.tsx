'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faStar, faLock } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

export const OwnerTease: React.FC = () => {
  const handleContact = () => {
    window.location.href = "mailto:info@sharptable.com.ng";
  };

  return (
    <Box component="section" sx={{ py: { xs: 16, md: 32 }, bgcolor: '#000000', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 10, lg: 20 }, alignItems: 'center' }}>
          
          <Box
            component={motion.div}
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            <Typography
              component={motion.h2}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{ fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              How much slips <br/>
              <Box component="span" sx={{ color: 'grey.600' }}>past the gate?</Box>
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Problem Block */}
              <Box sx={{ display: 'flex', gap: 3, p: 4, borderRadius: '1.5rem', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box
                  className="icon-box"
                  sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <FontAwesomeIcon icon={faEyeSlash} style={{ color: 'grey', width: 20, height: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.125rem', mb: 1 }}>The bleeding standard.</Typography>
                  <Typography sx={{ color: 'grey.500', fontSize: '0.95rem', lineHeight: 1.6 }}>"Orders fly to the kitchen, payment is an afterthought. Unpaid voids, unaccounted inventory. Complete structural collapse."</Typography>
                </Box>
              </Box>

              {/* Solution Block */}
              <Box sx={{ display: 'flex', gap: 3, p: 4, borderRadius: '1.5rem', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Box
                  className="icon-box"
                  sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white' }}
                >
                  <FontAwesomeIcon icon={faEye} style={{ color: 'white', width: 20, height: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.125rem', mb: 1 }}>The SharpTable enforcement.</Typography>
                  <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "Execution halted until the ledger clears. Explicit audit logs for every command. Total revenue protection."
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{ position: 'relative' }}
          >
            {/* The Card */}
            <Box
              sx={{ position: 'relative', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '3rem', p: { xs: 4, md: 8 }, overflow: 'hidden', zIndex: 1 }}
            >
              <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <Box
                  sx={{ width: 64, height: 64, bgcolor: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 6, border: '1px solid rgba(255,255,255,0.2)' }}
                >
                    <FontAwesomeIcon icon={faLock} style={{ color: 'white', width: 24, height: 24 }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 3 }}
                >
                  Secure your empire.
                </Typography>
                <Typography
                  sx={{ color: 'grey.500', mb: 6, fontSize: '1.125rem', lineHeight: 1.6 }}
                >
                  Multi-branch organizations hemorrhage up to 15% to phantom voids and staff theft. Will you intervene?
                </Typography>
                
                <Box
                  component="button"
                  onClick={handleContact}
                  sx={{ width: '100%', py: 3, bgcolor: 'white', color: 'black', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'grey.300' }, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                >
                  Initiate Lockout
                  <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};
