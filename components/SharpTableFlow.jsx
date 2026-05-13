"use client";
import { useState, useEffect } from "react";

// ── Phase system ──────────────────────────────────────────────────────────────
const PHASES = [
  'join',           // Customer: welcome / join table
  'menu',           // Customer: browsing menu
  'item_added',     // Customer: Smoked Fish added to cart
  'cart',           // Customer: cart + Pay Later visible
  'order_sent',     // ORDER FIRES — sync pulse lights up
  'marshall_sees',  // Marshall: pending order appears live
  'void_open',      // Marshall: void dialog opens (empty)
  'void_blocked',   // Marshall: void requires PIN — system blocks
];

const PHASE_LABELS = [
  'Customer scans QR code',
  'Browsing the menu',
  'Smoked Fish added to cart',
  'Reviewing order',
  'Order sent to kitchen ⚡',
  'Marshall sees it live',
  'Void attempt triggered',
  'System requires admin PIN',
];

const PHASE_MS = 3200;

// ── Phone shell ───────────────────────────────────────────────────────────────
function Phone({ children, glowColor }) {
  return (
    <div style={{
      width: 252,
      flexShrink: 0,
      background: '#0a0a0a',
      borderRadius: 42,
      border: '5px solid #1c1c1c',
      boxShadow: [
        '0 0 0 1px #272727',
        '0 50px 90px rgba(0,0,0,0.9)',
        glowColor ? `0 0 55px ${glowColor}18` : '',
      ].filter(Boolean).join(', '),
      overflow: 'hidden',
    }}>
      <div style={{ background: '#0a0a0a', height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 80, height: 20, background: '#000', borderRadius: 10 }} />
      </div>
      <div style={{ height: 510, overflowY: 'auto', overflowX: 'hidden', background: '#000', scrollbarWidth: 'none' }}>
        {children}
      </div>
      <div style={{ height: 20, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 80, height: 3, background: '#1e1e1e', borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ── CUSTOMER SCREENS ──────────────────────────────────────────────────────────

function CustomerJoin() {
  return (
    <div style={{ padding: 14, background: '#000', minHeight: '100%', fontFamily: 'system-ui', animation: 'fadeUp 0.4s ease' }}>
      <div style={{ color: '#555', fontSize: 10, marginBottom: 18 }}>← Back</div>
      <div style={{ background: '#1c1c1e', borderRadius: 20, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 68, height: 68, background: '#e91e8c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 26, fontWeight: 700 }}>E</div>
        <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#22c55e', fontSize: 10, fontWeight: 700 }}>✓</span>
          <span style={{ color: '#22c55e', fontSize: 10, fontWeight: 600 }}>Welcome back!</span>
        </div>
        <div style={{ color: '#fff', fontSize: 19, fontWeight: 800, textAlign: 'center' }}>Hi, Ezekiel!</div>
        <div style={{ color: '#666', fontSize: 10, textAlign: 'center', lineHeight: 1.5 }}>Great to see you again! You can update your name or continue.</div>
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: 20, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 9 }}>📍</span>
          <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700 }}>Table T-01</span>
        </div>
        <div style={{ width: '100%', background: '#2c2c2e', borderRadius: 12, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#444', fontSize: 13 }}>👤</span>
          <span style={{ color: '#fff', fontSize: 12 }}>Ezekiel</span>
        </div>
        <div style={{ width: '100%', background: '#ef4444', borderRadius: 12, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <span style={{ color: '#fff', fontSize: 12 }}>✓</span>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Join Table</span>
        </div>
        <div style={{ color: '#555', fontSize: 10 }}>Continue as guest</div>
      </div>
    </div>
  );
}

function CustomerMenu({ itemAdded }) {
  return (
    <div style={{ background: '#000', minHeight: '100%', fontFamily: 'system-ui', animation: 'fadeUp 0.4s ease' }}>
      <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>THE TEST RESTAURANT</span>
        <span style={{ fontSize: 14 }}>☀️</span>
      </div>
      <div style={{ padding: '0 14px 10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9 }}>📍</span>
          <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 600 }}>Table 01</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9 }}>🕐</span>
          <span style={{ color: '#666', fontSize: 9 }}>2h 56m left</span>
        </div>
      </div>
      {/* Category pills */}
      <div style={{ padding: '0 14px 12px', display: 'flex', gap: 7, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['All', 'Continental Dishes', 'Breakfast', 'Soups'].map((c, i) => (
          <div key={i} style={{ padding: '5px 11px', borderRadius: 7, whiteSpace: 'nowrap', background: i === 0 ? '#ef4444' : '#1c1c1e', color: i === 0 ? '#fff' : '#666', fontSize: 9, fontWeight: i === 0 ? 700 : 400 }}>{c}</div>
        ))}
      </div>
      {/* Food card */}
      <div style={{ margin: '0 14px', borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
        <div style={{ height: 185, background: 'linear-gradient(155deg, #7B3A10 0%, #C97825 35%, #B86B20 65%, #7B4020 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 64, opacity: 0.6, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>🐟</span>
          {itemAdded && (
            <div style={{ position: 'absolute', top: 10, right: 10, background: '#ef4444', borderRadius: 6, padding: '4px 8px', color: '#fff', fontSize: 9, fontWeight: 700, animation: 'popIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}>1 in cart</div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Smoked Fish</div>
            <div style={{ color: '#aaa', fontSize: 9, marginTop: 2 }}>Our signature, crafted with premium ingredients.</div>
          </div>
        </div>
        <div style={{ background: '#111', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <span style={{ background: '#1c1c1e', color: '#777', borderRadius: 20, padding: '2px 7px', fontSize: 8 }}>🕐 20 min prep</span>
            </div>
            <div style={{ color: '#ef4444', fontSize: 15, fontWeight: 800 }}>₦7,500</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ background: '#1c1c1e', width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>−</div>
            <div style={{ width: 26, textAlign: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>1</div>
            <div style={{ background: '#ef4444', width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>+</div>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0 6px', borderTop: '1px solid #1a1a1a', marginTop: 14 }}>
        {['MENU', 'ORDER', 'HISTORY', 'STATUS'].map((tab, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }}>
            <span style={{ fontSize: 13 }}>{['⊞', '🛍', '☰', '🕐'][i]}</span>
            <span style={{ color: i === 0 ? '#ef4444' : '#444', fontSize: 7, fontWeight: i === 0 ? 700 : 400 }}>{tab}</span>
            {tab === 'ORDER' && itemAdded && (
              <div style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 13, height: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700 }}>1</div>
            )}
            {i === 0 && <div style={{ width: 18, height: 2, background: '#ef4444', borderRadius: 1 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerCart() {
  return (
    <div style={{ background: '#000', minHeight: '100%', fontFamily: 'system-ui', animation: 'fadeUp 0.4s ease' }}>
      <div style={{ padding: '10px 14px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>THE TEST RESTAURANT</span>
      </div>
      <div style={{ padding: '0 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9 }}>📍</span>
          <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 600 }}>Table 01</span>
        </div>
      </div>
      {/* Shared cart banner */}
      <div style={{ margin: '0 14px 12px', border: '1px solid #2a2a2a', borderRadius: 11, padding: '9px 11px', display: 'flex', gap: 9, alignItems: 'center' }}>
        <div style={{ width: 34, height: 34, background: '#ef4444', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15 }}>👥</div>
        <div>
          <div style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>Shared Cart</div>
          <div style={{ color: '#555', fontSize: 8, marginTop: 1 }}>Everyone at this table sees the same orders.</div>
        </div>
      </div>
      <div style={{ padding: '0 14px' }}>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 3 }}>Your Cart</div>
        <div style={{ color: '#444', fontSize: 9, marginBottom: 12 }}>1 guest · 1 items</div>
        {/* Cart item */}
        <div style={{ border: '1px solid #ef4444', borderRadius: 11, padding: 10, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
              <div style={{ width: 22, height: 22, background: '#ef4444', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9 }}>✓</div>
              <div>
                <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Smoked Fish</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <div style={{ background: '#a855f7', color: '#fff', borderRadius: 3, padding: '1px 5px', fontSize: 7, fontWeight: 700 }}>Y</div>
                  <span style={{ color: '#a855f7', fontSize: 8 }}>You</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#ef4444', fontSize: 12, fontWeight: 700 }}>₦7,500</div>
              <div style={{ color: '#444', fontSize: 7 }}>₦7,500 × 1</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ background: '#1c1c1e', width: 25, height: 25, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13 }}>−</div>
              <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, width: 18, textAlign: 'center' }}>1</div>
              <div style={{ background: '#ef4444', width: 25, height: 25, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13 }}>+</div>
            </div>
            <div style={{ background: '#1c1c1e', width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 13 }}>🗑</div>
          </div>
        </div>
        {/* Table total */}
        <div style={{ background: '#111', borderRadius: 10, padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Table Total</div>
            <div style={{ color: '#444', fontSize: 8 }}>1 item</div>
          </div>
          <div style={{ color: '#ef4444', fontSize: 17, fontWeight: 900 }}>₦7,500</div>
        </div>
        {/* Pay Later - primary */}
        <div style={{ background: '#ef4444', borderRadius: 11, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
          <span style={{ fontSize: 13 }}>🛍</span>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Pay Later</span>
        </div>
        <div style={{ color: '#444', fontSize: 8, textAlign: 'center', marginBottom: 9, lineHeight: 1.4 }}>Send order to the kitchen now. Settle the bill when you're ready to leave.</div>
        {/* Pay Now - secondary */}
        <div style={{ border: '1px solid #2a2a2a', borderRadius: 11, padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <span style={{ fontSize: 13 }}>💳</span>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Pay Now</span>
        </div>
      </div>
      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0 6px', borderTop: '1px solid #1a1a1a', marginTop: 14 }}>
        {['MENU', 'ORDER', 'HISTORY', 'STATUS'].map((tab, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }}>
            <span style={{ fontSize: 13 }}>{['⊞', '🛍', '☰', '🕐'][i]}</span>
            <span style={{ color: i === 1 ? '#ef4444' : '#444', fontSize: 7, fontWeight: i === 1 ? 700 : 400 }}>{tab}</span>
            {tab === 'ORDER' && <div style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 13, height: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700 }}>1</div>}
            {i === 1 && <div style={{ width: 18, height: 2, background: '#ef4444', borderRadius: 1 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderSentScreen() {
  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, animation: 'fadeUp 0.5s ease', padding: 20 }}>
      <div style={{ width: 72, height: 72, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, animation: 'popIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>✅</div>
      <div style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>Order Sent!</div>
      <div style={{ color: '#555', fontSize: 10, textAlign: 'center', lineHeight: 1.6, maxWidth: 160 }}>Your Smoked Fish is heading to the kitchen right now.</div>
      <div style={{ background: '#111', borderRadius: 10, padding: '10px 20px', border: '1px solid #1e1e1e' }}>
        <div style={{ color: '#22c55e', fontSize: 11, fontWeight: 700 }}>Smoked Fish × 1</div>
        <div style={{ color: '#444', fontSize: 9, marginTop: 3 }}>₦7,500 · Table T-01 · Pay on exit</div>
      </div>
    </div>
  );
}

// ── MARSHALL SCREENS ──────────────────────────────────────────────────────────

function MarshallHeader({ collected, pending, verified }) {
  return (
    <>
      <div style={{ padding: '8px 10px', background: '#111', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ width: 32, height: 32, background: '#ef4444', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>☰</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Marshall</div>
          <div style={{ color: '#22c55e', fontSize: 8, fontWeight: 700 }}>Tunde</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['🔊', '↺', '🖨', '→'].map((icon, i) => (
            <div key={i} style={{ width: 24, height: 24, background: i === 0 ? '#0e2a1a' : '#1e1e1e', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, border: i === 0 ? '1px solid rgba(34,197,94,0.2)' : 'none' }}>{icon}</div>
          ))}
        </div>
      </div>
      {/* Stats strip */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1e1e1e', background: '#0a0a0a' }}>
        {[
          { label: 'COLLECTED', value: collected, color: '#22c55e' },
          { label: 'PENDING', value: `${pending}`, color: pending > 0 ? '#f97316' : '#888' },
          { label: 'VERIFIED', value: `${verified}`, color: '#fff' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid #1e1e1e' : 'none' }}>
            <div style={{ color: '#444', fontSize: 7, letterSpacing: '0.06em', marginBottom: 3 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 13, fontWeight: 800, transition: 'color 0.3s' }}>{s.value}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', padding: '5px 8px', gap: 4, background: '#111', borderBottom: '1px solid #1e1e1e', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['Live', 'Tables', 'History', 'Receipts', 'Shift'].map((tab, i) => (
          <div key={i} style={{ padding: '4px 8px', borderRadius: 6, background: i === 0 ? '#0e2a1a' : '#1a1a1a', color: i === 0 ? '#22c55e' : '#555', fontSize: 8, fontWeight: i === 0 ? 700 : 400, whiteSpace: 'nowrap', border: i === 0 ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent' }}>{tab}</div>
        ))}
      </div>
    </>
  );
}

function MarshallLiveEmpty() {
  return (
    <div style={{ background: '#000', minHeight: '100%', animation: 'fadeUp 0.4s ease' }}>
      <MarshallHeader collected="₦0" pending={0} verified={0} />
      <div style={{ padding: 10 }}>
        <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 9, padding: '8px 10px', marginBottom: 10 }}>
          <div style={{ color: '#333', fontSize: 9, textAlign: 'center' }}>No WhatsApp remote orders currently.</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <div style={{ color: '#2a2a2a', fontSize: 9, letterSpacing: '0.07em', marginBottom: 10 }}>AWAITING PAYMENT</div>
          <div style={{ color: '#222', fontSize: 28 }}>○</div>
          <div style={{ color: '#2a2a2a', fontSize: 9, marginTop: 8 }}>No pending orders</div>
        </div>
      </div>
    </div>
  );
}

function MarshallLivePending() {
  return (
    <div style={{ background: '#000', minHeight: '100%', animation: 'fadeUp 0.4s ease' }}>
      <MarshallHeader collected="₦4,500" pending={1} verified={1} />
      <div style={{ padding: 10 }}>
        <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 9, padding: '7px 10px', marginBottom: 10 }}>
          <div style={{ color: '#333', fontSize: 8, textAlign: 'center' }}>No WhatsApp remote orders currently.</div>
        </div>
        {/* Awaiting payment header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, paddingBottom: 7, borderBottom: '1px solid rgba(249,115,22,0.3)' }}>
          <span style={{ color: '#f97316', fontSize: 8, fontWeight: 700, letterSpacing: '0.07em' }}>AWAITING PAYMENT</span>
          <div style={{ background: '#f97316', color: '#fff', borderRadius: 4, padding: '1px 5px', fontSize: 8, fontWeight: 700 }}>1</div>
        </div>
        <div style={{ color: '#555', fontSize: 7, marginBottom: 9 }}>Tap card to verify · Swipe right for quick verify</div>
        {/* Order card */}
        <div style={{ border: '1px solid rgba(34,197,94,0.35)', borderRadius: 11, padding: 10, animation: 'popIn 0.5s cubic-bezier(0.16,1,0.3,1)', background: 'rgba(34,197,94,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 3 }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Table T-01</span>
                <span style={{ color: '#22c55e', fontSize: 10, fontWeight: 700 }}>Ezekiel</span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ background: '#111', color: '#777', borderRadius: 4, padding: '1px 5px', fontSize: 7 }}>DINE-IN</span>
                <span style={{ color: '#444', fontSize: 7 }}>Main · 4 seats</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#777', fontSize: 8 }}>2:05</div>
              <div style={{ color: '#444', fontSize: 7 }}>1 item</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <span style={{ color: '#555', fontSize: 8 }}>01</span>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Smoked Fish</span>
              </div>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>₦7,500</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 9 }}>
              <span style={{ color: '#444', fontSize: 7 }}>₦7,500 × Qt. 1</span>
              <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '1px 5px', fontSize: 7 }}>KITCHEN</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ color: '#444', fontSize: 8 }}>Subtotal</span>
              <span style={{ color: '#888', fontSize: 8 }}>₦7,500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>Total</span>
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>₦7,500</span>
            </div>
            <div style={{ background: '#f97316', borderRadius: 8, padding: '10px', textAlign: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>Complete Payment</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarshallVoidDialog({ filled }) {
  return (
    <div style={{ background: '#000', minHeight: '100%', animation: 'fadeUp 0.4s ease' }}>
      <MarshallHeader collected="₦4,500" pending={1} verified={1} />
      <div style={{ padding: 10 }}>
        <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 14, overflow: 'hidden' }}>
          {/* Dialog header */}
          <div style={{ padding: '11px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e1e1e' }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>Table T-01</span>
            <div style={{ width: 22, height: 22, background: '#1e1e1e', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 10 }}>✕</div>
          </div>
          <div style={{ padding: 12 }}>
            {/* Void header */}
            <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🗑</div>
              <div>
                <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Void Order</div>
                <div style={{ color: '#555', fontSize: 8 }}>Requires Location Admin void PIN</div>
              </div>
            </div>
            {/* Summary */}
            <div style={{ background: '#0e0e0e', borderRadius: 8, padding: '8px 10px', marginBottom: 11 }}>
              {[['Table', 'T-01'], ['Items', '1'], ['Total', '₦7,500']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ color: '#555', fontSize: 8 }}>{k}</span>
                  <span style={{ color: v === '₦7,500' ? '#ef4444' : '#ccc', fontSize: 8, fontWeight: v === '₦7,500' ? 700 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
            {/* Void reason */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#444', fontSize: 7, letterSpacing: '0.07em', marginBottom: 5 }}>VOID REASON</div>
              <div style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 8, padding: '9px 10px', minHeight: 48 }}>
                <span style={{ color: filled ? '#fff' : '#333', fontSize: 9 }}>{filled ? 'Customer changed their mind' : 'Explain why this needs to be voided'}</span>
              </div>
            </div>
            {/* PIN */}
            <div style={{ marginBottom: 13 }}>
              <div style={{ color: '#444', fontSize: 7, letterSpacing: '0.07em', marginBottom: 5 }}>VOIDER PIN</div>
              <div style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 8, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#444', fontSize: 11 }}>🔒</span>
                {filled ? (
                  <div style={{ display: 'flex', gap: 7 }}>
                    {[0,1,2,3,4].map(i => <div key={i} style={{ width: 7, height: 7, background: '#ccc', borderRadius: '50%' }} />)}
                  </div>
                ) : (
                  <span style={{ color: '#333', fontSize: 9, letterSpacing: '0.12em' }}>Enter 4-digit PIN</span>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 8, padding: '9px', textAlign: 'center', color: '#666', fontSize: 9 }}>Cancel</div>
              <div style={{
                flex: 1, borderRadius: 8, padding: '9px',
                background: filled ? '#ef4444' : '#111',
                border: `1px solid ${filled ? '#ef4444' : '#1e1e1e'}`,
                textAlign: 'center',
                color: filled ? '#fff' : '#333',
                fontSize: 9, fontWeight: filled ? 700 : 400,
                transition: 'all 0.4s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
                {filled && <span style={{ fontSize: 9 }}>🗑</span>}
                Confirm Void
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sync connector ────────────────────────────────────────────────────────────
function SyncConnector({ active }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 6px', gap: 4, minWidth: 46 }}>
      <div style={{ color: active ? '#f59e0b' : 'transparent', fontSize: 7, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.5s', textAlign: 'center', lineHeight: 1.3 }}>LIVE{'\n'}SYNC</div>
      <div style={{ width: 1, height: 44, background: active ? 'linear-gradient(to bottom, transparent, #f59e0b)' : '#111', transition: 'background 0.5s' }} />
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: active ? 'rgba(245,158,11,0.15)' : '#0a0a0a', border: `1px solid ${active ? '#f59e0b' : '#1a1a1a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, transition: 'all 0.5s', animation: active ? 'pulse 1.2s infinite' : 'none' }}>⚡</div>
      <div style={{ width: 1, height: 44, background: active ? 'linear-gradient(to top, transparent, #22c55e)' : '#111', transition: 'background 0.5s' }} />
      <div style={{ color: active ? '#22c55e' : 'transparent', fontSize: 7, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.5s', textAlign: 'center', lineHeight: 1.3 }}>REAL{'\n'}TIME</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SharpTableFlow() {
  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhaseIdx(p => (p + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[phaseIdx];
  const syncActive = phase === 'order_sent' || phase === 'marshall_sees';

  const customerContent = () => {
    if (phase === 'join') return <CustomerJoin />;
    if (phase === 'menu') return <CustomerMenu itemAdded={false} />;
    if (phase === 'item_added') return <CustomerMenu itemAdded={true} />;
    if (phase === 'cart') return <CustomerCart />;
    return <OrderSentScreen />;
  };

  const marshallContent = () => {
    if (['join', 'menu', 'item_added', 'cart', 'order_sent'].includes(phase)) return <MarshallLiveEmpty />;
    if (phase === 'marshall_sees') return <MarshallLivePending />;
    if (phase === 'void_open') return <MarshallVoidDialog filled={false} />;
    if (phase === 'void_blocked') return <MarshallVoidDialog filled={true} />;
    return <MarshallLiveEmpty />;
  };

  return (
    <section style={{
      background: '#050505',
      padding: '72px 20px 56px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 36,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

      {/* Headline */}
      <div style={{ textAlign: 'center', maxWidth: 520, position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
          <div style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#f59e0b', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>End-to-End Flow</span>
        </div>
        <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 800, lineHeight: 1.15, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Guest orders. Kitchen fires.<br />
          <span style={{ color: '#f59e0b' }}>Nothing slips.</span>
        </h2>
        <p style={{ color: '#4a4a4a', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Watch a real order move from QR scan to Marshall verification — and see exactly what happens when someone tries to void without authorization.
        </p>
      </div>

      {/* Column labels */}
      <div style={{ display: 'flex', width: '100%', maxWidth: 600, justifyContent: 'space-between', padding: '0 12px' }}>
        <div style={{ width: 252, textAlign: 'center' }}>
          <div style={{ color: '#ef4444', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>● Guest Experience</div>
        </div>
        <div style={{ width: 46 }} />
        <div style={{ width: 252, textAlign: 'center' }}>
          <div style={{ color: '#22c55e', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>● Marshall View</div>
        </div>
      </div>

      {/* Dual phones */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Phone glowColor="#ef4444">{customerContent()}</Phone>
        <SyncConnector active={syncActive} />
        <Phone glowColor="#22c55e">{marshallContent()}</Phone>
      </div>

      {/* Phase dots + label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {PHASES.map((_, i) => (
            <div key={i} onClick={() => setPhaseIdx(i)} style={{ width: i === phaseIdx ? 22 : 6, height: 6, background: i === phaseIdx ? '#f59e0b' : '#1e1e1e', borderRadius: 3, cursor: 'pointer', transition: 'all 0.35s ease' }} />
          ))}
        </div>
        <div style={{ color: '#2a2a2a', fontSize: 9, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
          {PHASE_LABELS[phaseIdx]}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
