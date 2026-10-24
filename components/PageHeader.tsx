'use client';

import React from 'react';
import { Reveal } from '@/components/motion/Reveal';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  /** Kept for backwards compatibility; the brand accent is always yellow. */
  accent?: string;
  /** Kept for backwards compatibility; no longer rendered. */
  symbols?: string[];
  badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, badge }) => (
  <header className="relative overflow-hidden border-b border-white/10">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 15% 0%, rgba(142,197,255,0.16), transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(245,197,24,0.10), transparent 50%)' }}
    />
    <div className="container relative max-w-4xl py-12 text-center md:py-20">
      <Reveal>
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow">
            {badge}
          </span>
        )}
        <h1 className="display-serif mb-4 text-[2.5rem] leading-[1.05] text-white sm:text-6xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{subtitle}</p>
      </Reveal>
    </div>
  </header>
);

export default PageHeader;
