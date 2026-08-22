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
   Auditor Dashboard Mock — clean reconciliation view
   ---------------------------------------------------------------- */

const auditEntries = [
  { time: '8:42 PM', action: 'Void override', staff: 'Chidera M.', branch: 'Lekki', type: 'alert' },
  { time: '8:38 PM', action: 'Comp order #1094', staff: 'Amara K.', branch: 'V/Island', type: 'comp' },
  { time: '8:31 PM', action: 'Price edit: Chicken & Chips', staff: 'David O.', branch: 'Ikeja', type: 'edit' },
  { time: '8:24 PM', action: 'Stock adjustment: Cooking Oil', staff: 'Michael T.', branch: 'Lekki', type: 'edit' },
];

const AuditDashboard: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      overflow: 'hidden',
      maxWidth: 480,
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
          Auditor View
        </Typography>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Live Audit Activity Log
        </Typography>
      </Box>
      <Box
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#f59e0b',
          bgcolor: 'rgba(245,158,11,0.15)',
          px: 1.25,
          py: 0.5,
          borderRadius: '4px',
          letterSpacing: '0.05em',
        }}
      >
        3 FLAGS
      </Box>
    </Box>

    {/* Entries */}
    {auditEntries.map((entry, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.75,
            borderBottom: i < auditEntries.length - 1 ? '1px solid var(--color-border)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'background-color 0.2s',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor:
                entry.type === 'alert' ? '#ef4444' :
                entry.type === 'comp' ? '#f59e0b' :
                'rgba(255,255,255,0.25)',
              boxShadow:
                entry.type === 'alert' ? '0 0 8px rgba(239,68,68,0.6)' :
                entry.type === 'comp' ? '0 0 8px rgba(245,158,11,0.5)' :
                'none',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {entry.action}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
              {entry.staff} · {entry.branch}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              flexShrink: 0,
            }}
          >
            {entry.time}
          </Typography>
        </Box>
      </motion.div>
    ))}
  </Box>
);

/* ----------------------------------------------------------------
   Fourth Set of Eyes — Section 3
   ---------------------------------------------------------------- */

export const FourthSetOfEyesSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="fourth-set-of-eyes"
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
          {/* Copy */}
          <Box>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Typography
                className="editorial-label"
                sx={{ mb: 2.5, color: 'var(--color-accent)' }}
              >
                Accountability
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
                  fontSize: { xs: 'var(--text-xl)', md: 'var(--text-2xl)' },
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Every branch has a Marshall, a Chef, a manager.
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
                  fontSize: { xs: 'var(--text-3xl)', md: 'var(--text-4xl)' },
                  color: 'white',
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                SharpTable adds a fourth — one that answers only to the numbers.
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
                  fontSize: { xs: 'var(--text-base)', md: 'var(--text-lg)' },
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Every edit. Every comp. Every void.
                <br />
                Logged automatically, by branch.
              </Typography>
            </motion.div>
          </Box>

          {/* Auditor Dashboard */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <AuditDashboard />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default FourthSetOfEyesSection;
