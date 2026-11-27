'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DEMO_URL } from './Bits';
import { ScrollProgressBar } from './StoryVisuals';

const LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/for-hotels', label: 'Hotels' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/partnership', label: 'Partners' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`gn${scrolled ? ' scrolled' : ''}`}>
      <div className="in">
        <div className="gn-left">
          <Link className="mark" href="/" aria-label="SharpTable home">
            <img src="/assets/logos/logo-black.png" alt="" width={28} height={18} />
            SharpTable
          </Link>

          <nav aria-label="Main">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined}>
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="right">
          <Link className="login" href="/account">
            Log in
          </Link>
          {/* TODO(Okoro): DEMO_URL — interim /pricing until booking link confirmed */}
          <Link className="cta" href={DEMO_URL}>
            <span>Book a demo</span>
          </Link>
          <button
            className="burger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="gn-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </div>
      </div>

      <ScrollProgressBar />

      <AnimatePresence>
        {open && (
          <motion.div
            id="gn-sheet"
            className="sheet"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
              >
                {l.label}
                <span aria-hidden="true" style={{ opacity: 0.35, fontSize: 18 }}>
                  ›
                </span>
              </Link>
            ))}
            <Link href="/account">
              Log in
              <span aria-hidden="true" style={{ opacity: 0.35, fontSize: 18 }}>
                ›
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
