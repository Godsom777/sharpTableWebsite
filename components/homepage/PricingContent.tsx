'use client';

import React, { useState, useMemo } from 'react';
import { usePayment, PlanType, BillingCycle } from '@/contexts/PaymentContext';

/* ── Price helpers ── */
const GROWTH_BADGE = 'Best value';
const CONTACT_HREF = 'mailto:info@sharptable.com.ng';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

/* ── Plan data ── */
const PLANS: {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  badge: string;
  checkoutKey: { monthly: PlanType; yearly: PlanType };
}[] = [
  { name: 'Solo', description: 'For one branch.', monthly: 50_000, yearly: 500_000, badge: '', checkoutKey: { monthly: 'lite', yearly: 'lite-yearly' } },
  { name: 'Growth', description: 'For 2 to 5 branches.', monthly: 99_999, yearly: 999_990, badge: GROWTH_BADGE, checkoutKey: { monthly: 'pro', yearly: 'pro-yearly' } },
  { name: 'Group', description: 'For 6 to 10 branches.', monthly: 199_999, yearly: 1_999_990, badge: '', checkoutKey: { monthly: 'enterprise', yearly: 'enterprise-yearly' } },
];

const INCLUDED = [
  'QR ordering and digital menus',
  'Live kitchen display',
  'Admin app: sales, voids and discounts across every branch, with alerts',
  'Audit log: every void, discount and price edit, with staff name, table and time',
  'WhatsApp ordering, paid orders straight to the kitchen',
  'Staff roles and permissions',
  'Inventory and low-stock alerts',
  'Table payments and split bills',
];

/* ── FAQ data ── */
interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'operations';
}

