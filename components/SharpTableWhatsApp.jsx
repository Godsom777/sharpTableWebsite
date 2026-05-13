"use client";
import { useState, useEffect, useRef } from "react";

const GREEN = "#22c55e";
const GREEN_DIM = "rgba(34,197,94,0.08)";
const GREEN_BORDER = "rgba(34,197,94,0.25)";

// WhatsApp chat phases
const CHAT_PHASES = ["idle", "message", "typing", "link", "ordered"];
const CHAT_MS = [2000, 1800, 1400, 2200, 99999];

// Browser screens
const SCREENS = ["menu", "review", "payment", "confirmed"];
const SCREEN_TRIGGERS = [2, 3, 3, 4]; // chat phase that triggers screen switch

const MENU_ITEMS = [
  { name: "Turkey Pepper Soup", price: "₦10,000" },
  { name: "Afang Soup", price: "₦4,000" },
  { name: "Egusi Soup", price: "₦4,000" },
  { name: "Fish Pepper Soup", price: "₦8,000" },
  { name: "Fisherman Soup", price: "₦20,000", selected: true },
  { name: "Full fish Pepper Soup", price: "₦27,000" },
  { name: "Goat Pepper Soup", price: "₦8,500" },
  { name: "Native Soup", price: "₦25,000" },
];

