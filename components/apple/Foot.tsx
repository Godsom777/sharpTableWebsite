'use client';

import Link from 'next/link';
import { LegalModal, useLegalModal } from '@/components/LegalModal';

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
              The operating system for Nigerian restaurants and hotels. Built in Lagos so every
              plate is paid for and every branch stays clear.
            </p>
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
