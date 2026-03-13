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
    <Box component="section" sx={{ py: { xs: 16, md: 32 }, bgcolor: 'black', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 10, lg: 20 }, alignItems: 'center' }}>
          
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <Typography
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{ fontSize: { xs: '2.25rem', md: '3.75rem' }, fontWeight: 700, color: 'white', letterSpacing: '-0.05em', lineHeight: 1.1 }}
            >
              How much slips through <br/>
              <Box component="span" sx={{ color: '#f59e0b', fontStyle: 'italic', fontFamily: 'serif' }}>before you even notice?</Box>
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Problem Block */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 10, scale: 1.02 }}
                sx={{ display: 'flex', gap: 2, cursor: 'pointer', transition: 'transform 0.2s', '&:hover .icon-box': { borderColor: 'rgba(255,255,255,0.2)' } }}
              >
                <Box
                  component={motion.div}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="icon-box"
                  sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: 'grey.900', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.2s' }}
                >
                  <FontAwesomeIcon icon={faEyeSlash} style={{ color: '#6b7280', width: 20, height: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>The problem with most systems</Typography>
                  <Typography sx={{ color: 'grey.500', fontSize: '0.875rem' }}>"Orders go out first, payment comes later. Walkouts happen. Cash goes missing. No one knows who took what."</Typography>
                </Box>
              </Box>

              {/* Solution Block */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 10, scale: 1.02 }}
                sx={{ display: 'flex', gap: 2, cursor: 'pointer', transition: 'transform 0.2s', '&:hover .icon-box': { bgcolor: 'rgba(245,158,11,0.2)' } }}
              >
                <Box
                  component={motion.div}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="icon-box"
                  sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245,158,11,0.2)', transition: 'all 0.2s' }}
                >
                  <FontAwesomeIcon icon={faEye} className="animate-pulse" style={{ color: '#f59e0b', width: 20, height: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>How SharpTable fixes it</Typography>
                  <Typography sx={{ color: 'grey.300', fontSize: '0.875rem', fontStyle: 'italic', lineHeight: 1.625 }}>
                    "Nothing moves until payment is verified. Every transaction logged — who collected, when, how much. No gaps."
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography
              component={motion.p}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{ fontSize: '1.25rem', color: 'grey.500', maxWidth: 500, lineHeight: 1.625, borderLeft: '1px solid', borderColor: 'grey.800', pl: 3 }}
            >
              Imagine if nothing left your floor without payment first.
              <Box component="span" sx={{ color: 'white', fontWeight: 500 }}> SharpTable makes it happen.</Box>
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{ position: 'relative' }}
          >
            {/* The "Tease" Card Background Glow */}
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 4, repeat: Infinity }}
              sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(245,158,11,0.05)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }}
            />
            {/* The Card */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
              sx={{ position: 'relative', bgcolor: 'rgba(24,24,27,0.5)', backdropFilter: 'blur(64px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3rem', p: { xs: 4, md: 6 }, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', zIndex: 1 }}
            >
              
              {/* Blurred Background Mockup Data */}
              <Box
                component={motion.div}
                animate={{ opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', userSelect: 'none', filter: 'blur(4px)', p: { xs: 4, md: 6 }, zIndex: 0 }}
              >
                <Box sx={{ height: 16, width: '100%', bgcolor: 'white', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 16, width: '75%', bgcolor: 'white', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 128, width: '100%', border: '1px solid white', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 16, width: '50%', bgcolor: 'white', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 16, width: '100%', bgcolor: 'white', borderRadius: 1 }} />
              </Box>

              <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <Box
                  component={motion.div}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  sx={{ width: 64, height: 64, bgcolor: 'rgba(245,158,11,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4, border: '1px solid rgba(245,158,11,0.2)' }}
                >
                    <FontAwesomeIcon icon={faLock} style={{ color: '#f59e0b', width: 24, height: 24 }} />
                </Box>
                <Typography
                  component={motion.h3}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  variant="h3"
                  sx={{ fontSize: '1.875rem', fontWeight: 700, color: 'white', mb: 2 }}
                >
                  Stop the leakage today
                </Typography>
                <Typography
                  component={motion.p}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  sx={{ color: 'grey.400', mb: 5, fontSize: '1.125rem' }}
                >
                  Most restaurants lose 5-15% to theft and walkouts. Want to keep what you earn?
                </Typography>
                
                <Box
                  component={motion.button}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  onClick={handleContact}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  sx={{ width: '100%', py: 2.5, bgcolor: 'white', color: 'black', borderRadius: '9999px', fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'grey.200' }, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                  className="group"
                >
                  Talk to us
                  <Box component="span" sx={{ display: 'inline-flex', transition: 'transform 0.2s', '.group:hover &': { transform: 'translateX(4px)' } }}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Box>
                </Box>
                
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
                >
                    <Box
                      component={motion.div}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      sx={{ display: 'inline-flex' }}
                    >
                      <FontAwesomeIcon icon={faStar} style={{ color: '#f59e0b', width: 16, height: 16 }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'grey.500', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700 }}>
                        Invite-Only Access
                    </Typography>
                </Box>
              </Box>

            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};