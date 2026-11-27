'use client';

import { useEffect, useState } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';

/**
 * Velvety WebGL GrainGradient ambient backdrop powered by @paper-design/shaders-react
 * in SharpTable's deep navy, royal sapphire, and burnished gold palette.
 * Respects prefers-reduced-motion and renders cleanly after client mount.
 */
export function HeroShaderBg({
  variant = 'hero',
}: {
  variant?: 'hero' | 'cta';
}) {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener?.('change', onChange);
      return () => mq.removeEventListener?.('change', onChange);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="hero-shader-layer" aria-hidden="true">
      <GrainGradient
        width="100%"
        height="100%"
        colorBack="#061020"
        colors={
          variant === 'hero'
            ? ['#0d2b5c', '#18478a', '#c99714', '#091a36']
            : ['#0f3066', '#d4a317', '#081833']
        }
        softness={0.78}
        intensity={variant === 'hero' ? 0.36 : 0.3}
        noise={0.22}
        shape={variant === 'hero' ? 'corners' : 'wave'}
        speed={reduced ? 0 : 0.22}
        scale={1.15}
      />
    </div>
  );
}
