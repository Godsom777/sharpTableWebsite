'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShield, faFileLines, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { LegalModal, useLegalModal } from './LegalModal';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  const { isOpen, type, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();

  return (
    <>
      <Box component="footer" sx={{ bgcolor: '#000000', py: 12, borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 3, md: 3 } }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}
        >
          <Box 
            component="img"
            src="/assets/logos/logo-white.png" 
            alt="SharpTable" 
            sx={{ height: { xs: 32, md: 40 }, width: 'auto' }}
          />
          <Typography variant="h5" component="span" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: 'white' }}>
            SharpTable
          </Typography>
        </Box>
        <Typography
          component={motion.p}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ color: 'grey.500', fontSize: '1rem', maxWidth: 'md', mx: 'auto', mb: 6, lineHeight: 1.6 }}
        >
            Absolute Restaurant Command.<br/>
            Uncompromising luxury operations without the friction.
        </Typography>
        
        <Box
          component={motion.a}
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          href="mailto:info@sharptable.com.ng" 
          sx={{ color: 'white', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: 'grey.300' }, fontSize: '1.125rem', fontWeight: 700, mb: 8, display: 'flex', alignItems: 'center', gap: 1 }}
        >
            <FontAwesomeIcon icon={faEnvelope} style={{ width: 20, height: 20 }} />
           info@sharptable.com.ng
        </Box>

        {/* Navigation Links */}
        <Box
          component={motion.nav}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, typography: 'body2', color: 'text.secondary', mb: 8 }}
        >
          {['/', '/features', '/pricing', '/faq', '/partnership'].map((path) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Box component={Link} href={path} key={path} sx={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                {label}
              </Box>
            );
          })}
        </Box>

        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ display: 'flex', gap: 3, typography: 'body2', color: 'text.secondary', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            <Box
              component={motion.button}
              whileHover={{ scale: 1.1, color: '#fff' }}
              onClick={openPrivacyPolicy}
              sx={{ bgcolor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', p: 0 }}
            >
              <FontAwesomeIcon icon={faShield} style={{ width: 14, height: 14 }} />
              Privacy Policy
            </Box>
            <Box
              component={motion.button}
              whileHover={{ scale: 1.1, color: '#fff' }}
              onClick={openTermsOfService}
              sx={{ bgcolor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', p: 0 }}
            >
              <FontAwesomeIcon icon={faFileLines} style={{ width: 14, height: 14 }} />
              Terms of Service
            </Box>
            <Box
              component={motion.a}
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="mailto:info@sharptable.com.ng"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
            >
              <FontAwesomeIcon icon={faEnvelope} style={{ width: 14, height: 14 }} />
              Contact
            </Box>
            <Box
              component={motion.a}
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="https://t.me/+8W0SXa62SU41Mzlk"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: 'inherit', transition: 'color 0.2s', opacity: 0.4 }}
            >
              <FontAwesomeIcon icon={faTelegram} style={{ width: 14, height: 14 }} />
              Installer Squad
            </Box>
        </Box>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          sx={{ mt: 4, color: 'grey.700', fontSize: '0.75rem' }}
        >
            © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
        </Box>
      </Container>
    </Box>
    
    {/* Legal Modal */}
    <LegalModal isOpen={isOpen} onClose={closeModal} type={type} />
    </>
  );
};
