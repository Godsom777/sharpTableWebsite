import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Box, Container, IconButton, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.email);
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/pricing';
  };

  const handleManageAccount = () => {
    window.location.href = '/account';
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
        backgroundColor: isScrolled ? '#000000' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      }}
    >
      <Container maxWidth="lg" sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 3, md: 3 } }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => { window.location.href = '/'; }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Box
            component="img"
            src="/assets/logos/logo-white.png"
            alt="SharpTable"
            sx={{ height: { xs: 24, md: 32 }, width: 'auto' }}
          />
          <Typography variant="h6" component="span" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: 'white', fontSize: '1.25rem' }}>
            SharpTable
          </Typography>
        </motion.div>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4, typography: 'body2', fontWeight: 500, color: 'text.secondary' }}
        >
          {['/', '/features', '/pricing', '/faq', '/partnership'].map((path, idx) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Box component={Link} to={path} key={path} sx={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  component={motion.span}
                  whileHover={{ scale: 1.1, y: -2 }}
                  sx={{
                    color: isActive(path) || (path === '/partnership' && isActive('/partnership/apply')) ? (path === '/partnership' ? 'primary.main' : 'white') : 'text.secondary',
                    transition: 'color 0.2s',
                    display: 'inline-block',
                    '&:hover': { color: 'white' }
                  }}
                >
                  {label}
                </Box>
              </Box>
            );
          })}
          
          <Button
            component={motion.button}
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            sx={{
              bgcolor: 'white',
              color: 'black',
              px: 2,
              py: 1,
              borderRadius: '9999px',
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              minWidth: 'auto',
              '&:hover': { bgcolor: 'grey.200' }
            }}
          >
            Get Started
          </Button>

          <Button
            component={motion.button}
            onClick={handleManageAccount}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: '9999px',
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              minWidth: 'auto',
              border: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            {user ? (subscription?.businessName || user.email) : 'Login'}
          </Button>
        </Box>

        <IconButton
          component={motion.button}
          initial={{ opacity: 0 }}
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
              top: 64,
              left: 0,
              right: 0,
              bgcolor: 'black',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              p: 3,
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              gap: 2,
              overflow: 'hidden'
            }}
          >
            {['/', '/features', '/pricing', '/faq', '/partnership'].map((path, idx) => {
              const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              return (
                <Box
                  key={path}
                  component={motion.div}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Box
                    component={Link}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: isActive(path) || (path === '/partnership' && isActive('/partnership/apply')) ? (path === '/partnership' ? 'primary.main' : 'white') : 'text.secondary',
                      '&:hover': { color: 'white' }
                    }}
                  >
                    {label}
                  </Box>
                </Box>
              );
            })}
            
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
                bgcolor: 'white',
                color: 'black',
                px: 2,
                py: 1.5,
                borderRadius: '9999px',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                width: '100%',
                mt: 1,
                '&:hover': { bgcolor: 'grey.200' }
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
                fontSize: '0.875rem',
                fontWeight: 600,
                width: '100%',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              {user ? (subscription?.businessName || user.email) : 'Login'}
            </Button>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};
