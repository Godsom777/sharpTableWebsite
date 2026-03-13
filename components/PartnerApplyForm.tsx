import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faCheckCircle,
  faSpinner,
  faEnvelope,
  faUser,
  faPhone,
  faBuildingColumns,
  faCreditCard,
  faIdCard,
  faArrowRight,
  faArrowLeft,
  faCircleCheck,
  faCopy,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Box, Typography, Container } from '@mui/material';

/* ── Supabase ────────────────────────────────────────────── */
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

function generateReferralCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6);
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ST_${clean}_${rand}`;
}

/* ── Types ───────────────────────────────────────────────── */
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

/* ── Reusable input (defined outside to prevent remount on every keystroke) ── */
const Input: React.FC<{
  icon: any; label: string; field: keyof FormData;
  type?: string; placeholder: string; maxLength?: number;
  value: string; error?: string;
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon, label, field, type = 'text', placeholder, maxLength, value, error, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>{label}</Typography>
    <Box sx={{ position: 'relative' }}>
      <FontAwesomeIcon icon={icon} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#6b7280' }} />
      <Box
        component="input"
        type={type}
        value={value}
        onChange={onChange(field)}
        placeholder={placeholder}
        maxLength={maxLength}
        sx={{
          width: '100%', pl: 5, pr: 2, py: 1.5, borderRadius: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid', boxSizing: 'border-box',
          color: 'white', fontSize: '0.875rem', fontFamily: 'inherit', '&::placeholder': { color: 'grey.600' }, '&:focus': { outline: 'none', ring: '2px solid', ...error ? { borderColor: 'rgba(239,68,68,0.5)', boxShadow: '0 0 0 2px rgba(239,68,68,0.3)' } : { borderColor: 'rgba(245,158,11,0.5)', boxShadow: '0 0 0 2px rgba(245,158,11,0.3)' } },
          transition: 'all 0.2s', ...(error ? { borderColor: 'rgba(239,68,68,0.5)' } : { borderColor: 'rgba(255,255,255,0.1)' })
        }}
      />
    </Box>
    {error && <Typography sx={{ color: '#f87171', fontSize: '0.75rem', mt: 0.5 }}>{error}</Typography>}
  </Box>
);

/* ================================================================
   PartnerApplyForm
   ================================================================ */

export const PartnerApplyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', phone: '', bankName: '', accountNumber: '', accountName: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  /* ── Validation ─────────────────────────────────────────── */
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) e.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 8) e.phone = 'Valid phone number is required';
    if (!formData.bankName.trim()) e.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim() || !/^\d{10}$/.test(formData.accountNumber.trim())) e.accountNumber = 'Enter a valid 10-digit account number';
    if (!formData.accountName.trim()) e.accountName = 'Account name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  /* ── Submit ─────────────────────────────────────────────── */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const supabase = getSupabase();
      if (!supabase) {
        setErrors({ general: 'System not configured. Please contact support.' });
        setIsSubmitting(false);
        return;
      }
      const code = generateReferralCode(formData.fullName);
      const { error } = await supabase.from('partners').insert({
        full_name: formData.fullName.trim(), email: formData.email.toLowerCase().trim(), phone: formData.phone.trim(),
        bank_name: formData.bankName.trim(), account_number: formData.accountNumber.trim(), account_name: formData.accountName.trim(),
        referral_code: code, status: 'active',
      });
      if (error) {
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          setErrors({ general: 'This email is already registered as a partner.' });
        } else {
          setErrors({ general: error.message });
        }
        setIsSubmitting(false);
        return;
      }
      setReferralCode(code);
      setSubmitted(true);
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const copyReferralLink = () => {
    const link = `${window.location.origin}/pricing?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'black', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="sm" sx={{ px: 3 }}>
        {/* Back link */}
        <Box
          component={Link}
          to="/partnership"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'grey.500', fontSize: '0.875rem', mb: 4, textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: 'white' } }}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ width: 12, height: 12 }} />
          Back to Partnership
        </Box>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <Box
              component={motion.div}
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              sx={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)', p: { xs: 4, md: 5 } }}
            >
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ width: 56, height: 56, mx: 'auto', mb: 2, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={faHandshake} style={{ width: 24, height: 24, color: '#fbb117' }} />
                </Box>
                <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', mb: 1 }}>Join the Partnership</Typography>
                <Typography sx={{ color: 'grey.400', fontSize: '0.875rem', lineHeight: 1.625, maxWidth: 300, mx: 'auto' }}>
                  Fill out the form below and get your referral link instantly. Start earning commissions right away.
                </Typography>
              </Box>

              {errors.general && (
                <Box sx={{ mb: 3, p: 1.5, borderRadius: '0.75rem', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>
                  {errors.general}
                </Box>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Input icon={faUser} label="Full Name" field="fullName" placeholder="John Doe" value={formData.fullName} error={errors.fullName} onChange={handleChange} />
                <Input icon={faEnvelope} label="Email Address" field="email" type="email" placeholder="john@example.com" value={formData.email} error={errors.email} onChange={handleChange} />
                <Input icon={faPhone} label="Phone Number" field="phone" type="tel" placeholder="+234 800 000 0000" value={formData.phone} error={errors.phone} onChange={handleChange} />

                {/* Bank section divider */}
                <Box sx={{ pt: 1.5, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.500', fontSize: '0.75rem' }}>
                    <FontAwesomeIcon icon={faBuildingColumns} style={{ width: 12, height: 12 }} />
                    <Box component="span">Bank details — for commission payouts</Box>
                  </Box>
                </Box>

                <Input icon={faBuildingColumns} label="Bank Name" field="bankName" placeholder="e.g. GTBank, Access Bank" value={formData.bankName} error={errors.bankName} onChange={handleChange} />
                <Input icon={faCreditCard} label="Account Number" field="accountNumber" placeholder="0123456789" maxLength={10} value={formData.accountNumber} error={errors.accountNumber} onChange={handleChange} />
                <Input icon={faIdCard} label="Account Name" field="accountName" placeholder="John Doe" value={formData.accountName} error={errors.accountName} onChange={handleChange} />

                <Box
                  component={motion.button}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  sx={{
                    width: '100%', mt: 3, bgcolor: 'white', color: 'black', py: 1.5, borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'grey.100' }, '&:disabled': { opacity: 0.5, cursor: 'not-allowed' }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" style={{ width: 16, height: 16 }} />
                      Generating Partnership Code...
                    </>
                  ) : (
                    <>
                      Get Your Referral Link
                      <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', alignItems: 'flex-start', gap: 1, color: 'grey.600', fontSize: '0.75rem' }}>
                <FontAwesomeIcon icon={faShieldHalved} style={{ width: 12, height: 12, marginTop: 2, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 'inherit', lineHeight: 1.5 }}>
                  Your data is securely stored. Commission payouts are processed within 7 business days. By submitting, you agree to our partnership terms.
                </Typography>
              </Box>
            </Box>
          ) : (
            /* ── Success ── */
            <Box
              component={motion.div}
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              sx={{ borderRadius: '1rem', border: '1px solid rgba(16,185,129,0.2)', bgcolor: 'rgba(16,185,129,0.03)', p: { xs: 4, md: 5 }, textAlign: 'center' }}
            >
              <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 2.5, borderRadius: '50%', bgcolor: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ width: 32, height: 32, color: '#34d399' }} />
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', mb: 1 }}>You're All Set!</Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '0.875rem', mb: 4, maxWidth: 300, mx: 'auto', lineHeight: 1.625 }}>
                Your partner account is active. Start sharing your referral link and earning commissions immediately.
              </Typography>

              {/* Referral code */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: 'grey.500', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.25 }}>Your Referral Code</Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', px: 3, py: 1.5 }}>
                  <Typography sx={{ color: '#fbb117', fontFamily: 'monospace', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.05em' }}>{referralCode}</Typography>
                  <Box
                    component="button"
                    onClick={copyReferralLink}
                    sx={{ color: 'grey.400', bgcolor: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: 'white' } }}
                    title="Copy referral link"
                  >
                    <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} style={{ width: 16, height: 16, ...(copied ? { color: '#34d399' } : {}) }} />
                  </Box>
                </Box>
                <AnimatePresence>
                  {copied && (
                    <Box
                      component={motion.p}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      sx={{ color: '#34d399', fontSize: '0.75rem', mt: 1, m: 0 }}
                    >
                      Referral link copied!
                    </Box>
                  )}
                </AnimatePresence>
              </Box>

              <Box sx={{ textAlign: 'left', bgcolor: 'rgba(0,0,0,0.4)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)', p: 2.5, mb: 4 }}>
                <Typography sx={{ color: 'grey.400', fontSize: '0.75rem', mb: 1, fontWeight: 500 }}>Your referral link:</Typography>
                <Box component="code" sx={{ color: 'rgba(252,211,77,0.9)', fontSize: '0.75rem', wordBreak: 'break-all', lineHeight: 1.625, fontFamily: 'monospace' }}>
                  {window.location.origin}/pricing?ref={referralCode}
                </Box>
              </Box>

              <Typography sx={{ color: 'grey.500', fontSize: '0.75rem', lineHeight: 1.625, maxWidth: 300, mx: 'auto', mb: 3 }}>
                Share this link with restaurant owners. When they subscribe through it, you automatically earn commission.
              </Typography>

              <Box
                component={Link}
                to="/partnership"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'grey.400', fontSize: '0.875rem', transition: 'color 0.2s', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                <FontAwesomeIcon icon={faArrowLeft} style={{ width: 12, height: 12 }} />
                Back to Partnership
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};