const faqs: FAQItem[] = [
  { category: 'general', question: 'Where does SharpTable work? Is it only for Nigeria?', answer: "SharpTable works globally — anywhere you have internet access. We built it for restaurants worldwide. While we started in Nigeria and have strong African roots, we're already serving restaurants in the UK, US, Australia, and across Europe. The QR codes work with any smartphone, the payment gate integrates with Paystack (which supports international cards), and the dashboard is accessible from any browser." },
  { category: 'general', question: 'How is this different from a POS system like SambaPOS or Square?', answer: "SharpTable isn't trying to be a full POS system. We do one thing obsessively well: make sure you get paid before the kitchen starts. Traditional POS systems have inventory modules, employee timesheets, loyalty programs, table management, reservation systems — features most restaurants never use. SharpTable focuses on the payment gate, real-time order tracking, and the oversight tools you actually need." },
  { category: 'operations', question: 'Do my customers need to download an app?', answer: "No. That's the point. Your customers scan a QR code at their table, the menu opens in their phone's browser, they order and pay — all without downloading anything. No 'Download our app' friction. No app store ratings to worry about. It just works." },
  { category: 'operations', question: "What happens if a customer orders but doesn't pay?", answer: "They can't. That's the whole system. The order doesn't reach your kitchen until payment is confirmed. Customers scan the QR code, browse the menu, add items to their cart, and when they hit 'Order' they're taken straight to Paystack to pay. Only after successful payment does the marshal see the order. No payment = no order." },
  { category: 'operations', question: 'Can I trust the marshal role? What if they confirm fake orders?', answer: "Every action is logged in the audit trail — who confirmed what order, when, from which device. If a marshal confirms an order, it's tied to their account permanently. You'll see it in the daily summary, in the Intelligence dashboard, in the order history. The system is designed for accountability." },
  { category: 'technical', question: 'What if the internet goes down?', answer: "SharpTable needs internet to work — it's a cloud system. If your internet goes down, customers can't place new orders through the QR codes. However, your marshal and kitchen dashboards will show all orders that were already confirmed before the outage, so your team can keep cooking. When internet returns, everything syncs automatically." },
  { category: 'technical', question: 'What payment methods do you support?', answer: "SharpTable uses Paystack as the payment processor. That means your customers can pay with Visa, Mastercard, Verve, American Express, bank transfers, and mobile money (where available). Paystack handles all the payment security, PCI compliance, and fraud detection. We don't touch your money — it goes straight from customer to Paystack to your bank." },
  { category: 'pricing', question: 'What currency is billed, and how does subscription payment work?', answer: "All plans are billed in Nigerian Naira (NGN) via Paystack: Solo at ₦50,000/month, Growth at ₦99,999/month, and Group at ₦199,999/month. Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing. International and diaspora cards are fully accepted by Paystack." },
  { category: 'pricing', question: 'Do you take a percentage of my sales?', answer: "No. Never. We charge a flat monthly or yearly subscription — that's it. Whether you make ₦1 million or ₦10 million a month, your SharpTable bill stays the same unless your branch count moves you to a bigger plan. Paystack charges their standard processing fees, but SharpTable doesn't take a cut of your revenue." },
  { category: 'pricing', question: 'Which plan do I pick?', answer: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.' },
  { category: 'pricing', question: 'What if I open another branch?', answer: 'Move up a plan whenever you need to.' },
  { category: 'technical', question: 'How long does setup take?', answer: "About 30 minutes. Create your account, add your menu items, generate your QR codes, print them, and put them on tables. Your marshal and kitchen staff can log in from any device — they don't need to install anything. You can be live the same day you sign up." },
  { category: 'operations', question: 'Can customers split bills or pay separately?', answer: "Yes. The split billing feature is built in. If multiple people at a table want to pay separately, they each scan the QR code, select the items they're paying for, and complete their own payment. Each payment creates a separate order entry, all linked to the same table." },
  { category: 'operations', question: 'What if I need to refund a customer?', answer: "Refunds are handled through Paystack's dashboard. Since SharpTable doesn't process payments directly, you'll log into your Paystack account, find the transaction, and issue the refund from there. SharpTable's audit trail will show you the original order details so you can quickly find the transaction." },
  { category: 'technical', question: 'Do I need special hardware or tablets?', answer: "No. Your marshal can use any smartphone or tablet with a browser. Your kitchen can use any computer, tablet, or even a smartphone to view the Kitchen Display Screen (KDS). Your customers use their own phones. No expensive iPad POS terminals. No proprietary hardware." },
  { category: 'pricing', question: 'Can I cancel anytime? Is there a contract?', answer: "You can cancel anytime, no questions asked, no penalties. Monthly plans are month-to-month. Yearly plans are paid upfront but give you significant savings. If you cancel a yearly plan mid-year, you won't get a refund for unused months — but there's no auto-renewal trap. Just cancel from your account settings." },
  { category: 'technical', question: 'Is my data safe? What about customer payment info?', answer: "Your data is stored securely on Supabase (a modern cloud database with enterprise-grade security). All connections are encrypted with HTTPS. Customer payment information never touches our servers — it goes directly to Paystack, which is PCI-DSS Level 1 certified. We see order details, not card numbers." },
  { category: 'general', question: "I'm skeptical. Why should I change what already works?", answer: "Fair question. If your current system genuinely has zero revenue leakage, perfect staff accountability, and complete order history — then you probably don't need SharpTable. But most owners think things are fine until they see the first audit report. The average restaurant loses 5-12% of revenue to walkouts, untracked orders, and cash discrepancies. SharpTable recovers most of that." },
];

const CATEGORIES = [
  { id: 'all' as const, label: 'All Questions' },
  { id: 'general' as const, label: 'General' },
  { id: 'pricing' as const, label: 'Pricing & Plans' },
  { id: 'technical' as const, label: 'Technical' },
  { id: 'operations' as const, label: 'Operations' },
];

/* ── ROI logic ── */
function useROI(monthlyRevenue: number, estimatedLeakage: number) {
  return useMemo(() => {
    const annualRevenue = monthlyRevenue * 12;
    const currentLeakage = (annualRevenue * estimatedLeakage) / 100;
    const recoveredWithSharpTable = currentLeakage * 0.90;
    const annualCost = 199999 * 12;
    const netSavings = recoveredWithSharpTable - annualCost;
    const roi = ((netSavings / annualCost) * 100).toFixed(0);
    return { annualRevenue, currentLeakage, recoveredWithSharpTable, annualCost, netSavings, roi: Number(roi) > 0 ? roi : '0' };
  }, [monthlyRevenue, estimatedLeakage]);
}

/* ── Accordion Item ── */
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--ln)', padding: '20px 0', textAlign: 'left' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px',
          fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--tx)', lineHeight: 1.3 }}>{question}</span>
        <span style={{ fontSize: '20px', color: 'var(--mu)', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <p style={{ margin: '12px 0 0', fontSize: '17px', color: 'var(--mu)', lineHeight: 1.5 }}>{answer}</p>
      )}
    </div>
  );
}

