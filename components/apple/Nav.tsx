'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DEMO_URL } from './Bits';

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
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="gn">
      <div className="in">
        <Link className="mark" href="/" aria-label="SharpTable home">
          <img src="/assets/logos/logo-black.png" alt="" width={29} height={18} />
          SharpTable
        </Link>
        <nav aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="right">
          <Link className="login" href="/account" style={{ fontSize: 12, opacity: 0.8, marginRight: 12 }}>Log in</Link>
          {/* TODO(Okoro): DEMO_URL — interim /pricing until booking link confirmed */}
          <Link className="cta" href={DEMO_URL}><span>Book a demo</span></Link>
          <button className="burger" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="gn-sheet" onClick={() => setOpen((o) => !o)}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="gn-sheet" className="sheet">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>{l.label}</Link>
          ))}
          <Link href="/account">Log in</Link>
        </div>
      )}
    </header>
  );
}
