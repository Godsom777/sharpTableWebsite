'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=JetBrains+Mono:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap";

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(target, duration = 1600, trigger = true) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (!trigger) return;
    const from = prev.current;
    const start = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const cur = Math.round(from + eased * (target - from));
      setVal(cur);
      if (p < 1) id = requestAnimationFrame(tick);
      else prev.current = target;
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, trigger]);
  return val;
}

// ── Branch data ───────────────────────────────────────────────────────────────
const BRANCH_DATA = {
  "Victoria Island": {
    todayRev: 1360700, weekRev: 8942300, monthRev: 56075100,
    orders: { today: 37, week: 241, month: 986 },
    payments: [
      { label: "Transfer", pct: 56, today: 192400,  week: 1240000, month: 7414650, color: "#a855f7" },
      { label: "POS",      pct: 31, today: 105800,  week: 680000,  month: 8038300, color: "#2B6FE6" },
      { label: "D.Bill",   pct: 13, today: 42800,   week: 280000,  month: 1156300, color: "#c9a227" },
    ],
    feed: [
      { icon: "🛎", text: "Table T-12 · Smoked Fish ×2 placed",          tag: "ORDER",   tagColor: "#2B6FE6" },
      { icon: "✅", text: "Transfer confirmed · ₦192,400 · T-07",          tag: "PAID",    tagColor: "#22c55e" },
      { icon: "🔒", text: "Void blocked · Emeka · T-05 · PIN required",    tag: "BLOCKED", tagColor: "#a855f7" },
      { icon: "⚠️", text: "Chicken critical · 4 portions remaining",       tag: "ALERT",   tagColor: "#f59e0b" },
      { icon: "📦", text: "T-22 → Kitchen · Jollof ×2, Beef ×1",            tag: "KITCHEN", tagColor: "#2B6FE6" },
    ],
    marshalls: [
      { name: "Tunde",  collected: "₦4,500",  verified: 1 },
      { name: "Okoro",  collected: "₦77,900", verified: 3 },
    ],
    shift: { cash: "₦0", pos: "₦4,500", transfer: "₦0", pending: 1 },
    color: "#ef4444",
  },
  "Osapa London": {
    todayRev: 430100, weekRev: 3140500, monthRev: 31240500,
    orders: { today: 24, week: 158, month: 621 },
    payments: [
      { label: "Cash",     pct: 48, today: 206448, week: 1400000, month: 5200000, color: "#22c55e" },
      { label: "POS",      pct: 38, today: 163438, week: 930000,  month: 3900000, color: "#2B6FE6" },
      { label: "Transfer", pct: 14, today: 60214,  week: 410000,  month: 2100000, color: "#a855f7" },
    ],
    feed: [
      { icon: "🛎", text: "Table T-04 · Ofe Owerri ×1 placed",         tag: "ORDER",   tagColor: "#2B6FE6" },
      { icon: "✅", text: "Cash collected · ₦45,000 · Amaka shift",      tag: "PAID",    tagColor: "#22c55e" },
      { icon: "📦", text: "T-09 → Kitchen · Nkwobi ×2, Goat ×1",         tag: "KITCHEN", tagColor: "#2B6FE6" },
      { icon: "⚠️", text: "Beef portions low · 6 remaining",              tag: "ALERT",   tagColor: "#f59e0b" },
      { icon: "✅", text: "POS confirmed · ₦28,000 · T-06",                tag: "PAID",    tagColor: "#22c55e" },
    ],
    marshalls: [
      { name: "Amaka", collected: "₦91,000", verified: 4 },
      { name: "Joy",   collected: "₦54,200", verified: 2 },
    ],
    shift: { cash: "₦206,448", pos: "₦163,438", transfer: "₦60,214", pending: 2 },
    color: "#22c55e",
  },
  "Palm Beach": {
    todayRev: 118200, weekRev: 1240000, monthRev: 18692000,
    orders: { today: 18, week: 109, month: 445 },
    payments: [
      { label: "Transfer", pct: 62, today: 73284, week: 740000,  month: 6200000, color: "#a855f7" },
      { label: "POS",      pct: 28, today: 33096, week: 360000,  month: 2800000, color: "#2B6FE6" },
      { label: "Cash",     pct: 10, today: 11820, week: 130000,  month: 1200000, color: "#22c55e" },
    ],
    feed: [
      { icon: "🛎", text: "Table T-02 · Grilled Fish ×1 placed",      tag: "ORDER",   tagColor: "#2B6FE6" },
      { icon: "📦", text: "T-02 → Kitchen · Grilled Catfish ×1",        tag: "KITCHEN", tagColor: "#2B6FE6" },
      { icon: "✅", text: "Transfer · ₦73,000 · T-02 verified",          tag: "PAID",    tagColor: "#22c55e" },
      { icon: "⚠️", text: "Grasscutter low · 3 portions remaining",      tag: "ALERT",   tagColor: "#f59e0b" },
      { icon: "🛎", text: "Table T-07 · BBQ Chicken ×2 placed",         tag: "ORDER",   tagColor: "#2B6FE6" },
    ],
    marshalls: [
      { name: "Favour", collected: "₦48,200", verified: 2 },
      { name: "Ernest", collected: "₦29,000", verified: 1 },
    ],
    shift: { cash: "₦11,820", pos: "₦33,096", transfer: "₦73,284", pending: 0 },
    color: "#f97316",
  },
};

