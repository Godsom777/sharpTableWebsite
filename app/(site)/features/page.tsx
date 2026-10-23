import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';

export const metadata: Metadata = {
  title: 'Features — SharpTable Restaurant Operating System',
  description: 'Fraud and void tracking, live kitchen display sync, WhatsApp ordering, multi-branch dashboards, and role-based staff access — everything SharpTable runs for you.',
};

const coreFeatures = [
  {
    title: 'Stop cancelled-bill theft',
    subtitle: 'Stop cashier slippage and unauthorised table cancellations.',
    description: 'Every cancelled bill, discount and voided table is recorded with who did it and when. Voids after printing need a manager’s PIN.',
    metric: '100% Traceable',
    highlights: [
      'Manager PIN or supervisor sign-off required for post-print voids',
      'Real-time alerts triggered when cancellation or discount thresholds are crossed',
      'Tamper-proof audit ledger with permanent timestamps and staff IDs',
      'Automatic shift reconciliation comparing kitchen prints against payments captured',
    ],
  },
  {
    title: 'Run the kitchen from your phone',
    subtitle: 'Keep floor staff, bartenders and the kitchen line in sync.',
    description: 'Mark dishes as sold out, change prices and send orders to the right kitchen screen instantly, from your phone.',
    metric: '< 2.5s Sync',
    highlights: [
      'Mark a dish sold out and it disappears from every menu instantly',
      'Color-coded kitchen ticket timers (green < 10m, yellow 10-15m, red > 20m)',
      'Smart split-routing: grill, hot line, pantry, and bar receive segregated orders',
      'Offline cache preserves kitchen sync during network hiccups',
    ],
  },
  {
    title: 'Take orders on WhatsApp and online',
    subtitle: 'Turn WhatsApp chats and QR scans into kitchen orders automatically.',
    description: 'Customers order and pay inside WhatsApp without downloading an app. Direct-to-kitchen routing with zero commissions.',
    metric: '0% Commission',
    highlights: [
      'Customers order and pay inside WhatsApp without downloading an app',
      'QR codes at each table load your live digital menu with photo highlights',
      'Zero delivery-app commission; keep 100% of your takeout and delivery margins',
      'Paystack integration for instant card, transfer, and USSD payments',
    ],
  },
  {
    title: 'See every branch on one screen',
    subtitle: 'Monitor revenue, orders, and shift performance across all locations.',
    description: 'Live overview of every branch’s sales, average ticket, and active tables from anywhere in the world on your smartphone.',
    metric: 'Real-time',
    highlights: [
      'Live overview of every branch’s sales, average ticket, and active tables',
      'Compare branch performance side by side in real time',
      'Switch between branch menus and pricing in seconds',
      'Centralized reporting and end-of-day reconciliation across venues',
    ],
  },
  {
    title: 'Role-based staff control',
    subtitle: 'Cashiers, waiters, managers, and accountants see only what they need.',
    description: 'Granular permissions prevent unauthorized discounts or pricing edits. Only business owners see revenue, payouts, and margins.',
    metric: 'Zero Spillover',
    highlights: [
      'Granular permissions prevent unauthorized discounts or pricing edits',
      'Shift clock-in and attendance tied to operator PINs',
      'Individual staff accountability stamped on every ticket and receipt',
      'Executive views reserve sensitive margins, payouts, and bank details for owners',
    ],
  },
  {
    title: 'Track stock down to every plate',
    subtitle: 'Deduct ingredients automatically as each dish is sold.',
    description: 'Recipe-level inventory deduction for precise ingredient control and automatic alerts before key items run dry.',
    metric: 'Gram-level',
    highlights: [
      'Recipe-level inventory deduction for precise ingredient control',
      'Automated low-stock and out-of-stock alerts sent to managers',
      'Prevent over-portioning and undetected kitchen leakage',
      'End-of-shift discrepancy reports comparing theoretical vs actual usage',
    ],
  },
];

