'use client';

import Link from 'next/link';
import { LegalModal, useLegalModal } from '@/components/LegalModal';

const SOCIALS = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sharptable_ng',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sharptable_ng',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharptable_ng',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sharptable_ng',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
      </svg>
    ),
  },
];

export function Foot() {
  const { isOpen, type, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();
  return (
    <footer className="ft">
      <div className="in">
        <div className="top-row">
          <div className="brand-col">
            <Link className="mark" href="/" aria-label="SharpTable home">
              <img src="/assets/logos/logo-black.png" alt="" width={26} height={16} />
              SharpTable
            </Link>
            <p>
              The operating system for Nigerian hospitality. Built in Lagos so every order is paid
              for and every branch stays clear.
            </p>
            <div className="ft-socials" aria-label="SharpTable social media">
              <div className="ft-social-icons">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-social-btn"
                    aria-label={`${s.name} @sharptable_ng`}
                    title={`${s.name} (@sharptable_ng)`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <span className="ft-handle">@sharptable_ng</span>
            </div>
          </div>
          <div className="cols">
            <div>
              <b>Product</b>
              <Link href="/features">Features</Link>
              <Link href="/for-hotels">Hotels</Link>
            </div>
            <div>
              <b>Plans</b>
              <Link href="/pricing">Pricing</Link>
              <Link href="/account">Log in</Link>
            </div>
            <div>
              <b>Help</b>
              <Link href="/faq">FAQ</Link>
              <a href="mailto:info@sharptable.com.ng">Contact</a>
            </div>
            <div>
              <b>Partners</b>
              <Link href="/partnership">Programme</Link>
              <Link href="/partnership/apply">Apply</Link>
            </div>
          </div>
        </div>
        <div className="bar">
          <span>Copyright © {new Date().getFullYear()} SharpTable. sharptable.com.ng</span>
          <span>
            <button type="button" onClick={openPrivacyPolicy}>
              Privacy
            </button>
            <button type="button" onClick={openTermsOfService}>
              Terms
            </button>
          </span>
        </div>
      </div>
      <LegalModal isOpen={isOpen} onClose={closeModal} type={type} />
    </footer>
  );
}
