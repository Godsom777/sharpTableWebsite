'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faShield, faFileLines, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, IconButton } from '@mui/material';

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
    <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.800', '&:last-child': { borderBottom: 0 } }}>
      <Box
        component="button"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, textAlign: 'left', bgcolor: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: '#fbbf24' } }}
      >
        <Typography component="span" sx={{ fontWeight: 600, color: 'white', fontSize: '1rem', '.MuiBox-root:hover &': { color: '#fbbf24' } }}>{title}</Typography>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          style={{ width: 16, height: 16, color: '#6b7280' }} 
        />
      </Box>
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{ pb: 2, color: 'grey.400', fontSize: '0.875rem', lineHeight: 1.625, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {children}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

const PrivacyPolicyContent: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    <Typography sx={{ color: 'grey.300', mb: 3 }}>
      Last updated: February 2026
    </Typography>
    <Typography sx={{ color: 'grey.400', mb: 3 }}>
      SharpTable Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our restaurant management platform.
    </Typography>

    <AccordionItem title="1. Information We Collect" defaultOpen>
      <Typography><Box component="strong" sx={{ color: 'white' }}>Restaurant Owner/Admin Information:</Box></Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box component="li">Business name, email address, phone number</Box>
        <Box component="li">Payment information for subscription billing</Box>
        <Box component="li">Staff accounts and role assignments</Box>
        <Box component="li">Business location(s) and branch details</Box>
      </Box>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Operational Data:</Box></Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box component="li">Order history and transaction records</Box>
        <Box component="li">Table management and QR code scan data</Box>
        <Box component="li">Payment verification logs (Marshall dashboard)</Box>
        <Box component="li">Staff activity and audit trails</Box>
        <Box component="li">Menu items and pricing information</Box>
      </Box>

      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Guest Data (collected on behalf of restaurants):</Box></Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box component="li">Phone numbers (for order identification)</Box>
        <Box component="li">Order preferences and history</Box>
        <Box component="li">Visit frequency and spending patterns</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="2. How We Use Your Information">
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Service Delivery:</Box> To provide order management, payment verification, and kitchen display systems</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Payment Processing:</Box> To process subscription payments via Paystack securely</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Audit & Accountability:</Box> To maintain transaction logs and audit trails for financial transparency</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Analytics:</Box> To generate daily summaries, revenue reports, and operational insights</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Customer Intelligence:</Box> To help restaurants identify and serve repeat guests better</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Multi-location Management:</Box> To provide unified views across restaurant branches (Enterprise plan)</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Support:</Box> To respond to inquiries and provide technical assistance</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="3. Data Storage & Security">
      <Typography>We implement industry-standard security measures to protect your data:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">All data is encrypted in transit (TLS/SSL) and at rest</Box>
        <Box component="li">Secure cloud hosting with Supabase infrastructure</Box>
        <Box component="li">Role-based access controls for staff accounts</Box>
        <Box component="li">Regular security audits and monitoring</Box>
        <Box component="li">Payment data handled exclusively by Paystack (PCI-DSS compliant)</Box>
      </Box>
      <Typography sx={{ mt: 1.5 }}>
        <Box component="strong" sx={{ color: 'white' }}>Data Retention:</Box> Order history is retained based on your subscription plan (90 days for Pro, unlimited for Enterprise). You may request data deletion at any time.
      </Typography>
    </AccordionItem>

    <AccordionItem title="4. Data Sharing">
      <Typography>We do not sell your data. We may share information only:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>With Paystack:</Box> For secure payment processing</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>With Service Providers:</Box> Cloud hosting and infrastructure partners bound by confidentiality</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Legal Requirements:</Box> When required by law or to protect our rights</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Business Transfers:</Box> In case of merger or acquisition, with prior notice</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="5. Your Rights">
      <Typography>You have the right to:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Access your personal data</Box>
        <Box component="li">Correct inaccurate information</Box>
        <Box component="li">Request deletion of your data</Box>
        <Box component="li">Export your data in a portable format</Box>
        <Box component="li">Withdraw consent for optional data processing</Box>
        <Box component="li">Lodge a complaint with relevant data protection authorities</Box>
      </Box>
      <Typography sx={{ mt: 1.5 }}>
        To exercise these rights, contact us at <Box component="a" href="mailto:info@sharptable.com.ng" sx={{ color: '#fbbf24', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>info@sharptable.com.ng</Box>
      </Typography>
    </AccordionItem>

    <AccordionItem title="6. Cookies & Tracking">
      <Typography>Our platform uses essential cookies for:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Session management and authentication</Box>
        <Box component="li">Remembering user preferences</Box>
        <Box component="li">Currency and location detection for pricing</Box>
      </Box>
      <Typography sx={{ mt: 1.5 }}>We do not use third-party advertising trackers.</Typography>
    </AccordionItem>

    <AccordionItem title="7. Children's Privacy">
      <Typography>
        SharpTable is a B2B service for restaurant businesses. We do not knowingly collect personal information from individuals under 18. Guest ordering features may be used by minors under restaurant supervision.
      </Typography>
    </AccordionItem>

    <AccordionItem title="8. Changes to This Policy">
      <Typography>
        We may update this Privacy Policy periodically. Significant changes will be communicated via email to registered users. Continued use of our service after changes constitutes acceptance.
      </Typography>
    </AccordionItem>

    <AccordionItem title="9. Contact Us">
      <Typography>For privacy-related inquiries:</Typography>
      <Typography sx={{ mt: 1 }}>
        <Box component="strong" sx={{ color: 'white' }}>SharpTable Tech</Box><br />
        Email: <Box component="a" href="mailto:info@sharptable.com.ng" sx={{ color: '#fbbf24', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>info@sharptable.com.ng</Box><br />
        Nigeria
      </Typography>
    </AccordionItem>
  </Box>
);

const TermsOfServiceContent: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    <Typography sx={{ color: 'grey.300', mb: 3 }}>
      Last updated: February 2026
    </Typography>
    <Typography sx={{ color: 'grey.400', mb: 3 }}>
      These Terms of Service ("Terms") govern your use of SharpTable, a restaurant management platform operated by SharpTable Tech ("we," "our," or "us"). By using our service, you agree to these Terms.
    </Typography>

    <AccordionItem title="1. Service Description" defaultOpen>
      <Typography>SharpTable provides:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>QR-based Ordering:</Box> Digital menu and ordering system for restaurant guests</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Payment Gate System:</Box> Order verification workflow with Marshall dashboard</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Kitchen Display System (KDS):</Box> Real-time order management for kitchen staff</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Admin Dashboard:</Box> Staff management, menu control, and business analytics</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Audit Trail:</Box> Complete transaction logging for financial accountability</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Multi-location Management:</Box> Unified control across branches (Enterprise plan)</Box>
        <Box component="li"><Box component="strong" sx={{ color: 'white' }}>Customer Intelligence:</Box> Guest recognition and spending insights</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="2. Subscription Plans & Billing">
      <Typography><Box component="strong" sx={{ color: 'white' }}>Plans Offered:</Box></Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li"><Box component="strong" sx={{ color: '#fbbf24' }}>Pro Plan:</Box> Up to 50 tables, 15 staff, 1 branch, 90-day order history. WhatsApp ordering, food inventory, and food tracker are excluded.</Box>
        <Box component="li"><Box component="strong" sx={{ color: '#c084fc' }}>Enterprise Plan:</Box> Unlimited tables, staff, and order history with 4 branches included. Each branch above 4 adds 50,000 naira. WhatsApp ordering, food inventory, and food tracker are included.</Box>
      </Box>

      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Billing Terms:</Box></Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Subscriptions are billed monthly or annually in advance</Box>
        <Box component="li">Prices are displayed in USD and processed securely via Paystack</Box>
        <Box component="li">Payment processing is handled securely by Paystack</Box>
        <Box component="li">Annual plans offer up to 35% savings</Box>
        <Box component="li">All payments are non-refundable unless required by law</Box>
      </Box>

      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Automatic Renewal:</Box></Typography>
      <Typography>Subscriptions auto-renew unless cancelled before the renewal date. You may cancel anytime from your account dashboard.</Typography>
    </AccordionItem>

    <AccordionItem title="3. Account Responsibilities">
      <Typography>As an account holder, you agree to:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Provide accurate business and contact information</Box>
        <Box component="li">Maintain the security of your account credentials</Box>
        <Box component="li">Not share login credentials across unauthorized users</Box>
        <Box component="li">Assign appropriate roles (Admin, Marshall, Chef) to authorized staff only</Box>
        <Box component="li">Ensure your use complies with local food service and business regulations</Box>
        <Box component="li">Notify us immediately of any unauthorized access</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="4. Acceptable Use">
      <Typography>You may NOT use SharpTable to:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Process payments for illegal goods or services</Box>
        <Box component="li">Manipulate or falsify transaction records</Box>
        <Box component="li">Attempt to bypass payment verification (Marshall gate)</Box>
        <Box component="li">Harvest guest data for unauthorized marketing</Box>
        <Box component="li">Resell or sublicense the service without permission</Box>
        <Box component="li">Interfere with or disrupt the platform's operation</Box>
        <Box component="li">Reverse engineer or attempt to extract source code</Box>
      </Box>
      <Typography sx={{ mt: 1.5 }}>Violation may result in immediate suspension or termination.</Typography>
    </AccordionItem>

    <AccordionItem title="5. Data Ownership">
      <Typography><Box component="strong" sx={{ color: 'white' }}>Your Data:</Box> You retain ownership of all business data, menu items, and operational records you create in SharpTable.</Typography>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Our License:</Box> You grant us a limited license to process, store, and display your data solely to provide the service.</Typography>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Guest Data:</Box> You are the data controller for guest information collected through your restaurant. We act as a data processor on your behalf.</Typography>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Data Export:</Box> You may export your data at any time. Upon termination, we retain data for 30 days before permanent deletion unless otherwise requested.</Typography>
    </AccordionItem>

    <AccordionItem title="6. Service Availability">
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box component="li">We aim for 99.9% uptime but do not guarantee uninterrupted service</Box>
        <Box component="li">Scheduled maintenance will be communicated in advance when possible</Box>
        <Box component="li">We are not liable for disruptions due to internet connectivity, device issues, or third-party services</Box>
        <Box component="li">Feature updates and improvements are released periodically at no extra cost</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="7. Limitation of Liability">
      <Typography>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">SharpTable is provided "AS IS" without warranties of any kind</Box>
        <Box component="li">We are not liable for indirect, incidental, or consequential damages</Box>
        <Box component="li">Our total liability shall not exceed the fees paid in the 12 months preceding the claim</Box>
        <Box component="li">We are not responsible for revenue loss due to service interruptions</Box>
        <Box component="li">You remain responsible for your business operations and compliance</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="8. Indemnification">
      <Typography>
        You agree to indemnify and hold harmless SharpTable Tech, its officers, employees, and partners from any claims, damages, or expenses arising from:
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Your use of the service</Box>
        <Box component="li">Violation of these Terms</Box>
        <Box component="li">Infringement of third-party rights</Box>
        <Box component="li">Guest disputes related to your restaurant operations</Box>
      </Box>
    </AccordionItem>

    <AccordionItem title="9. Termination">
      <Typography><Box component="strong" sx={{ color: 'white' }}>By You:</Box> Cancel anytime from your account. Access continues until the end of the billing period.</Typography>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>By Us:</Box> We may suspend or terminate accounts for:</Typography>
      <Box component="ul" sx={{ listStyleType: 'disc', pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        <Box component="li">Violation of these Terms</Box>
        <Box component="li">Non-payment after grace period</Box>
        <Box component="li">Fraudulent or illegal activity</Box>
        <Box component="li">Extended inactivity (12+ months)</Box>
      </Box>
      
      <Typography sx={{ mt: 1.5 }}><Box component="strong" sx={{ color: 'white' }}>Effect:</Box> Upon termination, your access ends immediately. Data is retained for 30 days for export, then permanently deleted.</Typography>
    </AccordionItem>

    <AccordionItem title="10. Modifications to Service">
      <Typography>
        We reserve the right to modify, suspend, or discontinue features with reasonable notice. Significant changes to pricing or core functionality will be communicated at least 30 days in advance.
      </Typography>
    </AccordionItem>

    <AccordionItem title="11. Governing Law & Disputes">
      <Typography>
        These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through good-faith negotiation first, then binding arbitration in Lagos, Nigeria.
      </Typography>
    </AccordionItem>

    <AccordionItem title="12. Contact">
      <Typography>For questions about these Terms:</Typography>
      <Typography sx={{ mt: 1 }}>
        <Box component="strong" sx={{ color: 'white' }}>SharpTable Tech</Box><br />
        Email: <Box component="a" href="mailto:info@sharptable.com.ng" sx={{ color: '#fbbf24', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>info@sharptable.com.ng</Box><br />
        Nigeria
      </Typography>
    </AccordionItem>
  </Box>
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
          <Box
            component={motion.div}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1300 }}
          />

          {/* Modal */}
          <Box
            component={motion.div}
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            sx={{ position: 'fixed', inset: { xs: 16, md: 40, lg: 80 }, bgcolor: 'grey.900', borderRadius: '1rem', border: '1px solid', borderColor: 'grey.800', zIndex: 1300, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: '1px solid', borderColor: 'grey.800', bgcolor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(4px)', position: 'sticky', top: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', background: 'linear-gradient(to bottom right, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={icon} style={{ color: 'white', width: 20, height: 20 }} />
                </Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: 'white' }}>{title}</Typography>
              </Box>
              <IconButton onClick={onClose} size="small" sx={{ width: 40, height: 40, borderRadius: '0.75rem', bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.700' }, transition: 'background-color 0.2s', color: 'grey.400' }}>
                <FontAwesomeIcon icon={faXmark} style={{ width: 20, height: 20 }} />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 3, md: 4 } }}>
              <Box sx={{ maxWidth: '3xl', mx: 'auto' }}>
                {type === 'privacy' ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
              </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.800', bgcolor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(4px)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '3xl', mx: 'auto' }}>
                <Typography sx={{ fontSize: '0.875rem', color: 'grey.500' }}>
                  © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
                </Typography>
                <Box
                  component="button"
                  onClick={onClose}
                  sx={{ px: 3, py: 1, background: 'linear-gradient(to right, #f59e0b, #f97316)', color: 'white', fontWeight: 600, borderRadius: '0.75rem', border: 'none', cursor: 'pointer', '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)' }, transition: 'all 0.2s', fontFamily: 'inherit' }}
                >
                  Close
                </Box>
              </Box>
            </Box>
          </Box>
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

