'use client';

import Link from 'next/link';
import { LegalModal, useLegalModal } from '@/components/LegalModal';

export function Foot() {
  const { isOpen, type, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();
  return (
    <footer className="ft">
      <div className="in">
        <div className="cols">
          <div><b>Product</b><Link href="/features">Features</Link><br /><Link href="/for-hotels">Hotels</Link></div>
          <div><b>Plans</b><Link href="/pricing">Pricing</Link><br /><Link href="/account">Account</Link></div>
          <div><b>Help</b><Link href="/faq">FAQ</Link><br /><a href="mailto:info@sharptable.com.ng">Contact</a></div>
          <div><b>Partners</b><Link href="/partnership">Programme</Link><br /><Link href="/partnership/apply">Apply</Link></div>
        </div>
        <div className="bar">
          <span>Copyright © {new Date().getFullYear()} SharpTable. sharptable.com.ng</span>
          <span>
            <button type="button" onClick={openPrivacyPolicy}>Privacy</button>
            <button type="button" onClick={openTermsOfService}>Terms</button>
          </span>
        </div>
      </div>
      <LegalModal isOpen={isOpen} onClose={closeModal} type={type} />
    </footer>
  );
}
