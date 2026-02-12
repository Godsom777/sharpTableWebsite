import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faMoneyBillTrendUp,
  faLink,
  faRepeat,
  faPercent,
  faCheckCircle,
  faSpinner,
  faEnvelope,
  faUser,
  faPhone,
  faBuildingColumns,
  faCreditCard,
  faIdCard,
  faArrowRight,
  faCircleCheck,
  faCopy,
  faChartLine,
  faUsers,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@supabase/supabase-js';

/* ── Supabase client ─────────────────────────────────────── */
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

/* ── Generate referral code ──────────────────────────────── */
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

/* ── How-It-Works step data ──────────────────────────────── */
const steps = [
  {
    icon: faUser,
    title: 'Sign Up',
    description: 'Fill out the form below to register as a SharpTable partner.',
  },
  {
    icon: faLink,
    title: 'Get Your Link',
    description: 'Receive a unique referral code you can share with restaurants.',
  },
  {
    icon: faHandshake,
    title: 'Refer Restaurants',
    description: 'When a restaurant subscribes through your link, you earn commission.',
  },
  {
    icon: faMoneyBillTrendUp,
    title: 'Earn Recurring',
    description: '50% upfront + 20% recurring for 6 months on every subscription.',
  },
];

/* ── Commission breakdown data ───────────────────────────── */
const commissionTiers = [
  {
    label: 'Upfront Commission',
    rate: '50%',
    description: 'Of the first subscription payment — paid once per referral.',
    icon: faGift,
    accent: 'amber',
  },
  {
    label: 'Recurring Commission',
    rate: '20%',
    description: 'Of every subscription renewal for 6 consecutive months.',
    icon: faRepeat,
    accent: 'emerald',
  },
];

/* ── Example earnings ────────────────────────────────────── */
const earningsExamples = [
  {
    plan: 'Control (Monthly)',
    price: '₦99,999',
    upfront: '₦49,999',
    recurring: '₦20,000/mo × 6',
    total: '₦169,999',
  },
  {
    plan: 'Command (Monthly)',
    price: '₦199,999',
    upfront: '₦99,999',
    recurring: '₦40,000/mo × 6',
    total: '₦339,999',
  },
  {
    plan: 'Control (Yearly)',
    price: '₦1,000,000',
    upfront: '₦500,000',
    recurring: '—',
    total: '₦500,000',
  },
  {
    plan: 'Command (Yearly)',
    price: '₦2,000,000',
    upfront: '₦1,000,000',
    recurring: '—',
    total: '₦1,000,000',
  },
];

/* ================================================================
   PartnerSignup — the main component
   ================================================================ */

