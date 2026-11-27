import type { Metadata } from 'next';
import { Faq } from '@/components/apple/Faq';
import { IncludedList, PlanCards } from '@/components/apple/PlanCards';
import { Reveal } from '@/components/apple/StoryVisuals';

export const metadata: Metadata = {
  title: 'Pricing | SharpTable Restaurant & Hotel Operating System',
  description:
    'Simple pricing by branch: Solo, Growth and Group plans from ₦50,000/month, every feature included. Hotels from ₦3,000 per room.',
};

const FAQS = [
  {
    q: 'Which plan do I pick?',
    a: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.',
  },
  {
    q: 'What if I open another branch?',
    a: 'Move up a plan whenever you need to.',
  },
  {
    q: 'What currency is billed?',
    a: 'All plans are billed in Nigerian Naira (NGN) via Paystack. Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Your subscription runs until the end of your paid period, then stops.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="tile hero-band pb">
        <div className="head">
          <h1>Simple branch pricing</h1>
          <p className="sub">Pick by branches. Every plan includes every feature.</p>
        </div>
        <PlanCards />
      </section>

      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>Included in every plan</h2>
          </div>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <IncludedList />
          </div>
          <p className="muted" style={{ marginTop: 28, fontSize: 15 }}>
            Coming soon: listing in the SharpTable customer app.
          </p>
        </Reveal>
      </section>

      <section className="tile navy pb">
        <Reveal>
          <div className="head">
            <h2>Pricing for hotels</h2>
            <p className="sub">₦3,000 per room per month, minimum ₦75,000.</p>
            <p style={{ marginTop: 14, fontSize: 17, lineHeight: '25px', opacity: 0.82 }}>
              Your restaurant, bar and other on-property outlets are included, plus the hotel tools.
              <br />
              Example: 40 rooms = ₦120,000/month.
            </p>
            <div className="links">
              <a className="pill o" href="mailto:info@sharptable.com.ng">
                Get a quote ›
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="tile pale pb">
        <Reveal>
          <div className="head">
            <h2>Common questions</h2>
          </div>
        </Reveal>
        <Faq items={FAQS} />
        <p className="muted" style={{ marginTop: 32, fontSize: 15 }}>
          No setup fees. Cancel anytime. All prices in naira.
        </p>
      </section>
    </>
  );
}
