import type { Metadata } from 'next';
import { Cta, Demo, Phone, Screen, Card, Cap } from '@/components/apple/Bits';

export const metadata: Metadata = {
  title: 'Features — SharpTable Restaurant Operating System',
  description: 'QR ordering and table payment, live kitchen display, owner oversight across branches, audit log, WhatsApp ordering, staff roles and inventory.',
};

const MORE = [
  { t: 'Audit log', d: 'Every void, discount and price edit, with staff name, table and time.' },
  { t: 'WhatsApp ordering', d: 'Paid orders go straight to the kitchen.' },
  { t: 'Staff roles', d: 'Each person sees only what their job needs.' },
  { t: 'Inventory', d: 'Stock levels with low-stock alerts.' },
  { t: 'Split bills', d: 'Guests at one table can each pay their share.' },
  { t: 'Every branch', d: 'Sales, voids and discounts across branches, with alerts.' },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="tile pale">
        <div className="head">
          <p className="eyebrow">Features</p>
          <h1>Order. Pay. Cook.</h1>
          <p className="sub">Guests scan, order and pay at the table.</p>
          <Cta more="See pricing" moreHref="/pricing" />
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu-390.png" alt="SharpTable QR menu on a phone" /></div>
        <Demo />
      </section>

      <section className="tile">
        <div className="head">
          <h2>Kitchen display.</h2>
          <p className="sub">Paid orders appear live. Nothing unpaid gets cooked.</p>
        </div>
        <div className="art dev"><figure><Screen kind="tablet" src="/app-shots/kitchen.webp" alt="SharpTable kitchen display with paid orders queued by table" /><Cap>Every order, in order.</Cap></figure></div>
      </section>

      <section className="tile pale">
        <div className="head dash-h">
          <h2>The admin app.</h2>
          <p className="sub">Sales, voids and discounts across every branch.</p>
        </div>
        <div className="art dev"><div className="dash"><figure><Screen kind="laptop" src="/app-shots/dashboard.webp" mobileSrc="/app-shots/dashboard-390.webp" alt="SharpTable owner dashboard menu manager" /><Cap>Your menu, live.</Cap></figure><figure><Card src="/app-shots/history.webp" alt="SharpTable sales history with daily totals by payment type" /><Cap>Every sale, accounted for.</Cap></figure></div></div>
      </section>

      <section className="tile pb">
        <div className="head"><h2>And the rest.</h2></div>
        <div className="wrap">
          <div className="grid c3">
            {MORE.map((m) => (
              <div className="card" key={m.t}><h3>{m.t}</h3><p>{m.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="tile navy pb">
        <div className="head">
          <h2>Every feature. Every plan.</h2>
          <Cta more="See pricing" moreHref="/pricing" />
        </div>
      </section>
    </>
  );
}
