'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePayment, type PlanType, type BillingCycle } from '@/contexts/PaymentContext';
import { Check } from './Bits';

// Growth card badge. Owner hasn't picked yet: 'Best value', 'Most popular', or '' (no badge).
const GROWTH_BADGE = 'Best value';
const CONTACT_HREF = 'mailto:info@sharptable.com.ng';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

// Display prices for the by-branch model. Checkout keys map Solo -> lite, Growth -> pro, Group -> enterprise
// (see contexts/PaymentContext.tsx); amounts match.
const PLANS: { name: string; description: string; monthly: number; yearly: number; badge: string; checkoutKey: { monthly: PlanType; yearly: PlanType } }[] = [
  { name: 'Solo', description: 'For one branch.', monthly: 50_000, yearly: 500_000, badge: '', checkoutKey: { monthly: 'lite', yearly: 'lite-yearly' } },
  { name: 'Growth', description: 'For 2 to 5 branches.', monthly: 99_999, yearly: 999_990, badge: GROWTH_BADGE, checkoutKey: { monthly: 'pro', yearly: 'pro-yearly' } },
  { name: 'Group', description: 'For 6 to 10 branches.', monthly: 199_999, yearly: 1_999_990, badge: '', checkoutKey: { monthly: 'enterprise', yearly: 'enterprise-yearly' } },
];

export const INCLUDED = [
  'QR ordering and digital menus',
  'Live kitchen display',
  'Admin app: sales, voids and discounts across every branch, with alerts',
  'Audit log: every void, discount and price edit, with staff name, table and time',
  'WhatsApp ordering, paid orders straight to the kitchen',
  'Staff roles and permissions',
  'Inventory and low-stock alerts',
  'Table payments and split bills',
];

export function PlanCards() {
  const { openPaymentModal } = usePayment();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const yearly = cycle === 'yearly';
  return (
    <>
      <div className="seg" role="group" aria-label="Billing period">
        <button type="button" aria-pressed={!yearly} onClick={() => setCycle('monthly')}>Monthly</button>
        <button type="button" aria-pressed={yearly} onClick={() => setCycle('yearly')}>Yearly · 2 months free</button>
      </div>
      <div className="wrap">
        <div className="grid c4">
          {PLANS.map((p) => (
            <div className="card" key={p.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 24 }}>
                <h3>{p.name}</h3>
                {p.badge && <span className="badge">{p.badge}</span>}
              </div>
              <p>{p.description}</p>
              <div className="price" style={{ margin: '16px 0 20px' }}>
                {formatPrice(yearly ? p.yearly : p.monthly)} <small>{yearly ? '/year' : '/month'}</small>
              </div>
              <button type="button" className={`pill block${p.badge ? '' : ' o'}`} style={{ marginTop: 'auto' }}
                onClick={() => openPaymentModal(yearly ? p.checkoutKey.yearly : p.checkoutKey.monthly)}>
                Get started
              </button>
            </div>
          ))}
          <div className="card">
            <h3>11+ branches</h3>
            <p>Custom pricing for larger groups.</p>
            <a className="pill o block" href={CONTACT_HREF} style={{ marginTop: 'auto' }}>Talk to us</a>
          </div>
        </div>
        <p style={{ marginTop: 20 }}><Link className="lm" href="/account">Existing customer? Log in to manage your plan ›</Link></p>
      </div>
    </>
  );
}

export function IncludedList() {
  return (
    <ul className="checks">
      {INCLUDED.map((i) => <li key={i}><Check /><span>{i}</span></li>)}
    </ul>
  );
}
