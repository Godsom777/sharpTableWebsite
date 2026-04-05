import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faShieldHalved,
  faQrcode,
  faBolt,
  faCircleCheck,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { Box, Typography, Button } from '@mui/material';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isAfrica } = useGeoLocation();

  const heroImages = {
    diners: isAfrica ? '/assets/photos/happy_diners.jpg' : '/assets/photos/global_diners.jpg',
    manager: isAfrica ? '/assets/photos/manager_africa.jpg' : '/assets/photos/manager_global.jpg',
  };

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'black' }}>
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.08) 0%, transparent 50%)' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom right, rgba(255,255,255,0.03) 0%, transparent 50%)' }} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 10, maxWidth: 'lg', mx: 'auto', px: 2, pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 10 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: '9999px', border: '1px solid rgba(245,158,11,0.3)', bgcolor: 'rgba(245,158,11,0.1)', px: 1.5, py: 0.75, color: '#fcd34d', fontSize: { xs: '0.625rem', sm: '0.6875rem' }, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', lineHeight: 1.25, maxWidth: '92vw' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ width: 12, height: 12 }} />
            <Box component="span">Reliable restaurant operations</Box>
          </Box>
        </Box>

        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          sx={{ textAlign: 'center', fontSize: { xs: '1.875rem', sm: '2.25rem', md: '3rem', lg: '3.75rem' }, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'white' }}
        >
          Reliable restaurant control,
          <Box component="span" sx={{ color: '#fbbf24' }}> built with support and long-term stability.</Box>
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          sx={{ mt: 2, textAlign: 'center', fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, color: 'grey.400', maxWidth: 'md', mx: 'auto', lineHeight: 1.625 }}
        >
          SharpTable gives you dependable visibility into fraud prevention, voids, total inventory, cashier activity,
          staff theft risk, and customer retention
          <Box component="span" sx={{ color: 'white', fontWeight: 500 }}> across one restaurant or every branch you own.</Box>
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 1.5 }}
        >
          <Button
            component={motion.button}
            onClick={() => (window.location.href = 'mailto:info@sharptable.com.ng')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: { xs: '100%', sm: 'auto' }, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, borderRadius: '0.75rem', bgcolor: 'white', color: 'black', px: 3, py: 1.75, fontWeight: 700, fontSize: '0.875rem', boxShadow: 3, '&:hover': { bgcolor: 'grey.100' }, textTransform: 'none' }}
          >
            See it in action
            <Box component="span">
              <FontAwesomeIcon icon={faChevronRight} style={{ width: 16, height: 16 }} />
            </Box>
          </Button>

          <Button
            component={motion.button}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: { xs: '100%', sm: 'auto' }, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, borderRadius: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', px: 3, py: 1.75, fontWeight: 600, fontSize: '0.875rem', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, textTransform: 'none' }}
          >
            How it works
            <FontAwesomeIcon icon={faQrcode} style={{ width: 16, height: 16, color: '#fcd34d' }} />
          </Button>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, fontSize: '0.75rem' }}
        >
          {[
            { icon: faCircleCheck, text: 'Reliable day-to-day operations' },
            { icon: faBolt, text: 'Support when your team needs it' },
            { icon: faLock, text: 'Fraud prevention built in' },
            { icon: faQrcode, text: 'Control every branch from your phone' }
          ].map((item) => (
            <Box
              key={item.text}
              component="span"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)', px: 1.5, py: 0.75, color: 'grey.300' }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ width: 12, height: 12, color: '#fbbf24' }} />
              {item.text}
            </Box>
          ))}
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          sx={{ mt: { xs: 5, md: 7 }, position: 'relative' }}
        >
          <Box sx={{ position: 'relative', borderRadius: { xs: '1rem', md: '1.5rem' }, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 10 }}>
            <Box
              component="img"
              src={heroImages.diners}
              alt="Happy guests enjoying their meal"
              loading="eager"
              sx={{ width: '100%', height: { xs: 192, sm: 256, md: 320, lg: 384 }, objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent)' }} />

            <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, '@media (min-width: 600px)': { left: 'auto', right: 16, bottom: 16, width: 'auto' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, borderRadius: '0.75rem', bgcolor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', px: 2, py: 1.5 }}>
                <Box sx={{ height: 40, width: 40, borderRadius: '0.5rem', bgcolor: 'rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={faShieldHalved} style={{ width: 20, height: 20, color: '#fbbf24' }} />
                </Box>
                <Box>
                  <Box sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Reliable. Supported. Built to last.</Box>
                  <Box sx={{ color: 'grey.400', fontSize: '0.75rem' }}>Visibility into every order, cashier, and branch.</Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: { md: -16, lg: -32 }, top: '50%', transform: 'translateY(-50%)', width: { md: 128, lg: 160 } }}>
            <Box sx={{ borderRadius: '1rem', overflow: 'hidden', border: '2px solid rgba(245,158,11,0.3)', boxShadow: 5 }}>
              <Box
                component="img"
                src={heroImages.manager}
                alt="Restaurant manager reviewing dashboard"
                loading="eager"
                sx={{ width: '100%', height: { md: 160, lg: 192 }, objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ mt: 1, textAlign: 'center' }}>
              <Box sx={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 600 }}>Multi-restaurant control</Box>
              <Box sx={{ fontSize: '0.625rem', color: 'grey.500' }}>Real-time oversight from anywhere</Box>
            </Box>
          </Box>
        </Box>

        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ mt: 3, textAlign: 'center', fontSize: '0.75rem', color: 'grey.500' }}
        >
          Built for operators who need dependable software, real support, and long-term stability
        </Typography>
      </Box>
    </Box>
  );
};
