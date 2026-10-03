'use client';

import React from 'react';
import Image from 'next/image';
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

const shots = [
  {
    src: '/mockups/whatsapp_phone.webp',
    width: 1071,
    height: 900,
    caption: 'WhatsApp order',
    alt: 'A customer phone showing a WhatsApp order for one jollof rice and one grilled chicken, marked Paid.',
  },
  {
    src: '/mockups/marshal_desktop.webp',
    width: 955,
    height: 900,
    caption: 'Marshal',
    alt: 'A marshal desktop for Table 4, showing jollof rice and grilled chicken with a Confirm button.',
  },
  {
    src: '/mockups/manager_desktop.webp',
    width: 874,
    height: 900,
    caption: 'Manager',
    alt: 'A manager desktop listing three branches: Old English open, Site 2 quiet, and Site 3 busy.',
  },
  {
    src: '/mockups/manager_phone.webp',
    width: 1176,
    height: 900,
    caption: 'On the go',
    alt: 'A manager phone showing the same three branches: Old English open, Site 2 quiet, and Site 3 busy.',
  },
];

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
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, maxWidth: 'var(--max-width-narrow)', mx: 'auto' }}>
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

        {/* One row on desktop; a single column on a phone so nothing is clipped. */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
            gap: { xs: 4, md: 2 },
            alignItems: 'end',
            maxWidth: { xs: 420, md: 'none' },
            mx: { xs: 'auto', md: 0 },
          }}
        >
          {shots.map((shot, i) => (
            <motion.figure
              key={shot.src}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ margin: 0 }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 900px) 90vw, 25vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <Typography
                component="figcaption"
                sx={{
                  mt: 1,
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                {shot.caption}
              </Typography>
            </motion.figure>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhatsAppDemoSection;
