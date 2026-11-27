import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq } from '@/components/apple/Faq';
import { Reveal } from '@/components/apple/StoryVisuals';

export const metadata: Metadata = {
  title: 'Partner Programme | SharpTable',
  description: 'Refer restaurants to SharpTable and get paid when they subscribe.',
};

const RATES = [
  { r: '50%', t: 'Of the first month', d: 'Monthly plans: 50% of the first month’s payment.' },
  { r: '20%', t: 'For 6 months', d: 'Monthly plans: 20% recurring for 6 consecutive months.' },
  { r: '30%', t: 'Yearly plans', d: 'Yearly plans: 30% flat, paid upfront.' },
];
const STEPS = [
  { t: 'Apply', d: 'Fill in a short form.' },
  { t: 'Get your link', d: 'Your referral link tracks sign-ups.' },
  { t: 'They subscribe', d: 'Restaurants that join through your link are tied to you.' },
  { t: 'You get paid', d: 'Payouts go to your bank account.' },
];
const FAQS = [
  { q: 'When are payouts made?', a: 'Within 7 business days of each successful client charge.' },
  { q: 'Is there a minimum?', a: 'No minimums.' },
  {
    q: 'Do I need technical skills?',
    a: 'No. You need relationships with restaurant owners.',
  },
  { q: 'What if a client cancels?', a: 'You keep what has already been paid to you.' },
];

export default function PartnershipPage() {
  return (
    <>
      <section className="tile hero-band pb">
        <div className="head">
          <h1>Earn with SharpTable</h1>
          <p className="sub">Refer restaurants and get paid when they subscribe.</p>
          <div className="links">
            <Link className="pill" href="/partnership/apply">
              Become a partner
            </Link>
          </div>
        </div>
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>What you earn</h2>
          </div>
        </Reveal>
        <div className="wrap">
          <div className="grid c3">
            {RATES.map((x, idx) => (
              <Reveal key={x.t} delay={idx * 0.08}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="price">{x.r}</div>
                  <h3 style={{ marginTop: 8 }}>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tile pale pb">
        <Reveal>
          <div className="head">
            <h2>How it works</h2>
          </div>
        </Reveal>
        <div className="wrap">
          <div className="grid c4">
            {STEPS.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.06}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="chapter-num-badge">{i + 1}</span>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>Partner questions</h2>
          </div>
        </Reveal>
        <Faq items={FAQS} />
        <div className="links" style={{ marginTop: 40 }}>
          <Link className="pill" href="/partnership/apply">
            Become a partner
          </Link>
        </div>
      </section>
    </>
  );
}
