'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

/* ─────────────────────────────────────────────────────────────
   PageHeader — a cinematic, abstract hero banner for each page.
   
   Each page gets:
   • A character-by-character animated title
   • A word-by-word animated subtitle
   • An abstract background with floating symbols subtly related
     to the page topic
   • The same radial amber/gold glows used throughout the site
   ───────────────────────────────────────────────────────────── */

interface PageHeaderProps {
  /** Main headline — each character animates in */
  title: string;
  /** Subtitle — each word fades in with a stagger */
  subtitle: string;
  /** Accent color tailwind token (default "amber") */
  accent?: string;
  /** Abstract background symbols related to the page topic */
  symbols?: string[];
  /** Optional badge text (small uppercase chip above the title) */
  badge?: string;
}

/* ── Animation variants ──────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, damping: 20, stiffness: 200 },
  },
};

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.6 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ── Floating symbol component ───────────────────────────── */

interface FloatingSymbolProps {
  symbol: string;
  index: number;
  total: number;
}

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ symbol, index, total }) => {
  // Distribute symbols across the header area with deterministic randomness
  const seed = index * 137.508; // golden angle offset
  const left = ((seed * 7.3) % 90) + 5;       // 5% – 95%
  const top = ((seed * 3.7) % 60) + 15;        // 15% – 75%
  const size = 14 + ((seed * 2.1) % 24);        // 14px – 38px
  const delay = (index / total) * 2;
  const duration = 6 + ((seed * 1.3) % 8);      // 6s – 14s
  const rotate = ((seed * 4.1) % 360);

  return (
    <Box
      component={motion.span}
      sx={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        color: 'rgba(245, 158, 11, 0.06)',
        left: `${left}%`,
        top: `${top}%`,
        fontSize: `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0.3, 1, 0.8, 1, 0.3],
        rotate: [rotate, rotate + 20, rotate - 10, rotate + 15, rotate],
        y: [0, -15, 5, -10, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {symbol}
    </Box>
  );
};

/* ── Decorative line ─────────────────────────────────────── */

const DecorativeLine: React.FC = () => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 4 }}
  >
    <Box sx={{ height: '1px', width: 48, background: 'linear-gradient(to right, transparent, rgba(245, 158, 11, 0.4))' }} />
    <Box
      component={motion.div}
      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      sx={{ height: 6, width: 6, borderRadius: '50%', bgcolor: 'rgba(245, 158, 11, 0.6)' }}
    />
    <Box sx={{ height: '1px', width: 96, background: 'linear-gradient(to right, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.1))' }} />
    <Box
      component={motion.div}
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      sx={{ height: 4, width: 4, borderRadius: '50%', bgcolor: 'rgba(245, 158, 11, 0.4)' }}
    />
    <Box sx={{ height: '1px', width: 48, background: 'linear-gradient(to left, transparent, rgba(245, 158, 11, 0.4))' }} />
  </Box>
);

/* ── Main component ──────────────────────────────────────── */

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  symbols = [],
  badge,
}) => {
  // Split title into characters (preserve spaces)
  const chars = useMemo(() => title.split(''), [title]);
  // Split subtitle into words
  const words = useMemo(() => subtitle.split(' '), [subtitle]);

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'black' }}>
      {/* ── Background layers ── */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Amber glow — top center */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.07) 0%, transparent 50%)' }} />
        {/* Soft white glow — bottom right */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom right, rgba(255,255,255,0.02) 0%, transparent 50%)' }} />
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </Box>

      {/* ── Floating abstract symbols ── */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {symbols.map((sym, i) => (
          <FloatingSymbol key={`${sym}-${i}`} symbol={sym} index={i} total={symbols.length} />
        ))}
      </Box>

      {/* ── Content ── */}
      <Box sx={{ position: 'relative', zIndex: 10, maxWidth: '1024px', mx: 'auto', px: 3, pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 10 }, textAlign: 'center' }}>
        {/* Badge */}
        {badge && (
          <Box
            component={motion.div}
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
          >
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)', bgcolor: 'rgba(245, 158, 11, 0.1)', px: 2, py: 0.75, color: '#fcd34d', fontSize: { xs: '0.625rem', sm: '0.6875rem' }, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              {badge}
            </Box>
          </Box>
        )}

        {/* Character-animated title */}
        <Typography
          component={motion.h1}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' }, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'white', perspective: '600px' }}
        >
          {chars.map((char, i) => (
            <Box
              component={motion.span}
              key={i}
              variants={charVariants}
              sx={{ display: 'inline-block', width: char === ' ' ? '0.25em' : 'auto', transformOrigin: 'bottom center' }}
            >
              {/* Highlight text inside asterisks-style markers — 
                  words between * become amber */}
              {char === ' ' ? '\u00A0' : char}
            </Box>
          ))}
        </Typography>

        {/* Word-animated subtitle */}
        <Typography
          component={motion.p}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mt: 2.5, fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, color: 'grey.400', maxWidth: 'md', mx: 'auto', lineHeight: 1.625, fontWeight: 300 }}
        >
          {words.map((word, i) => (
            <Box component={motion.span} key={i} variants={wordVariants} sx={{ display: 'inline-block', mr: '0.3em' }}>
              {word}
            </Box>
          ))}
        </Typography>

        <DecorativeLine />
      </Box>

      {/* Bottom fade to black */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 96, background: 'linear-gradient(to top, black, transparent)', zIndex: 10 }} />
    </Box>
  );
};
