'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, DEMO_URL, Phone, Screen, WA_URL } from './Bits';
import {
  IconBed,
  IconBox,
  IconCheck,
  IconChef,
  IconQr,
  IconReceipt,
  IconShieldCheck,
  IconUsers,
} from './Icons';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type ModuleKey = 'ordering' | 'kitchen' | 'audit' | 'inventory' | 'eod';

type FeaturedModule = {
  id: ModuleKey;
  title: string;
  shortDesc: string;
  fullTitle: string;
  fullDesc: string;
  bullets: string[];
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
  caption: string;
};

const MODULES: FeaturedModule[] = [
  {
    id: 'ordering',
    title: 'QR & WhatsApp Ordering',
    shortDesc: 'Guests scan, pick dishes, and pay on their phone.',
    fullTitle: 'Guests order and pay right from their phone',
    fullDesc:
      'Every table and hotel room gets a QR code, plus WhatsApp ordering built in. Guests browse photos and prices in their browser, split bills if they want, and pay before anything is prepared.',
    bullets: [
      'Zero app downloads for guests',
      'Works at tables, lounges, bars, and hotel rooms',
      'Payments settle straight to your bank via Paystack',
    ],
    iconBg: '#e8f2fc',
    iconColor: '#0a66c2',
    icon: <IconQr size={20} />,
    caption: 'Diner QR menu in the browser',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Display',
    shortDesc: 'Only paid orders appear on the chef screen.',
    fullTitle: 'Only paid tickets reach the kitchen',
    fullDesc:
      'The second payment clears, the ticket appears on the kitchen tablet sorted by table with drinks separated cleanly from food. Unpaid orders never get cooked.',
    bullets: [
      'Zero unpaid plates leaving the kitchen',
      'Queue, Cooking, Ready, and Drinks columns live',
      'Runs on any tablet or screen you already own',
    ],
    iconBg: '#fff5d6',
    iconColor: '#b47b00',
    icon: <IconChef size={20} />,
    caption: 'Live kitchen display queued by table',
  },
  {
    id: 'audit',
    title: 'Named Staff & Auditing',
    shortDesc: 'Every worker uses their own name. Every void is logged.',
    fullTitle: 'No shared logins, no hidden voids or discounts',
    fullDesc:
      'Every waiter, bartender, cashier, and manager signs in under their own name with role permissions. Every void, discount, refund, or price edit writes down who did it, which table, and the exact time.',
    bullets: [
      'Individual login for every staff member',
      'Instant audit trail on voids, discounts, and price edits',
      'Watch every branch live from your own phone',
    ],
    iconBg: '#e6f5ec',
    iconColor: '#147a42',
    icon: <IconUsers size={20} />,
    caption: 'SharpTable Admin on mobile',
  },
  {
    id: 'inventory',
    title: 'Inventory & Recipes',
    shortDesc: 'Stock updates as dishes sell, with low-stock alerts.',
    fullTitle: 'Know what is running low before guests order it',
    fullDesc:
      'Track recipe availability and live stock counts right beside your menu. SharpTable deducts stock as paid orders come in and warns you before drinks or dishes run out mid-rush.',
    bullets: [
      'Live recipe availability and stock counts per item',
      'Automatic low-stock alerts in your Admin bar',
      'Mark any item sold out across every menu in one tap',
    ],
    iconBg: '#eef0ff',
    iconColor: '#4338ca',
    icon: <IconBox size={20} />,
    caption: 'Live menu and recipe stock counts',
  },
  {
    id: 'eod',
    title: 'End-of-Day & Multi-Branch',
    shortDesc: 'Cash, POS, Transfer, and Card tallied in one minute.',
    fullTitle: 'Close every branch in one minute, not two hours',
    fullDesc:
      'Skip late-night calculator math. Every payment method, complimentary item, Director’s Bill, and debt line is already totalled with one-click Auditor Print across all your locations.',
    bullets: [
      'Daily breakdown across Cash, POS, Transfer, and Card',
      'One-click Auditor Print for clean shift handovers',
      'Compare 1 branch or 10 from the exact same screen',
    ],
    iconBg: '#fcebe9',
    iconColor: '#c42b2b',
    icon: <IconReceipt size={20} />,
    caption: 'Sales history and End-of-Day breakdown',
  },
];

