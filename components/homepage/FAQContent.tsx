'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'operations';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: 'Where does SharpTable work? Is it only for Nigeria?',
    answer: "SharpTable works globally - anywhere you have internet access. We built it for restaurants worldwide. While we started in Nigeria and have strong African roots, we're already serving restaurants in the UK, US, Australia, and across Europe. The QR codes work with any smartphone, the payment gate integrates with Paystack (which supports international cards), and the dashboard is accessible from any browser. Your customers can order from anywhere, and you can manage your restaurant from anywhere.",
  },
  {
    category: 'general',
    question: 'How is this different from a POS system like SambaPOS or Square?',
    answer: "SharpTable isn't trying to be a full POS system. We do one thing obsessively well: make sure you get paid before the kitchen starts. Traditional POS systems have inventory modules, employee timesheets, loyalty programs, table management, reservation systems - features most restaurants never use. SharpTable focuses on the payment gate, real-time order tracking, and the oversight tools you actually need. No training manuals. No certified installers. Just scan, pay, confirm, cook. If you need a bloated system with 100 features, we're not for you. If you want something that works in 30 seconds, you're in the right place.",
  },
  {
    category: 'operations',
    question: 'Do my customers need to download an app?',
    answer: "No. That's the point. Your customers scan a QR code at their table, the menu opens in their phone's browser, they order and pay - all without downloading anything. No 'Download our app' friction. No app store ratings to worry about. No updates to push. It just works. The only people who need accounts are you (the owner), your kitchen staff, and your marshals.",
  },
  {
    category: 'operations',
    question: "What happens if a customer orders but doesn't pay?",
    answer: "They can't. That's the whole system. The order doesn't reach your kitchen until payment is confirmed. Customers scan the QR code, browse the menu, add items to their cart, and when they hit 'Order' they're taken straight to Paystack to pay. Only after successful payment does the marshal see the order. Only after the marshal confirms it does the kitchen start cooking. No payment = no order. It's that simple. Walkouts become impossible.",
  },
  {
    category: 'operations',
    question: 'Can I trust the marshal role? What if they confirm fake orders?',
    answer: "Every action is logged in the audit trail - who confirmed what order, when, from which device. If a marshal confirms an order, it's tied to their account permanently. You'll see it in the daily summary, in the Intelligence dashboard, in the order history. The system is designed for accountability. Your marshal becomes your trust layer - they verify the order matches what the customer actually wants before it goes to the kitchen. If you have concerns about a specific marshal, you can review their entire history and remove their access instantly.",
  },
  {
    category: 'technical',
    question: 'What if the internet goes down?',
    answer: "SharpTable needs internet to work - it's a cloud system. If your internet goes down, customers can't place new orders through the QR codes. However, your marshal and kitchen dashboards will show all orders that were already confirmed before the outage, so your team can keep cooking. When internet returns, everything syncs automatically. This is the trade-off with cloud systems: you need connectivity, but you get real-time data, zero setup, automatic backups, and you can check your restaurant from anywhere in the world. Most modern restaurants already depend on internet for cards and mobile payments anyway.",
  },
  {
    category: 'technical',
    question: 'What payment methods do you support?',
    answer: "SharpTable uses Paystack as the payment processor. That means your customers can pay with Visa, Mastercard, Verve, American Express, bank transfers, and mobile money (where available). Paystack handles all the payment security, PCI compliance, and fraud detection. You get paid directly to your bank account on Paystack's settlement schedule (usually T+1 or T+2 business days, depending on your country). We don't touch your money - it goes straight from customer to Paystack to your bank.",
  },
  {
    category: 'pricing',
    question: 'What currency is billed, and how does subscription payment work?',
    answer: "All plans are billed in Nigerian Naira (NGN) via Paystack: Solo at ₦50,000/month (1 branch), Growth at ₦99,999/month (2 to 5 branches), and Group at ₦199,999/month (6 to 10 branches). Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing. International and diaspora cards are fully accepted by Paystack with seamless currency conversion. What you see is what you pay — no hidden fees or surprise markups.",
  },
  {
    category: 'pricing',
    question: 'Do you take a percentage of my sales?',
    answer: "No. Never. We charge a flat monthly or yearly subscription - that's it. Whether you make N1 million or N10 million a month, your SharpTable bill stays the same unless your branch count moves you to a bigger plan. We're not a payment processor (that's Paystack's job), we're a restaurant operations tool. You pay for the plan that fits your number of branches, and that's your only SharpTable cost. Paystack charges their standard payment processing fees, but SharpTable doesn't take a cut of your revenue.",
  },
  {
    category: 'pricing',
    question: 'Which plan do I pick?',
    answer: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.',
  },
  {
    category: 'pricing',
    question: 'What if I open another branch?',
    answer: 'Move up a plan whenever you need to.',
  },
  {
    category: 'technical',
    question: 'How long does setup take?',
    answer: "About 30 minutes. Seriously. Create your account, add your menu items (name, price, description, photo if you want), generate your QR codes, print them, and put them on tables. Your marshal and kitchen staff can log in from any device - they don't need to install anything. You can be live the same day you sign up. No hardware to buy. No installers to schedule. No training sessions. We've had restaurants go from signup to first paid order in under an hour.",
  },
  {
    category: 'operations',
    question: 'Can customers split bills or pay separately?',
    answer: "Yes. The split billing feature is built in. If multiple people at a table want to pay separately, they each scan the QR code, select the items they're paying for, and complete their own payment. Each payment creates a separate order entry, all linked to the same table. Your marshal sees all the orders from that table grouped together. This is especially useful for groups, corporate lunches, or any situation where people want individual receipts.",
  },
  {
    category: 'operations',
    question: 'What if I need to refund a customer?',
    answer: "Refunds are handled through Paystack's dashboard. Since SharpTable doesn't process payments directly, you'll log into your Paystack account, find the transaction, and issue the refund from there. Paystack gives you full control over refunds, partial refunds, and disputes. SharpTable's audit trail will show you the original order details, customer info, and payment reference, so you can quickly find the transaction in Paystack and process the refund.",
  },
  {
    category: 'technical',
    question: 'Do I need special hardware or tablets?',
    answer: "No. Your marshal can use any smartphone or tablet with a browser. Your kitchen can use any computer, tablet, or even a smartphone to view the Kitchen Display Screen (KDS). Your customers use their own phones. That's it. No expensive iPad POS terminals. No proprietary hardware. No vendor lock-in. If a device breaks, grab any other device, log in, and you're back in business. This is one reason SharpTable is so much cheaper than traditional POS systems - you're not buying hardware.",
  },
  {
    category: 'operations',
    question: 'Can I customize my menu items? Add photos? Mark items as sold out?',
    answer: "Yes. You have full control over your menu from the admin dashboard. Add items, set prices, upload photos (recommended but not required), write descriptions, categorize by food type (appetizers, mains, drinks, etc.). If something runs out, you can mark it as 'Sold Out' in real-time - customers won't see it on the menu until you turn it back on. For Enterprise users, you can set different menus or prices per branch if needed.",
  },
  {
    category: 'pricing',
    question: 'Can I cancel anytime? Is there a contract?',
    answer: "You can cancel anytime, no questions asked, no penalties. Monthly plans are month-to-month. Yearly plans are paid upfront but give you significant savings (22-35% off). If you cancel a yearly plan mid-year, you won't get a refund for unused months - but there's no auto-renewal trap, no cancellation fees, no 'call us to cancel' runaround. Just cancel from your account settings and you're done. Your subscription runs until the end of your paid period, then stops.",
  },
  {
    category: 'technical',
    question: 'Is my data safe? What about customer payment info?',
    answer: "Your data is stored securely on Supabase (a modern cloud database with enterprise-grade security). All connections are encrypted with HTTPS. Customer payment information never touches our servers - it goes directly to Paystack, which is PCI-DSS Level 1 certified (the highest security standard for payment processors). We see order details, not card numbers. Your restaurant data is backed up continuously. You can export your data anytime. We'll never sell your data or customer information to third parties.",
  },
  {
    category: 'operations',
    question: 'What if customers have questions or need help while ordering?',
    answer: "Your menu can include a 'Message to Kitchen' feature where customers can add special requests or notes ('no onions,' 'extra spicy,' etc.). For general questions, we recommend adding a support contact number or WhatsApp link to your QR code setup. On Enterprise, that can be your ordering WhatsApp flow. The beauty of SharpTable is it reduces order-taking work for your staff - but they're still there to help customers who need assistance. Older customers or anyone uncomfortable with tech can still order through your waitstaff the traditional way; SharpTable is an option, not a replacement.",
  },
  {
    category: 'general',
    question: "I'm skeptical. Why should I change what already works?",
    answer: "Fair question. If your current system genuinely has zero revenue leakage, perfect staff accountability, complete order history, real-time inventory visibility, and you never wonder where money went - then you probably don't need SharpTable. But most owners think things are fine until they see the first audit report. The average restaurant loses 5-12% of revenue to walkouts, untracked orders, cash discrepancies, and theft. That's $2,000-$6,000 per month on a $50,000 revenue restaurant. SharpTable recovers most of that. Try the ROI calculator on the pricing page - plug in your real numbers. If the math doesn't make sense, don't buy it. If it does, you'll wish you'd started sooner.",
  },
];

