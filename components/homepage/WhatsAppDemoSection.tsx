'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';

const fadeUp = {
  hidden: { opacity: 1, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ----------------------------------------------------------------
   WhatsApp Flow Demo — phone mockup
   ---------------------------------------------------------------- */

const chatMessages = [
  { from: 'customer', text: 'Hi! Can I order 2 Chicken Shawarma and 1 Coke please?', time: '8:14 PM' },
  { from: 'system', text: '🧾 Order received!\n\nChicken Shawarma × 2\nCoke × 1\n\nTotal: ₦8,500\n\nReply YES to confirm.', time: '8:14 PM' },
  { from: 'customer', text: 'YES', time: '8:15 PM' },
  { from: 'system', text: '✅ Order #1082 confirmed!\nEstimated ready: 15 mins\n\nYour kitchen is preparing your order now.', time: '8:15 PM' },
];

const WhatsAppPhoneMock: React.FC = () => (
  <Box
    sx={{
      maxWidth: 320,
      width: '100%',
      mx: 'auto',
      borderRadius: '2rem',
      border: '2px solid rgba(255,255,255,0.15)',
      bgcolor: '#0b141a', // WhatsApp dark bg
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
    }}
  >
    {/* Phone notch */}
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.25, bgcolor: '#1f2c34' }}>
      <Box sx={{ width: 70, height: 4, borderRadius: '2px', bgcolor: 'rgba(255,255,255,0.2)' }} />
    </Box>

    {/* WhatsApp header */}
    <Box
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: '#1f2c34',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#000',
        }}
      >
        ST
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
          SharpTable Orders
        </Typography>
        <Typography sx={{ fontSize: '0.65rem', color: '#25d366', fontWeight: 500 }}>
          Online · Official
        </Typography>
      </Box>
    </Box>

    {/* Chat messages */}
    <Box sx={{ px: 2, py: 2.5, minHeight: 320, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {chatMessages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: 6, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          style={{
            alignSelf: msg.from === 'customer' ? 'flex-end' : 'flex-start',
            maxWidth: '88%',
          }}
        >
          <Box
            sx={{
              bgcolor: msg.from === 'customer' ? '#005c4b' : '#1f2c34',
              borderRadius:
                msg.from === 'customer'
                  ? '0.85rem 0.85rem 0 0.85rem'
                  : '0.85rem 0.85rem 0.85rem 0',
              px: 1.75,
              py: 1.25,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.78rem',
                color: '#e9edef',
                whiteSpace: 'pre-line',
                lineHeight: 1.5,
              }}
            >
              {msg.text}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                color: '#8696a0',
                textAlign: 'right',
                mt: 0.5,
              }}
            >
              {msg.time}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  </Box>
);

/* ----------------------------------------------------------------
   Dashboard Transition Strip
   ---------------------------------------------------------------- */

const DashboardStrip: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      p: 2.5,
      maxWidth: 320,
      width: '100%',
      mx: 'auto',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography
        sx={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Staff Dashboard
      </Typography>
      <Box
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#22c55e',
          bgcolor: 'rgba(34,197,94,0.1)',
          px: 1,
          py: 0.25,
          borderRadius: '4px',
        }}
      >
        ORDER #1082
      </Box>
    </Box>

    {/* Order status flow */}
    {[
      { step: 'Order received', status: '✓', color: '#25d366' },
      { step: 'Staff confirmed', status: '✓', color: '#3b82f6' },
      { step: 'Kitchen preparing', status: '●', color: '#8b5cf6' },
      { step: 'Ready for pickup', status: '○', color: 'var(--color-text-muted)' },
    ].map((item, i) => (
      <motion.div
        key={item.step}
        initial={{ opacity: 1, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 1,
            borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: item.color,
              width: 20,
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            {item.status}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: i < 3 ? 'white' : 'var(--color-text-muted)',
              fontWeight: i < 3 ? 600 : 400,
            }}
          >
            {item.step}
          </Typography>
        </Box>
      </motion.div>
    ))}
  </Box>
);

/* ----------------------------------------------------------------
   WhatsApp Demo Section
   ---------------------------------------------------------------- */

export const WhatsAppDemoSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="whatsapp-demo"
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
          background: 'radial-gradient(ellipse at 30% 60%, rgba(37,211,102,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 4 } }}>
        {/* Section copy */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, maxWidth: 'var(--max-width-narrow)', mx: 'auto' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              className="display-serif"
              sx={{
                fontSize: { xs: 'var(--text-2xl)', md: 'var(--text-3xl)', lg: 'var(--text-4xl)' },
                color: 'white',
                mb: 2.5,
              }}
            >
              Your customers already know how to reach you.
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
              sx={{
                fontSize: { xs: 'var(--text-base)', md: 'var(--text-lg)' },
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
              }}
            >
              SharpTable makes sure the restaurant knows what to do next.
            </Typography>
          </motion.div>
        </Box>

        {/* Phone + Dashboard side by side */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ width: '100%' }}
          >
            <WhatsAppPhoneMock />
          </motion.div>

          {/* Arrow connector */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box sx={{ width: 48, height: 1, bgcolor: 'var(--color-border)' }} />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Instant Sync
              </Typography>
              <Box sx={{ width: 48, height: 1, bgcolor: 'var(--color-border)' }} />
            </Box>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ width: '100%' }}
          >
            <DashboardStrip />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default WhatsAppDemoSection;
