'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Box } from '@mui/material';

interface MorphTextProps {
  /** Words to cycle through before landing on the final word */
  words: string[];
  /** The final word the animation settles on */
  finalWord: string;
  /** Time each word is displayed (ms) */
  interval?: number;
  /** Typography styles to apply */
  sx?: Record<string, unknown>;
}

/**
 * MorphText — Signature Interaction for Mechanism Section
 * 
 * Cycles through the chaos of incoming order channels:
 * - "WhatsApp."
 * - "A phone call."
 * - "Someone at the counter."
 * - "A link someone found online."
 * ↓ (settles smoothly, does not loop)
 * - "One table."
 */
export const MorphText: React.FC<MorphTextProps> = ({
  words,
  finalWord,
  interval = 1400,
  sx = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const allWords = [...words, finalWord];
  const isLastWord = currentIndex === allWords.length - 1;

  // Start the sequence when the element scrolls into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  // Cycle through words
  useEffect(() => {
    if (!hasStarted || hasFinished) return;

    if (currentIndex >= allWords.length - 1) {
      setHasFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, hasStarted, hasFinished, interval, allWords.length]);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-block',
        position: 'relative',
        minHeight: { xs: '1.4em', md: '1.3em' },
        ...sx,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={allWords[currentIndex]}
          initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            color: isLastWord ? 'var(--color-accent)' : '#ffffff',
          }}
          exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            display: 'inline-block',
            fontWeight: isLastWord ? 800 : 600,
            textShadow: isLastWord ? '0 0 20px rgba(245,158,11,0.4)' : 'none',
          }}
        >
          {allWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </Box>
  );
};

export default MorphText;
