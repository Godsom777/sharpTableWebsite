'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChampagneGlasses,
  faFireBurner,
  faMartiniGlassCitrus,
  faStore,
  faUtensils,
  faHotel,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

const builtForGroups = [
  {
    title: 'Restaurants',
    description:
      'Full-service restaurants that need clean ordering, faster table turns, and tighter control from floor to kitchen.',
    icon: faUtensils,
  },
  {
    title: 'Bars and Grills',
    description:
      'Busy bar and grill operations where speed, accurate handoff, and real-time oversight matter during peak hours.',
    icon: faMartiniGlassCitrus,
  },
  {
    title: 'Food Outlets',
    description:
      'Fast-moving food outlets that want less queue friction, fewer mistakes, and a simpler paid-before-prep flow.',
    icon: faStore,
  },
  {
    title: 'Lounges and Rooftops',
    description:
      'Premium spaces that want smooth guest ordering without breaking the atmosphere or slowing down service teams.',
    icon: faChampagneGlasses,
  },
  {
    title: 'Hotels & Resorts',
    description:
      'Seamless visitor tracking, integrated booking flows, and digital room service without bloating your core operations.',
    icon: faHotel,
  },
];

export const WhoIsThisFor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" sx={{ bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 20%, rgba(201,168,76,0.12), transparent 32%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.05), transparent 28%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: 3, py: { xs: 10, md: 16 } }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
          sx={{ maxWidth: 760, mb: { xs: 5, md: 7 } }}
        >
          <Typography
            sx={{
              color: '#C9A84C',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Built For
          </Typography>

          <Typography
            sx={{
              color: 'white',
              fontWeight: 900,
              fontSize: { xs: '2rem', md: '3.5rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              mb: 2,
            }}
          >
            SharpTable fits service businesses that need speed, control, and clean execution.
          </Typography>

          <Typography
            sx={{
              color: 'grey.400',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
              maxWidth: 640,
            }}
          >
            Built for operators who want ordering, payment confirmation, and kitchen flow to work without delays, confusion, or manual follow-up.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(5, 1fr)' },
            gap: 2.5,
          }}
        >
          {builtForGroups.map((group, index) => (
            <Box
              key={group.title}
              component={motion.div}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              sx={{
                minHeight: 250,
                borderRadius: '1.75rem',
                border: '1px solid rgba(255,255,255,0.08)',
                bgcolor: 'rgba(17,17,17,0.92)',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(201,168,76,0.14)',
                  color: '#E5C46B',
                  mb: 4,
                }}
              >
                <FontAwesomeIcon icon={group.icon} style={{ width: 18, height: 18 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    letterSpacing: '-0.02em',
                    mb: 1.5,
                  }}
                >
                  {group.title}
                </Typography>

                <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {group.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

