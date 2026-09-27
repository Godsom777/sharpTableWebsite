'use client';

import { PLAN_CONFIG, type PlanType } from '../contexts/PaymentContext';

declare global {
  interface Window {
    PaystackPop: { setup: (options: any) => { openIframe: () => void } };
  }
}

export const PENDING_SUBSCRIPTION_KEY = 'sharptable_pending_subscription';

interface StartCheckoutOptions {
  email: string;
  plan: PlanType;
  businessName?: string;
  country?: string;
  referralCode?: string;
  onClose?: () => void;
}

/**
 * Opens the Paystack subscription popup for a plan. On success the user is sent
 * to /payment/callback, which confirms the payment with our server before
 * showing anything. Nothing is marked as paid in the browser.
 */
export function startSubscriptionCheckout({
  email,
  plan,
  businessName = '',
  country = '',
  referralCode = '',
  onClose,
}: StartCheckoutOptions): boolean {
  const planDetails = PLAN_CONFIG[plan];
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  if (!planDetails || !publicKey || typeof window === 'undefined' || !window.PaystackPop) {
    return false;
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Display-only details for the callback page. Never treated as proof of payment.
  localStorage.setItem(
    PENDING_SUBSCRIPTION_KEY,
    JSON.stringify({
      email: normalizedEmail,
      businessName,
      country,
      plan,
      planCode: planDetails.planCode,
      referralCode,
      initiatedAt: new Date().toISOString(),
      status: 'pending',
    }),
  );

  const customFields = [
    { display_name: 'Business Name', variable_name: 'business_name', value: businessName },
    { display_name: 'Plan', variable_name: 'plan_type', value: plan },
    { display_name: 'Country', variable_name: 'country', value: country },
  ];
  if (referralCode) {
    customFields.push({ display_name: 'Partner Referral', variable_name: 'referral_code', value: referralCode });
  }

  window.PaystackPop.setup({
    key: publicKey,
    email: normalizedEmail,
    plan: planDetails.planCode,
    channels: ['card'],
    metadata: { custom_fields: customFields },
    callback: (response: { reference: string }) => {
      window.location.href = `/payment/callback?reference=${encodeURIComponent(response.reference)}`;
    },
    onClose: () => onClose?.(),
  }).openIframe();

  return true;
}
