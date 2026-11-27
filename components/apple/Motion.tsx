'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lightweight GSAP ScrollTrigger layer for smooth parallax on device frames (.dev)
 * on standard pages that don't use custom Framer Motion scroll choreography.
 */
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector('.ap');
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.ap .dev').forEach((el) =>
        gsap.fromTo(
          el,
          { y: 48, scale: 0.96, opacity: 0.85 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 52%',
              scrub: 0.5,
            },
          }
        )
      );
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => {
        window.removeEventListener('load', refresh);
      };
    });
    return () => mm.revert();
  }, [pathname]);

  return null;
}
