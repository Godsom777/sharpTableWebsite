import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq } from '@/components/apple/Faq';

export const metadata: Metadata = {
  title: 'Partner Programme — SharpTable',
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
  { q: 'Do I need technical skills?', a: 'No. You need relationships with restaurant owners.' },
  { q: 'What if a client cancels?', a: 'You keep what has already been paid to you.' },
];

export default function PartnershipPage() {
  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <p className="eyebrow">Partners</p>
          <h1>Earn with SharpTable.</h1>
          <p className="sub">Refer restaurants. Get paid when they subscribe.</p>
          <div className="links"><Link className="pill" href="/partnership/apply">Get started</Link></div>
        </div>
      </section>

      <section className="tile pb">
        <div className="head"><h2>What you earn.</h2></div>
        <div className="wrap"><div className="grid c3">
          {RATES.map((x) => (
            <div className="card" key={x.t}><div className="price">{x.r}</div><h3 style={{ marginTop: 8 }}>{x.t}</h3><p>{x.d}</p></div>
          ))}
        </div></div>
      </section>

      <section className="tile pale pb">
        <div className="head"><h2>How it works.</h2></div>
        <div className="wrap"><div className="grid c4">
          {STEPS.map((x, i) => (
            <div className="card" key={x.t}><span className="muted" style={{ fontSize: 15 }}>{i + 1}</span><h3>{x.t}</h3><p>{x.d}</p></div>
          ))}
        </div></div>
      </section>

      <section className="tile pb">
        <div className="head"><h2>Questions.</h2></div>
        <Faq items={FAQS} />
        <div className="links" style={{ marginTop: 40 }}><Link className="pill" href="/partnership/apply">Get started</Link></div>
      </section>
    </>
  );
}
