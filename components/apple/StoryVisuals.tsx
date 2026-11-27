'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Card, DEMO_URL, Phone, Screen, WA_URL } from './Bits';
import { HeroShaderBg } from './HeroShaderBg';
import {
  MockupAuditLog,
  MockupEodReport,
  MockupInventory,
  MockupOrderGate,
} from './HeroMockupWindows';
import {
  IconBox,
  IconCheck,
  IconChef,
  IconQr,
  IconReceipt,
  IconReplay,
  IconShieldBlock,
  IconShieldCheck,
  IconX,
} from './Icons';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Clean viewport reveal used across headlines, grids, and story blocks. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: APPLE_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Razor-thin gold scroll reading indicator inside the sticky Nav. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

type HeroWindow = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  render: () => ReactNode;
};

const HERO_WINDOWS: HeroWindow[] = [
  {
    id: 'gate',
    tag: 'Live Payment Gate',
    title: 'Guests pay first, then the kitchen prepares',
    desc: 'QR table ordering, room service, and WhatsApp connected to one payment gate.',
    render: () => <MockupOrderGate />,
  },
  {
    id: 'audit',
    tag: 'Named Staff Audit',
    title: 'Every worker signs in under their own name',
    desc: 'Every void, discount, and price edit logs who pressed it, which table, and when.',
    render: () => <MockupAuditLog />,
  },
  {
    id: 'inventory',
    tag: 'Live Inventory',
    title: 'Stock tracks itself as orders come in',
    desc: 'Recipe availability updates in real time with low-stock alerts before a rush.',
    render: () => <MockupInventory />,
  },
  {
    id: 'eod',
    tag: 'End-of-Day Report',
    title: 'Close every branch in one minute',
    desc: 'Transfer, POS, Cash, Card, and Auditor Print balanced automatically.',
    render: () => <MockupEodReport />,
  },
];

/**
 * Flagship WebGL Shader Hero with left-aligned hospitality display typography,
 * circular carousel controls, orbital depth rings, and a horizontal rail of
 * live animated translucent-navy mockup windows.
 */
