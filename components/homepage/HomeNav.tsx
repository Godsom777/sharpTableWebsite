'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export const HomeNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.email);

  const loginLabel = user ? (subscription?.businessName || user.email || 'Account') : 'Login';

  return (
    <nav>
      <div className="bar">
        <Link className="brand" href="/">
          SharpTable
        </Link>
        <Link className="l" href="/features">
          Features
        </Link>
        <Link className="l" href="/for-hotels">
          Hotels
        </Link>
        <Link className="l" href="/pricing">
          Pricing
        </Link>
        <Link className="l" href="/faq">
          FAQ
        </Link>
        <Link className="l" href="/account">
          {loginLabel}
        </Link>
        <Link className="btn sm" href="/pricing">
          Get started
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="drawer" role="menu">
          <Link href="/features" onClick={() => setIsOpen(false)} role="menuitem">
            Features
          </Link>
          <Link href="/for-hotels" onClick={() => setIsOpen(false)} role="menuitem">
            Hotels
          </Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} role="menuitem">
            Pricing
          </Link>
          <Link href="/faq" onClick={() => setIsOpen(false)} role="menuitem">
            FAQ
          </Link>
          <Link href="/account" onClick={() => setIsOpen(false)} role="menuitem">
            {loginLabel}
          </Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} role="menuitem" style={{ color: 'var(--bl)', fontWeight: 600 }}>
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNav;
