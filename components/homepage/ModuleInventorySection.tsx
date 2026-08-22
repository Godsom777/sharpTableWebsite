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
   Inventory Breakdown Mock
   ---------------------------------------------------------------- */

const menuItems = [
  {
    name: 'Chicken & Chips',
    sold: 42,
    ingredients: [
      { name: 'Chicken', stock: 18, unit: 'portions', status: 'ok' as const },
      { name: 'Potatoes', stock: 8, unit: 'kg', status: 'low' as const },
      { name: 'Cooking Oil', stock: 3, unit: 'litres', status: 'critical' as const },
    ],
  },
  {
    name: 'Jollof Rice Special',
    sold: 35,
    ingredients: [
      { name: 'Rice', stock: 25, unit: 'kg', status: 'ok' as const },
      { name: 'Tomato paste', stock: 12, unit: 'tins', status: 'ok' as const },
      { name: 'Chicken', stock: 18, unit: 'portions', status: 'ok' as const },
    ],
  },
];

const statusConfig = {
  ok: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'In stock' },
  low: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Low' },
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', label: 'Critical' },
};

const InventoryBreakdown: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      overflow: 'hidden',
      maxWidth: 440,
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
    }}
  >
    {/* Header */}
    <Box
      sx={{
        px: 2.5,
        py: 2,
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Ingredient Tracker
        </Typography>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#ef4444',
            boxShadow: '0 0 8px #ef4444',
          }}
        />
      </Box>
      <Box
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#ef4444',
          bgcolor: 'rgba(239,68,68,0.15)',
          px: 1.25,
          py: 0.4,
          borderRadius: '4px',
        }}
      >
        1 CRITICAL
      </Box>
    </Box>

    {/* Menu items with ingredient breakdown */}
    {menuItems.map((item, idx) => (
      <Box
        key={item.name}
        sx={{
          borderBottom: idx < menuItems.length - 1 ? '1px solid var(--color-border)' : 'none',
        }}
      >
        {/* Menu item header */}
        <Box
          sx={{
            px: 2.5,
            py: 1.75,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.02)',
          }}
        >
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
            {item.name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            {item.sold} sold today
          </Typography>
        </Box>

        {/* Ingredients */}
        {item.ingredients.map((ing) => {
          const config = statusConfig[ing.status];
          return (
            <Box
              key={ing.name}
              sx={{
                px: 2.5,
                py: 1.25,
                pl: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                borderTop: '1px solid rgba(255,255,255,0.03)',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
              }}
            >
              {/* Tree connector */}
              <Box
                sx={{
                  width: 12,
                  height: 1,
                  bgcolor: 'var(--color-border)',
                  flexShrink: 0,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: -8,
                    width: 1,
                    height: 8,
                    bgcolor: 'var(--color-border)',
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.78rem',
                  color: 'var(--color-text-secondary)',
                  flex: 1,
                }}
              >
                {ing.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                {ing.stock} {ing.unit}
              </Typography>

              <Box
                sx={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: config.color,
                  bgcolor: config.bg,
                  px: 1,
                  py: 0.25,
                  borderRadius: '3px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                {config.label}
              </Box>
            </Box>
          );
        })}
      </Box>
    ))}
  </Box>
);

/* ----------------------------------------------------------------
   Module: Inventory — Section 04
   ---------------------------------------------------------------- */

export const ModuleInventorySection: React.FC = () => {
  return (
    <Box
      component="section"
      id="module-inventory"
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
          {/* Left: Copy */}
          <Box>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography className="module-number" sx={{ mb: 2 }}>
                04 / Inventory
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
                Know what&apos;s left before you say yes.
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
                Know what you&apos;re selling. Know what you&apos;re running out of. Inventory connected to actual orders, not a separate spreadsheet.
              </Typography>
            </motion.div>
          </Box>

          {/* Right: Inventory Breakdown */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <InventoryBreakdown />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ModuleInventorySection;