const BRANCHES = Object.keys(BRANCH_DATA);
const RANGES   = ["Today", "Week", "Month"];

// ── Glass card ────────────────────────────────────────────────────────────────
function GlassCard({ children, style, accent, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(16,16,16,0.97)" : "rgba(9,9,9,0.88)",
        border: `1px solid ${hovered && accent ? `${accent}44` : "#191919"}`,
        borderRadius: 18,
        backdropFilter: "blur(16px)",
        boxShadow: hovered && accent
          ? `0 0 0 1px ${accent}18, 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "inset 0 1px 0 rgba(255,255,255,0.025), 0 4px 24px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >{children}</div>
  );
}

// ── Label ─────────────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{ color: "#282828", fontSize: 9, fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.11em", marginBottom: 12 }}>
      {children}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SharpTableHero() {
  const [mounted,      setMounted]      = useState(false);
  const [activeBranch, setActiveBranch] = useState("Victoria Island");
  const [activeRange,  setActiveRange]  = useState("Today");
  const [feedIdx,      setFeedIdx]      = useState(0);
  const [visibleFeed,  setVisibleFeed]  = useState([]);
  const [mouse,        setMouse]        = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  const data        = BRANCH_DATA[activeBranch];
  const branchColor = data.color;
  const rawRev      = activeRange === "Today" ? data.todayRev : activeRange === "Week" ? data.weekRev : data.monthRev;
  const revenue     = useCounter(rawRev, 1300, mounted);
  const orderCount  = activeRange === "Today" ? data.orders.today : activeRange === "Week" ? data.orders.week : data.orders.month;

  // Mount
  useEffect(() => {
    const t = setTimeout(() => { setMounted(true); setVisibleFeed([data.feed[0]]); }, 120);
    return () => clearTimeout(t);
  }, []);

  // Reset feed on branch/range change
  useEffect(() => { setVisibleFeed([data.feed[0]]); setFeedIdx(0); }, [activeBranch]);

  // Rolling feed
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setFeedIdx(i => {
        const next = (i + 1) % data.feed.length;
        setVisibleFeed(prev => [data.feed[next], ...prev].slice(0, 4));
        return next;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [mounted, activeBranch]);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  const enter = (ms) => ({
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.75s ease ${ms}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${ms}ms`,
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href={FONT_LINK} rel="stylesheet" />

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        style={{
          background: "#050505",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 5vw",
          position: "relative",
          overflow: "hidden",
          fontFamily: '"DM Sans", system-ui, sans-serif',
        }}
      >
        {/* ── Background ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Cursor blob */}
          <div style={{
            position: "absolute",
            width: 800, height: 800, borderRadius: "50%",
            background: `radial-gradient(circle, ${branchColor}0b 0%, transparent 60%)`,
            left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`,
            transform: "translate(-50%,-50%)",
            transition: "left 0.9s cubic-bezier(0.16,1,0.3,1), top 0.9s cubic-bezier(0.16,1,0.3,1), background 0.7s ease",
          }} />
          {/* Static ambient */}
          <div style={{ position: "absolute", top: "35%", left: "56%", transform: "translate(-50%,-50%)", width: 900, height: 700, background: "radial-gradient(ellipse, rgba(239,68,68,0.035) 0%, rgba(43,111,230,0.025) 50%, transparent 70%)" }} />
          {/* Dot grid */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.13 }}>
            <defs>
              <pattern id="g" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#252525" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
          {/* Bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #050505, transparent)" }} />
          {/* Thin top border */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, #1a1a1a 40%, #1a1a1a 60%, transparent)" }} />
        </div>

        {/* ── Grid layout ── */}
        <div style={{
          maxWidth: 1320, width: "100%", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1.2fr",
          gap: "6vw", alignItems: "center",
          position: "relative", zIndex: 1,
          padding: "88px 0",
        }}>

          {/* ── LEFT ─────────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Live badge */}
            <div style={enter(0)}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.16)",
                borderRadius: 24, padding: "6px 15px",
              }}>
                <span style={{ width: 7, height: 7, background: "#ef4444", borderRadius: "50%", animation: "pulse 2s infinite", display: "block" }} />
                <span style={{ color: "#ef4444", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", fontFamily: '"JetBrains Mono", monospace' }}>LIVE · 50+ RESTAURANTS</span>
              </span>
            </div>

            {/* Headline — Montserrat */}
            <div style={enter(80)}>
              <h1 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "clamp(38px, 4.4vw, 64px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.07,
                margin: 0,
                letterSpacing: "-0.03em",
              }}>
                Every naira.<br />
                Every branch.<br />
                <span style={{
                  background: `linear-gradient(100deg, ${branchColor} 0%, ${branchColor}bb 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: "all 0.5s ease",
                }}>
                  Every shift.
                </span>
              </h1>
            </div>

            {/* Sub */}
            <div style={enter(170)}>
              <p style={{ color: "#4a4a4a", fontSize: 16, lineHeight: 1.8, margin: 0, maxWidth: 410, fontWeight: 400 }}>
                Total visibility across all your locations — revenue, staff accountability, stock alerts, and fraud protection from a single screen.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", ...enter(260) }}>
              <a href="https://app.sharptable.com.ng" style={{
                background: "#ef4444", color: "#fff",
                padding: "13px 28px", borderRadius: 10,
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 9,
                boxShadow: "0 0 30px rgba(239,68,68,0.2)",
                transition: "all 0.25s ease",
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 55px rgba(239,68,68,0.42)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(239,68,68,0.2)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
              >
                Start Free Trial
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://sharptable.com.ng" style={{
                color: "#3a3a3a", padding: "13px 20px", borderRadius: 10,
                fontWeight: 500, fontSize: 14, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid #1c1c1c",
                transition: "all 0.25s ease",
                fontFamily: '"DM Sans", sans-serif',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#3a3a3a"; e.currentTarget.style.borderColor = "#1c1c1c"; e.currentTarget.style.background = "transparent"; }}
              >
                See how it works
              </a>
            </div>

            {/* Proof numbers */}
            <div style={{ display: "flex", ...enter(340) }}>
              {[
                { num: "₦56M+", label: "tracked monthly"  },
                { num: "50+",   label: "restaurants live"  },
                { num: "₦0",    label: "slipped through"   },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 22 : 0, borderLeft: i > 0 ? "1px solid #161616" : "none" }}>
                  <div style={{ color: "#fff", fontSize: 21, fontWeight: 800, fontFamily: '"Montserrat", sans-serif', letterSpacing: "-0.03em" }}>{s.num}</div>
                  <div style={{ color: "#2e2e2e", fontSize: 10, marginTop: 3, fontFamily: '"DM Sans", sans-serif' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Branch switcher */}
            <div style={enter(420)}>
              <div style={{ color: "#222", fontSize: 9, fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.1em", marginBottom: 9 }}>SWITCH BRANCH →</div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {BRANCHES.map(b => {
                  const active = activeBranch === b;
                  const bc = BRANCH_DATA[b].color;
                  return (
                    <button key={b} onClick={() => setActiveBranch(b)} style={{
                      padding: "7px 15px", borderRadius: 9,
                      background: active ? `${bc}12` : "transparent",
                      border: `1px solid ${active ? `${bc}45` : "#1c1c1c"}`,
                      color: active ? bc : "#383838",
                      fontSize: 11, fontWeight: 700, cursor: "pointer",
                      transition: "all 0.25s ease",
                      fontFamily: '"DM Sans", sans-serif',
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#2e2e2e"; e.currentTarget.style.color = "#666"; }}}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#1c1c1c"; e.currentTarget.style.color = "#383838"; }}}
                    >
                      {active && <span style={{ width: 5, height: 5, background: bc, borderRadius: "50%", animation: "pulse 1.8s infinite", display: "block" }} />}
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Data panels ───────────────────────────────────────── */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 11,
            transform: `translate(${(mouse.x - 0.5) * -10}px, ${(mouse.y - 0.5) * -6}px)`,
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            ...enter(180),
          }}>

            {/* Row 1: Revenue card + Branch bars */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 11 }}>

              {/* Revenue */}
              <GlassCard accent={branchColor} style={{ padding: "22px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${branchColor}0d 0%, transparent 65%)`, transition: "background 0.6s", pointerEvents: "none" }} />

                {/* Range toggle */}
                <div style={{ display: "flex", gap: 5, marginBottom: 18, alignItems: "center" }}>
                  {RANGES.map(r => (
                    <button key={r} onClick={() => setActiveRange(r)} style={{
                      padding: "3px 10px", borderRadius: 6,
                      background: activeRange === r ? `${branchColor}18` : "transparent",
                      border: `1px solid ${activeRange === r ? `${branchColor}44` : "#181818"}`,
                      color: activeRange === r ? branchColor : "#2a2a2a",
                      fontSize: 9, fontWeight: 700, cursor: "pointer",
                      transition: "all 0.22s", fontFamily: '"JetBrains Mono", monospace',
                    }}>{r}</button>
                  ))}
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, background: "#ef4444", borderRadius: "50%", animation: "pulse 1.5s infinite", display: "block" }} />
                    <span style={{ color: "#282828", fontSize: 8, fontFamily: '"JetBrains Mono", monospace' }}>LIVE</span>
                  </div>
                </div>

                <Label>REVENUE · {activeBranch.toUpperCase()}</Label>
                <div style={{ color: branchColor, fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 800, fontFamily: '"Montserrat", sans-serif', letterSpacing: "-0.025em", lineHeight: 1, transition: "color 0.5s" }}>
                  ₦{revenue.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7 }}>
                  <span style={{ color: "#22c55e", fontSize: 9, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 }}>↑ {orderCount} orders</span>
                  <span style={{ color: "#252525", fontSize: 9, fontFamily: '"JetBrains Mono", monospace' }}>this {activeRange.toLowerCase()}</span>
                </div>

                {/* Sparkline */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginTop: 18, height: 34 }}>
                  {[34,50,42,66,54,72,60,78,68,86,76,100].map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${h}%`,
                      background: i === 11 ? branchColor : `${branchColor}${Math.round(10 + i * 7).toString(16).padStart(2,"0")}`,
                      borderRadius: "2px 2px 0 0",
                      transition: "background 0.5s ease",
                    }} />
                  ))}
                </div>
              </GlassCard>

              {/* All branches */}
              <GlassCard accent="#22c55e" style={{ padding: "20px 20px" }}>
                <Label>ALL BRANCHES</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {BRANCHES.map((b, i) => {
                    const bd = BRANCH_DATA[b];
                    const isActive = b === activeBranch;
                    const rev = activeRange === "Today" ? bd.todayRev : activeRange === "Week" ? bd.weekRev : bd.monthRev;
                    const maxRev = activeRange === "Today" ? 1360700 : activeRange === "Week" ? 8942300 : 56075100;
                    const barPct = Math.round((rev / maxRev) * 100);
                    return (
                      <div key={b} onClick={() => setActiveBranch(b)} style={{ cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", animation: "pulse 2s infinite", animationDelay: `${i * 0.4}s`, display: "block" }} />
                            <span style={{ color: isActive ? "#fff" : "#555", fontSize: 10, fontWeight: isActive ? 700 : 400, transition: "color 0.3s", fontFamily: '"DM Sans", sans-serif' }}>{b}</span>
                          </div>
                          <span style={{ color: isActive ? bd.color : "#333", fontSize: 10, fontFamily: '"Montserrat", sans-serif', fontWeight: 800, transition: "color 0.3s" }}>
                            ₦{(rev / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div style={{ height: 4, background: "#0e0e0e", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${barPct}%`, background: isActive ? bd.color : "#1e1e1e", borderRadius: 3, transition: "width 0.9s cubic-bezier(0.16,1,0.3,1), background 0.5s" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 16, paddingTop: 11, borderTop: "1px solid #111", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#1e1e1e", fontSize: 8, fontFamily: '"JetBrains Mono", monospace' }}>3 / 3 ACTIVE</span>
                  <span style={{ color: "#22c55e", fontSize: 8, fontFamily: '"JetBrains Mono", monospace' }}>↑ All live</span>
                </div>
              </GlassCard>
            </div>

            {/* Row 2: Payment breakdown */}
            <GlassCard accent="#a855f7" style={{ padding: "18px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <Label>PAYMENT BREAKDOWN · {activeRange.toUpperCase()}</Label>
                <span style={{ color: "#1e1e1e", fontSize: 8, fontFamily: '"JetBrains Mono", monospace', marginBottom: 12 }}>{activeBranch}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {data.payments.map((p) => {
                  const val = activeRange === "Today" ? p.today : activeRange === "Week" ? p.week : p.month;
                  return (
                    <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#383838", fontSize: 9, width: 58, fontFamily: '"JetBrains Mono", monospace', flexShrink: 0 }}>{p.label}</span>
                      <div style={{ flex: 1, height: 7, background: "#0a0a0a", borderRadius: 4, overflow: "hidden", border: "1px solid #141414" }}>
                        <div style={{ height: "100%", width: `${p.pct}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}cc)`, borderRadius: 4, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
                      </div>
                      <span style={{ color: p.color, fontSize: 11, fontWeight: 700, fontFamily: '"Montserrat", sans-serif', width: 90, textAlign: "right", flexShrink: 0, letterSpacing: "-0.02em" }}>₦{val.toLocaleString()}</span>
                      <span style={{ color: "#1e1e1e", fontSize: 9, width: 26, textAlign: "right", flexShrink: 0, fontFamily: '"JetBrains Mono", monospace' }}>{p.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Row 3: Live feed + Marshalls */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 11 }}>

              {/* Activity feed */}
              <GlassCard accent="#2B6FE6" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", animation: "pulse 1.5s infinite", display: "block" }} />
                    <Label>LIVE ACTIVITY</Label>
                  </div>
                  <span style={{ color: "#1a1a1a", fontSize: 8, fontFamily: '"JetBrains Mono", monospace', marginBottom: 12 }}>{activeBranch}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {visibleFeed.map((item, i) => (
                    <div key={`${item.text}-${i}`} style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "8px 0",
                      borderBottom: i < visibleFeed.length - 1 ? "1px solid #0d0d0d" : "none",
                      opacity: i === 0 ? 1 : Math.max(0.12, 1 - i * 0.3),
                      animation: i === 0 ? "feedIn 0.45s cubic-bezier(0.16,1,0.3,1)" : "none",
                    }}>
                      <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ color: i === 0 ? "#999" : "#2a2a2a", fontSize: 9.5, flex: 1, lineHeight: 1.4 }}>{item.text}</span>
                      <span style={{
                        background: `${item.tagColor}12`, color: item.tagColor,
                        border: `1px solid ${item.tagColor}28`,
                        borderRadius: 4, padding: "1px 6px",
                        fontSize: 8, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', flexShrink: 0,
                      }}>{item.tag}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Marshalls + shift */}
              <GlassCard accent="#a855f7" style={{ padding: "18px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
                <Label>MARSHALLS ON DUTY</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {data.marshalls.map((m, i) => (
                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: i > 0 ? 10 : 0, borderTop: i > 0 ? "1px solid #0d0d0d" : "none" }}>
                      <div style={{ width: 28, height: 28, background: `hsl(${140 + i * 110},40%,15%)`, border: `1px solid hsl(${140 + i * 110},40%,22%)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 10, fontWeight: 800, flexShrink: 0, fontFamily: '"Montserrat", sans-serif' }}>{m.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#bbb", fontSize: 10, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>{m.name}</div>
                        <div style={{ color: "#22c55e", fontSize: 8, fontFamily: '"JetBrains Mono", monospace', marginTop: 1 }}>{m.collected}</div>
                      </div>
                      <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", animation: "pulse 2s infinite", display: "block" }} />
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #0d0d0d", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Cash",     value: data.shift.cash,     color: "#22c55e" },
                    { label: "POS",      value: data.shift.pos,      color: "#2B6FE6" },
                    { label: "Transfer", value: data.shift.transfer,  color: "#a855f7" },
                    { label: "Pending",  value: String(data.shift.pending), color: data.shift.pending > 0 ? "#f97316" : "#252525" },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ color: "#1e1e1e", fontSize: 7, fontFamily: '"JetBrains Mono", monospace', marginBottom: 3 }}>{s.label}</div>
                      <div style={{ color: s.color, fontSize: 10, fontWeight: 700, fontFamily: '"Montserrat", sans-serif', letterSpacing: "-0.02em", transition: "color 0.3s" }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.2} }
          @keyframes feedIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
      </section>
    </>
  );
}
