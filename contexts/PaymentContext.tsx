import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type PlanType = 'lite' | 'pro' | 'enterprise' | 'lite-yearly' | 'pro-yearly' | 'enterprise-yearly';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanDetails {
  name: string;
  planCode: string;
  price: string;
  period: string;
  billingCycle: BillingCycle;
  savings?: string;
}

// Base prices in Naira — backend source of truth (Paystack charges in NGN)
// Frontend displays converted USD prices via useCurrency hook
export const BASE_PRICES_NGN = {
  'lite': 50_000,
  'pro': 150_000,
  'enterprise': 199_999,
  'lite-yearly': 500_000,
  'pro-yearly': 1_000_000,
  'enterprise-yearly': 2_000_000,
};

export const PLAN_CONFIG: Record<PlanType, PlanDetails> = {
  lite: {
    name: 'Lite',
    planCode: 'PLN_mquahijhgi8tzux',
    price: '50000',
    period: '/month',
    billingCycle: 'monthly',
  },
  pro: {
    name: 'Pro',
    planCode: 'PLN_rknt3upbuue6dmh',
    price: '150000',
    period: '/month',
    billingCycle: 'monthly',
  },
  enterprise: {
    name: 'Enterprise',
    planCode: 'PLN_b36ulzsdy6d418n',
    price: '199999',
    period: '/month',
    billingCycle: 'monthly',
  },
  'lite-yearly': {
    name: 'Lite',
    planCode: 'PLN_2a41260dnw7z99x',
    price: '500000',
    period: '/year',
    billingCycle: 'yearly',
  },
  'pro-yearly': {
    name: 'Pro',
    planCode: 'PLN_lu2vu0x7b0z4esc',
    price: '1000000',
    period: '/year',
    billingCycle: 'yearly',
  },
  'enterprise-yearly': {
    name: 'Enterprise',
    planCode: 'PLN_geld4bet9hwqca0',
    price: '2000000',
    period: '/year',
    billingCycle: 'yearly',
  },
};

interface PaymentContextType {
  isModalOpen: boolean;
  selectedPlan: PlanType | null;
  openPaymentModal: (plan: PlanType) => void;
  closePaymentModal: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const openPaymentModal = useCallback((plan: PlanType) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closePaymentModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        isModalOpen,
        selectedPlan,
        openPaymentModal,
        closePaymentModal,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