// ── WhatsApp chat panel ───────────────────────────────────────────────────────
function WhatsAppPanel({ chatPhase }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0d1117", fontFamily: "system-ui" }}>
      {/* WA Header */}
      <div style={{ background: "#1f2c34", padding: "10px 12px", display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 34, height: 34, background: GREEN, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🍽</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Test Restaurant</div>
          <div style={{ color: "#8696a0", fontSize: 9 }}>{chatPhase === "typing" ? "typing..." : "Business Account"}</div>
        </div>
        <div style={{ display: "flex", gap: 12, color: "#8696a0", fontSize: 14 }}>📞 ⋮</div>
      </div>

      {/* WA background pattern */}
      <div style={{ flex: 1, background: "#0d1117", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>

        {/* Date stamp */}
        <div style={{ textAlign: "center" }}>
          <span style={{ background: "#1f2c34", color: "#8696a0", fontSize: 8, borderRadius: 6, padding: "3px 8px" }}>TODAY</span>
        </div>

        {/* Customer message — always visible */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ background: "#005c4b", borderRadius: "10px 0 10px 10px", padding: "7px 10px", maxWidth: 180 }}>
            <div style={{ color: "#fff", fontSize: 10, lineHeight: 1.4 }}>Hi, I'd like to place an order for delivery please 🙏</div>
            <div style={{ color: "#8696a0", fontSize: 7, textAlign: "right", marginTop: 3 }}>07:32 ✓✓</div>
          </div>
        </div>

        {/* Restaurant first message */}
        {chatPhase !== "idle" && (
          <div style={{ display: "flex", justifyContent: "flex-start", animation: "fadeUp 0.4s ease" }}>
            <div style={{ background: "#1f2c34", borderRadius: "0 10px 10px 10px", padding: "7px 10px", maxWidth: 200 }}>
              <div style={{ color: "#fff", fontSize: 10, lineHeight: 1.5 }}>
                Hello! 👋 Welcome to Test Restaurant.<br />
                <span style={{ color: GREEN }}>Select your branch and start ordering below.</span>
              </div>
              <div style={{ color: "#8696a0", fontSize: 7, textAlign: "right", marginTop: 3 }}>07:32</div>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {chatPhase === "typing" && (
          <div style={{ display: "flex", justifyContent: "flex-start", animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "#1f2c34", borderRadius: "0 10px 10px 10px", padding: "10px 14px" }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, background: "#8696a0", borderRadius: "50%", animation: `bounce 1.2s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Link card */}
        {(chatPhase === "link" || chatPhase === "ordered") && (
          <div style={{ display: "flex", justifyContent: "flex-start", animation: "fadeUp 0.4s ease" }}>
            <div style={{ background: "#1f2c34", borderRadius: "0 10px 10px 10px", padding: "7px 10px", maxWidth: 210 }}>
              <div style={{ color: "#fff", fontSize: 10, lineHeight: 1.5, marginBottom: 7 }}>
                Tap to browse the menu for <span style={{ color: GREEN, fontWeight: 700 }}>Area H</span> and place your order 👇
              </div>
              {/* Link preview card */}
              <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", border: "1px solid #2a3942" }}>
                <div style={{ height: 50, background: "linear-gradient(135deg, #0f2a1a, #1a4a2a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🍲</div>
                <div style={{ padding: "7px 9px" }}>
                  <div style={{ color: GREEN, fontSize: 9, fontWeight: 700, marginBottom: 2 }}>Test Restaurant • Area H</div>
                  <div style={{ color: "#8696a0", fontSize: 8 }}>app.sharptable.com.ng/...</div>
                </div>
              </div>
              <div style={{ color: "#8696a0", fontSize: 7, textAlign: "right", marginTop: 5 }}>07:33</div>
            </div>
          </div>
        )}

        {/* Order confirmation */}
        {chatPhase === "ordered" && (
          <div style={{ display: "flex", justifyContent: "flex-end", animation: "fadeUp 0.4s ease" }}>
            <div style={{ background: "#005c4b", borderRadius: "10px 0 10px 10px", padding: "7px 10px", maxWidth: 190 }}>
              <div style={{ color: "#fff", fontSize: 10, lineHeight: 1.4 }}>
                ✅ Just ordered Fisherman Soup — paid via OPay!
              </div>
              <div style={{ color: "#8696a0", fontSize: 7, textAlign: "right", marginTop: 3 }}>07:38 ✓✓</div>
            </div>
          </div>
        )}
      </div>

      {/* WA input bar */}
      <div style={{ background: "#1f2c34", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, background: "#2a3942", borderRadius: 20, padding: "7px 12px" }}>
          <div style={{ color: "#8696a0", fontSize: 9 }}>Message</div>
        </div>
        <div style={{ width: 34, height: 34, background: GREEN, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎤</div>
      </div>
    </div>
  );
}

// ── Mini browser panel ────────────────────────────────────────────────────────
function BrowserPanel({ screen }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#000", fontFamily: "system-ui" }}>
      {/* Browser chrome */}
      <div style={{ background: "#111", padding: "7px 10px", borderBottom: "1px solid #1e1e1e" }}>
        <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "5px 9px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, background: GREEN, borderRadius: "50%" }} />
          <span style={{ color: "#555", fontSize: 8 }}>app.sharptable.com.ng</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {screen === "menu" && <MenuScreen />}
        {screen === "review" && <ReviewScreen />}
        {screen === "payment" && <PaymentScreen />}
        {screen === "confirmed" && <ConfirmedScreen />}
      </div>
    </div>
  );
}

function MenuScreen() {
  return (
    <div style={{ background: "#000", padding: "10px", animation: "fadeUp 0.4s ease" }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: "#1a1a1a", borderRadius: 1, marginBottom: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "33%", background: GREEN, borderRadius: 1 }} />
      </div>
      <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, marginBottom: 10 }}>Area H</div>

      {/* Search bar */}
      <div style={{ background: "#111", borderRadius: 9, padding: "8px 11px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#555", fontSize: 9 }}>Search menu</span>
        <span style={{ color: "#fff", fontSize: 9 }}>Soup</span>
      </div>
      <div style={{ color: "#555", fontSize: 8, marginBottom: 10 }}>20 results for "soup"</div>
      <div style={{ color: "#ccc", fontSize: 10, fontWeight: 600, marginBottom: 8 }}>Select items (Optional)</div>

      {MENU_ITEMS.map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "9px 0", borderBottom: "1px solid #111",
        }}>
          <span style={{ color: item.selected ? "#fff" : "#888", fontSize: 10, fontWeight: item.selected ? 600 : 400 }}>{item.name} — {item.price}</span>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: item.selected ? GREEN : "transparent",
            border: `2px solid ${item.selected ? GREEN : "#2a2a2a"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, color: "#000",
          }}>{item.selected ? "✓" : ""}</div>
        </div>
      ))}

      <div style={{ background: GREEN, borderRadius: 10, padding: "12px", textAlign: "center", color: "#000", fontSize: 11, fontWeight: 800, marginTop: 12 }}>Continue</div>
      <div style={{ color: "#333", fontSize: 8, textAlign: "center", marginTop: 8 }}>Managed by Test Restaurant. <span style={{ color: GREEN }}>Learn more</span></div>
    </div>
  );
}

function ReviewScreen() {
  return (
    <div style={{ background: "#000", padding: 10, animation: "fadeUp 0.4s ease" }}>
      <div style={{ height: 3, background: "#1a1a1a", borderRadius: 1, marginBottom: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "66%", background: GREEN, borderRadius: 1 }} />
      </div>
      <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, marginBottom: 10 }}>Review your Order</div>

      {[
        ["1 × Fisherman Soup", "₦20,000"],
        ["Total", "₦20,000"],
        ["Fulfillment", "delivery"],
        ["Customer", "Testing"],
        ["Notes", "Don't add too much Onions please"],
        ["Address", "No. 2b Industrial Street Elekwerenwa"],
        ["Delivery notes", "Gate pass: 565Fh"],
      ].map(([k, v], i) => (
        <div key={i} style={{ padding: "6px 0", borderBottom: i < 6 ? "1px solid #111" : "none" }}>
          {i === 0 ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc", fontSize: 10 }}>{k}</span>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{v}</span>
            </div>
          ) : (
            <div>
              <span style={{ color: "#555", fontSize: 8 }}>{k}: </span>
              <span style={{ color: "#999", fontSize: 9 }}>{v}</span>
            </div>
          )}
        </div>
      ))}

      <div style={{ background: GREEN, borderRadius: 10, padding: "12px", textAlign: "center", color: "#000", fontSize: 11, fontWeight: 800, marginTop: 14 }}>Place Order</div>
      <div style={{ color: "#333", fontSize: 8, textAlign: "center", marginTop: 8 }}>Managed by Test Restaurant. <span style={{ color: GREEN }}>Learn more</span></div>
    </div>
  );
}