const operatingLayers = [
  {
    layer: 'Layer 01',
    label: 'Front-Line Velocity',
    title: 'Instant touchscreens for servers, kitchen line & bar',
    lead: 'Speed up table turnarounds and eliminate order errors on busy shifts.',
    items: [
      'Split-second order entry from tables and counters',
      'KDS color-coded ticket timers for fast kitchen prep',
      'Table occupancy, guest transfer & floor map',
      'Multi-payer split billing by amount or items',
      'Direct WhatsApp order intake and verification',
      'Offline table buffering during local connectivity drops',
    ],
  },
  {
    layer: 'Layer 02',
    label: 'Management Control & Anti-Theft',
    title: 'Every anomaly, void & discount on permanent record',
    lead: 'No cancelled bills or comps without manager PIN authorization.',
    items: [
      'Mandatory manager authorization PIN on post-print voids',
      'Reason code logging on every discount and comp',
      'Recipe-level ingredient depletion as orders fire',
      'Cash drawer opening audits with timestamped operator ID',
      'Mid-shift drop reconciliations against till receipts',
      'Strict staff privilege segregation across floor roles',
    ],
  },
  {
    layer: 'Layer 03',
    label: 'System & Executive Intelligence',
    title: 'The operational truth of the shift, fully reconciled',
    lead: 'Consolidated financials across all your venues in one place.',
    items: [
      'Consolidated multi-branch P&L and sales velocity',
      'End-of-day bank settlement reconciliation',
      'Automated tax and service charge ledger',
      'Automated anomaly detection on cashier overrides',
      'Centralized menu pricing rollout across venues',
      'Live mobile dashboard with instant push notifications',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="st-home">
      {/* Navigation */}
      <HomeNav />

      <main>
        {/* Band 1: Hero */}
        <section className="hero" id="top">
          <div className="w">
            <h1>Built different.</h1>
            <p className="lead">
              Every feature exists because a real Nigerian restaurant needed it. Nothing theoretical. Nothing bloated.
            </p>
            <div className="cta">
              <Link className="btn" href="/pricing">Get started</Link>
              <Link className="lnk" href="/pricing">See pricing</Link>
            </div>
          </div>
        </section>

        {/* Band 2: The 6 Core Features */}
        <section className="alt" id="core-features">
          <div className="w">
            <h2>Everything the floor needs to run smoothly.</h2>
            <p className="lead">
              From the table to the kitchen to the till, every part of your hospitality operation is seamlessly connected.
            </p>

            <div className="feat-grid">
              {coreFeatures.map((feat) => (
                <div key={feat.title} className="feat-card">
                  <span className="feat-badge">{feat.metric}</span>
                  <h3>{feat.title}</h3>
                  <div className="sub">{feat.subtitle}</div>
                  <p className="desc">{feat.description}</p>
                  <ul>
                    {feat.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3: 3 Layers of Operational Truth */}
        <section id="operational-layers">
          <div className="w">
            <h2>Three layers of operational truth.</h2>
            <p className="lead">
              From front-line velocity to management oversight and executive multi-branch reconciliation.
            </p>

            <div className="layer-grid">
              {operatingLayers.map((layer) => (
                <div key={layer.layer} className="layer-card">
                  <span className="layer-num">{layer.layer} · {layer.label}</span>
                  <h3>{layer.title}</h3>
                  <p className="lead-line">{layer.lead}</p>
                  <ul>
                    {layer.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 4: Real-Time Intelligence & Analytics */}
        <section className="alt" id="analytics">
          <div className="w">
            <h2>Eradicate the guesswork.</h2>
            <p className="lead">
              SharpTable translates daily restaurant activity into irrefutable evidence: revenue surges, explicit voids, and cashier behavior isolated precisely by branch.
            </p>

            <div className="two" style={{ marginTop: '56px' }}>
              {/* Card 1: Revenue Velocity by Day */}
              <div className="card" style={{ padding: '36px 32px' }}>
                <span className="feat-badge">Weekly Rhythm</span>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px', color: 'var(--tx)' }}>
                  Revenue by Day
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--mu)', margin: '0 0 24px' }}>
                  Monitor daily performance meticulously to anticipate staffing and high-volume stock requisitions.
                </p>
                <div className="analytics-bars">
                  {[
                    { day: 'Mon', h: '38%', val: '₦380k' },
                    { day: 'Tue', h: '42%', val: '₦420k' },
                    { day: 'Wed', h: '32%', val: '₦320k' },
                    { day: 'Thu', h: '48%', val: '₦490k' },
                    { day: 'Fri', h: '88%', val: '₦890k' },
                    { day: 'Sat', h: '100%', val: '₦1.1m' },
                    { day: 'Sun', h: '94%', val: '₦960k' },
                  ].map((bar) => (
                    <div key={bar.day} className="analytics-col">
                      <i style={{ height: bar.h }} title={`${bar.day}: ${bar.val}`} />
                      <span>{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Live Stock & Anomaly Oversight */}
              <div className="card" style={{ padding: '36px 32px' }}>
                <span className="feat-badge">Audit &amp; Stock</span>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px', color: 'var(--tx)' }}>
                  Top Items &amp; Depletion
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--mu)', margin: '0 0 16px' }}>
                  Real-time ingredient usage tracked directly against kitchen tickets.
                </p>
                <div>
                  <div className="row" style={{ padding: '12px 0', borderTop: 'none' }}>
                    <b>Grilled Fish Platter</b>
                    <span>142 sold · Lekki</span>
                    <span className="amt">₦2.15m</span>
                  </div>
                  <div className="row" style={{ padding: '12px 0' }}>
                    <b>Jollof Rice Special</b>
                    <span>238 sold · V/Island</span>
                    <span className="amt">₦1.90m</span>
                  </div>
                  <div className="row" style={{ padding: '12px 0' }}>
                    <b>Chicken Shawarma</b>
                    <span>312 sold · All branches</span>
                    <span className="amt">₦1.25m</span>
                  </div>
                  <div className="row" style={{ padding: '12px 0' }}>
                    <b>Chapman / Cocktails</b>
                    <span>186 sold · Ikeja</span>
                    <span className="amt">₦650k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 5: Closing Call to Action & Manager App */}
        <section id="features-cta">
          <div className="w">
            <h2>Take absolute command of your floor.</h2>
            <p className="lead">
              Set up takes about 30 minutes. Your floor staff and customers don’t need complicated training.
            </p>
            <div className="cta">
              <Link className="btn" href="/pricing">Get started</Link>
              <a className="lnk" href="mailto:info@sharptable.com.ng">Talk to us</a>
            </div>
            <p className="fine">No setup fees · Cancel anytime</p>

            {/* SharpTable Manager App */}
            <div className="app-cta">
              <h3 style={{ fontSize: '28px', fontWeight: 600, margin: '0 auto 12px', letterSpacing: '-0.02em', color: 'var(--tx)' }}>
                SharpTable Manager
              </h3>
              <p className="lead" style={{ fontSize: '17px', margin: '0 auto 24px', maxWidth: '540px' }}>
                Floor oversight, live alerts, void approvals, and multi-venue stock tracking right from your pocket.
              </p>
              <div className="cta" style={{ gap: '16px' }}>
                <a
                  className="btn"
                  href="https://play.google.com/store/apps/details?id=com.godsom.sharptable.manager&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.638.225-1.226.609-1.636zm11.242 11.243l2.366 2.366-11.83 6.745 9.464-9.111zm0-2.114L5.387 1.832l11.83 6.745-2.366 2.366zm1.472 1.057l3.665 2.09c.895.511.895 1.346 0 1.857l-3.665 2.09-2.057-2.057 2.057-2.057z" />
                  </svg>
                  <span>Get it on Google Play</span>
                </a>
                <span style={{ fontSize: '15px', color: 'var(--mu)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--mu)' }}></span>
                  iOS version coming soon
                </span>
              </div>
              <div className="app-gallery">
                <img src="/assets/app/screenshot-1.png" alt="Locked to your branch" loading="lazy" />
                <img src="/assets/app/screenshot-2.png" alt="Missed alerts go to WhatsApp and SMS" loading="lazy" />
                <img src="/assets/app/screenshot-3.png" alt="Choose how you get alerted" loading="lazy" />
                <img src="/assets/app/screenshot-4.png" alt="Know before it runs out" loading="lazy" />
                <img src="/assets/app/screenshot-5.png" alt="Every change with who made it" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
