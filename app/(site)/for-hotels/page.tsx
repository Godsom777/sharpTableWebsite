import type { Metadata } from 'next';
import { Cta } from '@/components/apple/Bits';

export const metadata: Metadata = {
  title: 'SharpTable for Hotels — Room Service, Outlet Charges & Keycard Logging',
  description: 'SharpTable for Nigerian hotels: room service ordering, outlet charges posted to the guest ledger, keycard logging, housekeeping and end-of-day reports.',
};

const TOOLS = [
  { t: 'Room service', d: 'Guests order from the room. Paid orders go to the kitchen.' },
  { t: 'Keycard logging', d: 'A record of who entered which room, and when.' },
  { t: 'Charge to room', d: 'Restaurant and bar charges post to the guest ledger with outlet, staff and time.' },
  { t: 'Housekeeping', d: 'Room lists from dirty to cleaning to inspected, with maintenance flags.' },
  { t: 'Approvals', d: 'Voids, discounts and rate overrides carry a reason and manager visibility.' },
  { t: 'End of day', d: 'Revenue, collections, outlet charges and room readiness in one report.' },
];

export default function ForHotelsPage() {
  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <p className="eyebrow">Hotels</p>
          <h1>Hotels too.</h1>
          <p className="sub">Room service and keycard logging.</p>
          <Cta more="See pricing" moreHref="/pricing" />
        </div>
      </section>

      <section className="tile pb">
        <div className="head"><h2>One system for the property.</h2></div>
        <div className="wrap">
          <div className="grid c3">
            {TOOLS.map((m) => (
              <div className="card" key={m.t}><h3>{m.t}</h3><p>{m.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="tile navy pb">
        <div className="head">
          <h2>₦3,000 per room.</h2>
          <p className="sub">Per month, minimum ₦75,000. Outlets included.</p>
          <div className="links">
            <a className="pill" href="/pricing">Get started</a>
            <a className="pill o" href="mailto:info@sharptable.com.ng">Get a quote ›</a>
          </div>
        </div>
      </section>
    </>
  );
}
