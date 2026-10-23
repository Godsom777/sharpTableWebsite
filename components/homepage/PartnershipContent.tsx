'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Secure your partner link in under two minutes without waiting periods or hidden qualification checks.',
  },
  {
    num: '02',
    title: 'Get Your Link',
    desc: 'Acquire your traceable link with permanent attribution locked to your verified bank payout details.',
  },
  {
    num: '03',
    title: 'They Subscribe',
    desc: 'When restaurants and hotels subscribe through your link, the billing system credits your partner ledger immediately.',
  },
  {
    num: '04',
    title: 'You Get Paid',
    desc: 'Earn 50% upfront and 20% recurring monthly income deposited directly to your bank account.',
  },
];

const projections = [
  { plan: 'Solo · Monthly', price: '₦50,000/mo', upfront: '₦25,000', recurring: '₦10,000 × 6', total: '₦85,000' },
  { plan: 'Growth · Monthly', price: '₦99,999/mo', upfront: '₦50,000', recurring: '₦20,000 × 6', total: '₦170,000' },
  { plan: 'Group · Monthly', price: '₦199,999/mo', upfront: '₦100,000', recurring: '₦40,000 × 6', total: '₦340,000' },
  { plan: 'Group · Yearly', price: '₦1,999,990/yr', upfront: '₦600,000', recurring: 'Flat payout', total: '₦600,000' },
];

const faqs = [
  {
    q: 'How much can I earn?',
    a: 'There is no ceiling. Referring just 10 Group Monthly clients earns you ₦3,400,000 over 6 months.',
  },
  {
    q: 'How do yearly plans work?',
    a: 'Yearly subscriptions trigger an immediate 30% flat commission with zero waiting. One Group Yearly referral pays out approximately ₦600,000 instantly.',
  },
  {
    q: 'What is the payout schedule?',
    a: 'Funds clear and are transferred directly to your bank account within 7 business days following every successful client charge.',
  },
  {
    q: 'How do I track my earnings and conversions?',
    a: 'Your unique partner link accurately tracks clicks and activated subscriptions tied to your account.',
  },
  {
    q: 'Are there minimum thresholds to get paid?',
    a: 'No minimums whatsoever. You earn and get paid immediately upon your client’s first payment.',
  },
  {
    q: 'Do I need technical skills to be a partner?',
    a: 'Not at all. You only need relationships with restaurant owners, managers, hoteliers, or hospitality groups.',
  },
  {
    q: 'What if a referred restaurant cancels?',
    a: 'You keep all upfront commissions already earned. There are no clawbacks or penalties on your past payments.',
  },
];

export const PartnershipContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      {/* Band 1: Hero */}
      <section className="hero" id="top">
        <div className="w">
          <h1>Earn with SharpTable.</h1>
          <p className="lead">
            Refer restaurants and hotels. Earn 50% upfront and 20% recurring for 6 months on every subscription. No caps. No catches.
          </p>
          <div className="cta">
            <Link className="btn" href="/partnership/apply">Apply to program</Link>
            <Link className="lnk" href="/pricing">See pricing plans</Link>
          </div>
        </div>
      </section>

      {/* Band 2: The 4 Steps */}
      <section className="alt" id="how-it-works">
        <div className="w">
          <h2>Four steps to recurring revenue.</h2>
          <p className="lead">
            Expand your hospitality network and capitalize on the operational gap.
          </p>

          <div className="grid">
            {steps.map((s) => (
              <div key={s.num} className="tile">
                <div style={{ fontSize: '48px', fontWeight: 600, color: 'var(--lk)', marginBottom: '40px', letterSpacing: '-0.03em' }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 12px', color: 'var(--tx)', letterSpacing: '-0.02em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.5, color: 'var(--mu)', margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 3: The Returns & Projections Table */}
      <section id="returns">
        <div className="w">
          <h2>The returns.</h2>
          <p className="lead">
            Generous upfront capital and compounding recurring revenue on every venue you introduce.
          </p>

          {/* 2 Big Stat Cards */}
          <div className="two" style={{ marginTop: '56px' }}>
            <div className="card" style={{ padding: '48px 36px', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(56px, 10vw, 84px)', fontWeight: 600, color: 'var(--tx)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '16px' }}>
                50%
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 8px', color: 'var(--tx)' }}>
                Upfront Capital
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--mu)', lineHeight: 1.5, margin: 0 }}>
                On monthly plans, earn 50% of the customer’s first month payment immediately upon activation.
              </p>
            </div>

            <div className="card" style={{ padding: '48px 36px', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(56px, 10vw, 84px)', fontWeight: 600, color: 'var(--tx)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '16px' }}>
                20%
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 8px', color: 'var(--tx)' }}>
                Recurring Royalty
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--mu)', lineHeight: 1.5, margin: 0 }}>
                20% recurring monthly income for 6 consecutive months. Yearly plans pay an immediate 30% flat upfront.
              </p>
            </div>
          </div>

          {/* Revenue Projections Table */}
          <div className="table-card">
            <div style={{ padding: '20px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--ln)', fontWeight: 600, fontSize: '17px', color: 'var(--tx)' }}>
              Revenue Projections per Referral
            </div>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Plan</th>
                  <th style={{ textAlign: 'right' }}>Client Price</th>
                  <th style={{ textAlign: 'right' }}>Upfront</th>
                  <th style={{ textAlign: 'right' }}>Recurring</th>
                  <th style={{ textAlign: 'right' }}>Total Return</th>
                </tr>
              </thead>
              <tbody>
                {projections.map((p) => (
                  <tr key={p.plan}>
                    <td style={{ fontWeight: 600, textAlign: 'left' }}>{p.plan}</td>
                    <td style={{ textAlign: 'right', color: 'var(--mu)' }}>{p.price}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{p.upfront}</td>
                    <td style={{ textAlign: 'right', color: 'var(--mu)' }}>{p.recurring}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--ok)' }}>{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Band 4: Program FAQs */}
      <section className="alt" id="faq">
        <div className="w">
          <h2>Program questions.</h2>
          <p className="lead">
            Everything you need to know about payouts, referrals, and tracking.
          </p>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <h3>{faq.q}</h3>
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
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Band 5: Final CTA */}
      <section id="partnership-cta">
        <div className="w">
          <h2>Start earning today.</h2>
          <p className="lead">
            The registration process takes two minutes. Secure restaurant and hotel referrals and lock in your earnings.
          </p>
          <div className="cta">
            <Link className="btn" href="/partnership/apply">Apply to program</Link>
            <a className="lnk" href="mailto:info@sharptable.com.ng">Talk to partnership team</a>
          </div>
          <p className="fine" style={{ marginTop: '28px' }}>
            Questions? Contact our team at <a href="mailto:info@sharptable.com.ng" style={{ color: 'var(--lk)', textDecoration: 'none' }}>info@sharptable.com.ng</a>
          </p>
        </div>
      </section>
    </main>
  );
};
