'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

function generateReferralCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6);
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ST_${clean}_${rand}`;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  general?: string;
}

export const PartnerApplyContent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      e.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'A valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      e.phone = 'A valid phone number is required';
    }
    if (!formData.bankName.trim()) {
      e.bankName = 'Bank name is required';
    }
    if (!formData.accountNumber.trim() || !/^\d{10}$/.test(formData.accountNumber.trim())) {
      e.accountNumber = 'Enter a valid 10-digit Nigerian NUBAN account number';
    }
    if (!formData.accountName.trim()) {
      e.accountName = 'Account name is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const supabase = getSupabase();
      if (!supabase) {
        setErrors({ general: 'Database configuration missing. Please contact support.' });
        setIsSubmitting(false);
        return;
      }
      const code = generateReferralCode(formData.fullName);
      const { error } = await supabase.from('partners').insert({
        full_name: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        bank_name: formData.bankName.trim(),
        account_number: formData.accountNumber.trim(),
        account_name: formData.accountName.trim(),
        referral_code: code,
        status: 'active',
      });
      if (error) {
        setErrors({
          general: error.message.includes('unique')
            ? 'This email address is already registered as a partner.'
            : error.message,
        });
        setIsSubmitting(false);
        return;
      }
      setReferralCode(code);
      setSubmitted(true);
    } catch {
      setErrors({ general: 'System error during submission. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const copyReferralLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/pricing?ref=${referralCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main>
      <section className="hero" id="top" style={{ paddingBottom: '96px' }}>
        <div className="w">
          <div style={{ marginBottom: '24px' }}>
            <Link href="/partnership" className="lnk" style={{ fontSize: '15px' }}>
              Back to Partnership overview
            </Link>
          </div>

          <h1>Become a partner.</h1>
          <p className="lead">
            Fill out the application below and receive your personal tracking code instantly.
          </p>

          {!submitted ? (
            <div className="form-card">
              {errors.general && (
                <div
                  style={{
                    marginBottom: '24px',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(255, 59, 48, 0.1)',
                    border: '1px solid rgba(255, 59, 48, 0.25)',
                    color: '#ff3b30',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    className="form-input"
                    type="text"
                    placeholder="e.g. John Okon"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                  />
                  {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className="form-input"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    className="form-input"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div style={{ margin: '32px 0 20px', paddingTop: '24px', borderTop: '1px solid var(--ln)' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, margin: '0 0 4px', color: 'var(--tx)' }}>
                    Bank Payout Details
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--mu)', margin: 0 }}>
                    Where commission payouts will be deposited directly via bank transfer.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="bankName">Bank Name</label>
                  <input
                    id="bankName"
                    className="form-input"
                    type="text"
                    placeholder="e.g. Guaranty Trust Bank / Zenith Bank"
                    value={formData.bankName}
                    onChange={handleChange('bankName')}
                  />
                  {errors.bankName && <div className="form-error">{errors.bankName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="accountNumber">Account Number (10 digits)</label>
                  <input
                    id="accountNumber"
                    className="form-input"
                    type="text"
                    maxLength={10}
                    placeholder="0123456789"
                    value={formData.accountNumber}
                    onChange={handleChange('accountNumber')}
                  />
                  {errors.accountNumber && <div className="form-error">{errors.accountNumber}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="accountName">Account Name</label>
                  <input
                    id="accountName"
                    className="form-input"
                    type="text"
                    placeholder="Name exactly as registered on your bank account"
                    value={formData.accountName}
                    onChange={handleChange('accountName')}
                  />
                  {errors.accountName && <div className="form-error">{errors.accountName}</div>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn"
                  style={{ width: '100%', marginTop: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Submitting registration...' : 'Generate partner code'}
                </button>
              </form>
            </div>
          ) : (
            <div className="card" style={{ maxWidth: '580px', margin: '40px auto 0', padding: '48px 36px', textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(36, 138, 61, 0.12)',
                  color: 'var(--ok)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '28px',
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 8px', color: 'var(--tx)' }}>
                Application Approved
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--mu)', margin: '0 0 32px', lineHeight: 1.5 }}>
                Your partner account is active. You can start referring restaurants immediately.
              </p>

              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--ln)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '28px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--mu)', marginBottom: '8px' }}>
                  Your Unique Referral Code
                </div>
                <div style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--tx)', letterSpacing: '0.05em', marginBottom: '16px' }}>
                  {referralCode}
                </div>
                <button
                  type="button"
                  onClick={copyReferralLink}
                  className="btn"
                  style={{ fontSize: '15px', padding: '10px 22px' }}
                >
                  {copied ? '✓ Link copied to clipboard' : 'Copy referral link'}
                </button>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--mu)', margin: '0 0 24px', lineHeight: 1.5 }}>
                Share your referral link with restaurant and hotel managers. Any sign-up through this link is permanently attributed to your payout ledger.
              </p>

              <div>
                <Link href="/partnership" className="lnk">
                  Back to Partnership page
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
