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

interface FormData { fullName: string; email: string; phone: string; bankName: string; accountNumber: string; accountName: string; }
interface FormErrors { fullName?: string; email?: string; phone?: string; bankName?: string; accountNumber?: string; accountName?: string; general?: string; }

const Input: React.FC<{ label: string; field: keyof FormData; type?: string; placeholder: string; maxLength?: number; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; autoComplete?: string; value: string; error?: string; onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, field, type = 'text', placeholder, maxLength, inputMode, autoComplete, value, error, onChange }) => (
  <label className="field">
    <span>{label}</span>
    <input type={type} value={value} onChange={onChange(field)} placeholder={placeholder} maxLength={maxLength} inputMode={inputMode} autoComplete={autoComplete} aria-invalid={Boolean(error)} />
    {error && <em>{error}</em>}
  </label>
);

export const PartnerApplyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', phone: '', bankName: '', accountNumber: '', accountName: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) e.fullName = 'Full name required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.phone.trim() || formData.phone.trim().length < 8) e.phone = 'Valid phone required';
    if (!formData.bankName.trim()) e.bankName = 'Bank name required';
    if (!formData.accountNumber.trim() || !/^\d{10}$/.test(formData.accountNumber.trim())) e.accountNumber = 'Enter 10-digit account';
    if (!formData.accountName.trim()) e.accountName = 'Account name required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return;
    setIsSubmitting(true); setErrors({});
    try {
      const supabase = getSupabase();
      if (!supabase) { setErrors({ general: 'Applications are unavailable right now. Email info@sharptable.com.ng.' }); setIsSubmitting(false); return; }
      const code = generateReferralCode(formData.fullName);
      const { error } = await supabase.from('partners').insert({ full_name: formData.fullName.trim(), email: formData.email.toLowerCase().trim(), phone: formData.phone.trim(), bank_name: formData.bankName.trim(), account_number: formData.accountNumber.trim(), account_name: formData.accountName.trim(), referral_code: code, status: 'active' });
      if (error) { setErrors({ general: error.message.includes('unique') ? 'This email is already registered as a partner.' : error.message }); setIsSubmitting(false); return; }
      setReferralCode(code); setSubmitted(true);
    } catch { setErrors({ general: 'Something went wrong. Please try again.' }); } finally { setIsSubmitting(false); }
  }, [formData]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/pricing?ref=${referralCode}`);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="tile pb">
      {!submitted ? (
        <form className="form" onSubmit={handleSubmit} noValidate>
          {errors.general && <div className="alert" role="alert">{errors.general}</div>}
          <Input label="Full name" field="fullName" placeholder="Ada Okafor" autoComplete="name" value={formData.fullName} error={errors.fullName} onChange={handleChange} />
          <Input label="Email" field="email" type="email" placeholder="ada@example.com" autoComplete="email" value={formData.email} error={errors.email} onChange={handleChange} />
          <Input label="Phone" field="phone" type="tel" placeholder="+234 800 000 0000" autoComplete="tel" value={formData.phone} error={errors.phone} onChange={handleChange} />
          <h3 style={{ margin: '32px 0 4px' }}>Payout account</h3>
          <p className="muted" style={{ fontSize: 15, marginBottom: 16 }}>Where we send your payouts.</p>
          <Input label="Bank" field="bankName" placeholder="e.g. GTBank" value={formData.bankName} error={errors.bankName} onChange={handleChange} />
          <Input label="Account number" field="accountNumber" placeholder="0123456789" maxLength={10} inputMode="numeric" value={formData.accountNumber} error={errors.accountNumber} onChange={handleChange} />
          <Input label="Account name" field="accountName" placeholder="Ada Okafor" value={formData.accountName} error={errors.accountName} onChange={handleChange} />
          <button type="submit" className="pill block" disabled={isSubmitting} style={{ marginTop: 16 }}>
            {isSubmitting ? 'Submitting…' : 'Get started'}
          </button>
          <p style={{ textAlign: 'center', marginTop: 8 }}><Link className="lm" href="/partnership">Back to partner programme</Link></p>
        </form>
      ) : (
        <div className="form" style={{ textAlign: 'center' }} role="status">
          <h2>You’re in.</h2>
          <p className="sub muted">Share your link with restaurant owners.</p>
          <div className="card" style={{ marginTop: 24, alignItems: 'center' }}>
            <span className="muted" style={{ fontSize: 14 }}>Your referral code</span>
            <b style={{ fontFamily: 'ui-monospace, monospace', fontSize: 20, overflowWrap: 'anywhere' }}>{referralCode}</b>
            <button type="button" className="pill" onClick={copyReferralLink} style={{ marginTop: 8 }}>{copied ? 'Link copied' : 'Copy link'}</button>
          </div>
          <p style={{ marginTop: 16 }}><Link className="lm" href="/partnership">Back to partner programme</Link></p>
        </div>
      )}
    </section>
  );
};
