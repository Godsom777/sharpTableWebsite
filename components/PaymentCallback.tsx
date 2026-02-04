import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faHome,
  faEnvelope,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

type PaymentStatus = 'loading' | 'success' | 'failed';

interface SubscriptionData {
  email: string;
  businessName: string;
  plan: string;
  planCode: string;
  reference: string;
  initiatedAt: string;
  status: string;
  completedAt?: string;
}

export const PaymentCallback: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    
    // Get stored subscription data
    const storedData = localStorage.getItem('sharptable_pending_subscription');
    
    if (storedData) {
      const data: SubscriptionData = JSON.parse(storedData);
      setSubscriptionData(data);
      
      // Check if reference matches
      if (reference && data.reference === reference) {
        // Update status to success (in production, verify with your backend)
        data.status = 'completed';
        data.completedAt = new Date().toISOString();
        
        // Store completed subscription
        localStorage.setItem('sharptable_subscription', JSON.stringify(data));
        localStorage.removeItem('sharptable_pending_subscription');
        
        setStatus('success');
      } else if (reference) {
        // Reference exists but doesn't match - still might be successful
        // In production, verify with backend
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } else {
      // No stored data, check if there's a reference (direct redirect from Paystack)
      if (reference) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    }
  }, []);

  const handleGoToApp = () => {
    window.location.href = 'https://app.sharptable.com.ng';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@sharptable.com.ng';
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-8 text-center"
      >
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Processing Payment</h1>
            <p className="text-gray-400">Please wait while we confirm your subscription...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-400 mb-6">
              {subscriptionData ? (
                <>
                  Thank you, <span className="text-white font-medium">{subscriptionData.businessName}</span>! Your{' '}
                  <span className="text-amber-400 font-medium capitalize">{subscriptionData.plan}</span> subscription is now active.
                </>
              ) : (
                'Your subscription has been activated successfully.'
              )}
            </p>

            {subscriptionData && (
              <div className="bg-zinc-800 rounded-xl p-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Subscription Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-white">{subscriptionData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Plan</span>
                    <span className="text-amber-400 font-medium capitalize">{subscriptionData.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference</span>
                    <span className="text-gray-300 font-mono text-xs">{subscriptionData.reference}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Your account is ready! Sign in with the email and password you used during registration.
              </p>
              <button
                onClick={handleGoToApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} className="w-4 h-4" />
                Go to App & Sign In
              </button>
              <button
                onClick={handleGoHome}
                className="w-full py-3 rounded-xl bg-zinc-800 text-gray-300 font-semibold text-sm hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimesCircle} className="w-8 h-8 text-red-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Issue</h1>
            <p className="text-gray-400 mb-6">
              We couldn't confirm your payment. This could be due to a cancelled transaction or a technical issue.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoHome}
                className="w-full py-3 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={handleContactSupport}
                className="w-full py-3 rounded-xl border border-zinc-700 text-gray-300 font-semibold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};
