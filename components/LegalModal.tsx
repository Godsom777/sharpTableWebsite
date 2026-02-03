import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faShield, faFileLines, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type LegalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-amber-400 transition-colors"
      >
        <span className="font-semibold text-white">{title}</span>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="w-4 h-4 text-gray-500" 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-400 text-sm leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PrivacyPolicyContent: React.FC = () => (
  <div className="space-y-1">
    <p className="text-gray-300 mb-6">
      Last updated: February 2026
    </p>
    <p className="text-gray-400 mb-6">
      SharpTable Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our restaurant management platform.
    </p>

    <AccordionItem title="1. Information We Collect" defaultOpen>
      <p><strong className="text-white">Restaurant Owner/Admin Information:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Business name, email address, phone number</li>
        <li>Payment information for subscription billing</li>
        <li>Staff accounts and role assignments</li>
        <li>Business location(s) and branch details</li>
      </ul>
      
      <p className="mt-3"><strong className="text-white">Operational Data:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Order history and transaction records</li>
        <li>Table management and QR code scan data</li>
        <li>Payment verification logs (Marshall dashboard)</li>
        <li>Staff activity and audit trails</li>
        <li>Menu items and pricing information</li>
      </ul>

      <p className="mt-3"><strong className="text-white">Guest Data (collected on behalf of restaurants):</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Phone numbers (for order identification)</li>
        <li>Order preferences and history</li>
        <li>Visit frequency and spending patterns</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="2. How We Use Your Information">
      <ul className="list-disc list-inside space-y-2">
        <li><strong className="text-white">Service Delivery:</strong> To provide order management, payment verification, and kitchen display systems</li>
        <li><strong className="text-white">Payment Processing:</strong> To process subscription payments via Paystack securely</li>
        <li><strong className="text-white">Audit & Accountability:</strong> To maintain transaction logs and audit trails for financial transparency</li>
        <li><strong className="text-white">Analytics:</strong> To generate daily summaries, revenue reports, and operational insights</li>
        <li><strong className="text-white">Customer Intelligence:</strong> To help restaurants identify and serve repeat guests better</li>
        <li><strong className="text-white">Multi-location Management:</strong> To provide unified views across restaurant branches (Enterprise plan)</li>
        <li><strong className="text-white">Support:</strong> To respond to inquiries and provide technical assistance</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="3. Data Storage & Security">
      <p>We implement industry-standard security measures to protect your data:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>All data is encrypted in transit (TLS/SSL) and at rest</li>
        <li>Secure cloud hosting with Supabase infrastructure</li>
        <li>Role-based access controls for staff accounts</li>
        <li>Regular security audits and monitoring</li>
        <li>Payment data handled exclusively by Paystack (PCI-DSS compliant)</li>
      </ul>
      <p className="mt-3">
        <strong className="text-white">Data Retention:</strong> Order history is retained based on your subscription plan (90 days for Control, unlimited for Command). You may request data deletion at any time.
      </p>
    </AccordionItem>

    <AccordionItem title="4. Data Sharing">
      <p>We do not sell your data. We may share information only:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li><strong className="text-white">With Paystack:</strong> For secure payment processing</li>
        <li><strong className="text-white">With Service Providers:</strong> Cloud hosting and infrastructure partners bound by confidentiality</li>
        <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
        <li><strong className="text-white">Business Transfers:</strong> In case of merger or acquisition, with prior notice</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="5. Your Rights">
      <p>You have the right to:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Access your personal data</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Export your data in a portable format</li>
        <li>Withdraw consent for optional data processing</li>
        <li>Lodge a complaint with relevant data protection authorities</li>
      </ul>
      <p className="mt-3">
        To exercise these rights, contact us at <a href="mailto:info@sharptable.com.ng" className="text-amber-400 hover:underline">info@sharptable.com.ng</a>
      </p>
    </AccordionItem>

    <AccordionItem title="6. Cookies & Tracking">
      <p>Our platform uses essential cookies for:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Session management and authentication</li>
        <li>Remembering user preferences</li>
        <li>Currency and location detection for pricing</li>
      </ul>
      <p className="mt-3">We do not use third-party advertising trackers.</p>
    </AccordionItem>

    <AccordionItem title="7. Children's Privacy">
      <p>
        SharpTable is a B2B service for restaurant businesses. We do not knowingly collect personal information from individuals under 18. Guest ordering features may be used by minors under restaurant supervision.
      </p>
    </AccordionItem>

    <AccordionItem title="8. Changes to This Policy">
      <p>
        We may update this Privacy Policy periodically. Significant changes will be communicated via email to registered users. Continued use of our service after changes constitutes acceptance.
      </p>
    </AccordionItem>

    <AccordionItem title="9. Contact Us">
      <p>For privacy-related inquiries:</p>
      <p className="mt-2">
        <strong className="text-white">SharpTable Tech</strong><br />
        Email: <a href="mailto:info@sharptable.com.ng" className="text-amber-400 hover:underline">info@sharptable.com.ng</a><br />
        Nigeria
      </p>
    </AccordionItem>
  </div>
);

