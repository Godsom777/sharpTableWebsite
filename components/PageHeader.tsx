import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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
    <motion.span
      className="absolute pointer-events-none select-none text-amber-500/[0.06]"
      style={{
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
    </motion.span>
  );
};

/* ── Decorative line ─────────────────────────────────────── */

const DecorativeLine: React.FC = () => (
  <motion.div
    className="flex items-center justify-center gap-3 mt-8"
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
  >
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
    <motion.div
      className="h-1.5 w-1.5 rounded-full bg-amber-500/60"
      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="h-px w-24 bg-gradient-to-r from-amber-500/40 to-amber-500/10" />
    <motion.div
      className="h-1 w-1 rounded-full bg-amber-500/40"
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
  </motion.div>
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
    <section className="relative overflow-hidden bg-black">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0">
        {/* Amber glow — top center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.07)_0%,transparent_50%)]" />
        {/* Soft white glow — bottom right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Floating abstract symbols ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {symbols.map((sym, i) => (
          <FloatingSymbol key={`${sym}-${i}`} symbol={sym} index={i} total={symbols.length} />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Character-animated title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          style={{ perspective: '600px' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              className={`inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}
              style={{ transformOrigin: 'bottom center' }}
            >
              {/* Highlight text inside asterisks-style markers — 
                  words between * become amber */}
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Word-animated subtitle */}
        <motion.p
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
              {word}
            </motion.span>
          ))}
        </motion.p>

        <DecorativeLine />
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};
