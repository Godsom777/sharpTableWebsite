import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';

export const metadata: Metadata = {
  title: 'SharpTable for Hotels — Revenue Control & Operations Layer',
  description: 'A unified operations layer for Nigerian hotels: room ledgers, outlet charge capture, housekeeping, EOD reconciliation, and staff accountability in one system.',
};

const heroStats = [
  { label: 'Revenue capture', value: 'Unified' },
  { label: 'Guest ledgers', value: 'Live' },
  { label: 'Day-end close', value: 'Auditable' },
];

const heroWorkflows = [
  {
    num: '1',
    title: 'Capture outlet revenue before it leaks',
    body: 'Restaurant, bar, poolside, room service, laundry, minibar, and spa charges post into the guest ledger with outlet, item, staff, and timestamp records.',
  },
  {
    num: '2',
    title: 'Reduce checkout arguments',
    body: 'Front desk can show exactly what was charged, where it came from, who posted it, and which folio should carry it.',
  },
  {
    num: '3',
    title: 'Give the GM a day-end truth file',
    body: 'EOD captures revenue, collections, balances, outlet charges, housekeeping readiness, voids, discounts, overrides, and control flags.',
  },
];

const operatingLayers = [
  {
    layer: 'Layer 01',
    label: 'Daily Operations',
    title: 'Fast screens for front-line staff',
    lead: 'Quick actions for check-in, housekeeping, room charges, and guest requests.',
    items: ['Check-in & checkout velocity', 'Room service & minibar posting', 'Housekeeping room readiness flow', 'Guest request dispatch', 'Split billing & folio moves', 'Offline buffer during wifi drops'],
  },
  {
    layer: 'Layer 02',
    label: 'Management Control',
    title: 'Approvals and exceptions stay visible',
    lead: 'Voids, discounts, and overrides require supervisor authorization.',
    items: ['Post-print void approvals', 'Room rate & upgrade overrides', 'Charge dispute resolutions', 'Re-issuance audit records', 'Cash drawer opening logs', 'Staff activity timestamps'],
  },
  {
    layer: 'Layer 03',
    label: 'System Intelligence',
    title: 'The truth of the day, reconciled',
    lead: 'Auditable day-end financial closure across all hotel revenue outlets.',
    items: ['Automated EOD closure files', 'Revenue & RevPAR trends', 'Occupancy & room turn analysis', 'Leakage & anomaly detection', 'Daily tax summary reports', 'Instant audit exports for owners'],
  },
];

const roleCards = [
  {
    role: 'Housekeeping',
    badge: 'Mobile-first',
    title: 'Room Readiness & Inspection',
    body: 'Mobile room lists, dirty-to-cleaning-to-inspected status flow, maintenance flags, and supervisor-only ready clearance before guest check-in.',
  },
  {
    role: 'Restaurant & Bar Staff',
    badge: 'POS-Optimized',
    title: 'Outlet Charge Capture',
    body: 'POS-optimized active orders, kitchen sync, split payments, and direct charge-to-room verification before any posting touches the folio.',
  },
  {
    role: 'Hotel General Manager',
    badge: 'Executive Oversight',
    title: 'Command Center & Control',
    body: 'Three focused views: today’s operations overview, risk/void control, and end-of-day financial closeouts, with drill-down only when needed.',
  },
];

const trustControls = [
  {
    title: 'Approval-backed exceptions',
    body: 'Voids, discounts, rate overrides, charge moves, and dispute resolutions carry permanent reason logs and manager visibility.',
  },
  {
    title: 'Offline-safe operations',
    body: 'Room status updates, outlet charges, payments, and guest requests queue locally and sync smoothly when connectivity returns.',
  },
  {
    title: 'Audit-ready exports',
    body: 'Daily closure, tax summary, staff activity, room readiness, and outlet charge logs can be viewed, printed, or exported at any time.',
  },
  {
    title: 'Live folio control',
    body: 'Room rates, restaurant charges, adjustments, payments, and split folios stay tightly tied to one unified stay record.',
  },
];

