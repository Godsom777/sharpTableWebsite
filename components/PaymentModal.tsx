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
} from '@fortawesome/free-solid-svg-icons';
import { usePayment, PLAN_CONFIG } from '../contexts/PaymentContext';

// Paystack public key from environment variable
// Note: pk_live keys are safe to expose in frontend - they can only initialize payments
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_e64a98438e270359d525099624bf0f096b64d17e';

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
}

interface FormErrors {
  email?: string;
  businessName?: string;
}

export const PaymentModal: React.FC = () => {
  const { isModalOpen, selectedPlan, closePaymentModal } = usePayment();
  const [formData, setFormData] = useState<FormData>({ email: '', businessName: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const planDetails = selectedPlan ? PLAN_CONFIG[selectedPlan] : null;

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ email: '', businessName: '' });
      setErrors({});
      setIsSubmitting(false);
      setAgreedToTerms(false);
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

    setIsSubmitting(true);

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    initiatePaystackPayment();
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
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <p className="text-sm text-gray-400 mb-4">
                Enter your details to start your subscription. You'll be redirected to Paystack to complete payment securely.
              </p>

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
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6">
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
