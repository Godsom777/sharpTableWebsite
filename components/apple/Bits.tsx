import Link from 'next/link';
import type { ReactNode } from 'react';

export function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone"><div className="scr"><img src={src} alt={alt} loading="lazy" /></div></div>
  );
}

/** A real product screenshot inside a tablet or laptop frame. */
export function Screen({ kind, src, alt, mobileSrc }: { kind: 'tablet' | 'laptop'; src: string; alt: string; mobileSrc?: string }) {
  const pic = mobileSrc
    ? <picture><source media="(max-width: 600px)" srcSet={mobileSrc} /><img className="shot" src={src} alt={alt} loading="lazy" /></picture>
    : <img className="shot" src={src} alt={alt} loading="lazy" />;
  const img = <div className="scrn">{pic}</div>;
  if (kind === 'tablet') return <div className="tab">{img}</div>;
  return <div className="laptop"><div className="lid">{img}</div><div className="base" /></div>;
}

/** A real screenshot on a bare rounded card (no device frame). */
export function Card({ src, alt }: { src: string; alt: string }) {
  return <div className="card-shot"><img src={src} alt={alt} loading="lazy" /></div>;
}

/** Caption under a staff screenshot, followed by the inline Sample data tag. */
export function Cap({ children }: { children: ReactNode }) {
  return <figcaption className="cap">{children} <span className="tag">· Sample data</span></figcaption>;
}

export function Demo({ text = 'Sample data' }: { text?: string }) {
  return <p className="demo">{text}</p>;
}

export function Hero({ title, sub, children, pale = true }: { title: ReactNode; sub?: ReactNode; children?: ReactNode; pale?: boolean }) {
  return (
    <section className={`tile${pale ? ' pale' : ''} pb`}>
      <div className="head">
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

// TODO(Okoro): DEMO_URL — replace with Calendly/booking link once confirmed.
export const DEMO_URL = '/pricing';
// TODO(Okoro): WA_URL — replace with https://wa.me/234… sales number once confirmed.
export const WA_URL = '#whatsapp';

/** Primary pill, optional secondary pill, optional text link. */
export function Cta({ href = '/pricing', label = 'Get started', more, moreHref, text, textHref }: { href?: string; label?: string; more?: string; moreHref?: string; text?: string; textHref?: string }) {
  return (
    <div className="links">
      <Link className="pill" href={href}>{label}</Link>
      {more && moreHref && <Link className="pill o" href={moreHref}>{more} ›</Link>}
      {text && textHref && <Link className="lm" href={textHref}>{text} ›</Link>}
    </div>
  );
}

export function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 9.5l3.5 3.5 7.5-8" /></svg>
  );
}

export function Plus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12" /></svg>
  );
}
