"use client";
import { useState, useEffect, useRef } from "react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCounter(target, duration = 1800, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, active]);
  return val;
}

// ─── Notification queue ──────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { icon: "🛎", title: "New Order", body: "Table T-12 — 3 items placed", color: "#2B6FE6" },
  { icon: "✅", title: "Payment Confirmed", body: "₦8,500 via Transfer — Table T-7", color: "#22c55e" },
  { icon: "⚠️", title: "Stock Alert", body: "Chicken critical — 4 portions left", color: "#f59e0b" },
  { icon: "🔒", title: "Void Flagged", body: "Cashier: Emeka • Table T-5 • ₦3,200", color: "#a855f7" },
  { icon: "📦", title: "Order Sent to Kitchen", body: "Table T-22 — Jollof Rice ×2, Beef ×1", color: "#2B6FE6" },
];

const TABS = ["Menu", "Stock", "Stats", "History", "Settings"];
const TAB_CYCLE = ["Stats", "History", "Stock"];

// ─── Naira formatter ─────────────────────────────────────────────────────────
const naira = (n) => `₦${n.toLocaleString()}`;

// ─── Payment card component ──────────────────────────────────────────────────
function PayCard({ label, value, color, bg, border }) {
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 8,
      padding: "8px 10px",
    }}>
      <div style={{ color, fontSize: 13, fontWeight: 700 }}>{value}</div>
      <div style={{ color, fontSize: 9, opacity: 0.7, marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─── Stat box ────────────────────────────────────────────────────────────────
function StatBox({ label, value, color }) {
  return (
    <div style={{ background: "#2a2a2a", borderRadius: 8, padding: "8px 10px" }}>
      <div style={{ color, fontSize: 16, fontWeight: 700 }}>{value}</div>
      <div style={{ color: "#6b7280", fontSize: 9, marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SharpTableDashboard() {
  const [activeTab, setActiveTab] = useState("Stats");
  const [notification, setNotification] = useState(null);
  const [notifQueue, setNotifQueue] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const isStats = activeTab === "Stats";
  const isHistory = activeTab === "History";
  const isStock = activeTab === "Stock";

  const revenue = useCounter(1360700, 2200, isStats);
  const monthRevenue = useCounter(17245850, 2200, isHistory);

  // Intersection observer — start animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle tabs
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % TAB_CYCLE.length;
      setActiveTab(TAB_CYCLE[i]);
    }, 5000);
    return () => clearInterval(id);
  }, [visible]);

  // Notification toasts
  useEffect(() => {
    if (!visible) return;
    const show = () => {
      setNotifQueue((q) => {
        const notif = NOTIFICATIONS[q % NOTIFICATIONS.length];
        setNotification(notif);
        setTimeout(() => setNotification(null), 3500);
        return q + 1;
      });
    };
    show();
    const id = setInterval(show, 4500);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#080808",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        position: "relative",
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 700px 500px at 50% 60%, rgba(43,111,230,0.08) 0%, transparent 70%)",
      }} />

      {/* Header text */}
      <div style={{ textAlign: "center", maxWidth: 560, position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(43,111,230,0.12)", border: "1px solid rgba(43,111,230,0.3)",
          borderRadius: 20, padding: "4px 12px", marginBottom: 16,
        }}>
          <div style={{
            width: 6, height: 6, background: "#22c55e", borderRadius: "50%",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ color: "#2B6FE6", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Live Dashboard</span>
        </div>
        <h2 style={{
          color: "#fff", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800,
          lineHeight: 1.15, margin: "0 0 14px",
          letterSpacing: "-0.02em",
        }}>
          Your entire operation.<br />
          <span style={{ color: "#2B6FE6" }}>One screen.</span>
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
          Watch revenue flow in, kitchen sync in real time, and stock levels hold — across every branch.
        </p>
      </div>

      {/* Dashboard area */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Floating metric cards — LEFT */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 10,
          position: "absolute", left: -210, top: "50%", transform: "translateY(-50%)",
        }}>
          {[
            { label: "Month Revenue", value: "₦17.2M", sub: "May 2026", color: "#ef4444", icon: "📈" },
            { label: "Total Orders", value: "359", sub: "This month", color: "#2B6FE6", icon: "🛍" },
            { label: "Active Branches", value: "3", sub: "All live", color: "#22c55e", icon: "🏪" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: "#141414",
                border: "1px solid #222",
                borderRadius: 12,
                padding: "10px 14px",
                minWidth: 160,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: 18, fontWeight: 800 }}>{c.value}</div>
              <div style={{ color: "#fff", fontSize: 10, fontWeight: 600, marginTop: 2 }}>{c.label}</div>
              <div style={{ color: "#6b7280", fontSize: 9, marginTop: 1 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ── PHONE FRAME ─────────────────────────────────────────────────── */}
        <div style={{
          width: 300,
          background: "#111",
          borderRadius: 46,
          border: "6px solid #1e1e1e",
          boxShadow: [
            "0 0 0 1px #2a2a2a",
            "0 60px 120px rgba(0,0,0,0.9)",
            "0 0 80px rgba(43,111,230,0.12)",
            "inset 0 1px 0 rgba(255,255,255,0.05)",
          ].join(", "),
          overflow: "hidden",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>

          {/* Notch */}
          <div style={{
            background: "#111", height: 28, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 90, height: 22, background: "#000", borderRadius: 11 }} />
          </div>

          {/* Admin header */}
          <div style={{
            padding: "8px 12px", background: "#1a1a1a",
            display: "flex", alignItems: "center", gap: 8,
            borderBottom: "1px solid #242424",
          }}>
            <div style={{
              width: 34, height: 34, background: "#2B6FE6", borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, flexShrink: 0,
            }}>🍴</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>Admin Dashboard</div>
              <div style={{ color: "#555", fontSize: 9 }}>Welcome, Ezekiel</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[
                { icon: "↑", bg: "#2B6FE6" },
                { icon: "↺", bg: "#2a2a2a" },
                { icon: "⏏", bg: "#c0392b" },
              ].map((btn, i) => (
                <div key={i} style={{
                  width: 26, height: 26, background: btn.bg, borderRadius: 7,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                }}>{btn.icon}</div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", padding: "5px 8px", gap: 4,
            background: "#1a1a1a", borderBottom: "1px solid #242424",
            overflowX: "auto", scrollbarWidth: "none",
          }}>
            {TABS.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "4px 9px", borderRadius: 7,
                  background: activeTab === tab ? "#2B6FE6" : "#242424",
                  color: activeTab === tab ? "#fff" : "#666",
                  fontSize: 9, fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 3,
                  userSelect: "none",
                }}
              >
                {tab}
                {tab === "Stock" && (
                  <span style={{
                    background: "#ef4444", color: "#fff", borderRadius: 6,
                    padding: "0 3px", fontSize: 7, fontWeight: 700,
                  }}>33</span>
                )}
              </div>
            ))}
          </div>

          {/* ── Content area ── */}
          <div style={{
            height: 500, overflowY: "auto", scrollbarWidth: "none",
            background: "#0e0e0e",
          }}>

            {/* ─ STATS TAB ─ */}
            {isStats && (
              <div style={{ padding: 10, animation: "fadeSlide 0.4s ease" }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Sales Overview</div>

                <div style={{
                  border: "1px solid rgba(43,111,230,0.4)",
                  borderRadius: 12, padding: 10, marginBottom: 10,
                  background: "rgba(43,111,230,0.03)",
                }}>
                  {/* Live dot + Today */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{
                      width: 7, height: 7, background: "#ef4444", borderRadius: "50%",
                      animation: "pulse 1.5s infinite",
                    }} />
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>Today</span>
                  </div>

                  {/* 2×2 stat grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 8 }}>
                    <StatBox label="Total Revenue" value={naira(revenue)} color="#ef4444" />
                    <StatBox label="Sessions" value="11" color="#fff" />
                    <StatBox label="Paid Items" value="11" color="#22c55e" />
                    <StatBox label="In Kitchen" value="0" color="#3b82f6" />
                  </div>

                  {/* Payment breakdown */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                    <PayCard label="Cash" value="₦0" color="#22c55e" bg="rgba(34,197,94,0.08)" border="rgba(34,197,94,0.4)" />
                    <PayCard label="POS" value="₦105,800" color="#3b82f6" bg="rgba(59,130,246,0.08)" border="rgba(59,130,246,0.4)" />
                    <PayCard label="Transfer" value="₦192,400" color="#a855f7" bg="rgba(168,85,247,0.08)" border="rgba(168,85,247,0.4)" />
                    <PayCard label="D.Bill" value="₦42,800" color="#c9a227" bg="rgba(201,162,39,0.08)" border="rgba(201,162,39,0.4)" />
                  </div>
                </div>

                {/* Marshall Collections */}
                <div style={{ background: "#161616", borderRadius: 12, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                    <div style={{
                      width: 26, height: 26, background: "#2B6FE6", borderRadius: 7,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                    }}>👥</div>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Marshall Collections</span>
                  </div>
                  {[
                    { name: "Favor Ogochukwu", verif: 70, amount: "₦3,704,000", avatar: "#2B6FE6" },
                    { name: "Chioma Adeyemi", verif: 43, amount: "₦1,290,400", avatar: "#22c55e" },
                  ].map((m, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "6px 0",
                      borderTop: i > 0 ? "1px solid #222" : "none",
                    }}>
                      <div style={{
                        width: 28, height: 28, background: m.avatar, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0,
                      }}>{m.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{m.name}</div>
                        <div style={{ color: "#555", fontSize: 8 }}>{m.verif} verifications</div>
                      </div>
                      <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 700 }}>{m.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─ HISTORY TAB ─ */}
            {isHistory && (
              <div style={{ padding: 10, animation: "fadeSlide 0.4s ease" }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Sales History</div>

                <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                  <div style={{ background: "#ef4444", color: "#fff", borderRadius: 7, padding: "3px 9px", fontSize: 9, fontWeight: 600 }}>📅 Daily</div>
                  <div style={{ background: "#242424", color: "#777", borderRadius: 7, padding: "3px 9px", fontSize: 9 }}>🛍 Orders</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                  <span style={{ color: "#777", fontSize: 9 }}>Month: May 2026</span>
                  <div style={{ background: "#ef4444", color: "#fff", borderRadius: 5, padding: "2px 7px", fontSize: 8, fontWeight: 600 }}>🖨 Auditor Print</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 9 }}>
                  {[
                    { icon: "💰", label: "Revenue", value: naira(monthRevenue), color: "#ef4444" },
                    { icon: "🛍", label: "Orders", value: "359", color: "#fff" },
                    { icon: "💵", label: "Cash", value: "₦414,400", color: "#22c55e" },
                    { icon: "💳", label: "POS", value: "₦8,344,700", color: "#3b82f6" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "#161616", borderRadius: 9, padding: "7px 9px" }}>
                      <div style={{ fontSize: 13, marginBottom: 3 }}>{item.icon}</div>
                      <div style={{ color: "#555", fontSize: 8 }}>{item.label}</div>
                      <div style={{ color: item.color, fontSize: 11, fontWeight: 700, marginTop: 2 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ color: "#555", fontSize: 9, marginBottom: 7 }}>📅 Daily Breakdown (13 days)</div>
                {[
                  { day: "Today", badge: "Active", pct: "-80%", rev: "₦341,000", orders: 11, items: 64, hi: true },
                  { day: "Mon, May 11", pct: "-14%", rev: "₦1,677,000", orders: 24, items: 362, hi: false },
                  { day: "Sun, May 10", pct: "+86%", rev: "₦1,953,000", orders: 31, items: 410, hi: false },
                ].map((d, i) => (
                  <div key={i} style={{
                    background: "#161616",
                    border: `1px solid ${d.hi ? "#ef4444" : "#222"}`,
                    borderRadius: 9, padding: "7px 9px", marginBottom: 5,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{d.day}</span>
                        {d.badge && (
                          <span style={{ background: "#ef4444", color: "#fff", borderRadius: 3, padding: "1px 4px", fontSize: 7 }}>{d.badge}</span>
                        )}
                        <span style={{ color: d.pct.startsWith("+") ? "#22c55e" : "#ef4444", fontSize: 8 }}>{d.pct}</span>
                      </div>
                      <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 700 }}>{d.rev}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: "#555", fontSize: 8 }}>{d.orders} Orders</span>
                      <span style={{ color: "#555", fontSize: 8 }}>{d.items} Items</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─ STOCK TAB ─ */}
            {isStock && (
              <div style={{ padding: 10, animation: "fadeSlide 0.4s ease" }}>
                <div style={{ background: "#161616", borderRadius: 12, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                    <div style={{
                      width: 26, height: 26, background: "#22c55e", borderRadius: 7,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 10, fontWeight: 700,
                    }}>I</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Raw Ingredients</div>
                      <div style={{ color: "#555", fontSize: 8 }}>34 ingredients loaded</div>
                    </div>
                    <div style={{
                      background: "#22c55e", color: "#fff", borderRadius: 7,
                      padding: "3px 9px", fontSize: 9, fontWeight: 600,
                    }}>+ Add</div>
                  </div>

                  {[
                    { name: "Basmati Rice", qty: 12, alert: 5, low: false },
                    { name: "Beef", qty: 12, alert: 5, low: false },
                    { name: "Bushmeat", qty: 10, alert: 5, low: false },
                    { name: "Chicken", qty: 4, alert: 5, low: true },
                    { name: "Cow head", qty: 10, alert: 5, low: false },
                    { name: "Cow Leg", qty: 10, alert: 5, low: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "7px 0",
                      borderTop: i > 0 ? "1px solid #222" : "none",
                    }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 7,
                        background: item.low ? "#292010" : "#0f2a1a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: item.low ? "#f59e0b" : "#22c55e",
                        fontSize: 8, fontWeight: 700, flexShrink: 0,
                      }}>ST</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: "#555", fontSize: 8 }}>portions · alert at {item.alert}</div>
                      </div>
                      <div style={{
                        color: item.low ? "#f59e0b" : "#22c55e",
                        fontSize: 14, fontWeight: 800, marginRight: 5,
                        animation: item.low ? "pulse 2s infinite" : "none",
                      }}>{item.qty}</div>
                      <div style={{ display: "flex", gap: 3 }}>
                        <div style={{ background: "#222", color: "#777", borderRadius: 5, padding: "2px 5px", fontSize: 7 }}>Queue</div>
                        <div style={{ border: "1px solid #22c55e", color: "#22c55e", borderRadius: 5, padding: "2px 5px", fontSize: 7 }}>Edit</div>
                        <div style={{ border: "1px solid #ef4444", color: "#ef4444", borderRadius: 5, padding: "2px 5px", fontSize: 7 }}>✕</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─ MENU / SETTINGS placeholder ─ */}
            {(activeTab === "Menu" || activeTab === "Settings") && (
              <div style={{
                height: 400, display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 8, color: "#333",
              }}>
                <div style={{ fontSize: 36 }}>{activeTab === "Menu" ? "🍽" : "⚙️"}</div>
                <div style={{ fontSize: 11, color: "#444" }}>{activeTab}</div>
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div style={{
            height: 22, background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderTop: "1px solid #1e1e1e",
          }}>
            <div style={{ width: 90, height: 3, background: "#2a2a2a", borderRadius: 2 }} />
          </div>
        </div>

        {/* ── Floating notification toast ───────────────────────────────── */}
        {notification && (
          <div style={{
            position: "absolute",
            top: -10,
            right: -220,
            background: "#141414",
            border: `1px solid ${notification.color}55`,
            borderLeft: `3px solid ${notification.color}`,
            borderRadius: 12,
            padding: "10px 14px",
            width: 200,
            boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${notification.color}15`,
            animation: "toastIn 0.4s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 14 }}>{notification.icon}</span>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, flex: 1 }}>{notification.title}</span>
              <div style={{ width: 5, height: 5, background: notification.color, borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
            </div>
            <div style={{ color: "#777", fontSize: 9, lineHeight: 1.4 }}>{notification.body}</div>
          </div>
        )}

        {/* Floating metric cards — RIGHT */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 10,
          position: "absolute", right: -210, bottom: 60,
        }}>
          {[
            { label: "Fraud Caught", value: "₦0 slipped", sub: "Audit trail active", color: "#a855f7", icon: "🔒" },
            { label: "Stock Alerts", value: "33 items", sub: "Needs attention", color: "#f59e0b", icon: "📦" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: "#141414",
                border: "1px solid #222",
                borderRadius: 12,
                padding: "10px 14px",
                minWidth: 160,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: 18, fontWeight: 800 }}>{c.value}</div>
              <div style={{ color: "#fff", fontSize: 10, fontWeight: 600, marginTop: 2 }}>{c.label}</div>
              <div style={{ color: "#6b7280", fontSize: 9, marginTop: 1 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div style={{
        display: "flex", gap: 32, alignItems: "center", justifyContent: "center",
        flexWrap: "wrap",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
      }}>
        {[
          { num: "₦17.2M", label: "tracked this month" },
          { num: "359", label: "orders processed" },
          { num: "0", label: "revenue slipped" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ color: "#2B6FE6", fontSize: 24, fontWeight: 800 }}>{s.num}</div>
            <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(16px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
