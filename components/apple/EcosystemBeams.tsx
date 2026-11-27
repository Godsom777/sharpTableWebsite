'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBed,
  IconBox,
  IconChef,
  IconMessage,
  IconQr,
  IconReceipt,
  IconShieldBlock,
  IconShieldCheck,
  IconUsers,
} from './Icons';

/**
 * Interactive Animated Light-Beam Diagram (inspired by Magic UI AnimatedBeam).
 * Visually shows how a single guest order flows through SharpTable's Payment Gate
 * to update the Kitchen, Named Staff Audit, Live Inventory, and End-of-Day Report —
 * or stops cleanly at the gate if unpaid.
 */
export function EcosystemBeams() {
  const [mode, setMode] = useState<'paid' | 'unpaid'>('paid');
  const isPaid = mode === 'paid';

  const inputs = [
    { icon: <IconQr size={17} />, label: 'Table QR' },
    { icon: <IconMessage size={17} />, label: 'WhatsApp' },
    { icon: <IconBed size={17} />, label: 'Hotel Room' },
  ];

  const outputs = [
    {
      icon: <IconChef size={17} />,
      title: 'Kitchen Display',
      sub: 'Paid ticket queued by table',
    },
    {
      icon: <IconUsers size={17} />,
      title: 'Named Staff Log',
      sub: 'Tagged to worker’s own name',
    },
    {
      icon: <IconBox size={17} />,
      title: 'Live Inventory',
      sub: 'Stock deducted automatically',
    },
    {
      icon: <IconReceipt size={17} />,
      title: 'End-of-Day Report',
      sub: 'Daily totals updated live',
    },
  ];

  return (
    <div className="beam-shell">
      <div className="beam-card">
        <div className="beam-toolbar">
          <div className="sim-mode-group" role="group" aria-label="Simulate payment outcome">
            <button
              type="button"
              className="sim-mode-btn"
              aria-pressed={isPaid}
              onClick={() => setMode('paid')}
            >
              Paid order
            </button>
            <button
              type="button"
              className="sim-mode-btn danger"
              aria-pressed={!isPaid}
              onClick={() => setMode('unpaid')}
            >
              Try unpaid order
            </button>
          </div>
          <span className={`beam-live-note ${isPaid ? 'ok' : 'blocked'}`}>
            {isPaid
              ? 'Payment verified: all 4 systems update automatically'
              : 'Payment missing: blocked at the gate, nothing fires'}
          </span>
        </div>

        {/* Desktop Interactive Animated Beam Architecture */}
        <div className="beam-stage">
          {/* Animated SVG light-beam rails behind the 3 columns */}
          <svg
            className="beam-svg"
            viewBox="0 0 960 340"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Left inputs -> Center hub */}
            {['M 195 68 C 310 68, 330 170, 425 170', 'M 195 170 L 425 170', 'M 195 272 C 310 272, 330 170, 425 170'].map(
              (d, i) => (
                <g key={`in-${i}`}>
                  <path d={d} stroke="rgba(11, 27, 51, 0.1)" strokeWidth="2" />
                  <motion.path
                    d={d}
                    stroke={isPaid ? '#0a66c2' : '#c42b2b'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="32 220"
                    animate={{ strokeDashoffset: [252, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.45,
                    }}
                  />
                </g>
              )
            )}

            {/* Center hub -> Right outputs */}
            {[
              'M 535 170 C 625 170, 640 48, 745 48',
              'M 535 170 C 625 170, 640 128, 745 128',
              'M 535 170 C 625 170, 640 212, 745 212',
              'M 535 170 C 625 170, 640 292, 745 292',
            ].map((d, i) => (
              <g key={`out-${i}`}>
                <path
                  d={d}
                  stroke={isPaid ? 'rgba(11, 27, 51, 0.1)' : 'rgba(11, 27, 51, 0.05)'}
                  strokeWidth="2"
                  strokeDasharray={isPaid ? undefined : '5 6'}
                />
                {isPaid && (
                  <motion.path
                    d={d}
                    stroke={i % 2 === 0 ? '#147a42' : '#d4a317'}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeDasharray="36 220"
                    animate={{ strokeDashoffset: [256, 0] }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.35 + i * 0.25,
                    }}
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Left Column: Order Entry Points */}
          <div className="beam-col beam-left">
            {inputs.map((inp) => (
              <div key={inp.label} className="beam-pill-node">
                <span className="beam-ic">{inp.icon}</span>
                <strong>{inp.label}</strong>
              </div>
            ))}
          </div>

          {/* Mobile-only vertical flow connector (inputs -> hub) */}
          <div className={`beam-v-arrow${isPaid ? ' paid' : ' blocked'}`} aria-hidden="true">
            <span className="beam-v-line" />
          </div>

          {/* Center Hub: SharpTable Payment Gate */}
          <div className="beam-col beam-center">
            <motion.div
              className={`beam-hub ${isPaid ? 'paid' : 'blocked'}`}
              animate={{ scale: isPaid ? [1, 1.03, 1] : 1 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="beam-hub-ic">
                {isPaid ? <IconShieldCheck size={28} /> : <IconShieldBlock size={28} />}
              </div>
              <div>
                <strong>{isPaid ? 'Payment Gate' : 'Blocked'}</strong>
                <span>{isPaid ? 'Verified' : 'Unpaid order'}</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile-only vertical flow connector (hub -> outputs) */}
          <div className={`beam-v-arrow${isPaid ? ' paid' : ' stopped'}`} aria-hidden="true">
            <span className="beam-v-line" />
          </div>

          {/* Right Column: 4 Synchronized Systems */}
          <div className="beam-col beam-right">
            {outputs.map((out) => (
              <div
                key={out.title}
                className={`beam-out-node${isPaid ? ' active' : ' dimmed'}`}
              >
                <span className="beam-ic">{out.icon}</span>
                <div>
                  <strong>{out.title}</strong>
                  <span>{isPaid ? out.sub : 'Waiting for payment'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
