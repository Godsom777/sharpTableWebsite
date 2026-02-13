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
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <input
        type={type}
        value={value}
        onChange={onChange(field)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-500/50 focus:ring-red-500/30'
            : 'border-white/10 focus:ring-amber-500/30 focus:border-amber-500/50'
        }`}
      />
    </div>
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

/* ================================================================
   PartnerApplyForm
   ================================================================ */

export const PartnerApplyForm: React.FC = () => {
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

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section className="relative bg-black py-16 md:py-24">
      <div className="max-w-xl mx-auto px-6">
        {/* Back link */}
        <Link
          to="/partnership"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
          Back to Partnership
        </Link>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHandshake} className="w-6 h-6 text-amber-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Join the Partnership</h1>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                  Fill out the form below and get your referral link instantly. Start earning commissions right away.
                </p>
              </div>

              {errors.general && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input icon={faUser} label="Full Name" field="fullName" placeholder="John Doe" value={formData.fullName} error={errors.fullName} onChange={handleChange} />
                <Input icon={faEnvelope} label="Email Address" field="email" type="email" placeholder="john@example.com" value={formData.email} error={errors.email} onChange={handleChange} />
                <Input icon={faPhone} label="Phone Number" field="phone" type="tel" placeholder="+234 800 000 0000" value={formData.phone} error={errors.phone} onChange={handleChange} />

                {/* Bank section divider */}
                <div className="pt-3 pb-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FontAwesomeIcon icon={faBuildingColumns} className="w-3 h-3" />
                    <span>Bank details — for commission payouts</span>
                  </div>
                </div>

                <Input icon={faBuildingColumns} label="Bank Name" field="bankName" placeholder="e.g. GTBank, Access Bank" value={formData.bankName} error={errors.bankName} onChange={handleChange} />
                <Input icon={faCreditCard} label="Account Number" field="accountNumber" placeholder="0123456789" maxLength={10} value={formData.accountNumber} error={errors.accountNumber} onChange={handleChange} />
                <Input icon={faIdCard} label="Account Name" field="accountName" placeholder="John Doe" value={formData.accountName} error={errors.accountName} onChange={handleChange} />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  className="w-full mt-6 bg-white text-black py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                      Generating Partnership Code...
                    </>
                  ) : (
                    <>
                      Get Your Referral Link
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-5 flex items-start gap-2 text-gray-600 text-xs">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3 mt-0.5 shrink-0" />
                <p>
                  Your data is securely stored. Commission payouts are processed within 7 business days. By submitting, you agree to our partnership terms.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Success ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 md:p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're All Set!</h2>
              <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                Your partner account is active. Start sharing your referral link and earning commissions immediately.
              </p>

              {/* Referral code */}
              <div className="mb-6">
                <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-2.5">Your Referral Code</p>
                <div className="inline-flex items-center gap-3 bg-black/50 border border-white/10 rounded-xl px-6 py-3.5">
                  <span className="text-amber-400 font-mono font-bold text-lg tracking-wider">{referralCode}</span>
                  <button
                    onClick={copyReferralLink}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy referral link"
                  >
                    <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} className={`w-4 h-4 ${copied ? 'text-emerald-400' : ''}`} />
                  </button>
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-400 text-xs mt-2"
                    >
                      Referral link copied!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-left bg-black/40 rounded-xl border border-white/5 p-5 mb-8">
                <p className="text-gray-400 text-xs mb-2 font-medium">Your referral link:</p>
                <code className="text-amber-300/90 text-xs break-all leading-relaxed">
                  {window.location.origin}/pricing?ref={referralCode}
                </code>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed max-w-sm mx-auto mb-6">
                Share this link with restaurant owners. When they subscribe through it, you automatically earn commission.
              </p>

              <Link
                to="/partnership"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                Back to Partnership
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
