import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faEnvelope,
  faBuilding,
  faSpinner,
  faShieldHalved,
  faLock,
  faCrown,
  faArrowRight,
  faCheck,
  faKey,
  faEye,
  faEyeSlash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from '@fortawesome/free-brands-svg-icons';
import { usePayment, PLAN_CONFIG } from '../contexts/PaymentContext';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client for the APP's database (where users will login)
// Initialize lazily to avoid errors when env vars are not set
const appSupabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const appSupabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;
function getSupabaseClient(): SupabaseClient | null {
  if (!appSupabaseUrl || !appSupabaseAnonKey) {
    console.warn('Supabase credentials not configured for PaymentModal');
    return null;
  }
  if (!supabase) {
    supabase = createClient(appSupabaseUrl, appSupabaseAnonKey);
  }
  return supabase;
}

// Paystack public key from environment variable
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Declare PaystackPop on window for TypeScript
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  plan: string;
  ref: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback: (response: { reference: string; status: string }) => void;
  onClose: () => void;
}

interface FormData {
  email: string;
  businessName: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  businessName?: string;
  password?: string;
  confirmPassword?: string;
  auth?: string;
}

export const PaymentModal: React.FC = () => {
  const { isModalOpen, selectedPlan, closePaymentModal } = usePayment();
  const [formData, setFormData] = useState<FormData>({ email: '', businessName: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<'form' | 'registering' | 'payment'>('form');

  const planDetails = selectedPlan ? PLAN_CONFIG[selectedPlan] : null;

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ email: '', businessName: '', password: '', confirmPassword: '' });
      setErrors({});
      setIsSubmitting(false);
      setAgreedToTerms(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setRegistrationStep('form');
    }
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closePaymentModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closePaymentModal]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business name must be at least 2 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const initiatePaystackPayment = useCallback(() => {
    if (!planDetails || !selectedPlan) return;

    // Generate a unique reference
    const reference = `ST_${selectedPlan.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Store subscription attempt in localStorage for tracking
    // Your app can read this to verify subscription status
    const subscriptionData = {
      email: formData.email.toLowerCase().trim(),
      businessName: formData.businessName.trim(),
      plan: selectedPlan,
      planCode: planDetails.planCode,
      reference,
      initiatedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    // Store in localStorage - your app can check this
    localStorage.setItem('sharptable_pending_subscription', JSON.stringify(subscriptionData));

    // Use Paystack inline JS SDK for subscription
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email.toLowerCase().trim(),
      plan: planDetails.planCode,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: 'Business Name',
            variable_name: 'business_name',
            value: formData.businessName.trim(),
          },
          {
            display_name: 'Plan',
            variable_name: 'plan_type',
            value: selectedPlan,
          },
        ],
      },
      callback: (response) => {
        // Payment successful
        const completedData = {
          ...subscriptionData,
          status: 'completed',
          completedAt: new Date().toISOString(),
          paystackReference: response.reference,
        };
        localStorage.setItem('sharptable_subscription', JSON.stringify(completedData));
        localStorage.removeItem('sharptable_pending_subscription');
        
        // Redirect to success page
        window.location.href = `/payment/callback?reference=${response.reference}`;
      },
      onClose: () => {
        // User closed the payment modal
        setIsSubmitting(false);
      },
    });

    handler.openIframe();
  }, [formData, planDetails, selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !agreedToTerms) {
      return;
    }

    const client = getSupabaseClient();
    if (!client) {
      setErrors({ auth: 'Payment system not configured. Please contact support.' });
      return;
    }

    setIsSubmitting(true);
    setRegistrationStep('registering');
    setErrors({});

    try {
      // Step 1: Register user with Supabase Auth
      const { data: authData, error: authError } = await client.auth.signUp({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        options: {
          data: {
            business_name: formData.businessName.trim(),
            plan_type: selectedPlan,
          },
        },
      });

      if (authError) {
        // Handle specific auth errors
        if (authError.message.includes('already registered')) {
          setErrors({ auth: 'This email is already registered. Please use a different email or sign in to the app.' });
        } else {
          setErrors({ auth: authError.message });
        }
        setIsSubmitting(false);
        setRegistrationStep('form');
        return;
      }

      if (!authData.user) {
        setErrors({ auth: 'Failed to create account. Please try again.' });
        setIsSubmitting(false);
        setRegistrationStep('form');
        return;
      }

      // Step 2: Proceed to payment
      setRegistrationStep('payment');
      
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      initiatePaystackPayment();
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ auth: 'An unexpected error occurred. Please try again.' });
      setIsSubmitting(false);
      setRegistrationStep('form');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePaymentModal();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && planDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-zinc-800">
              {/* Close button */}
              <button
                onClick={closePaymentModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </button>

              {/* Plan badge */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedPlan === 'pro'
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}
                >
                  <FontAwesomeIcon icon={faCrown} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{planDetails.name} Plan</h2>
                  <p className="text-sm text-gray-400">
                    {planDetails.price}
                    <span className="text-gray-500">{planDetails.period}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Registration Step Indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  registrationStep === 'form' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  <FontAwesomeIcon icon={registrationStep === 'form' ? faUserPlus : faCheck} className="w-3 h-3" />
                  <span>1. Register</span>
                </div>
                <div className="w-4 h-0.5 bg-zinc-700" />
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  registrationStep === 'payment' ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-gray-500'
                }`}>
                  <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
                  <span>2. Pay</span>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                Create your SharpTable account, then complete payment to activate your subscription.
              </p>

              {/* Auth Error Display */}
              {errors.auth && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400">{errors.auth}</p>
                </div>
              )}

              {/* Registration Info Box */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 text-blue-400 mt-0.5" />
                <p className="text-xs text-blue-200">
                  This creates your SharpTable account. Use these credentials to log in to the app after payment.
                </p>
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border ${
                      errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-amber-500'
                    } rounded-xl text-white placeholder-gray-500 outline-none transition-colors`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
              </div>

              {/* Business name field */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                  Restaurant / Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange('businessName')}
                    placeholder="Your Restaurant Name"
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border ${
                      errors.businessName ? 'border-red-500' : 'border-zinc-700 focus:border-amber-500'
                    } rounded-xl text-white placeholder-gray-500 outline-none transition-colors`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.businessName && <p className="mt-1.5 text-sm text-red-400">{errors.businessName}</p>}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faKey} className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    placeholder="Min 8 chars, uppercase, lowercase, number"
                    className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border ${
                      errors.password ? 'border-red-500' : 'border-zinc-700 focus:border-amber-500'
                    } rounded-xl text-white placeholder-gray-500 outline-none transition-colors`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>}
              </div>

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-zinc-700 focus:border-amber-500'
                    } rounded-xl text-white placeholder-gray-500 outline-none transition-colors`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                    agreedToTerms
                      ? 'bg-amber-500 border-amber-500'
                      : 'bg-zinc-800 border-zinc-600 hover:border-zinc-500'
                  }`}
                  disabled={isSubmitting}
                >
                  {agreedToTerms && <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-white" />}
                </button>
                <label className="text-sm text-gray-400 cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                  I agree to the{' '}
                  <a href="/terms" className="text-amber-400 hover:text-amber-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-amber-400 hover:text-amber-300 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !agreedToTerms}
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting || !agreedToTerms
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : selectedPlan === 'pro'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                    {registrationStep === 'registering' ? 'Creating Account...' : 'Opening Payment...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                    Register & Subscribe
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6 space-y-4">
              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-gray-500">We accept:</span>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCcVisa} className="w-8 h-8 text-[#1A1F71]" />
                  <FontAwesomeIcon icon={faCcMastercard} className="w-8 h-8 text-[#EB001B]" />
                  <FontAwesomeIcon icon={faCcAmex} className="w-8 h-8 text-[#006FCF]" />
                  {/* Verve - custom since no FA icon */}
                  <div className="px-2 py-1 bg-[#00425F] rounded text-[10px] font-bold text-white">VERVE</div>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
                  SSL Secured
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3" />
                  Powered by Paystack
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
