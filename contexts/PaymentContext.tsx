import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type PlanType = 'pro' | 'enterprise' | 'pro-yearly' | 'enterprise-yearly';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanDetails {
  name: string;
  planCode: string;
  price: string;
  period: string;
  billingCycle: BillingCycle;
  savings?: string;
}

export const PLAN_CONFIG: Record<PlanType, PlanDetails> = {
  pro: {
    name: 'Control',
    planCode: 'PLN_rknt3upbuue6dmh',
    price: '$65',
    period: '/month',
    billingCycle: 'monthly',
  },
  enterprise: {
    name: 'Command',
    planCode: 'PLN_b36ulzsdy6d418n',
    price: '$129',
    period: '/month',
    billingCycle: 'monthly',
  },
  'pro-yearly': {
    name: 'Control',
    planCode: 'PLN_lu2vu0x7b0z4esc',
    price: '$690',
    period: '/year',
    billingCycle: 'yearly',
    savings: 'Save ~22%',
  },
  'enterprise-yearly': {
    name: 'Command',
    planCode: 'PLN_geld4bet9hwqca0',
    price: '$1,380',
    period: '/year',
    billingCycle: 'yearly',
    savings: 'Save ~35%',
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
