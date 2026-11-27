import type { Metadata } from 'next';
import { Cta, DEMO_URL, WA_URL } from '@/components/apple/Bits';
import {
  IconBed,
  IconBranch,
  IconClock,
  IconEye,
  IconKey,
  IconReceipt,
} from '@/components/apple/Icons';
import { Reveal } from '@/components/apple/StoryVisuals';

export const metadata: Metadata = {
  title: 'SharpTable for Hotels | Room Service, Outlet Charges & Keycard Logging',
  description:
    'SharpTable for Nigerian hotels: room service ordering, outlet charges posted to the guest ledger, keycard logging, housekeeping and end-of-day reports.',
};

const TOOLS = [
  {
    icon: <IconBed size={20} />,
    t: 'Room service',
    d: 'Guests scan in their room and order. Paid orders go straight to the kitchen.',
  },
  {
    icon: <IconKey size={20} />,
    t: 'Keycard logging',
    d: 'A clear record of who entered which room, and exactly when.',
  },
  {
    icon: <IconReceipt size={20} />,
    t: 'Charge to room',
    d: 'Restaurant and bar charges post straight to the guest ledger with outlet, staff name and time.',
  },
  {
    icon: <IconClock size={20} />,
    t: 'Housekeeping',
    d: 'Track rooms from dirty to cleaning to inspected, with maintenance flags.',
  },
  {
    icon: <IconEye size={20} />,
    t: 'Approvals',
    d: 'Voids, discounts and rate overrides carry a reason and live manager visibility.',
  },
  {
    icon: <IconBranch size={20} />,
    t: 'End of day',
    d: 'Revenue, collections, outlet charges and room readiness in one clear report.',
  },
];

export default function ForHotelsPage() {
  return (
    <>
      <section className="tile hero-band">
        <div className="head">
          <h1>Built for hotels too</h1>
          <p className="sub">
            Room service, room ledgers, keycard logging and housekeeping, connected directly to
            your restaurant and bar.
          </p>
          <Cta
            href={DEMO_URL}
            label="Book a demo"
            more="Chat on WhatsApp"
            moreHref={WA_URL}
            text="See pricing"
            textHref="/pricing"
          />
        </div>
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>One system for the whole property</h2>
            <p className="sub">
              No juggling separate restaurant software and hotel tools. Every room and outlet stays
              in sync.
            </p>
          </div>
        </Reveal>
        <div className="wrap">
          <div className="grid c3">
            {TOOLS.map((m, idx) => (
              <Reveal key={m.t} delay={idx * 0.06}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="ic">{m.icon}</div>
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tile navy pb">
        <Reveal>
          <div className="head">
            <h2>₦3,000 per room each month</h2>
            <p className="sub">Minimum ₦75,000 per month. On-property outlets included.</p>
            <div className="links">
              <a className="pill" href={DEMO_URL}>
                Book a demo
              </a>
              <a className="pill o" href="mailto:info@sharptable.com.ng">
                Get a quote ›
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
