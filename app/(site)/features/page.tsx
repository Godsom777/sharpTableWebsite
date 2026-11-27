import type { Metadata } from 'next';
import { Cap, Card, Cta, Demo, Phone, Screen, DEMO_URL, WA_URL } from '@/components/apple/Bits';
import {
  IconBox,
  IconBranch,
  IconEye,
  IconMessage,
  IconSplit,
  IconUsers,
} from '@/components/apple/Icons';
import { Reveal } from '@/components/apple/StoryVisuals';

export const metadata: Metadata = {
  title: 'Features | SharpTable Restaurant Operating System',
  description:
    'QR ordering and table payment, live kitchen display, owner oversight across branches, audit log, WhatsApp ordering, staff roles and inventory.',
};

const MORE = [
  {
    icon: <IconEye size={20} />,
    t: 'Audit log',
    d: 'Every void, discount and price edit recorded with staff name, table and exact time.',
  },
  {
    icon: <IconMessage size={20} />,
    t: 'WhatsApp ordering',
    d: 'Guests order on WhatsApp and pay before the ticket ever reaches your kitchen.',
  },
  {
    icon: <IconUsers size={20} />,
    t: 'Named staff roles',
    d: 'Every worker signs in under their own name and sees only what their role needs.',
  },
  {
    icon: <IconBox size={20} />,
    t: 'Inventory tracking',
    d: 'Track recipe availability and stock levels cleanly with low-stock alerts.',
  },
  {
    icon: <IconSplit size={20} />,
    t: 'Split bills',
    d: 'Friends at one table can each pick their own dishes and pay their share.',
  },
  {
    icon: <IconBranch size={20} />,
    t: 'Every branch',
    d: 'Sales, voids and discounts across all locations, with instant alerts.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="tile hero-band">
        <div className="head">
          <h1>From table to kitchen to close</h1>
          <p className="sub">
            Guests scan, order and pay at the table. Every tool your restaurant needs comes on
            every plan.
          </p>
          <Cta
            href={DEMO_URL}
            label="Book a demo"
            more="See pricing"
            moreHref="/pricing"
            text="Chat on WhatsApp"
            textHref={WA_URL}
          />
        </div>
        <div className="art dev">
          <Phone src="/app-shots/diner-menu.png" alt="SharpTable QR menu on a phone" priority />
        </div>
        <Demo />
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>Nothing unpaid gets cooked</h2>
            <p className="sub">
              Paid orders appear live by table number, with drinks separated cleanly from the main
              kitchen queue.
            </p>
          </div>
        </Reveal>
        <div className="art dev">
          <figure>
            <Screen
              kind="tablet"
              src="/app-shots/kitchen.webp"
              alt="SharpTable kitchen display with paid orders queued by table"
            />
            <Cap>Every order, in order</Cap>
          </figure>
        </div>
      </section>

      <section className="tile pale pb">
        <Reveal>
          <div className="head dash-h">
            <h2>Your floor, stock, and sales live</h2>
            <p className="sub">
              Update dishes and stock counts in seconds, review Cash, POS, Transfer and Card
              totals, and track every void across every branch.
            </p>
          </div>
        </Reveal>
        <div className="art dev">
          <div className="dash">
            <figure>
              <Screen
                kind="laptop"
                src="/app-shots/dashboard.webp"
                mobileSrc="/app-shots/dashboard-390.webp"
                alt="SharpTable owner dashboard menu manager with stock levels"
              />
              <Cap>Menu and stock, live</Cap>
            </figure>
            <figure>
              <Card
                src="/app-shots/history.webp"
                alt="SharpTable sales history with daily totals by payment type"
              />
              <Cap>End-of-day totals by payment type</Cap>
            </figure>
          </div>
        </div>
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>More tools built in</h2>
          </div>
        </Reveal>
        <div className="wrap">
          <div className="grid c3">
            {MORE.map((m, idx) => (
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
            <h2>Every feature on every plan</h2>
            <p className="sub">
              Start with one branch at ₦50,000/month and grow at your own pace.
            </p>
            <Cta href={DEMO_URL} label="Book a demo" more="See pricing" moreHref="/pricing" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
