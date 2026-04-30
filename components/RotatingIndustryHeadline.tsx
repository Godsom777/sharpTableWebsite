import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, useMediaQuery } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

const INDUSTRY_LABELS = ['hospitality', 'Hotel', 'Restaurant', 'Bar & Grill', 'Motel'] as const;
const ROTATION_INTERVAL_MS = 2600;

interface RotatingIndustryHeadlineProps {
  accentColor: string;
  lineSx?: SxProps<Theme>;
  termSx?: SxProps<Theme>;
}

export const RotatingIndustryHeadline: React.FC<RotatingIndustryHeadlineProps> = ({
  accentColor,
  lineSx,
  termSx,
}) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % INDUSTRY_LABELS.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const activeIndustry = INDUSTRY_LABELS[activeIndex];

  return (
    <>
      Absolute command
      <Box component="span" sx={[{ color: accentColor, display: 'block' }, lineSx]}>
        of{' '}
        <Box component="span" sx={[{ display: 'inline-grid', minWidth: '13ch', textAlign: 'left' }, termSx]}>
          <AnimatePresence mode="wait" initial={false}>
            <Box
              key={activeIndustry}
              component={motion.span}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              sx={{ display: 'inline-block' }}
            >
              {activeIndustry}
            </Box>
          </AnimatePresence>
        </Box>{' '}
        operations.
      </Box>
    </>
  );
};