const categoryLabels: Record<string, string> = {
  general: 'General',
  pricing: 'Pricing & Plans',
  technical: 'Technical & Setup',
  operations: 'Operations & Floor',
};

export const FAQContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'pricing' | 'technical' | 'operations'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main>
      {/* Band 1: Hero & Search */}
      <section className="hero" id="top">
        <div className="w">
          <h1>Questions? Sorted.</h1>
          <p className="lead">
            We know you have questions before you commit. Here is everything — straight, no fluff.
          </p>

          {/* Quick Search */}
          <div className="faq-search-wrap">
            <span className="faq-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search questions or keywords"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="faq-filter-wrap">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General' },
              { id: 'pricing', label: 'Pricing & Plans' },
              { id: 'technical', label: 'Technical' },
              { id: 'operations', label: 'Operations' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id as any)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Band 2: FAQ Accordions */}
      <section className="alt" id="faq-list">
        <div className="w">
          <div className="faq-list">
            {filteredFaqs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--mu)' }}>
                <p style={{ fontSize: '19px', margin: '0 0 8px', color: 'var(--tx)' }}>No matching questions found.</p>
                <p style={{ fontSize: '15px', margin: 0 }}>Try adjusting your search terms or selecting another category.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndices.includes(idx);
                return (
                  <div key={faq.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-q"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="faq-tag">{categoryLabels[faq.category]}</span>
                        <h3>{faq.question}</h3>
                      </div>
                      <svg
                        className="faq-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="faq-a">
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Band 3: Still have questions / Contact CTA */}
      <section id="contact-cta">
        <div className="w">
          <h2>Still not sure? Let’s talk.</h2>
          <p className="lead">
            We are real people who actually build and run this software. We know restaurants because we built this for ourselves first.
          </p>
          <div className="cta">
            <a className="btn" href="mailto:info@sharptable.com.ng">Get in touch</a>
            <Link className="lnk" href="/pricing">See pricing plans</Link>
          </div>
          <p className="fine" style={{ marginTop: '28px' }}>
            Prefer email? Reach us directly at <a href="mailto:info@sharptable.com.ng" style={{ color: 'var(--lk)', textDecoration: 'none' }}>info@sharptable.com.ng</a>
          </p>
        </div>
      </section>
    </main>
  );
};
