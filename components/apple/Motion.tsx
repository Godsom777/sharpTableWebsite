'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll motion for the Apple-style tiles. Runs only when the visitor has not asked for reduced motion.
 * .dev  device art scales and rises in as it scrolls into view
 * .head headings fade up once
 * .par  photo parallax
 */
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector('.ap');
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.classList.add('js');
      gsap.utils.toArray<HTMLElement>('.ap .dev').forEach((el) =>
        gsap.fromTo(el, { y: 100, scale: 0.88, opacity: 0.5 }, { y: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: 0.6 } })
      );
      gsap.utils.toArray<HTMLElement>('.ap .head').forEach((el) =>
        gsap.from(el, { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
      gsap.utils.toArray<HTMLElement>('.ap .par').forEach((img) =>
        gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      );
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => { window.removeEventListener('load', refresh); root.classList.remove('js'); };
    });
    return () => mm.revert();
  }, [pathname]);
  return null;
}
