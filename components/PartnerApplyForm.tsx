'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake, faCheckCircle, faSpinner, faEnvelope, faUser, faPhone,
  faBuildingColumns, faCreditCard, faIdCard, faArrowRight, faArrowLeft,
  faCircleCheck, faCopy, faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Box, Typography, Container } from '@mui/material';

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

const Input: React.FC<{ icon: any; label: string; field: keyof FormData; type?: string; placeholder: string; maxLength?: number; value: string; error?: string; onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ icon, label, field, type = 'text', placeholder, maxLength, value, error, onChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography component="label" sx={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'grey.300', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</Typography>
    <Box sx={{ position: 'relative' }}>
      <FontAwesomeIcon icon={icon} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#6b7280' }} />
      <Box
        component="input" type={type} value={value} onChange={onChange(field)} placeholder={placeholder} maxLength={maxLength}
        sx={{
          width: '100%', pl: 5, pr: 2, py: 2, borderRadius: '0.5rem', bgcolor: '#0a0a0a', border: '1px solid', boxSizing: 'border-box',
          color: 'white', fontSize: '1rem', fontFamily: 'inherit', '&::placeholder': { color: 'grey.600' }, '&:focus': { outline: 'none', borderColor: 'white' },
          transition: 'border-color 0.2s', ...(error ? { borderColor: '#f87171' } : { borderColor: 'rgba(255,255,255,0.1)' })
        }}
      />
    </Box>
    {error && <Typography sx={{ color: '#f87171', fontSize: '0.8rem', mt: 1, fontWeight: 600 }}>{error}</Typography>}
  </Box>
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
      if (!supabase) { setErrors({ general: 'System error. Contact support.' }); setIsSubmitting(false); return; }
      const code = generateReferralCode(formData.fullName);
      const { error } = await supabase.from('partners').insert({ full_name: formData.fullName.trim(), email: formData.email.toLowerCase().trim(), phone: formData.phone.trim(), bank_name: formData.bankName.trim(), account_number: formData.accountNumber.trim(), account_name: formData.accountName.trim(), referral_code: code, status: 'active' });
      if (error) { setErrors({ general: error.message.includes('unique') ? 'Email already acting as partner.' : error.message }); setIsSubmitting(false); return; }
      setReferralCode(code); setSubmitted(true);
    } catch { setErrors({ general: 'System failure.' }); } finally { setIsSubmitting(false); }
  }, [formData]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/pricing?ref=${referralCode}`);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: '#000000', py: { xs: 8, md: 16 } }}>
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box component={Link} href="/partnership" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'grey.500', fontSize: '0.875rem', mb: 6, fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Abort Registration
        </Box>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <Box component={motion.div} key="form" initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111111', p: { xs: 4, md: 6 } }}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 900, color: 'white', mb: 1.5, letterSpacing: '-0.02em' }}>Partner Profile</Typography>
                <Typography sx={{ color: 'grey.500', fontSize: '1rem', lineHeight: 1.6 }}>Enforce the network. Establish your payout matrix.</Typography>
              </Box>

              {errors.general && <Box sx={{ mb: 4, p: 2, borderRadius: '0.5rem', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>{errors.general}</Box>}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Input icon={faUser} label="Authorized Rep" field="fullName" placeholder="John Doe" value={formData.fullName} error={errors.fullName} onChange={handleChange} />
                <Input icon={faEnvelope} label="Secure Transmission" field="email" type="email" placeholder="john@example.com" value={formData.email} error={errors.email} onChange={handleChange} />
                <Input icon={faPhone} label="Direct Line" field="phone" type="tel" placeholder="+234 800 000 0000" value={formData.phone} error={errors.phone} onChange={handleChange} />

                <Box sx={{ pt: 3, mb: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: 'white', mb: 1 }}>Payout Destination</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'grey.500' }}>Where capital is deposited post-conversion.</Typography>
                </Box>

                <Input icon={faBuildingColumns} label="Bank Institution" field="bankName" placeholder="e.g. GTBank" value={formData.bankName} error={errors.bankName} onChange={handleChange} />
                <Input icon={faCreditCard} label="Bank Reference" field="accountNumber" placeholder="0123456789" maxLength={10} value={formData.accountNumber} error={errors.accountNumber} onChange={handleChange} />
                <Input icon={faIdCard} label="Ledger Name" field="accountName" placeholder="John Doe" value={formData.accountName} error={errors.accountName} onChange={handleChange} />

                <Box component="button" type="submit" disabled={isSubmitting} sx={{ width: '100%', mt: 4, bgcolor: 'white', color: 'black', py: 2, borderRadius: '9999px', fontWeight: 900, fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover:not(:disabled)': { bgcolor: 'grey.300' }, '&:disabled': { opacity: 0.5, cursor: 'not-allowed' } }}>
                  {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Synchronizing...</> : <>Generate Code <FontAwesomeIcon icon={faArrowRight} /></>}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box component={motion.div} key="success" initial={false} animate={{ opacity: 1, scale: 1 }} sx={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: '#111111', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 4, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ width: 24, height: 24, color: 'white' }} />
              </Box>
              <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 900, color: 'white', mb: 2, letterSpacing: '-0.02em' }}>Access Granted.</Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '1rem', mb: 6, lineHeight: 1.6 }}>You are now authorized to distribute secure operational gateways.</Typography>

              <Box sx={{ mb: 4, p: 4, bgcolor: '#0a0a0a', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography sx={{ color: 'grey.500', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2, fontWeight: 700 }}>Unique Trace Identifier</Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: 'white', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.05em' }}>{referralCode}</Typography>
                  <Box component="button" onClick={copyReferralLink} sx={{ color: 'grey.400', bgcolor: 'transparent', border: 'none', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                    <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} />
                  </Box>
                </Box>
              </Box>

              <Typography sx={{ color: 'grey.500', fontSize: '0.85rem', lineHeight: 1.6, mb: 4 }}>
                Deliver this link to enterprise leads. They will be explicitly tied to your payout matrix indefinitely.
              </Typography>

              <Box component={Link} href="/partnership" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'white', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', '&:hover': { color: 'grey.300' } }}>
                <FontAwesomeIcon icon={faArrowLeft} /> Return
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

