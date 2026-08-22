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
   Kitchen Kanban Board Mock
   ---------------------------------------------------------------- */

interface KitchenTicket {
  id: string;
  items: string;
  time: string;
  source: string;
}

const kanbanColumns = [
  {
    title: 'New',
    color: '#f59e0b',
    tickets: [
      { id: '#1086', items: 'Suya Platter × 2', time: '2m', source: 'Walk-in' },
      { id: '#1087', items: 'Pounded Yam + Egusi', time: '1m', source: 'WhatsApp' },
    ] as KitchenTicket[],
  },
  {
    title: 'Preparing',
    color: '#8b5cf6',
    tickets: [
      { id: '#1084', items: 'Grilled Fish Platter', time: '8m', source: 'Website' },
      { id: '#1083', items: 'Jollof Rice × 3', time: '12m', source: 'Walk-in' },
    ] as KitchenTicket[],
  },
  {
    title: 'Ready',
    color: '#22c55e',
    tickets: [
      { id: '#1082', items: 'Chicken Shawarma × 2', time: '18m', source: 'WhatsApp' },
    ] as KitchenTicket[],
  },
];

const KanbanBoard: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'rgba(15,15,15,0.85)',
      border: '1px solid var(--color-border)',
      borderRadius: '1rem',
      p: { xs: 2, md: 3 },
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
    }}
  >
    {/* Header */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Live Kitchen Display
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
      <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
        Lekki Branch
      </Typography>
    </Box>

    {/* Columns */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      {kanbanColumns.map((column, colIdx) => (
        <Box key={column.title}>
          {/* Column header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '2px',
                  bgcolor: column.color,
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: column.color,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {column.title}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                bgcolor: 'rgba(255,255,255,0.05)',
                px: 1,
                py: 0.25,
                borderRadius: '4px',
              }}
            >
              {column.tickets.length}
            </Typography>
          </Box>

          {/* Tickets */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {column.tickets.map((ticket, ticketIdx) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + (colIdx * 2 + ticketIdx) * 0.08, duration: 0.4 }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `3px solid ${column.color}`,
                    borderRadius: '0.5rem',
                    p: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'var(--color-border-hover)',
                      bgcolor: 'rgba(255,255,255,0.06)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>
                      {ticket.id}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                      {ticket.time}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-secondary)',
                      mb: 0.75,
                      lineHeight: 1.4,
                    }}
                  >
                    {ticket.items}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    via {ticket.source}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

/* ----------------------------------------------------------------
   Module: Kitchen — Section 03
   ---------------------------------------------------------------- */

export const ModuleKitchenSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="module-kitchen"
      className="section-padding"
      sx={{ position: 'relative' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Copy — centered for full-width layout */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, maxWidth: 'var(--max-width-narrow)', mx: 'auto' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography className="module-number" sx={{ mb: 2 }}>
              03 / Kitchen
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
                mb: 2,
              }}
            >
              The kitchen sees what matters.
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
              }}
            >
              No rewriting orders. No screenshots. No searching through chats.
            </Typography>
          </motion.div>
        </Box>

        {/* Full-width Kanban */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <KanbanBoard />
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModuleKitchenSection;
