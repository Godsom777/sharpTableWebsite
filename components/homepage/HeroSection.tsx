'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';

/* ----------------------------------------------------------------
   Mock Dashboard — Multi-branch overview
   ---------------------------------------------------------------- */

const branches = [
  {
    name: 'Lekki',
    sales: '₦385,500',
    orders: 127,
    avgOrder: '₦3,035',
    status: 'Active',
    alerts: 1,
    topItem: 'Chicken & Chips',
  },
  {
    name: 'Victoria Island',
    sales: '₦512,800',
    orders: 203,
    avgOrder: '₦2,526',
    status: 'Active',
    alerts: 0,
    topItem: 'Grilled Fish Platter',
  },
  {
    name: 'Ikeja',
    sales: '₦198,200',
    orders: 84,
    avgOrder: '₦2,360',
    status: 'Active',
    alerts: 2,
    topItem: 'Jollof Rice Special',
  },
];

const BranchCard: React.FC<{ branch: (typeof branches)[0]; index: number }> = ({ branch, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
  >
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--color-border)',
        borderRadius: '0.75rem',
        p: { xs: 2, md: 2.5 },
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'var(--color-border-hover)',
          bgcolor: 'rgba(255,255,255,0.05)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: branch.alerts > 0 ? '#f59e0b' : '#22c55e',
              boxShadow: branch.alerts > 0
                ? '0 0 10px rgba(245,158,11,0.6)'
                : '0 0 10px rgba(34,197,94,0.6)',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: 'white',
              letterSpacing: '-0.01em',
            }}
          >
            {branch.name}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#22c55e',
            bgcolor: 'rgba(34,197,94,0.1)',
            px: 1,
            py: 0.25,
            borderRadius: '4px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {branch.status}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: { xs: '1.75rem', md: '2rem' },
          fontWeight: 800,
          color: 'white',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          mb: 1.5,
        }}
      >
        {branch.sales}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            Orders
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'white', fontWeight: 700 }}>
            {branch.orders}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            Avg order
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'white', fontWeight: 700 }}>
            {branch.avgOrder}
          </Typography>
        </Box>
      </Box>

      {branch.alerts > 0 && (
        <Box
          sx={{
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: '#f59e0b',
              bgcolor: 'rgba(245,158,11,0.15)',
              px: 0.75,
              py: 0.25,
              borderRadius: '3px',
            }}
          >
            {branch.alerts} ALERT{branch.alerts > 1 ? 'S' : ''}
          </Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            {branch.alerts > 1 ? 'Stock low on 2 items' : 'Void override logged'}
          </Typography>
        </Box>
      )}
    </Box>
  </motion.div>
);

/* ----------------------------------------------------------------
   Hero Section
   ---------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export const HeroSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '110px', md: '130px' },
        pb: { xs: '60px', md: '80px' },
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Subtle warm gradient wash */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 30% 25%, rgba(245,158,11,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left: Copy */}
          <Box>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Typography
                className="editorial-label"
                sx={{ mb: 2.5, color: 'var(--color-accent)' }}
              >
                Restaurant Operating System
              </Typography>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h1"
                className="display-serif"
                sx={{
                  fontSize: { xs: 'var(--text-4xl)', sm: 'var(--text-5xl)', md: 'var(--text-6xl)', lg: 'var(--text-7xl)' },
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.05,
                }}
              >
                Every naira.
                <br />
                Every branch.
                <br />
                Every shift.
              </Typography>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Typography
                sx={{
                  fontSize: { xs: 'var(--text-lg)', md: 'var(--text-xl)' },
                  color: 'var(--color-text-secondary)',
                  maxWidth: 480,
                  lineHeight: 1.6,
                  mb: 5,
                }}
              >
                You can&apos;t be everywhere. SharpTable can.
              </Typography>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(245,158,11,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  href="#mechanism"
                  sx={{
                    bgcolor: 'var(--color-accent)',
                    color: '#000',
                    px: 4,
                    py: 1.75,
                    borderRadius: '9999px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'var(--color-accent-hover)' },
                  }}
                >
                  See how it works
                </Button>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  href="/pricing"
                  sx={{
                    color: 'white',
                    px: 4,
                    py: 1.75,
                    borderRadius: '9999px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.4)', bgcolor: 'rgba(255,255,255,0.04)' },
                  }}
                >
                  Get started
                </Button>
              </Box>
            </motion.div>
          </Box>

          {/* Right: Dashboard Mock */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                bgcolor: 'rgba(15,15,15,0.75)',
                border: '1px solid var(--color-border)',
                borderRadius: '1rem',
                p: { xs: 2.5, md: 3 },
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* Dashboard header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      mb: 0.5,
                    }}
                  >
                    Live Overview
                  </Typography>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                    All Branches
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.75rem',
                    color: '#22c55e',
                    fontWeight: 600,
                    bgcolor: 'rgba(34,197,94,0.1)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '9999px',
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: '#22c55e',
                      boxShadow: '0 0 8px #22c55e',
                    }}
                  />
                  Live
                </Box>
              </Box>

              {/* Total sales */}
              <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid var(--color-border)' }}>
                <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500, mb: 0.5 }}>
                  Total sales today
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  ₦1,096,500
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, mt: 0.75 }}>
                  +18.2% vs last Friday
                </Typography>
              </Box>

              {/* Branch cards */}
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                {branches.map((branch, i) => (
                  <BranchCard key={branch.name} branch={branch} index={i} />
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
