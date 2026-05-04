'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import theme from '@/theme';

// This creates an emotion cache that works with Next.js App Router SSR
function createEmotionCache() {
  return createCache({ key: 'mui' });
}

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const c = createEmotionCache();
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;

    let styles = '';
    for (const name of names) {
      if (cache.inserted[name] !== true) {
        styles += cache.inserted[name] as string;
      }
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* reducedMotion="always" forces every Framer Motion component to skip animations and render in its final visible state on the server, ensuring crawlability without opacity: 0 */}
        <MotionConfig reducedMotion="always">
          {children}
        </MotionConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
