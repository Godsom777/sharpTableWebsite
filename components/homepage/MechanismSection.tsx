'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { MorphText } from './MorphText';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ----------------------------------------------------------------
   Unified Order Dashboard Mock
   ---------------------------------------------------------------- */

const orders = [
  { id: '#1082', source: 'WhatsApp', items: 'Chicken Shawarma × 2, Coke × 1', amount: '₦8,500', status: 'Confirmed', time: '8:14 PM' },
  { id: '#1083', source: 'Walk-in', items: 'Jollof Rice Special × 3', amount: '₦12,000', status: 'Preparing', time: '8:16 PM' },
  { id: '#1084', source: 'Website', items: 'Grilled Fish Platter × 1, Chapman × 2', amount: '₦15,200', status: 'New', time: '8:18 PM' },
  { id: '#1085', source: 'Phone', items: 'Chicken & Chips × 4', amount: '₦18,000', status: 'New', time: '8:19 PM' },
];

const sourceColors: Record<string, string> = {
  'WhatsApp': '#25d366',
  'Walk-in': '#8b5cf6',
  'Website': '#3b82f6',
  'Phone': '#f59e0b',
};

const statusColors: Record<string, string> = {
  'New': '#f59e0b',
  'Confirmed': '#3b82f6',
  'Preparing': '#8b5cf6',
};

const OrderDashboard: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      overflow: 'hidden',
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
          Live Omnichannel Orders
        </Typography>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {Object.entries(sourceColors).map(([source, color]) => (
          <Box
            key={source}
            sx={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color,
              bgcolor: `${color}15`,
              border: `1px solid ${color}30`,
              px: 1,
              py: 0.25,
              borderRadius: '4px',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {source}
          </Box>
        ))}
      </Box>
    </Box>

    {/* Orders */}
    {orders.map((order, i) => (
      <motion.div
        key={order.id}
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderBottom: i < orders.length - 1 ? '1px solid var(--color-border)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'background-color 0.2s',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
          }}
        >
          {/* Source indicator */}
          <Box
            sx={{
              width: 3,
              height: 38,
              borderRadius: '2px',
              bgcolor: sourceColors[order.source],
              boxShadow: `0 0 10px ${sourceColors[order.source]}40`,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                {order.id}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: sourceColors[order.source],
                  bgcolor: `${sourceColors[order.source]}15`,
                  px: 0.75,
                  py: 0.15,
                  borderRadius: '3px',
                }}
              >
                {order.source}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {order.items}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>
              {order.amount}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: statusColors[order.status],
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {order.status}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    ))}
  </Box>
);

/* ----------------------------------------------------------------
   Mechanism Section — Section 4
   ---------------------------------------------------------------- */

export const MechanismSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="mechanism"
      className="section-padding"
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* Left: Copy with MorphText */}
          <Box>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Typography
                className="editorial-label"
                sx={{ mb: 2.5, color: 'var(--color-accent)' }}
              >
                The Mechanism
              </Typography>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Typography
                className="display-serif"
                sx={{
                  fontSize: { xs: 'var(--text-3xl)', md: 'var(--text-4xl)', lg: 'var(--text-5xl)' },
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.15,
                }}
              >
                Orders have a way of coming from everywhere.
              </Typography>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box sx={{ mb: 3.5 }}>
                <MorphText
                  words={['WhatsApp.', 'A phone call.', 'Someone at the counter.', 'A link someone found online.']}
                  finalWord="One table."
                  interval={1400}
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontSize: { xs: 'var(--text-2xl)', md: 'var(--text-3xl)' },
                    color: 'var(--color-accent)',
                    lineHeight: 1.3,
                  }}
                />
              </Box>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 'var(--text-lg)', md: 'var(--text-xl)' },
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                SharpTable brings them back to one table — at every branch.
              </Typography>
            </motion.div>
          </Box>

          {/* Right: Order Dashboard */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <OrderDashboard />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default MechanismSection;
