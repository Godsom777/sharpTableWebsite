import type { Metadata } from 'next';
import { Faq } from '@/components/apple/Faq';
import { PlanCards, IncludedList } from '@/components/apple/PlanCards';

export const metadata: Metadata = {
  title: 'Pricing — SharpTable Restaurant & Hotel Operating System',
  description: "Simple pricing by branch: Solo, Growth and Group plans from ₦50,000/month, every feature included. Hotels from ₦3,000 per room.",
};

const FAQS = [
  { q: 'Which plan do I pick?', a: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.' },
  { q: 'What if I open another branch?', a: 'Move up a plan whenever you need to.' },
  { q: 'What currency is billed?', a: 'All plans are billed in Nigerian Naira (NGN) via Paystack. Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Your subscription runs until the end of your paid period, then stops.' },
];

export default function PricingPage() {
  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <h1>Pricing.</h1>
          <p className="sub">Pick by branches. Every plan includes everything.</p>
        </div>
        <PlanCards />
      </section>

      <section className="tile pb">
        <div className="head"><h2>In every plan.</h2></div>
        <div className="wrap" style={{ maxWidth: 760 }}><IncludedList /></div>
        <p className="muted" style={{ marginTop: 24, fontSize: 15 }}>Coming soon: listing in the SharpTable customer app.</p>
      </section>

      <section className="tile navy pb">
        <div className="head">
          <h2>Hotels.</h2>
          <p className="sub">₦3,000 per room per month, minimum ₦75,000.</p>
          <p style={{ marginTop: 12, fontSize: 17, lineHeight: '24px', opacity: 0.8 }}>Your restaurant, bar and other on-property outlets are included, plus the hotel tools.<br />Example: 40 rooms = ₦120,000/month.</p>
          <div className="links"><a className="pill o" href="mailto:info@sharptable.com.ng">Get a quote</a></div>
        </div>
      </section>

      <section className="tile pale pb">
        <div className="head"><h2>Questions.</h2></div>
        <Faq items={FAQS} />
        <p className="muted" style={{ marginTop: 32, fontSize: 15 }}>No setup fees. Cancel anytime. All prices in naira.</p>
      </section>
    </>
  );
}
