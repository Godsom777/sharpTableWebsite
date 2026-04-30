import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShieldHalved, faLock } from '@fortawesome/free-solid-svg-icons';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { RotatingIndustryHeadline } from './RotatingIndustryHeadline';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldReduceMotion = prefersReducedMotion;
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.email);
  const { isAfrica } = useGeoLocation();

  const heroImages = {
    diners: isAfrica ? '/assets/photos/happy_diners.jpg' : '/assets/photos/global_diners.jpg',
    manager: isAfrica ? '/assets/photos/manager_africa.jpg' : '/assets/photos/manager_global.jpg',
  };

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#000000' }}>
      <Box sx={{ position: 'relative', zIndex: 10, maxWidth: 'lg', mx: 'auto', px: 2, pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 12 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', px: 2, py: 1, color: 'grey.300', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
            <Box component="span">Elite Operations Standard</Box>
          </Box>
        </Box>

        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          sx={{ textAlign: 'center', fontSize: { xs: '2rem', sm: '2.5rem', md: '4.5rem', lg: '5.75rem' }, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, color: 'white', wordBreak: 'break-word' }}
        >
          <RotatingIndustryHeadline
            accentColor="#C9A84C"
            lineSx={{ whiteSpace: { md: 'nowrap' } }}
            termSx={{ minWidth: { xs: '10.5ch', sm: '12ch', md: '13ch' } }}
          />
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          sx={{ mt: 4, mb: 6, textAlign: 'center', fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, color: 'grey.400', maxWidth: 'md', mx: 'auto', lineHeight: 1.6 }}
        >
          SharpTable gives luxury multi-branch restaurants and modern hospitality brands absolute command of hospitality operations across ordering, visitor tracking, room service logistics, and fraud prevention from a single uncompromising interface.
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 2 }}
        >
          <Button
            component={motion.button}
            onClick={() => (window.location.href = '/pricing')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: { xs: '100%', sm: 'auto' }, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, borderRadius: '9999px', bgcolor: 'white', color: 'black', px: 4, py: 2, fontWeight: 700, fontSize: '1rem', '&:hover': { bgcolor: 'grey.200' }, textTransform: 'none' }}
          >
            Signup
            <Box sx={{ bgcolor: 'black', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faChevronRight} style={{ width: 10, height: 10 }} />
            </Box>
          </Button>

          <Button
            component={motion.button}
            onClick={() => (window.location.href = '/account')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: { xs: '100%', sm: 'auto' }, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, borderRadius: '9999px', bgcolor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', px: 4, py: 2, fontWeight: 600, fontSize: '1rem', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, textTransform: 'none' }}
          >
            {user ? (subscription?.businessName || user.email) : 'Login'}
            <FontAwesomeIcon icon={faLock} style={{ width: 14, height: 14 }} />
          </Button>
        </Box>

        <Box sx={{ mt: 8, width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, w: '80px', h: '100%', background: 'linear-gradient(to right, #000, transparent)', zIndex: 1 }} />
          <Box sx={{ position: 'absolute', top: 0, right: 0, w: '80px', h: '100%', background: 'linear-gradient(to left, #000, transparent)', zIndex: 1 }} />

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ display: 'flex' }}
          >
            <Box sx={{ display: 'flex', gap: 2, width: 'max-content', animation: 'marquee 40s linear infinite' }}>
              {[...Array(2)].map((_, arrayIndex) => (
                <React.Fragment key={arrayIndex}>
                  {[
                    { text: 'QR code ordering' },
                    { text: 'Digital room service' },
                    { text: 'Synchronized kitchen alerts' },
                    { text: 'Enterprise visitor logging' },
                    { text: 'WhatsApp channel ordering' },
                    { text: 'Multi-branch monitoring' },
                    { text: 'Fraud prevention architecture' },
                  ].map((item, index) => (
                    <Box
                      key={`${arrayIndex}-${index}`}
                      component="span"
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', px: 2.5, py: 1.25, color: 'grey.300', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                    >
                      {item.text}
                    </Box>
                  ))}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          sx={{ mt: { xs: 8, md: 10 }, position: 'relative' }}
        >
          <Box sx={{ position: 'relative', borderRadius: { xs: '1.5rem', md: '2.5rem' }, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box
              component="img"
              src={heroImages.diners}
              alt="Happy guests enjoying their meal"
              loading="eager"
              sx={{ width: '100%', height: { xs: 240, sm: 320, md: 480, lg: 540 }, objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent, transparent)' }} />

            <Box sx={{ position: 'absolute', bottom: 24, left: 24, right: 24, '@media (min-width: 600px)': { left: 'auto', right: 24, bottom: 24, width: 'auto' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: '1.5rem', bgcolor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', px: 3, py: 2 }}>
                <Box sx={{ height: 48, width: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={faShieldHalved} style={{ width: 20, height: 20, color: 'white' }} />
                </Box>
                <Box>
                  <Box sx={{ color: 'white', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>Flawless. Secure. Absolute.</Box>
                  <Box sx={{ color: 'grey.400', fontSize: '0.85rem' }}>Visibility into every branch action.</Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: { md: -20, lg: -40 }, top: '50%', transform: 'translateY(-50%)', width: { md: 160, lg: 200 } }}>
            <Box sx={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Box
                component="img"
                src={heroImages.manager}
                alt="Restaurant manager reviewing dashboard"
                loading="eager"
                sx={{ width: '100%', height: { md: 200, lg: 240 }, objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Box sx={{ fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>Total Overview</Box>
              <Box sx={{ fontSize: '0.75rem', color: 'grey.500' }}>Live executive command</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