/* ── Main Content ── */
export const PricingContent: React.FC = () => {
  const { openPaymentModal } = usePayment();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const yearly = billingCycle === 'yearly';

  const [monthlyRevenue, setMonthlyRevenue] = useState(25_000_000);
  const [estimatedLeakage, setEstimatedLeakage] = useState(10);
  const calculations = useROI(monthlyRevenue, estimatedLeakage);

  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'pricing' | 'technical' | 'operations'>('all');
  const filteredFaqs = activeCategory === 'all' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* ── BAND 1 (white): Hero ── */}
      <section className="hero">
        <div className="w">
          <h1>Simple, honest pricing</h1>
          <p className="lead">No commission on orders. No setup fees. Pick the plan that fits your number of branches.</p>
        </div>
      </section>

      {/* ── BAND 2 (alt): Pricing Tiers ── */}
      <section className="alt" id="pricing">
        <div className="w">
          {/* Billing toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <div role="group" aria-label="Billing period" style={{
              display: 'inline-flex', background: 'var(--bg)', border: '1px solid var(--ln)',
              borderRadius: '980px', padding: '4px', gap: '4px',
            }}>
              <button
                type="button"
                aria-pressed={!yearly}
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 20px', borderRadius: '980px', fontSize: '15px', fontWeight: 600,
                  cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.2s',
                  background: !yearly ? 'var(--bl)' : 'transparent',
                  color: !yearly ? '#fff' : 'var(--mu)',
                }}
              >Monthly</button>
              <button
                type="button"
                aria-pressed={yearly}
                onClick={() => setBillingCycle('yearly')}
                style={{
                  padding: '8px 20px', borderRadius: '980px', fontSize: '15px', fontWeight: 600,
                  cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: yearly ? 'var(--bl)' : 'transparent',
                  color: yearly ? '#fff' : 'var(--mu)',
                }}
              >
                Yearly
                <span style={{
                  background: yearly ? 'rgba(255,255,255,0.25)' : 'var(--bg2)',
                  color: yearly ? '#fff' : 'var(--ok)',
                  padding: '2px 10px', borderRadius: '980px', fontSize: '12px', fontWeight: 700,
                }}>2 months free</span>
              </button>
            </div>
          </div>

          {/* Existing customer link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <a
              href="/account"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', fontWeight: 600, color: 'var(--lk)', textDecoration: 'none',
              }}
            >
              🔒 Existing customer? Log in to manage your plan
            </a>
          </div>

          {/* Tier cards */}
          <div className="two" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 0 }}>
            {PLANS.map((plan) => {
              const highlighted = Boolean(plan.badge);
              return (
                <div key={plan.name} className="tier" style={highlighted ? { borderColor: 'var(--bl)', borderWidth: '2px' } : {}}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '24px' }}>{plan.name}</h3>
                    {plan.badge && (
                      <span style={{
                        background: 'var(--bg2)', color: 'var(--lk)', fontSize: '12px',
                        fontWeight: 700, borderRadius: '980px', padding: '4px 12px',
                      }}>{plan.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, margin: '8px 0' }}>
                    {formatPrice(yearly ? plan.yearly : plan.monthly)}
                    <span style={{ fontSize: '17px', fontWeight: 400, color: 'var(--mu)', marginLeft: '6px' }}>{yearly ? '/year' : '/month'}</span>
                  </div>
                  <p className="p">{plan.description}</p>
                  <ul>
                    {INCLUDED.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => openPaymentModal(yearly ? plan.checkoutKey.yearly : plan.checkoutKey.monthly)}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    Get started
                  </button>
                </div>
              );
            })}

            {/* 11+ branches */}
            <div className="tier">
              <h3 style={{ margin: '0 0 4px', fontSize: '24px' }}>11+ branches</h3>
              <p className="p">Custom pricing for larger groups.</p>
              <ul style={{ flex: 1 }}>
                <li>Dedicated account manager</li>
                <li>Volume-based discounts</li>
                <li>Priority onboarding</li>
              </ul>
              <a href={CONTACT_HREF} className="lnk" style={{ fontSize: '17px' }}>Talk to us</a>
            </div>
          </div>

          {/* Hotels */}
          <div className="card" style={{ marginTop: '32px', padding: '36px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Hotels</h3>
              <p style={{ fontWeight: 600, margin: '0 0 8px', fontSize: '19px' }}>₦3,000 per room per month, minimum ₦75,000.</p>
              <p style={{ margin: '0 0 4px', color: 'var(--mu)' }}>Your restaurant, bar and other on-property outlets are included, plus the hotel tools.</p>
              <p style={{ margin: 0, color: 'var(--mu)', fontSize: '15px' }}>Example: 40 rooms = ₦120,000/month.</p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <a href={CONTACT_HREF} className="lnk">Get a quote</a>
            </div>
          </div>

          <p className="fine" style={{ textAlign: 'center', marginTop: '32px' }}>
            No commission on orders. No setup fees. Cancel anytime. All prices in naira.
          </p>
        </div>
      </section>

      {/* ── BAND 3 (white): ROI Calculator ── */}
      <section>
        <div className="w">
          <h2>Unmask your margin leakage</h2>
          <p className="lead">Fraud, unregulated voids, and unaccounted tickets devour enterprise revenue silently. See exactly what you recover when the gate is locked.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginTop: '56px', textAlign: 'left' }}>
            {/* Input panel */}
            <div className="card" style={{ padding: '36px 32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 32px', letterSpacing: '-0.02em' }}>Operational Parameters</h3>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--mu)', fontSize: '15px' }}>Aggregated Monthly Revenue</span>
                  <span style={{ fontWeight: 600, fontSize: '17px' }}>{formatCurrency(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="250000000"
                  step="1000000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--bl)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--mu)', marginTop: '8px' }}>
                  <span>₦5M</span>
                  <span>₦250M</span>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--mu)', fontSize: '15px' }}>Estimated Leakage (Theft, Comps, Voids)</span>
                  <span style={{ fontWeight: 600, fontSize: '17px' }}>{estimatedLeakage}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={estimatedLeakage}
                  onChange={(e) => setEstimatedLeakage(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--bl)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--mu)', marginTop: '8px' }}>
                  <span>3% (Optimistic)</span>
                  <span>20% (Critical)</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg2)', borderRadius: '20px', padding: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--mu)', margin: '0 0 8px' }}>Projected Capital Hemorrhage</p>
                <p style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, margin: 0 }}>
                  {formatCurrency(calculations.currentLeakage)}<span style={{ fontSize: '17px', fontWeight: 400, color: 'var(--mu)' }}>/year</span>
                </p>
              </div>
            </div>

            {/* Results panel */}
            <div className="card" style={{ padding: '36px 32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 32px', letterSpacing: '-0.02em' }}>Executive Recovery Strategy</h3>

              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
                <div className="row">
                  <b style={{ flex: '1 1 180px' }}>Strict Target Recovery (90%)</b>
                  <span className="amt">{formatCurrency(calculations.recoveredWithSharpTable)}</span>
                </div>
                <div className="row">
                  <b style={{ flex: '1 1 180px' }}>Technology Allocation (Group Plan)</b>
                  <span className="amt" style={{ color: 'var(--mu)' }}>−{formatCurrency(calculations.annualCost)}</span>
                </div>
                <div className="row" style={{ background: 'var(--bg2)', borderRadius: '0 0 16px 16px' }}>
                  <b style={{ flex: '1 1 180px' }}>Net Capital Preserved</b>
                  <span className="amt" style={{ fontSize: '24px' }}>{formatCurrency(calculations.netSavings)}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', background: 'var(--bg2)', borderRadius: '20px', padding: '32px', margin: '32px 0' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--mu)', margin: '0 0 8px' }}>Projected ROI</p>
                <p style={{ fontSize: 'clamp(56px, 12vw, 80px)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1, margin: 0 }}>{calculations.roi}%</p>
                <p style={{ fontSize: '13px', color: 'var(--mu)', margin: '12px 0 0', lineHeight: 1.4 }}>
                  * Based on your inputs — actual results depend on your operation and policy enforcement.
                </p>
              </div>

              <a
                href={CONTACT_HREF}
                className="btn"
                style={{ display: 'block', width: '100%', textAlign: 'center' }}
              >
                Seal the leakage today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BAND 4 (alt): FAQ ── */}
      <section className="alt">
        <div className="w" style={{ maxWidth: '780px' }}>
          <h2>Questions? We've got answers.</h2>
          <p className="lead">
            Everything you need to know about SharpTable. Still have questions? Email us at{' '}
            <a href={CONTACT_HREF} className="lnk" style={{ fontSize: 'inherit' }}>info@sharptable.com.ng</a>
          </p>

          {/* Category filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', margin: '0 0 48px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 16px', borderRadius: '980px', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  border: '1px solid var(--ln)',
                  background: activeCategory === cat.id ? 'var(--bl)' : 'var(--bg)',
                  color: activeCategory === cat.id ? '#fff' : 'var(--mu)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div>
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={`${activeCategory}-${i}`} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Contact CTA */}
          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Still not sure? Let&apos;s talk.</h3>
            <p style={{ color: 'var(--mu)', margin: '0 0 24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
              We&apos;re real people who actually use this software. We know restaurants because we built this for ourselves first.
            </p>
            <a href={CONTACT_HREF} className="btn">Get in touch</a>
          </div>
        </div>
      </section>

      {/* ── BAND 5 (white): Closing CTA ── */}
      <section>
        <div className="w">
          <h2>Ready to lock your revenue?</h2>
          <p className="lead">Get started in under 30 minutes. No hardware needed. Cancel anytime.</p>
          <div className="cta">
            <a href="#pricing" className="btn">See plans</a>
            <a href={CONTACT_HREF} className="lnk">Talk to sales</a>
          </div>
        </div>
      </section>
    </>
  );
};
