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
   Mini Analytics Dashboard
   ---------------------------------------------------------------- */

const channelData = [
  { name: 'Walk-in', orders: 51, color: '#8b5cf6' },
  { name: 'WhatsApp', orders: 42, color: '#25d366' },
  { name: 'Website', orders: 34, color: '#3b82f6' },
];

const topItems = [
  { name: 'Chicken & Chips', sold: 42, revenue: '₦168,000' },
  { name: 'Jollof Rice Special', sold: 35, revenue: '₦140,000' },
  { name: 'Grilled Fish Platter', sold: 22, revenue: '₦110,000' },
  { name: 'Suya Platter', sold: 18, revenue: '₦72,000' },
];

const maxOrders = Math.max(...channelData.map((c) => c.orders));

const InsightsDashboard: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      overflow: 'hidden',
      maxWidth: 440,
      mx: { xs: 'auto', lg: 0 },
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
      <Box>
        <Typography
          sx={{
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            mb: 0.25,
          }}
        >
          End of Day
        </Typography>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Today&apos;s Summary
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        Lekki Branch
      </Typography>
    </Box>

    {/* Top-level stats */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {[
        { label: 'Sales', value: '₦385,500' },
        { label: 'Orders', value: '127' },
        { label: 'Avg Order', value: '₦3,035' },
      ].map((stat, i) => (
        <Box
          key={stat.label}
          sx={{
            px: 2,
            py: 2,
            borderRight: i < 2 ? '1px solid var(--color-border)' : 'none',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.6rem',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              mb: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {stat.label}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Channel breakdown — animated horizontal bars */}
    <Box sx={{ px: 2.5, py: 2.5, borderBottom: '1px solid var(--color-border)' }}>
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 1.75,
        }}
      >
        Orders by Channel
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {channelData.map((channel, i) => (
          <Box key={channel.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                {channel.name}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'white' }}>
                {channel.orders} orders
              </Typography>
            </Box>
            <Box
              sx={{
                height: 7,
                bgcolor: 'rgba(255,255,255,0.06)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(channel.orders / maxOrders) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: channel.color,
                  borderRadius: '4px',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>

    {/* Top selling items */}
    <Box sx={{ px: 2.5, py: 2 }}>
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 1.5,
        }}
      >
        Top Items
      </Typography>
      {topItems.map((item, i) => (
        <Box
          key={item.name}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            borderBottom: i < topItems.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-accent)',
                width: 16,
              }}
            >
              0{i + 1}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: 'white', fontWeight: 500 }}>
              {item.name}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'white' }}>
              {item.revenue}
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
              {item.sold} sold
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

/* ----------------------------------------------------------------
   Module: Insights — Section 05
   ---------------------------------------------------------------- */

export const ModuleInsightsSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="module-insights"
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
          {/* Left: Dashboard (reversed layout) */}
          <Box sx={{ order: { xs: 2, lg: 1 } }}>
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <InsightsDashboard />
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
                05 / Insights
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
                When the doors close, the numbers tell the story.
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
                  mb: 3,
                }}
              >
                &ldquo;I know exactly what sold, what didn&apos;t, and what&apos;s running low — before I even open the branch.&rdquo;
              </Typography>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography
                sx={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  maxWidth: 420,
                }}
              >
                Sales, orders, average order value, best-selling items, peak periods, payment breakdowns, staff activity — all in one place, updated in real time.
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ModuleInsightsSection;