function ModuleScreen({ id }: { id: ModuleKey }) {
  if (id === 'ordering') {
    return (
      <Phone
        src="/app-shots/diner-menu.png"
        alt="SharpTable diner menu on a phone showing dishes and prices in naira"
        priority
      />
    );
  }
  if (id === 'kitchen') {
    return (
      <Screen
        kind="tablet"
        src="/app-shots/kitchen.webp"
        alt="SharpTable kitchen display with paid orders queued by table"
      />
    );
  }
  if (id === 'audit') {
    return (
      <Phone
        src="/app-shots/admin-mobile.webp"
        alt="SharpTable Admin mobile app"
      />
    );
  }
  if (id === 'inventory') {
    return (
      <Screen
        kind="laptop"
        src="/app-shots/dashboard.webp"
        mobileSrc="/app-shots/dashboard-390.webp"
        alt="SharpTable admin dashboard showing recipe availability and live stock counts"
      />
    );
  }
  return (
    <Card
      src="/app-shots/history.webp"
      alt="SharpTable End-of-Day sales history with Cash, POS, Transfer, Card and Auditor Print"
    />
  );
}

/**
 * Zoho.com-inspired Hero + Featured Modules floating directory card + Yellow All-in-One Band
 * + Interactive Tabbed Suite Explorer — wired together so clicking any module in the Hero card
 * scrolls smoothly right to that live screen in the Suite Explorer.
 */
