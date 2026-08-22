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
   Order Flow Visualization
   ---------------------------------------------------------------- */

const flowSteps = [
  {
    label: 'Customer',
    content: '"Good evening, please can I get two chicken shawarma and one Coke."',
    type: 'message' as const,
  },
  {
    label: 'SharpTable',
    content: 'Order #1082\nChicken Shawarma × 2\nCoke × 1\n₦8,500',
    type: 'order' as const,
  },
  {
    label: 'Staff',
    content: 'Confirm order',
    type: 'action' as const,
  },
  {
    label: 'Kitchen',
    content: 'Preparing #1082',
    type: 'status' as const,
  },
  {
    label: 'Completed',
    content: 'Order delivered',
    type: 'success' as const,
  },
];

const stepColors = {
  message: { accent: '#25d366', bg: 'rgba(37,211,102,0.08)' },
  order: { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  action: { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  status: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
  success: { accent: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
};

const OrderFlowVisual: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {flowSteps.map((step, i) => (
        <motion.div
          key={step.label}
          custom={i}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: (idx: number) => ({
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
            }),
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2 }}>
            {/* Vertical connector */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 24,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: stepColors[step.type].accent,
                  boxShadow: `0 0 12px ${stepColors[step.type].accent}`,
                  flexShrink: 0,
                  mt: 2,
                }}
              />
              {i < flowSteps.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    flex: 1,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    minHeight: 20,
                  }}
                />
              )}
            </Box>

            {/* Step content */}
            <Box
              sx={{
                flex: 1,
                bgcolor: stepColors[step.type].bg,
                border: `1px solid ${stepColors[step.type].accent}30`,
                borderRadius: '0.65rem',
                p: 2,
                mb: i < flowSteps.length - 1 ? 1.5 : 0,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: stepColors[step.type].accent,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                {step.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: step.type === 'message' ? '0.85rem' : '0.82rem',
                  color: step.type === 'message' ? 'var(--color-text-secondary)' : 'white',
                  fontWeight: step.type === 'message' ? 400 : 600,
                  fontStyle: step.type === 'message' ? 'italic' : 'normal',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.5,
                }}
              >
                {step.content}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

/* ----------------------------------------------------------------
   Module: Orders — Section 01
   ---------------------------------------------------------------- */

export const ModuleOrdersSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="module-orders"
      className="section-padding"
      sx={{ position: 'relative' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Section intro */}
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
              fontSize: { xs: 'var(--text-3xl)', md: 'var(--text-4xl)' },
              color: 'white',
              mb: { xs: 8, md: 12 },
              textAlign: 'center',
            }}
          >
            Five things SharpTable keeps together.
          </Typography>
        </motion.div>

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
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography className="module-number" sx={{ mb: 2 }}>
                01 / Orders
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
                className="display-serif"
                sx={{
                  fontSize: { xs: 'var(--text-2xl)', md: 'var(--text-3xl)' },
                  color: 'white',
                  mb: 3,
                }}
              >
                The message becomes an order.
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
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: 420,
                }}
              >
                Wherever the order starts — WhatsApp, a phone call, the counter — it should not get lost. SharpTable captures it, confirms it, and sends it to the kitchen.
              </Typography>
            </motion.div>
          </Box>

          {/* Right: Order Flow Visual */}
          <Box>
            <OrderFlowVisual />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ModuleOrdersSection;