export const PartnerSignup: React.FC = () => {
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

  /* ── Input handler ──────────────────────────────────────── */
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
        status: 'pending',
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
    } catch (err: any) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  /* ── Copy referral link ─────────────────────────────────── */
  const copyReferralLink = () => {
    const link = `${window.location.origin}/pricing?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* ── Shared input field component ───────────────────────── */
  const InputField: React.FC<{
    icon: any;
    label: string;
    field: keyof FormData;
    type?: string;
    placeholder: string;
    maxLength?: number;
  }> = ({ icon, label, field, type = 'text', placeholder, maxLength }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <div className="relative">
        <FontAwesomeIcon icon={icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type={type}
          value={formData[field]}
          onChange={handleChange(field)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors[field]
              ? 'border-red-500/50 focus:ring-red-500/30'
              : 'border-white/10 focus:ring-amber-500/30 focus:border-amber-500/50'
          }`}
        />
      </div>
      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  /* ──────────────────────────────────────────────────────────
     RENDER
     ────────────────────────────────────────────────────────── */
  return (
    <section className="relative bg-black py-16 md:py-24">
      {/* ── How it works ── */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Four simple steps to start earning with SharpTable.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <FontAwesomeIcon icon={step.icon} className="w-5 h-5 text-amber-400" />
              </div>
              <div className="absolute top-3 right-4 text-amber-500/20 text-3xl font-black">{i + 1}</div>
              <h3 className="text-white font-semibold mb-1.5">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Commission breakdown ── */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Your Commission Structure</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Transparent earnings — you always know exactly what you'll make.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {commissionTiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-8 text-center ${
                tier.accent === 'amber'
                  ? 'border-amber-500/25 bg-amber-500/[0.03]'
                  : 'border-emerald-500/25 bg-emerald-500/[0.03]'
              }`}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                tier.accent === 'amber' ? 'bg-amber-500/15' : 'bg-emerald-500/15'
              }`}>
                <FontAwesomeIcon
                  icon={tier.icon}
                  className={`w-6 h-6 ${tier.accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`}
                />
              </div>
              <div className={`text-4xl font-black mb-2 ${
                tier.accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {tier.rate}
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{tier.label}</h3>
              <p className="text-gray-400 text-sm">{tier.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Earnings table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="bg-white/[0.03] px-6 py-4 border-b border-white/10">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-amber-400" />
              Example Earnings Per Referral
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/5">
                  <th className="text-left px-6 py-3 font-medium">Plan</th>
                  <th className="text-right px-6 py-3 font-medium">Price</th>
                  <th className="text-right px-6 py-3 font-medium">Upfront (50%)</th>
                  <th className="text-right px-6 py-3 font-medium">Recurring (20%)</th>
                  <th className="text-right px-6 py-3 font-medium text-amber-400">Total Earned</th>
                </tr>
              </thead>
              <tbody>
                {earningsExamples.map((ex) => (
                  <tr key={ex.plan} className="border-b border-white/5 last:border-b-0">
                    <td className="px-6 py-3 text-white font-medium">{ex.plan}</td>
                    <td className="px-6 py-3 text-gray-400 text-right">{ex.price}</td>
                    <td className="px-6 py-3 text-amber-400 text-right font-medium">{ex.upfront}</td>
                    <td className="px-6 py-3 text-emerald-400 text-right font-medium">{ex.recurring}</td>
                    <td className="px-6 py-3 text-white text-right font-bold">{ex.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ── Sign-up form ── */}
      <div className="max-w-xl mx-auto px-6" id="partner-form">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHandshake} className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Become a Partner</h2>
                <p className="text-gray-400 text-sm">Fill out the form to join the SharpTable partner program.</p>
              </div>

              {errors.general && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField icon={faUser} label="Full Name" field="fullName" placeholder="John Doe" />
                <InputField icon={faEnvelope} label="Email Address" field="email" type="email" placeholder="john@example.com" />
                <InputField icon={faPhone} label="Phone Number" field="phone" type="tel" placeholder="+234 800 000 0000" />

                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBuildingColumns} className="w-3 h-3" />
                    Bank details — for commission payouts
                  </p>
                </div>

                <InputField icon={faBuildingColumns} label="Bank Name" field="bankName" placeholder="e.g. GTBank, Access Bank" />
                <InputField icon={faCreditCard} label="Account Number" field="accountNumber" placeholder="0123456789" maxLength={10} />
                <InputField icon={faIdCard} label="Account Name" field="accountName" placeholder="John Doe" />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  className="w-full mt-4 bg-white text-black py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      Join Partner Program
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-gray-600 text-xs text-center mt-4">
                By signing up you agree to our partner terms. Commission payouts are processed within 7 business days.
              </p>
            </motion.div>
          ) : (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're In!</h2>
              <p className="text-gray-400 text-sm mb-6">
                Your partner application has been submitted. You'll be approved within 24 hours.
              </p>

              {/* Referral code */}
              <div className="mb-6">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Your Referral Code</p>
                <div className="inline-flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-5 py-3">
                  <span className="text-amber-400 font-mono font-bold text-lg tracking-wide">{referralCode}</span>
                  <button
                    onClick={copyReferralLink}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy referral link"
                  >
                    <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} className={`w-4 h-4 ${copied ? 'text-emerald-400' : ''}`} />
                  </button>
                </div>
                {copied && <p className="text-emerald-400 text-xs mt-2">Referral link copied!</p>}
              </div>

              <div className="text-left bg-black/30 rounded-xl border border-white/5 p-4 mb-6">
                <p className="text-gray-400 text-xs mb-2 font-medium">Your referral link:</p>
                <code className="text-amber-300 text-xs break-all">
                  {window.location.origin}/pricing?ref={referralCode}
                </code>
              </div>

              <p className="text-gray-500 text-xs">
                Share this link with restaurants. When they subscribe, you earn commission automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