export function ZohoHomeCore() {
  const [selected, setSelected] = useState<ModuleKey>('ordering');

  const jumpToModule = (id: ModuleKey) => {
    setSelected(id);
    const el = document.getElementById('suite-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeMod = MODULES.find((m) => m.id === selected) ?? MODULES[0];

  return (
    <>
      {/* BAND 1: Iconic Zoho Split Hero + Floating Right "FEATURED MODULES" Card */}
      <section className="zh-hero" aria-label="SharpTable operating system">
        <div className="zh-hero-in">
          {/* Left Column: Crisp Editorial Copy + CTA + Baked Product Lockup */}
          <div className="zh-hero-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              Your entire venue,
              <br />
              powered by one clear system
            </motion.h1>

            <span className="zh-accent-rule" aria-hidden="true" />

            <motion.p
              className="zh-lede"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            >
              A unified operating system for Nigerian hospitality. Guests pay before orders are
              prepared, every worker signs in under their own name, inventory updates as dishes
              sell, and end-of-day reports finish in one minute.
            </motion.p>

            {/* TODO(Okoro): DEMO_URL (interim /pricing) lives in components/apple/Bits.tsx */}
            <motion.div
              className="zh-hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
            >
              <Link className="zh-btn-primary" href={DEMO_URL}>
                Book a 15-minute demo
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="zh-btn-secondary"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp ›
              </Link>
            </motion.div>

            {/* Clean architectural lockup anchored cleanly at the base of the hero left column */}
            <motion.div
              className="zh-hero-art"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            >
              <img
                src="/app-shots/admin-lockup-desktop.webp"
                srcSet="/app-shots/admin-lockup-desktop.webp 1x, /app-shots/admin-lockup-desktop@2x.webp 2x, /app-shots/admin-lockup-desktop@3x.webp 3x"
                width={1247}
                height={772}
                alt="SharpTable Admin on desktop and mobile"
                loading="eager"
                decoding="async"
              />
              <span className="zh-art-note">Sample data</span>
            </motion.div>
          </div>

          {/* Right Column: Iconic Zoho Floating White "Featured Modules" Directory Card */}
          <motion.aside
            className="zh-apps-card"
            aria-label="Featured SharpTable modules"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            <div className="zh-apps-head">FEATURED MODULES</div>
            <div className="zh-apps-list">
              {MODULES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`zh-app-row${selected === m.id ? ' active' : ''}`}
                  onClick={() => jumpToModule(m.id)}
                >
                  <span
                    className="zh-app-ic"
                    style={{ background: m.iconBg, color: m.iconColor }}
                  >
                    {m.icon}
                  </span>
                  <span className="zh-app-text">
                    <strong>{m.title}</strong>
                    <span>{m.shortDesc}</span>
                  </span>
                  <span className="zh-app-chev" aria-hidden="true">
                    ›
                  </span>
                </button>
              ))}
            </div>
            <div className="zh-apps-foot">
              <Link href="/features">
                Explore all features <span aria-hidden="true">›</span>
              </Link>
              <Link href="/for-hotels" className="zh-hotel-mini">
                <IconBed size={15} />
                Hotels too ›
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* BAND 2: Iconic Zoho Full-Bleed Yellow All-in-One Banner (SharpTable Brand Yellow!) */}
      <section className="zh-yellow-band" aria-label="All-in-one operating system">
        <div className="zh-yellow-in">
          <div className="zh-yellow-left">
            <div className="zh-suite-mark">
              <span className="zh-suite-ic">
                <IconShieldCheck size={22} />
              </span>
              <div>
                <small>All-in-one suite</small>
                <strong>SharpTable OS</strong>
              </div>
            </div>
            <h2>Every feature included on every plan</h2>
            <p>
              Run dining floors, bars, lounges, and hotels from one connected workspace. No
              commission on orders, no setup fee, and no paying extra to unlock auditing, WhatsApp
              ordering, or inventory.
            </p>
            <div className="zh-yellow-actions">
              <Link className="zh-btn-navy" href={DEMO_URL}>
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <Link className="zh-link-dark" href="/pricing">
                See pricing ›
              </Link>
            </div>
          </div>

          <div className="zh-yellow-divider" aria-hidden="true" />

          <div className="zh-yellow-right">
            <blockquote className="zh-story-quote">
              “When a guest pays at Table 04, the kitchen gets the ticket, stock drops by one, the
              worker is tagged under their own name, and your closing report updates right away. If
              nobody paid, the kitchen stays quiet.”
            </blockquote>
            <div className="zh-yellow-facts">
              <div>
                <strong>₦50,000/mo</strong>
                <span>per branch</span>
              </div>
              <div>
                <strong>0% cut</strong>
                <span>no order commission</span>
              </div>
              <div>
                <strong>30 mins</strong>
                <span>setup on your devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 3: Clean White Interactive Suite Explorer (Click any module tab to inspect the real UI) */}
      <section id="suite-explorer" className="zh-suite-band">
        <div className="zh-wrap">
          <div className="zh-section-head">
            <h2>One workspace from guest table to closing report</h2>
            <p>
              Pick any part of SharpTable below to see how it works on your actual phones, tablets,
              and laptops.
            </p>
          </div>

          <div className="zh-tabs" role="tablist" aria-label="SharpTable modules">
            {MODULES.map((m) => {
              const isSelected = m.id === selected;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`zh-tab-btn${isSelected ? ' active' : ''}`}
                  onClick={() => setSelected(m.id)}
                >
                  <span className="zh-tab-ic" style={{ color: isSelected ? '#0b1b33' : m.iconColor }}>
                    {m.icon}
                  </span>
                  <span>{m.title}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="zh-tab-bar"
                      className="zh-tab-bar"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="zh-stage-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMod.id}
                className="zh-stage-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="zh-stage-copy">
                  <span
                    className="zh-stage-icon-box"
                    style={{ background: activeMod.iconBg, color: activeMod.iconColor }}
                  >
                    {activeMod.icon}
                  </span>
                  <h3>{activeMod.fullTitle}</h3>
                  <p>{activeMod.fullDesc}</p>
                  <ul className="zh-check-list">
                    {activeMod.bullets.map((b) => (
                      <li key={b}>
                        <IconCheck size={16} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="zh-stage-links">
                    <Link className="zh-btn-primary" href={DEMO_URL}>
                      Book a demo <span aria-hidden="true">→</span>
                    </Link>
                    <Link className="lm" href="/features">
                      All features ›
                    </Link>
                  </div>
                </div>

                <div className="zh-stage-visual">
                  <div className="zh-stage-visual-inner">
                    <ModuleScreen id={activeMod.id} />
                  </div>
                  <p className="cap" style={{ marginTop: 14 }}>
                    {activeMod.caption} <span className="tag">· Sample data</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