export function HeroStage() {
  const [active, setActive] = useState(1);
  const [stepPx, setStepPx] = useState(440);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      setIsMobile(window.innerWidth < 734);
      if (cardRef.current) {
        setStepPx(cardRef.current.offsetWidth + 20);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const canPrev = active > 0;
  const canNext = active < HERO_WINDOWS.length - 1;

  const offsetIndex = isMobile
    ? active
    : Math.max(0, Math.min(active - 1, HERO_WINDOWS.length - 2));

  return (
    <section className="home-hero" aria-label="SharpTable overview">
      <HeroShaderBg variant="hero" />

      {/* Subtle architectural concentric orbits + starlight accents */}
      <div className="hero-orbits" aria-hidden="true">
        <svg viewBox="0 0 1280 760" fill="none">
          <circle cx="640" cy="360" r="270" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
          <circle cx="640" cy="360" r="430" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="1" />
          <circle cx="640" cy="360" r="590" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          <circle cx="240" cy="180" r="1.5" fill="rgba(255, 255, 255, 0.38)" />
          <circle cx="980" cy="140" r="1.5" fill="rgba(245, 197, 24, 0.55)" />
          <circle cx="1110" cy="280" r="1.2" fill="rgba(255, 255, 255, 0.3)" />
          <circle cx="140" cy="340" r="1.2" fill="rgba(245, 197, 24, 0.4)" />
        </svg>
      </div>

      <div className="home-hero-top">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: APPLE_EASE }}
        >
          Every order paid,
          <br />
          every naira <span className="hero-accent">accounted for</span>
        </motion.h1>

        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: APPLE_EASE }}
        >
          The operating system for Nigerian hospitality. Guests pay before orders are prepared,
          every worker signs in under their own name, stock updates as you sell, and end-of-day
          closes in one minute.
        </motion.p>

        <motion.div
          className="hero-controls-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: APPLE_EASE }}
        >
          {/* TODO(Okoro): DEMO_URL (interim /pricing) lives in components/apple/Bits.tsx */}
          <div className="hero-actions">
            <Link className="pill" href={DEMO_URL}>
              Book a 15-minute demo
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              className="pill o hero-ghost-btn"
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp ›
            </Link>
            <Link className="lm hero-dark-link" href="/pricing">
              See pricing ›
            </Link>
          </div>

          <div className="hero-arrows" aria-label="Browse live product views">
            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Previous view"
              disabled={!canPrev}
              onClick={() => setActive((i) => Math.max(0, i - 1))}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Next view"
              disabled={!canNext}
              onClick={() => setActive((i) => Math.min(HERO_WINDOWS.length - 1, i + 1))}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Multi-Window Live Mockup Rail */}
      <div className="hero-rail-outer">
        <div className="hero-rail-glow" aria-hidden="true" />
        <div className="hero-rail-viewport">
          <motion.div
            className="hero-rail-track"
            animate={{ x: -offsetIndex * stepPx }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            {HERO_WINDOWS.map((win, idx) => {
              const isActive = idx === active;
              return (
                <div
                  key={win.id}
                  ref={idx === 0 ? cardRef : undefined}
                  className={`hero-win${isActive ? ' active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActive(idx);
                    }
                  }}
                >
                  {isActive && <span className="hero-win-beam" aria-hidden="true" />}
                  <div className="hero-win-bar">
                    <span className="hero-win-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="hero-win-tag">{win.tag}</span>
                  </div>
                  <div className="hero-win-live">{win.render()}</div>
                  <div className="hero-win-foot">
                    <strong>{win.title}</strong>
                    <span>{win.desc}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="hero-bottom-meta">
        <div className="hero-bottom-facts">
          <span>
            <strong>₦50,000/mo</strong> per branch
          </span>
          <span>No commission</span>
          <span>No setup fee</span>
          <span>Hotels, lounges &amp; dining</span>
        </div>
        <span className="hero-sample-note">Interactive preview · Sample data</span>
      </div>
    </section>
  );
}

/**
 * Plain-English comparison covering orders, staff accountability,
 * inventory, and closing-time EOD reports.
 */
export function OldVsSharpTable() {
  const oldSteps = [
    {
      lead: 'Unpaid plates slip out.',
      rest: 'Paper tickets get mixed up or shouted into the kitchen before anyone pays.',
    },
    {
      lead: 'Shared logins hide mistakes.',
      rest: 'When a bill is voided or discounted, nobody can tell which worker pressed the button.',
    },
    {
      lead: 'Surprise stockouts mid-rush.',
      rest: 'You only realise an item is finished after a guest has already ordered it.',
    },
    {
      lead: 'Two hours of closing-time math.',
      rest: 'Matching paper receipts, POS slips, transfers, and cash late every night.',
    },
  ];

  const newSteps = [
    {
      lead: 'No payment, no cooking.',
      rest: 'Guests scan the table QR or use WhatsApp and pay first. Only paid tickets reach the chef.',
    },
    {
      lead: 'Every worker under their own name.',
      rest: 'Every void, discount, or price edit logs who did it, which table, and the exact time.',
    },
    {
      lead: 'Stock tracks itself.',
      rest: 'Inventory updates as dishes sell, with low-stock alerts before you run out.',
    },
    {
      lead: 'One-minute end of day.',
      rest: 'Cash, POS, Transfer, Card, and Director’s Bill are already totalled across every branch.',
    },
  ];

  return (
    <div className="vs-wrap">
      <div className="vs-grid">
        <Reveal delay={0.04}>
          <div className="vs-card old">
            <span className="vs-label">Without SharpTable</span>
            <h3>Paper tickets, shared logins, and late-night math</h3>
            <ul className="vs-steps">
              {oldSteps.map((s) => (
                <li key={s.lead}>
                  <span className="vs-step-dot" aria-hidden="true">
                    <IconX size={12} />
                  </span>
                  <span>
                    <strong>{s.lead}</strong> {s.rest}
                  </span>
                </li>
              ))}
            </ul>
            <div className="vs-footer-note">Busy floor all day, missing money at night.</div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="vs-card new">
            <span className="vs-label">With SharpTable</span>
            <h3>Orders, staff, stock, and EOD connected</h3>
            <ul className="vs-steps">
              {newSteps.map((s) => (
                <li key={s.lead}>
                  <span className="vs-step-dot" aria-hidden="true">
                    <IconCheck size={12} />
                  </span>
                  <span>
                    <strong>{s.lead}</strong> {s.rest}
                  </span>
                </li>
              ))}
            </ul>
            <div className="vs-footer-note">Every plate paid for and every naira accounted for.</div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * Interactive 4-Station Simulator: Shows how one plate of Jollof updates
 * the kitchen, staff audit, stock count, and EOD report, or stops at the payment gate.
 */
export function OrderJourneySim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [mode, setMode] = useState<'paid' | 'unpaid'>('paid');
  const [activeStep, setActiveStep] = useState(0);
  const [runId, setRunId] = useState(0);

  const stations = [
    {
      step: '01',
      title: 'Table 04 orders',
      desc: 'Guest scans the table QR and picks Jollof Rice & Chicken (₦4,500).',
      icon: <IconQr size={18} />,
    },
    {
      step: '02',
      title: mode === 'paid' ? 'Payment confirmed' : 'Payment gate stops it',
      desc:
        mode === 'paid'
          ? 'Paid on phone. The gate opens and sends the order to the kitchen.'
          : 'Guest did not finish paying. The gate stays locked.',
      icon: mode === 'paid' ? <IconShieldCheck size={18} /> : <IconShieldBlock size={18} />,
    },
    {
      step: '03',
      title: 'Kitchen, staff & stock sync',
      desc: 'Chef sees Table 04, stock drops by 1 plate, and the worker is logged by name.',
      icon: <IconBox size={18} />,
    },
    {
      step: '04',
      title: 'EOD report updates live',
      desc: '+₦4,500 is added to today’s Transfer total for closing time.',
      icon: <IconReceipt size={18} />,
    },
  ];

  useEffect(() => {
    if (!inView) return;
    setActiveStep(0);
    const maxStep = mode === 'paid' ? 3 : 1;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let s = 1; s <= maxStep; s++) {
      timers.push(setTimeout(() => setActiveStep(s), s * 850));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, mode, runId]);

  const handleMode = (nextMode: 'paid' | 'unpaid') => {
    setMode(nextMode);
    setRunId((r) => r + 1);
  };

  const progressPct =
    mode === 'paid' ? (activeStep / 3) * 100 : (Math.min(activeStep, 1) / 3) * 100;

  return (
    <div className="sim-shell" ref={ref}>
      <div className="sim-box">
        <div className="sim-toolbar">
          <div className="sim-mode-group" role="group" aria-label="Choose an order scenario">
            <button
              type="button"
              className="sim-mode-btn"
              aria-pressed={mode === 'paid'}
              onClick={() => handleMode('paid')}
            >
              Paid order
            </button>
            <button
              type="button"
              className="sim-mode-btn danger"
              aria-pressed={mode === 'unpaid'}
              onClick={() => handleMode('unpaid')}
            >
              Try unpaid order
            </button>
          </div>
          <button
            type="button"
            className="sim-replay"
            onClick={() => setRunId((r) => r + 1)}
          >
            <IconReplay size={14} />
            Replay
          </button>
        </div>

        <div style={{ marginBottom: 18, padding: '0 8px' }} aria-hidden="true">
          <svg viewBox="0 0 800 18" width="100%" height="18" preserveAspectRatio="none">
            <rect x="0" y="7" width="800" height="4" rx="2" fill="rgba(11, 27, 51, 0.08)" />
            <motion.rect
              x="0"
              y="7"
              height="4"
              rx="2"
              fill={mode === 'paid' ? '#147a42' : '#c42b2b'}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progressPct, 6)}%` }}
              transition={{ duration: 0.55, ease: APPLE_EASE }}
            />
          </svg>
        </div>

        <div className="sim-track">
          {stations.map((st, idx) => {
            const isBlocked = mode === 'unpaid' && idx === 1 && activeStep >= 1;
            const isDimmed = mode === 'unpaid' && idx > 1;
            const isPassed = mode === 'paid' && idx < activeStep;
            const isActive = !isDimmed && idx === activeStep && !isBlocked;

            const cls = [
              'sim-node',
              isBlocked ? 'blocked' : '',
              isDimmed ? 'dimmed' : '',
              isPassed ? 'passed' : '',
              isActive ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={st.step}
                className={cls}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (mode === 'unpaid' && idx > 1) return;
                  setActiveStep(idx);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (mode === 'unpaid' && idx > 1) return;
                    setActiveStep(idx);
                  }
                }}
              >
                <div className="sim-node-top">
                  <div className="sim-node-ic">{st.icon}</div>
                  <span className="sim-step-tag">{st.step}</span>
                </div>
                <h4>{st.title}</h4>
                <p>{st.desc}</p>
              </div>
            );
          })}
        </div>

        <div
          className={`sim-status-bar${
            mode === 'unpaid' && activeStep >= 1
              ? ' blocked'
              : mode === 'paid' && activeStep === 3
                ? ' complete'
                : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {mode === 'unpaid' ? (
            activeStep === 0 ? (
              <>
                <IconQr size={18} />
                <span>
                  Table 04 picks Jollof Rice &amp; Chicken and taps checkout, then closes the screen
                  without paying.
                </span>
              </>
            ) : (
              <>
                <IconShieldBlock size={18} />
                <span>
                  <strong>Stopped at the gate.</strong> Because payment was not confirmed, the
                  kitchen screen stays quiet, stock is untouched, and no unpaid plate is cooked.
                </span>
              </>
            )
          ) : activeStep === 3 ? (
            <>
              <IconShieldCheck size={18} />
              <span>
                <strong>All four updated automatically.</strong> Table 04 paid, the kitchen got the
                ticket, stock dropped by 1, the staff member was logged by name, and today’s EOD
                total updated live.
              </span>
            </>
          ) : (
            <>
              <IconChef size={18} />
              <span>
                Following Table 04’s order across the kitchen, staff log, stock count, and EOD
                report...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type Chapter = {
  num: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  visualKind: 'tablet-kitchen' | 'phone-admin' | 'laptop-inventory' | 'eod-branches';
  caption: string;
};

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    label: 'Orders & Kitchen',
    title: 'Only paid orders reach the chef',
    desc: 'Guests scan the table QR or order on WhatsApp and pay right on their phone. Once payment clears, the ticket pops onto the kitchen screen with food and drinks separated by table.',
    bullets: [
      'No app download for guests, opens in any browser',
      'Zero unpaid plates reach the kitchen',
      'Queue, Cooking, Ready and Drinks columns live',
    ],
    visualKind: 'tablet-kitchen',
    caption: 'Live kitchen display queued by table',
  },
  {
    num: '02',
    label: 'Named Staff & Auditing',
    title: 'Every worker uses their own name',
    desc: 'No shared cashier accounts or mystery edits. Every waiter, bartender, and manager signs in under their own name with role permissions. Every void, discount, or price edit records who, which table, and when.',
    bullets: [
      'Each staff member sees only what their role needs',
      'Full audit trail on every void, discount, and refund',
      'Live alerts straight to the owner’s phone',
    ],
    visualKind: 'phone-admin',
    caption: 'SharpTable Admin on the owner’s phone',
  },
  {
    num: '03',
    label: 'Inventory & Stock',
    title: 'Know what is running low before guests do',
    desc: 'Track recipe availability and live stock counts right next to your menu items. SharpTable deducts stock as orders come in and alerts you before a dish or drink runs out mid-rush.',
    bullets: [
      'Live recipe availability and stock counts per dish',
      'Low-stock alerts right in your Admin bar',
      'Mark any item sold out across every menu in one tap',
    ],
    visualKind: 'laptop-inventory',
    caption: 'Menu and live stock availability on desktop',
  },
  {
    num: '04',
    label: 'End-of-Day & Every Branch',
    title: 'Close in one minute, not two hours',
    desc: 'At closing time, your daily breakdown is already done: Cash, POS, Transfer, Card, Complimentary, Director’s Bill, and Debt, plus one-click Auditor Print and multi-branch oversight from anywhere.',
    bullets: [
      'Automatic daily totals by every payment type',
      'One-click Auditor Print for clean handovers',
      'Run 1 branch or 10 from the exact same screen',
    ],
    visualKind: 'eod-branches',
    caption: 'Sales History and End-of-Day breakdown',
  },
];

function StageVisual({
  kind,
  caption,
  eodTab,
  onEodTab,
}: {
  kind: Chapter['visualKind'];
  caption: string;
  eodTab: 'eod' | 'branches';
  onEodTab: (tab: 'eod' | 'branches') => void;
}) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {kind === 'tablet-kitchen' && (
        <Screen
          kind="tablet"
          src="/app-shots/kitchen.webp"
          alt="SharpTable kitchen display with paid orders queued by table"
        />
      )}
      {kind === 'phone-admin' && (
        <Phone
          src="/app-shots/admin-mobile.webp"
          alt="SharpTable Admin on a phone"
        />
      )}
      {kind === 'laptop-inventory' && (
        <Screen
          kind="laptop"
          src="/app-shots/dashboard.webp"
          mobileSrc="/app-shots/dashboard-390.webp"
          alt="SharpTable admin menu showing live stock and recipe availability counts"
        />
      )}
      {kind === 'eod-branches' && (
        <>
          <div
            className="sim-mode-group"
            role="group"
            aria-label="Switch End-of-Day and All Branches preview"
            style={{ marginBottom: 18, background: 'rgba(255,255,255,0.85)' }}
          >
            <button
              type="button"
              className="sim-mode-btn"
              aria-pressed={eodTab === 'eod'}
              onClick={() => onEodTab('eod')}
            >
              EOD Report
            </button>
            <button
              type="button"
              className="sim-mode-btn"
              aria-pressed={eodTab === 'branches'}
              onClick={() => onEodTab('branches')}
            >
              Every Branch
            </button>
          </div>
          {eodTab === 'eod' ? (
            <Card
              src="/app-shots/history.webp"
              alt="SharpTable End-of-Day sales history showing Cash, POS, Transfer, Card, Director's Bill, Debt, and Auditor Print"
            />
          ) : (
            <div className="baked-lockup">
              <img
                src="/app-shots/admin-lockup-desktop.webp"
                srcSet="/app-shots/admin-lockup-desktop.webp 1x, /app-shots/admin-lockup-desktop@2x.webp 2x, /app-shots/admin-lockup-desktop@3x.webp 3x"
                width={1247}
                height={772}
                alt="SharpTable Admin on a laptop, with the same Admin on a phone"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </>
      )}
      <p className="cap" style={{ marginTop: 18 }}>
        {kind === 'eod-branches' && eodTab === 'branches'
          ? 'Admin across desktop and mobile'
          : caption}{' '}
        <span className="tag">· Sample data</span>
      </p>
    </div>
  );
}

/**
 * Sticky 4-chapter showcase covering Orders & Kitchen, Named Staff & Auditing,
 * Inventory & Stock, and EOD & Multi-Branch.
 */
export function StoryChapters() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [eodTab, setEodTab] = useState<'eod' | 'branches'>('eod');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-chapter-idx'));
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0.05 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const current = CHAPTERS[activeIdx] ?? CHAPTERS[0];

  return (
    <div className="story-shell">
      <div className="story-desktop">
        <div className="story-chapters-col">
          {CHAPTERS.map((ch, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={ch.num}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-chapter-idx={i}
                className={`story-chapter-card${isActive ? ' active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIdx(i);
                  }
                }}
              >
                <div className="chapter-num">
                  <span className="chapter-num-badge">{ch.num}</span>
                  <span>{ch.label}</span>
                </div>
                <h3 className="chapter-title">{ch.title}</h3>
                <p className="chapter-desc">{ch.desc}</p>
                <ul className="chapter-bullets">
                  {ch.bullets.map((b) => (
                    <li key={b}>
                      <IconCheck size={16} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="story-stage-col">
          <div className="story-stage-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.num}-${current.visualKind === 'eod-branches' ? eodTab : ''}`}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.42, ease: APPLE_EASE }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <StageVisual
                  kind={current.visualKind}
                  caption={current.caption}
                  eodTab={eodTab}
                  onEodTab={setEodTab}
                />
              </motion.div>
            </AnimatePresence>

            <div className="story-stage-dots" role="tablist" aria-label="Story steps">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.num}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Chapter ${ch.num}: ${ch.label}`}
                  className={`story-stage-dot${i === activeIdx ? ' active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="story-mobile">
        {CHAPTERS.map((ch) => (
          <Reveal key={ch.num}>
            <article className="story-mobile-card">
              <div>
                <div className="chapter-num">
                  <span className="chapter-num-badge">{ch.num}</span>
                  <span>{ch.label}</span>
                </div>
                <h3 className="chapter-title">{ch.title}</h3>
                <p className="chapter-desc">{ch.desc}</p>
                <ul className="chapter-bullets">
                  {ch.bullets.map((b) => (
                    <li key={b}>
                      <IconCheck size={16} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="story-mobile-visual">
                <StageVisual
                  kind={ch.visualKind}
                  caption={ch.caption}
                  eodTab={eodTab}
                  onEodTab={setEodTab}
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
