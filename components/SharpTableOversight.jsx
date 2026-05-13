"use client";
import { useState, useEffect, useRef } from "react";

function useCounter(target, duration = 2000, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * target));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, active]);
  return val;
}

const naira = (n) => `₦${n.toLocaleString()}`;
const LIME = "#b8f700";
const LIME_DIM = "rgba(184,247,0,0.08)";
const LIME_BORDER = "rgba(184,247,0,0.25)";

const BRANCHES = [
  { rank: 1, name: "Victoria Island", rev: 56075100, orders: 45, sessions: 12, avg: 1246113, pct: 100, stock: { tracked: 6, remaining: 84, low: 1, out: 0 } },
  { rank: 2, name: "Osapa London",    rev: 31240500, orders: 28, sessions: 8,  avg: 1115732, pct: 56,  stock: { tracked: 9, remaining: 61, low: 2, out: 1 } },
  { rank: 3, name: "Palm Beach",      rev: 18692000, orders: 19, sessions: 5,  avg: 983789,  pct: 33,  stock: { tracked: 7, remaining: 43, low: 0, out: 0 } },
];

const SCREENS = ["overview", "branches", "inventory"];
const SCREEN_MS = 5500;

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{ padding: "10px 12px", background: "#111", borderBottom: "1px solid #1e1e1e" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, background: LIME, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>👤</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 800, lineHeight: 1.1 }}>The Test Restaurant</div>
          <div style={{ color: "#555", fontSize: 8, marginTop: 1 }}>Welcome back, Chisom Ezekiel</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 26, height: 26, background: "#1a1a1a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>⚙️</div>
          <div style={{ position: "relative" }}>
            <div style={{ width: 26, height: 26, background: "#1a1a1a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🔔</div>
            <div style={{ position: "absolute", top: -2, right: -2, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 12, height: 12, fontSize: 7, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
          </div>
          <div style={{ width: 26, height: 26, background: LIME, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#000" }}>+</div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {["Overview", "Inventory", "Branches"].map((tab, i) => (
          <div key={i} style={{ padding: "5px 10px", fontSize: 9, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? LIME : "#444", borderBottom: i === 0 ? `2px solid ${LIME}` : "2px solid transparent", paddingBottom: 6 }}>{tab}</div>
        ))}
      </div>
    </div>
  );
}

// ── Overview screen ───────────────────────────────────────────────────────────
function OverviewScreen({ active }) {
  const totalRev = useCounter(56075100, 2200, active);
  const avgBranch = useCounter(18691700, 2400, active);

  return (
    <div style={{ padding: 12, animation: "fadeUp 0.4s ease" }}>
      <div style={{ color: "#444", fontSize: 8, letterSpacing: "0.1em", marginBottom: 4 }}>RESTAURANT OVERSIGHT</div>
      <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>Sales and stock watchtower</div>
      <div style={{ color: "#444", fontSize: 9, lineHeight: 1.5, marginBottom: 12 }}>View-only supervision across all branches, focused on revenue, orders, customer traffic, and stock health.</div>

      {/* Reporting window */}
      <div style={{ background: "#1a1a1a", borderRadius: 9, padding: "9px 12px", textAlign: "center", color: "#fff", fontSize: 10, fontWeight: 600, marginBottom: 14 }}>April 2026</div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        {/* Total Revenue */}
        <div style={{ background: "#111", borderRadius: 11, padding: "10px 11px" }}>
          <div style={{ width: 28, height: 28, background: "rgba(34,197,94,0.12)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginBottom: 6 }}>💰</div>
          <div style={{ color: "#555", fontSize: 8, marginBottom: 3 }}>Total Revenue</div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>{naira(totalRev)}</div>
          <div style={{ color: "#444", fontSize: 7, marginTop: 2 }}>April 2026</div>
        </div>
        {/* Total Orders */}
        <div style={{ background: "#111", borderRadius: 11, padding: "10px 11px" }}>
          <div style={{ width: 28, height: 28, background: "rgba(43,111,230,0.12)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginBottom: 6 }}>🛍</div>
          <div style={{ color: "#555", fontSize: 8, marginBottom: 3 }}>Total Orders</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>45</div>
          <div style={{ color: "#444", fontSize: 7, marginTop: 2 }}>Avg: ₦1,246,113/order</div>
        </div>
        {/* Locations */}
        <div style={{ background: "#111", borderRadius: 11, padding: "10px 11px" }}>
          <div style={{ width: 28, height: 28, background: LIME_DIM, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginBottom: 6 }}>🏪</div>
          <div style={{ color: "#555", fontSize: 8, marginBottom: 3 }}>Locations</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>3</div>
          <div style={{ color: LIME, fontSize: 7, marginTop: 2, fontWeight: 600 }}>3 active</div>
        </div>
        {/* Avg Revenue / Branch */}
        <div style={{ background: "#111", borderRadius: 11, padding: "10px 11px" }}>
          <div style={{ width: 28, height: 28, background: "rgba(168,85,247,0.1)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginBottom: 6 }}>📊</div>
          <div style={{ color: "#555", fontSize: 8, marginBottom: 3 }}>Avg Revenue / Branch</div>
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{naira(avgBranch)}</div>
          <div style={{ color: "#444", fontSize: 7, marginTop: 2 }}>Based on 3 active branches</div>
        </div>
      </div>

      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", background: LIME_DIM, border: `1px solid ${LIME_BORDER}`, borderRadius: 9 }}>
        <div style={{ width: 7, height: 7, background: LIME, borderRadius: "50%", animation: "pulse 1.8s infinite" }} />
        <span style={{ color: LIME, fontSize: 9, fontWeight: 700 }}>All 3 locations reporting live</span>
      </div>
    </div>
  );
}

// ── Branches screen ───────────────────────────────────────────────────────────
function BranchesScreen() {
  return (
    <div style={{ padding: 12, animation: "fadeUp 0.4s ease" }}>
      <div style={{ color: "#fff", fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Location Performance</div>
      <div style={{ color: "#444", fontSize: 8, marginBottom: 12 }}>Sorted by revenue for April 2026</div>

      {BRANCHES.map((b, i) => (
        <div key={i} style={{ background: "#111", borderRadius: 12, padding: "11px 12px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 22, height: 22, background: i === 0 ? LIME_DIM : "#1a1a1a", border: `1px solid ${i === 0 ? LIME_BORDER : "#222"}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? LIME : "#444", fontSize: 9, fontWeight: 700 }}>{b.rank}</div>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{b.name}</span>
            </div>
            <span style={{ color: i === 0 ? LIME : "#555", fontSize: 12, fontWeight: 800 }}>{naira(b.rev)}</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, marginBottom: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${b.pct}%`,
              background: i === 0 ? `linear-gradient(90deg, ${LIME}, rgba(184,247,0,0.6))` : "#2a2a2a",
              borderRadius: 2,
              transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#555", fontSize: 8 }}>{b.orders} orders</span>
            <span style={{ color: "#555", fontSize: 8 }}>{b.sessions} sessions</span>
            <span style={{ color: "#444", fontSize: 8 }}>Avg: {naira(b.avg)}/order</span>
          </div>
        </div>
      ))}

      {/* Live ops strip */}
      <div style={{ background: "#111", borderRadius: 12, padding: 11, marginTop: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Live Operations Monitor</div>
            <div style={{ color: "#444", fontSize: 8 }}>Today's sales + branch stock pressure</div>
          </div>
          <span style={{ color: "#444", fontSize: 8 }}>View only</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            { label: "SELLING TODAY", value: "3", sub: "Branches with ≥1 order" },
            { label: "TODAY'S ORDERS", value: "37", sub: "Avg ₦42,000/order" },
            { label: "STOCK ALERTS NOW", value: "3", sub: "Low or out of stock", warn: true },
            { label: "ADMIN COVERAGE", value: "3/3", sub: "All branches staffed", ok: true },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0a0a0a", borderRadius: 9, padding: "7px 9px" }}>
              <div style={{ color: "#444", fontSize: 7, letterSpacing: "0.06em", marginBottom: 3 }}>{s.label}</div>
              <div style={{ color: s.warn ? "#f59e0b" : s.ok ? LIME : "#fff", fontSize: 16, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#333", fontSize: 7, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Inventory screen ──────────────────────────────────────────────────────────
function InventoryScreen() {
  return (
    <div style={{ padding: 12, animation: "fadeUp 0.4s ease" }}>
      <div style={{ color: "#fff", fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Stock Health — All Branches</div>
      {BRANCHES.map((b, i) => (
        <div key={i} style={{ background: "#111", borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
            <div>
              <div style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{b.name}</div>
              <div style={{ color: "#444", fontSize: 8 }}>{b.sessions} sessions today</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#555", fontSize: 10 }}>{naira(b.rev)}</div>
              <div style={{ color: "#444", fontSize: 7 }}>{b.orders} orders today</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {[
              { label: "TRACKED STOCK", value: b.stock.tracked, color: "#fff" },
              { label: "REMAINING", value: b.stock.remaining, color: "#fff" },
              { label: "LOW STOCK", value: b.stock.low, color: b.stock.low > 0 ? "#f59e0b" : "#555" },
              { label: "OUT OF STOCK", value: b.stock.out, color: b.stock.out > 0 ? "#ef4444" : "#555" },
            ].map((s, j) => (
              <div key={j} style={{ background: "#0a0a0a", borderRadius: 8, padding: "7px 9px" }}>
                <div style={{ color: "#333", fontSize: 7, letterSpacing: "0.06em", marginBottom: 3 }}>{s.label}</div>
                <div style={{ color: s.color, fontSize: 15, fontWeight: 800, animation: s.color === "#f59e0b" ? "pulse 2s infinite" : "none" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SharpTableOversight() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setScreenIdx(s => (s + 1) % SCREENS.length), SCREEN_MS);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={ref} style={{
      background: "#050505",
      padding: "80px 24px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 44,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 600px 400px at 50% 50%, ${LIME_DIM} 0%, transparent 70%)` }} />

      {/* Headline */}
      <div style={{ textAlign: "center", maxWidth: 540, position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: LIME_DIM, border: `1px solid ${LIME_BORDER}`, borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: LIME, borderRadius: "50%", animation: "pulse 2s infinite" }} />
          <span style={{ color: LIME, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Multi-Branch Oversight</span>
        </div>
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          3 branches. 1 screen.<br />
          <span style={{ color: LIME }}>Total visibility.</span>
        </h2>
        <p style={{ color: "#4a4a4a", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
          See revenue, orders, stock health, and admin coverage across every location — in real time. No calls, no guessing, no surprises.
        </p>
      </div>

      {/* Phone + side stats */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 20 }}>

        {/* Left callout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "absolute", left: -200, top: "50%", transform: "translateY(-50%)" }}>
          {[
            { icon: "🏪", label: "Victoria Island", value: "₦56.1M", color: LIME },
            { icon: "🏢", label: "Osapa London", value: "₦31.2M", color: "#fff" },
            { icon: "🌴", label: "Palm Beach", value: "₦18.7M", color: "#fff" },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#0e0e0e", border: `1px solid ${i === 0 ? LIME_BORDER : "#1a1a1a"}`,
              borderRadius: 11, padding: "8px 13px", minWidth: 148,
              opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 14 }}>{c.icon}</span>
                  <span style={{ color: "#777", fontSize: 9 }}>{c.label}</span>
                </div>
                {i === 0 && <div style={{ width: 6, height: 6, background: LIME, borderRadius: "50%", animation: "pulse 2s infinite" }} />}
              </div>
              <div style={{ color: c.color, fontSize: 16, fontWeight: 800, marginTop: 3 }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Phone */}
        <div style={{
          width: 280, background: "#0a0a0a", borderRadius: 44,
          border: "5px solid #1a1a1a",
          boxShadow: ["0 0 0 1px #242424", "0 60px 100px rgba(0,0,0,0.9)", `0 0 60px ${LIME_DIM}`].join(", "),
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div style={{ background: "#0a0a0a", height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 20, background: "#000", borderRadius: 10 }} />
          </div>
          <div style={{ maxHeight: 520, overflowY: "auto", background: "#000", scrollbarWidth: "none" }}>
            <Header />
            {SCREENS[screenIdx] === "overview" && <OverviewScreen active={visible && screenIdx === 0} />}
            {SCREENS[screenIdx] === "branches" && <BranchesScreen />}
            {SCREENS[screenIdx] === "inventory" && <InventoryScreen />}
          </div>
          <div style={{ height: 20, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 3, background: "#1e1e1e", borderRadius: 2 }} />
          </div>
        </div>

        {/* Right callout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "absolute", right: -205, top: "50%", transform: "translateY(-50%)" }}>
          {[
            { icon: "⚡", label: "Real-time sync", value: "Live data", color: LIME },
            { icon: "⚠️", label: "Stock alerts", value: "3 active", color: "#f59e0b" },
            { icon: "👥", label: "Admin coverage", value: "3 / 3", color: "#22c55e" },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#0e0e0e", border: "1px solid #1a1a1a",
              borderRadius: 11, padding: "8px 13px", minWidth: 148,
              opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(16px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.12}s, transform 0.5s ease ${0.1 + i * 0.12}s`,
            }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                <span style={{ fontSize: 14 }}>{c.icon}</span>
                <span style={{ color: "#555", fontSize: 9 }}>{c.label}</span>
              </div>
              <div style={{ color: c.color, fontSize: 16, fontWeight: 800 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen dots */}
      <div style={{ display: "flex", gap: 7 }}>
        {SCREENS.map((s, i) => (
          <div key={i} onClick={() => setScreenIdx(i)} style={{
            height: 6, width: i === screenIdx ? 24 : 6,
            background: i === screenIdx ? LIME : "#1a1a1a",
            borderRadius: 3, cursor: "pointer",
            transition: "all 0.35s ease",
          }} />
        ))}
      </div>

      {/* Bottom stat strip */}
      <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "center", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.5s" }}>
        {[
          { num: "₦56.1M", label: "tracked across branches" },
          { num: "3 / 3", label: "branches fully staffed" },
          { num: "< 2s", label: "data refresh rate" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ color: LIME, fontSize: 22, fontWeight: 800 }}>{s.num}</div>
            <div style={{ color: "#444", fontSize: 11, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>
    </section>
  );
}
