'use client';

import React from 'react';
import Link from 'next/link';
import { LegalModal, useLegalModal } from '@/components/LegalModal';

export const HomeFooter: React.FC = () => {
  const { isOpen, type, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();

  return (
    <>
      <footer>
        <div className="w">
          <span>© 2026 SharpTable Tech. All rights reserved.</span>
          <span>
            <a
              href="https://play.google.com/store/apps/details?id=com.godsom.sharptable.manager&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              SharpTable Manager (Google Play)
            </a>
            {' \u00A0\u00A0 '}
            <span style={{ color: 'var(--mu)', cursor: 'default' }}>iOS (Coming Soon)</span>
            {' \u00A0\u00A0 '}
            <Link href="/partnership">Partnership</Link>
            {' \u00A0\u00A0 '}
            <Link href="/support">Support</Link>
            {' \u00A0\u00A0 '}
            <a href="mailto:info@sharptable.com.ng">Contact</a>
            {' \u00A0\u00A0 '}
            <button
              type="button"
              onClick={openPrivacyPolicy}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              Privacy Policy
            </button>
            {' \u00A0\u00A0 '}
            <button
              type="button"
              onClick={openTermsOfService}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              Terms of Service
            </button>
          </span>
        </div>
      </footer>
      <LegalModal isOpen={isOpen} onClose={closeModal} type={type} />
    </>
  );
};

export default HomeFooter;
