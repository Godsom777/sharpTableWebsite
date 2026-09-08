'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Container, IconButton, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';

/* ----------------------------------------------------------------
   Navigation Structure (Section 19)
   ---------------------------------------------------------------- */

const productLinks = [
  { label: 'Orders', href: '#module-orders' },
  { label: 'Customers', href: '#module-customers' },
  { label: 'Kitchen', href: '#module-kitchen' },
  { label: 'Inventory', href: '#module-inventory' },
  { label: 'Insights', href: '#module-insights' },
];

const navLinks = [
  { label: 'Product', href: '#', hasDropdown: true },
  { label: 'Features', href: '/features' },
  { label: 'Hotels', href: '/for-hotels' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.email);
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/pricing';
  };

  const handleManageAccount = () => {
    window.location.href = '/account';
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProductDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 150);
  };

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 3 },
        }}
      >
        {/* Logo */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => { window.location.href = '/'; }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Box
            component="img"
            src="/assets/logos/logo-white.png"
            alt="SharpTable"
            sx={{ height: { xs: 24, md: 28 }, width: 'auto' }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'white',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            SharpTable
          </Typography>
        </motion.div>

        {/* Desktop Nav */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 3.5,
          }}
        >
          {navLinks.map((link) => (
            <Box
              key={link.label}
              ref={link.hasDropdown ? dropdownRef : undefined}
              onMouseEnter={link.hasDropdown ? handleDropdownEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleDropdownLeave : undefined}
              sx={{ position: 'relative' }}
            >
              {link.hasDropdown ? (
                <Box
                  component="button"
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'white' },
                  }}
                >
                  {link.label}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{
                      width: 10,
                      height: 10,
                      transition: 'transform 0.2s',
                      transform: isProductDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </Box>
              ) : (
                <Box
                  component={Link}
                  href={link.href}
                  sx={{
                    textDecoration: 'none',
                    color: isActive(link.href) ? 'white' : 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    '&:hover': { color: 'white' },
                  }}
                >
                  {link.label}
                </Box>
              )}

              {/* Product Dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {isProductDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: '12px',
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'rgba(10,10,10,0.95)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '0.75rem',
                          py: 1,
                          minWidth: 180,
                          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        {productLinks.map((product, i) => (
                          <Box
                            key={product.label}
                            component="a"
                            href={product.href}
                            onClick={() => setIsProductDropdownOpen(false)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              px: 2.5,
                              py: 1.25,
                              textDecoration: 'none',
                              color: 'var(--color-text-secondary)',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              transition: 'all 0.15s',
                              '&:hover': {
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.04)',
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                color: 'var(--color-accent)',
                                letterSpacing: '0.05em',
                                width: 16,
                              }}
                            >
                              0{i + 1}
                            </Typography>
                            {product.label}
                          </Box>
                        ))}
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Box>
          ))}

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
            <Button
              component={motion.button}
              onClick={handleManageAccount}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{
                color: 'var(--color-text-secondary)',
                px: 2,
                py: 1,
                borderRadius: '9999px',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                minWidth: 'auto',
                transition: 'color 0.2s',
                '&:hover': { color: 'white' },
              }}
            >
              {user ? (subscription?.businessName || user.email) : 'Login'}
            </Button>

            <Button
              component={motion.button}
              onClick={handleGetStarted}
              whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}
              whileTap={{ scale: 0.97 }}
              sx={{
                bgcolor: 'var(--color-accent)',
                color: '#000',
                px: 2.5,
                py: 1,
                borderRadius: '9999px',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'var(--color-accent-hover)' },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>

        {/* Mobile hamburger */}
        <IconButton
          component={motion.button}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'white', p: 0 }}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} style={{ width: 24, height: 24 }} />
        </IconButton>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'absolute',
              top: 72,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              p: 3,
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              gap: 1,
              overflow: 'hidden',
            }}
          >
            {navLinks.map((link, idx) => (
              <Box key={link.label}>
                {link.hasDropdown ? (
                  <>
                    <Box
                      component={motion.div}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Box
                        component="button"
                        onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                        sx={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'var(--color-text-secondary)',
                          fontSize: '1rem',
                          fontWeight: 500,
                          fontFamily: 'var(--font-body)',
                          py: 1,
                          width: '100%',
                          textAlign: 'left',
                          '&:hover': { color: 'white' },
                        }}
                      >
                        {link.label}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{
                            width: 10,
                            height: 10,
                            transition: 'transform 0.2s',
                            transform: isMobileProductOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </Box>
                    </Box>
                    <AnimatePresence>
                      {isMobileProductOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <Box sx={{ pl: 2, py: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {productLinks.map((product) => (
                              <Box
                                key={product.label}
                                component="a"
                                href={product.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileProductOpen(false);
                                }}
                                sx={{
                                  display: 'block',
                                  textDecoration: 'none',
                                  color: 'var(--color-text-muted)',
                                  fontSize: '0.9rem',
                                  py: 0.75,
                                  '&:hover': { color: 'white' },
                                }}
                              >
                                {product.label}
                              </Box>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Box
                    component={motion.div}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Box
                      component={Link}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: isActive(link.href) ? 'white' : 'var(--color-text-secondary)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        py: 1,
                        '&:hover': { color: 'white' },
                      }}
                    >
                      {link.label}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}

            {/* Mobile CTA buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
              <Button
                component={motion.button}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  handleGetStarted();
                  setIsMobileMenuOpen(false);
                }}
                sx={{
                  bgcolor: 'var(--color-accent)',
                  color: '#000',
                  px: 2,
                  py: 1.5,
                  borderRadius: '9999px',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  width: '100%',
                  '&:hover': { bgcolor: 'var(--color-accent-hover)' },
                }}
              >
                Get Started
              </Button>

              <Button
                component={motion.button}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  handleManageAccount();
                  setIsMobileMenuOpen(false);
                }}
                sx={{
                  color: 'white',
                  px: 2,
                  py: 1.5,
                  borderRadius: '9999px',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  width: '100%',
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                {user ? (subscription?.businessName || user.email) : 'Login'}
              </Button>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};