const TermsOfServiceContent: React.FC = () => (
  <div className="space-y-1">
    <p className="text-gray-300 mb-6">
      Last updated: February 2026
    </p>
    <p className="text-gray-400 mb-6">
      These Terms of Service ("Terms") govern your use of SharpTable, a restaurant management platform operated by SharpTable Tech ("we," "our," or "us"). By using our service, you agree to these Terms.
    </p>

    <AccordionItem title="1. Service Description" defaultOpen>
      <p>SharpTable provides:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li><strong className="text-white">QR-based Ordering:</strong> Digital menu and ordering system for restaurant guests</li>
        <li><strong className="text-white">Payment Gate System:</strong> Order verification workflow with Marshall dashboard</li>
        <li><strong className="text-white">Kitchen Display System (KDS):</strong> Real-time order management for kitchen staff</li>
        <li><strong className="text-white">Admin Dashboard:</strong> Staff management, menu control, and business analytics</li>
        <li><strong className="text-white">Audit Trail:</strong> Complete transaction logging for financial accountability</li>
        <li><strong className="text-white">Multi-location Management:</strong> Unified control across branches (Command plan)</li>
        <li><strong className="text-white">Customer Intelligence:</strong> Guest recognition and spending insights</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="2. Subscription Plans & Billing">
      <p><strong className="text-white">Plans Offered:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li><strong className="text-amber-400">Control Plan:</strong> Up to 50 tables, 15 staff, 1 location, 90-day order history</li>
        <li><strong className="text-purple-400">Command Plan:</strong> Unlimited tables, staff, locations, and order history</li>
      </ul>

      <p className="mt-3"><strong className="text-white">Billing Terms:</strong></p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Subscriptions are billed monthly or annually in advance</li>
        <li>Prices are displayed in your local currency (converted from NGN at current rates)</li>
        <li>Payment processing is handled securely by Paystack</li>
        <li>Annual plans offer up to 35% savings</li>
        <li>All payments are non-refundable unless required by law</li>
      </ul>

      <p className="mt-3"><strong className="text-white">Automatic Renewal:</strong></p>
      <p>Subscriptions auto-renew unless cancelled before the renewal date. You may cancel anytime from your account dashboard.</p>
    </AccordionItem>

    <AccordionItem title="3. Account Responsibilities">
      <p>As an account holder, you agree to:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Provide accurate business and contact information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Not share login credentials across unauthorized users</li>
        <li>Assign appropriate roles (Admin, Marshall, Chef) to authorized staff only</li>
        <li>Ensure your use complies with local food service and business regulations</li>
        <li>Notify us immediately of any unauthorized access</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="4. Acceptable Use">
      <p>You may NOT use SharpTable to:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Process payments for illegal goods or services</li>
        <li>Manipulate or falsify transaction records</li>
        <li>Attempt to bypass payment verification (Marshall gate)</li>
        <li>Harvest guest data for unauthorized marketing</li>
        <li>Resell or sublicense the service without permission</li>
        <li>Interfere with or disrupt the platform's operation</li>
        <li>Reverse engineer or attempt to extract source code</li>
      </ul>
      <p className="mt-3">Violation may result in immediate suspension or termination.</p>
    </AccordionItem>

    <AccordionItem title="5. Data Ownership">
      <p><strong className="text-white">Your Data:</strong> You retain ownership of all business data, menu items, and operational records you create in SharpTable.</p>
      
      <p className="mt-3"><strong className="text-white">Our License:</strong> You grant us a limited license to process, store, and display your data solely to provide the service.</p>
      
      <p className="mt-3"><strong className="text-white">Guest Data:</strong> You are the data controller for guest information collected through your restaurant. We act as a data processor on your behalf.</p>
      
      <p className="mt-3"><strong className="text-white">Data Export:</strong> You may export your data at any time. Upon termination, we retain data for 30 days before permanent deletion unless otherwise requested.</p>
    </AccordionItem>

    <AccordionItem title="6. Service Availability">
      <ul className="list-disc list-inside space-y-2">
        <li>We aim for 99.9% uptime but do not guarantee uninterrupted service</li>
        <li>Scheduled maintenance will be communicated in advance when possible</li>
        <li>We are not liable for disruptions due to internet connectivity, device issues, or third-party services</li>
        <li>Feature updates and improvements are released periodically at no extra cost</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="7. Limitation of Liability">
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>SharpTable is provided "AS IS" without warranties of any kind</li>
        <li>We are not liable for indirect, incidental, or consequential damages</li>
        <li>Our total liability shall not exceed the fees paid in the 12 months preceding the claim</li>
        <li>We are not responsible for revenue loss due to service interruptions</li>
        <li>You remain responsible for your business operations and compliance</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="8. Indemnification">
      <p>
        You agree to indemnify and hold harmless SharpTable Tech, its officers, employees, and partners from any claims, damages, or expenses arising from:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Your use of the service</li>
        <li>Violation of these Terms</li>
        <li>Infringement of third-party rights</li>
        <li>Guest disputes related to your restaurant operations</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="9. Termination">
      <p><strong className="text-white">By You:</strong> Cancel anytime from your account. Access continues until the end of the billing period.</p>
      
      <p className="mt-3"><strong className="text-white">By Us:</strong> We may suspend or terminate accounts for:</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Violation of these Terms</li>
        <li>Non-payment after grace period</li>
        <li>Fraudulent or illegal activity</li>
        <li>Extended inactivity (12+ months)</li>
      </ul>
      
      <p className="mt-3"><strong className="text-white">Effect:</strong> Upon termination, your access ends immediately. Data is retained for 30 days for export, then permanently deleted.</p>
    </AccordionItem>

    <AccordionItem title="10. Modifications to Service">
      <p>
        We reserve the right to modify, suspend, or discontinue features with reasonable notice. Significant changes to pricing or core functionality will be communicated at least 30 days in advance.
      </p>
    </AccordionItem>

    <AccordionItem title="11. Governing Law & Disputes">
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through good-faith negotiation first, then binding arbitration in Lagos, Nigeria.
      </p>
    </AccordionItem>

    <AccordionItem title="12. Contact">
      <p>For questions about these Terms:</p>
      <p className="mt-2">
        <strong className="text-white">SharpTable Tech</strong><br />
        Email: <a href="mailto:info@sharptable.com.ng" className="text-amber-400 hover:underline">info@sharptable.com.ng</a><br />
        Nigeria
      </p>
    </AccordionItem>
  </div>
);

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const icon = type === 'privacy' ? faShield : faFileLines;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-zinc-900 rounded-2xl border border-zinc-800 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm sticky top-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={icon} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
              </div>
              <button
                onClick={onClose}
                title="Close modal"
                aria-label="Close modal"
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                {type === 'privacy' ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for easy usage
export const useLegalModal = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: LegalType }>({
    isOpen: false,
    type: null,
  });

  const openPrivacyPolicy = () => setModalState({ isOpen: true, type: 'privacy' });
  const openTermsOfService = () => setModalState({ isOpen: true, type: 'terms' });
  const closeModal = () => setModalState({ isOpen: false, type: null });

  return {
    ...modalState,
    openPrivacyPolicy,
    openTermsOfService,
    closeModal,
  };
};