function PaymentScreen() {
  return (
    <div style={{ background: "#fff", height: "100%", padding: 14, animation: "fadeUp 0.4s ease", fontFamily: "system-ui" }}>
      {/* Paystack header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #f0f0f0" }}>
        <span style={{ fontSize: 16 }}>🏛</span>
        <span style={{ color: "#333", fontSize: 10 }}>Pay with Bank</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#888", fontSize: 8, marginBottom: 14 }}>
        <span>2348136772107@order...</span>
        <span style={{ color: "#22c55e", fontWeight: 700 }}>Pay NGN 25,000</span>
      </div>

      {/* OPay logo */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em" }}>
          <span style={{ color: "#22c55e" }}>○</span>
          <span style={{ color: "#222" }}>Pay</span>
        </div>
      </div>

      <div style={{ color: "#444", fontSize: 10, textAlign: "center", lineHeight: 1.6, marginBottom: 16 }}>
        Please tap the button below to authenticate with your bank
      </div>

      <div style={{ background: "#22c55e", borderRadius: 9, padding: "12px", textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Authenticate</div>
      <div style={{ color: "#aaa", fontSize: 9, textAlign: "center", marginBottom: 16 }}>Cancel</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <div style={{ flex: 1, border: "1px solid #e0e0e0", borderRadius: 7, padding: "8px", textAlign: "center", color: "#555", fontSize: 8 }}>↔ Change Payment Method</div>
        <div style={{ flex: 1, border: "1px solid #e0e0e0", borderRadius: 7, padding: "8px", textAlign: "center", color: "#555", fontSize: 8 }}>✕ Cancel Payment</div>
      </div>

      <div style={{ color: "#bbb", fontSize: 8, textAlign: "center" }}>🔒 Secured by <strong>paystack</strong></div>
    </div>
  );
}

function ConfirmedScreen() {
  return (
    <div style={{ background: "#000", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 16, animation: "fadeUp 0.5s ease" }}>
      <div style={{ width: 64, height: 64, background: GREEN_DIM, border: `2px solid ${GREEN}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: "popIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}>✅</div>
      <div style={{ color: "#fff", fontSize: 15, fontWeight: 800 }}>Order Confirmed!</div>
      <div style={{ color: "#555", fontSize: 9, textAlign: "center", lineHeight: 1.6 }}>Fisherman Soup is being prepared for delivery to Industrial Street.</div>
      <div style={{ background: "#111", borderRadius: 9, padding: "9px 16px", border: "1px solid #1e1e1e", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#555", fontSize: 8 }}>Order</span>
          <span style={{ color: GREEN, fontSize: 8, fontWeight: 700 }}>Fisherman Soup × 1</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#555", fontSize: 8 }}>Total paid</span>
          <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>₦20,000</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555", fontSize: 8 }}>Via</span>
          <span style={{ color: "#fff", fontSize: 8 }}>OPay · WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SharpTableWhatsApp() {
  const [chatPhase, setChatPhase] = useState(0);
  const [browserScreen, setBrowserScreen] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let phase = 0;
    const advance = () => {
      phase = (phase + 1) % CHAT_PHASES.length;
      if (phase === 0) setBrowserScreen(0);
      setChatPhase(phase);
      // Sync browser screen
      if (phase === 2) setBrowserScreen(0); // menu
      if (phase === 3) setBrowserScreen(1); // review
      if (phase === 4) {
        setTimeout(() => setBrowserScreen(2), 600);  // payment
        setTimeout(() => setBrowserScreen(3), 2200); // confirmed
      }
      if (phase < CHAT_PHASES.length - 1) {
        setTimeout(advance, CHAT_MS[phase]);
      } else {
        // Reset full loop
        setTimeout(() => { phase = -1; setChatPhase(0); setBrowserScreen(0); advance(); }, 4000);
      }
    };
    const init = setTimeout(advance, CHAT_MS[0]);
    return () => clearTimeout(init);
  }, [visible]);

  return (
    <section ref={ref} style={{
      background: "#030303",
      padding: "80px 24px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 44,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 600px 400px at 50% 50%, ${GREEN_DIM} 0%, transparent 70%)` }} />

      {/* Headline */}
      <div style={{ textAlign: "center", maxWidth: 520, position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: GREEN, borderRadius: "50%", animation: "pulse 2s infinite" }} />
          <span style={{ color: GREEN, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>WhatsApp Ordering</span>
        </div>
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          Customers order on<br />
          <span style={{ color: GREEN }}>WhatsApp. Just like that.</span>
        </h2>
        <p style={{ color: "#4a4a4a", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
          No app download. No account. A customer messages your restaurant, picks from the full menu, pays via Paystack — and the order lands straight in your dashboard.
        </p>
      </div>

      {/* Dual phone layout */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* WhatsApp phone */}
        <div style={{
          width: 252, flexShrink: 0,
          background: "#0a0a0a", borderRadius: 42,
          border: "5px solid #1c1c1c",
          boxShadow: ["0 0 0 1px #242424", "0 50px 90px rgba(0,0,0,0.9)", `0 0 50px ${GREEN_DIM}`].join(", "),
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div style={{ background: "#0a0a0a", height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 20, background: "#000", borderRadius: 10 }} />
          </div>
          <div style={{ height: 510, overflow: "hidden" }}>
            <WhatsAppPanel chatPhase={CHAT_PHASES[chatPhase]} />
          </div>
          <div style={{ height: 20, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 3, background: "#1e1e1e", borderRadius: 2 }} />
          </div>
        </div>

        {/* Arrow connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ color: GREEN, fontSize: 16, animation: "arrowPulse 1.5s ease-in-out infinite" }}>→</div>
        </div>

        {/* Browser phone */}
        <div style={{
          width: 252, flexShrink: 0,
          background: "#0a0a0a", borderRadius: 42,
          border: "5px solid #1c1c1c",
          boxShadow: ["0 0 0 1px #242424", "0 50px 90px rgba(0,0,0,0.9)"].join(", "),
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          <div style={{ background: "#0a0a0a", height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 20, background: "#000", borderRadius: 10 }} />
          </div>
          <div style={{ height: 510, overflow: "hidden" }}>
            <BrowserPanel screen={SCREENS[browserScreen]} />
          </div>
          <div style={{ height: 20, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 80, height: 3, background: "#1e1e1e", borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div style={{ display: "flex", gap: 64, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
        <div style={{ textAlign: "center", width: 200 }}>
          <div style={{ color: GREEN, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>● Customer on WhatsApp</div>
          <div style={{ color: "#333", fontSize: 9 }}>Browses, orders, pays — without leaving the chat</div>
        </div>
        <div style={{ textAlign: "center", width: 200 }}>
          <div style={{ color: "#2B6FE6", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>● SharpTable checkout</div>
          <div style={{ color: "#333", fontSize: 9 }}>Full menu, order review, Paystack payment</div>
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 520 }}>
        {[
          "No app download required",
          "Full menu browsing",
          "Delivery address + notes",
          "Paystack payment",
          "Order lands in dashboard",
          "Works on any phone",
        ].map((f, i) => (
          <div key={i} style={{ background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, borderRadius: 20, padding: "5px 13px", color: GREEN, fontSize: 9, fontWeight: 600 }}>✓ {f}</div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes arrowPulse { 0%,100% { opacity: 0.3; transform: translateX(0); } 50% { opacity: 1; transform: translateX(3px); } }
      `}</style>
    </section>
  );
}
