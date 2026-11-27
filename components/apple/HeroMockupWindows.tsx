'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Window 1: Live Order & Payment Gate Mockup
 * Animates an order passing Paystack verification and unlocking the kitchen ticket.
 */
export function MockupOrderGate() {
  const [stage, setStage] = useState<0 | 1 | 2>(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStage((s) => ((s + 1) % 3) as 0 | 1 | 2);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mk-wrap">
      <div className="mk-row-between">
        <div className="mk-avatar-row">
          <span className="mk-badge-gold">T-04</span>
          <div>
            <div className="mk-title-sm">Table 04 · Main Lounge</div>
            <div className="mk-sub-xs">QR Browser Order · No App</div>
          </div>
        </div>
        <span className={`mk-status-pill ${stage === 0 ? 'wait' : 'ok'}`}>
          {stage === 0 ? 'Checking payment' : stage === 1 ? 'Paid · Verified' : 'Kitchen cooking'}
        </span>
      </div>

      <div className="mk-items">
        <div className="mk-item-line">
          <span>1× Jollof Rice &amp; Grilled Fish</span>
          <strong>₦14,500</strong>
        </div>
        <div className="mk-item-line">
          <span>2× Chilled Chapman</span>
          <strong>₦7,000</strong>
        </div>
      </div>

      <div className="mk-gate-bar">
        <div className="mk-gate-meta">
          <span>Payment Gate</span>
          <strong style={{ color: stage === 0 ? '#F5C518' : '#4ade80' }}>
            {stage === 0 ? 'Locked until paid' : 'Unlocked · Ticket #418'}
          </strong>
        </div>
        <div className="mk-progress-track">
          <motion.div
            className="mk-progress-fill"
            animate={{
              width: stage === 0 ? '36%' : stage === 1 ? '74%' : '100%',
              backgroundColor: stage === 0 ? '#F5C518' : '#34d399',
            }}
            transition={{ duration: 0.55, ease: APPLE_EASE }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Window 2: Named Staff Audit Stream (Poe code-window visual energy)
 * Shows every worker under their own real name with live row spotlighting.
 */
export function MockupAuditLog() {
  const [highlight, setHighlight] = useState(0);

  const logs = [
    {
      time: '20:14',
      staff: 'Adaeze O.',
      role: 'Waiter',
      action: 'Order #418 paid',
      meta: '₦21,500',
      tone: 'ok',
    },
    {
      time: '20:16',
      staff: 'Chuka M.',
      role: 'Bar',
      action: 'Discount ₦2,000',
      meta: 'Reason logged',
      tone: 'warn',
    },
    {
      time: '20:18',
      staff: 'Tunde K.',
      role: 'Cashier',
      action: 'Void requested',
      meta: 'Owner alerted',
      tone: 'alert',
    },
    {
      time: '20:19',
      staff: 'Ngozi E.',
      role: 'Manager',
      action: 'Room 208 ledger',
      meta: 'Posted ✓',
      tone: 'ok',
    },
  ];

  useEffect(() => {
    const id = window.setInterval(() => {
      setHighlight((h) => (h + 1) % logs.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [logs.length]);

  return (
    <div className="mk-wrap mk-mono-wrap">
      {logs.map((row, i) => (
        <div
          key={row.time}
          className={`mk-log-row${i === highlight ? ' hi' : ''}`}
        >
          <span className="mk-log-time">{row.time}</span>
          <span className="mk-log-staff">
            {row.staff} <small>{row.role}</small>
          </span>
          <span className={`mk-log-tag ${row.tone}`}>{row.meta}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Window 3: Live Inventory & Recipe Stock Checklist (Poe 3rd-card energy)
 */
export function MockupInventory() {
  const items = [
    { name: 'Grilled Croaker', count: '14 avail.', pct: 68, low: false },
    { name: 'Chapman Pitcher', count: '28 left', pct: 84, low: false },
    { name: 'Hennessy VSOP', count: '3 left · Low', pct: 18, low: true },
    { name: 'Suya Platter', count: '19 avail.', pct: 74, low: false },
  ];

  return (
    <div className="mk-wrap">
      {items.map((item, idx) => (
        <div key={item.name} className="mk-stock-row">
          <div className="mk-stock-head">
            <span className="mk-stock-name">
              <span className={`mk-dot ${item.low ? 'low' : 'ok'}`} />
              {item.name}
            </span>
            <span className={`mk-stock-val${item.low ? ' low' : ''}`}>{item.count}</span>
          </div>
          <div className="mk-progress-track">
            <motion.div
              className="mk-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ duration: 0.7, delay: 0.1 + idx * 0.08, ease: APPLE_EASE }}
              style={{ backgroundColor: item.low ? '#F5C518' : '#38bdf8' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Window 4: One-Minute End-of-Day Executive Summary
 */
export function MockupEodReport() {
  return (
    <div className="mk-wrap">
      <div className="mk-row-between">
        <div>
          <div className="mk-sub-xs">Today · All 3 Branches</div>
          <div className="mk-big-num">₦1,428,500</div>
        </div>
        <span className="mk-status-pill ok">Balanced ✓</span>
      </div>

      <div className="mk-split-bar" aria-hidden="true">
        <span style={{ width: '58%', background: '#38bdf8' }} />
        <span style={{ width: '29%', background: '#F5C518' }} />
        <span style={{ width: '13%', background: '#34d399' }} />
      </div>

      <div className="mk-eod-grid">
        <div className="mk-eod-cell">
          <span>Transfer</span>
          <strong>₦842,000</strong>
        </div>
        <div className="mk-eod-cell">
          <span>POS / Card</span>
          <strong>₦416,500</strong>
        </div>
        <div className="mk-eod-cell">
          <span>Cash</span>
          <strong>₦170,000</strong>
        </div>
      </div>

      <div className="mk-eod-foot">
        <span>0 unexplained voids</span>
        <strong>Auditor Print Ready →</strong>
      </div>
    </div>
  );
}