export default function ForHotelsPage() {
  return (
    <div className="st-home">
      {/* Navigation */}
      <HomeNav />

      <main>
        {/* Band 1: Hero */}
        <section className="hero" id="top">
          <div className="w">
            <h1>A unified operating layer for profitable hotel management.</h1>
            <p className="lead">
              SharpTable brings room ledgers, outlet postings, housekeeping, approvals, reporting, and day-end close into one clear workflow, helping hotel teams protect revenue while running daily operations with confidence.
            </p>
            <div className="cta">
              <Link className="btn" href="/pricing">See pricing</Link>
              <a className="lnk" href="mailto:info@sharptable.com.ng">Talk to sales</a>
            </div>

            {/* Overview Visual Card */}
            <div className="card" style={{ maxWidth: '780px', margin: '56px auto 0', padding: '36px 32px' }}>
              <div className="tb" style={{ padding: '0 0 20px', borderBottom: '1px solid var(--ln)' }}>
                <span className="dots"><i></i><i></i><i></i></span>
                Today at a glance: hotel operations
                <em>● Live</em>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}>
                {heroStats.map((stat) => (
                  <div key={stat.label} style={{ background: 'var(--bg2)', padding: '16px 20px', borderRadius: '16px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--mu)', display: 'block', marginBottom: '4px' }}>{stat.label}</span>
                    <strong style={{ fontSize: '20px', fontWeight: 600, color: 'var(--tx)' }}>{stat.value}</strong>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg2)', borderRadius: '18px', padding: '20px 24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--ok)', fontWeight: 600, fontSize: '14px' }}>
                  <span>●</span> Operations Command Center
                </div>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--mu)', lineHeight: 1.5 }}>
                  Centralize what was sold, what was posted to rooms, what was collected, what is still owed, and what requires manager sign-off before the business day is closed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Hero Workflows */}
        <section className="alt" id="workflows">
          <div className="w">
            <h2>Built around the moments where hotel margins leak.</h2>
            <p className="lead">
              The sharper positioning is not a giant PMS replacement. It is the control layer for charge capture, staff accountability, balance recovery, housekeeping readiness, and formal EOD closure.
            </p>

            <div className="grid">
              {heroWorkflows.map((item) => (
                <div key={item.title} className="tile">
                  <i>{item.num}</i>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3: Architecture Layers */}
        <section id="architecture">
          <div className="w">
            <h2>Powerful system. Low-thinking screens.</h2>
            <p className="lead">
              Hotel complexity is separated into layers so front-line teams see only the action they need, while management keeps controls, approvals, and reports.
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

        {/* Band 4: Role Views */}
        <section className="alt" id="roles">
          <div className="w">
            <h2>Different staff, different pressure, different interface.</h2>
            <p className="lead">
              Front desk and hotel admin stay as existing modules. The hotel expansion gives housekeeping, restaurant staff, and managers focused views instead of one crowded dashboard.
            </p>

            <div className="feat-grid">
              {roleCards.map((card) => (
                <div key={card.role} className="feat-card">
                  <span className="feat-badge">{card.badge}</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--mu)', marginBottom: '4px' }}>{card.role}</div>
                  <h3>{card.title}</h3>
                  <p className="desc" style={{ marginBottom: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 5: Trust Engine & Closure */}
        <section id="trust">
          <div className="w">
            <h2>Designed for operational truth, not software theater.</h2>
            <p className="lead">
              Every sensitive action needs a usable record. SharpTable makes leakage, misposting, unexplained discounts, and end-of-day uncertainty harder to hide.
            </p>

            <div className="two" style={{ marginTop: '56px' }}>
              {trustControls.map((ctrl) => (
                <div key={ctrl.title} className="card" style={{ padding: '36px 32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 12px', color: 'var(--tx)' }}>
                    {ctrl.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '16px', color: 'var(--mu)', lineHeight: 1.5 }}>
                    {ctrl.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing Trust Callout */}
            <div className="card" style={{ marginTop: '48px', padding: '40px 36px', background: 'var(--bg2)', border: '1px solid var(--ln)' }}>
              <h3 style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 12px', color: 'var(--tx)' }}>
                Start with the workflows that protect revenue first.
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--mu)', margin: '0 auto 28px', maxWidth: '640px', lineHeight: 1.5 }}>
                Charge capture, balance recovery, staff accountability, offline-safe operations, EOD closure, and housekeeping readiness are the v1 center of gravity.
              </p>
              <div className="cta">
                <Link className="btn" href="/pricing">See pricing</Link>
                <a className="lnk" href="mailto:info@sharptable.com.ng">Talk to sales</a>
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
