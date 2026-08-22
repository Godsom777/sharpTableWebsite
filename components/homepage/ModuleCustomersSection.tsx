'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ----------------------------------------------------------------
   Customer Profile Card Mock
   ---------------------------------------------------------------- */

const CustomerProfileCard: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      overflow: 'hidden',
      maxWidth: 380,
      mx: { xs: 'auto', lg: 0 },
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
    }}
  >
    {/* Profile header */}
    <Box
      sx={{
        px: 3,
        py: 2.5,
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.25rem',
          color: '#000',
          boxShadow: '0 0 15px rgba(245,158,11,0.4)',
        }}
      >
        C
      </Box>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
          Chisom
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Regular customer · WhatsApp
        </Typography>
      </Box>
    </Box>

    {/* Stats grid */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-border)' }}>
      <Box sx={{ px: 3, py: 2, borderRight: '1px solid var(--color-border)' }}>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 500, color: 'var(--color-text-muted)', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Total orders
        </Typography>
        <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
          18
        </Typography>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 500, color: 'var(--color-text-muted)', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Total spend
        </Typography>
        <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
          ₦284,500
        </Typography>
      </Box>
    </Box>

    {/* Details */}
    <Box sx={{ px: 3, py: 2.5 }}>
      {[
        { label: 'Favourite', value: 'Chicken & Chips' },
        { label: 'Last order', value: '9 days ago' },
        { label: 'Average order', value: '₦15,805' },
      ].map((item, i) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            {item.label}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Reorder prompt */}
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: 'var(--color-accent-soft)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)' }}>
        Order your usual?
      </Typography>
      <Box
        sx={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#000',
          bgcolor: 'var(--color-accent)',
          px: 1.5,
          py: 0.5,
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reorder
      </Box>
    </Box>
  </Box>
);

/* ----------------------------------------------------------------
   Module: Customers — Section 02
   ---------------------------------------------------------------- */

export const ModuleCustomersSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="module-customers"
      className="section-padding"
      sx={{ position: 'relative' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* Left: Customer Profile (reversed layout) */}
          <Box sx={{ order: { xs: 2, lg: 1 } }}>
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <CustomerProfileCard />
            </motion.div>
          </Box>

          {/* Right: Copy */}
          <Box sx={{ order: { xs: 1, lg: 2 } }}>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography className="module-number" sx={{ mb: 2 }}>
                02 / Customers
              </Typography>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography
                className="display-serif"
                sx={{
                  fontSize: { xs: 'var(--text-2xl)', md: 'var(--text-3xl)' },
                  color: 'white',
                  mb: 3,
                }}
              >
                The next order starts with the last one.
              </Typography>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography
                sx={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: 420,
                }}
              >
                Every order gradually creates a useful customer profile. No app download required — just a returning customer who the system already knows.
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ModuleCustomersSection;
