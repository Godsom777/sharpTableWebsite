import { Cta, Demo, Phone, Screen, DEMO_URL, WA_URL } from '@/components/apple/Bits';
import { Faq, type QA } from '@/components/apple/Faq';
import Link from 'next/link';
import Compare from '@/components/apple/Compare';

const faqs: QA[] = [
  { q: 'How much does it cost?', a: '₦50,000 a month per branch. Every feature included. No commission, no setup fee.' },
  { q: 'How long is setup?', a: 'About 30 minutes.' },
  { q: 'Do guests need an app?', a: 'No. They scan a QR code and order in the browser.' },
  { q: 'Can I cancel anytime?', a: 'Yes.' },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="tile pale">
        <div className="head">
          <h1>The operating system for Nigerian restaurants and hotels.</h1>
          <p className="sub">Guests scan, order and pay at the table. Only paid orders reach the kitchen. You see every sale, void and discount live, from anywhere.</p>
          {/* TODO(Okoro): DEMO_URL (interim /pricing) and WA_URL (interim #whatsapp) live in components/apple/Bits.tsx */}
          <Cta href={DEMO_URL} label="Book a 15-minute demo" more="Chat on WhatsApp" moreHref={WA_URL} text="See pricing" textHref="/pricing" />
          <p className="points">No commission · No setup fee · Every feature on every plan · Cancel anytime</p>
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu.png" alt="SharpTable diner menu on a phone" /></div>
        <Demo />
      </section>

      {/* 2. Soft proof — truth only, no testimonials until real pilots */}
      <section className="tile pb">
        <div className="head"><p className="sub">Built in Lagos for restaurants and hotels across Nigeria.</p></div>
      </section>

      {/* 3. Guest */}
      <section className="tile">
        <div className="head">
          <h2>Order. Pay. Cook.</h2>
          <p className="sub">Guests scan the QR, order and pay from the table or on WhatsApp. No bill to chase.</p>
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu-cart-390.png" alt="SharpTable diner menu with an item in the cart and a checkout button" /></div>
      </section>

      {/* 4. Kitchen */}
      <section className="tile pale">
        <div className="head">
          <h2>Only paid orders<br />reach the kitchen.</h2>
          <p className="sub">Every order arrives by table, already paid. No free plates, no lost tickets.</p>
        </div>
        <div className="art dev"><Screen kind="tablet" src="/app-shots/kitchen.webp" alt="SharpTable kitchen display with paid orders queued by table" /></div>
      </section>

      {/* 5. Audit */}
      <section className="tile">
        <div className="head">
          <h2>See what your staff can’t hide.</h2>
          <p className="sub">Every void, discount and refund is logged with who, when and why. Open the Manager app and see your branches live.</p>
        </div>
        <div className="art dev"><Phone src="/app-shots/admin-mobile.webp" alt="SharpTable Admin on a phone" /></div>
      </section>

      {/* 6. Multi-branch — single baked lockup */}
      <section className="tile pale">
        <div className="head dash-h">
          <h2>Every branch.<br />One screen.</h2>
          <p className="sub">Every sale, void and discount. Live, from anywhere.</p>
        </div>
        <div className="art dev"><figure className="dash-lockup"><img src="/app-shots/admin-lockup-desktop.webp" srcSet="/app-shots/admin-lockup-desktop.webp 1x, /app-shots/admin-lockup-desktop@2x.webp 2x, /app-shots/admin-lockup-desktop@3x.webp 3x" width={1247} height={772} alt="SharpTable Admin menu manager on a laptop, with the same Admin on a phone" loading="lazy" decoding="async" /></figure></div>
      </section>

      {/* 7. Hotels */}
      <section className="tile pb">
        <div className="head">
          <h2>Hotels too.</h2>
          <p className="sub">Room service, room ledgers and keycard logging — same system as the restaurant.</p>
          <div className="links"><Link className="lm" href="/for-hotels">See how it works ›</Link></div>
        </div>
      </section>

      {/* 8. Built for Nigeria — only defendable claims.
          TODO(Okoro): confirm guest payment rails (Paystack?) and support hours before listing them here. */}
      <section className="tile pale pb">
        <div className="head">
          <h2>Built for how Nigerian restaurants actually run.</h2>
          <p className="points">WhatsApp ordering, paid before it reaches the kitchen. · Naira-first pricing, receipts and reports.</p>
        </div>
      </section>

      {/* 9. Value callout → Compare */}
      <section className="tile pb">
        <div className="head">
          <h2>₦50,000 a month.<br />Everything included.</h2>
          <p className="sub">No commission on orders. No setup fee. No feature paywalls. You pay for branches as you grow — every plan has every feature.</p>
        </div>
      </section>
      <Compare />

      {/* 10. Pricing tile */}
      <section className="tile pale pb">
        <div className="head">
          <h2>₦50,000 a month. Everything included.</h2>
          <p className="sub">No commission. No setup fee. No feature paywalls. Add branches as you grow.</p>
          <Cta href={DEMO_URL} label="Book a demo" more="See plans" moreHref="/pricing" />
        </div>
      </section>

      {/* 11. FAQ teaser */}
      <section className="tile pb">
        <div className="head"><h2>Questions.</h2></div>
        <Faq items={faqs} />
        <div className="head"><div className="links"><Link className="lm" href="/faq">All questions ›</Link></div></div>
      </section>

      {/* 12. Final CTA */}
      <section className="tile pale pb">
        <div className="head">
          <h2>See it in 15 minutes.</h2>
          <Cta href={DEMO_URL} label="Book a 15-minute demo" more="Chat on WhatsApp" moreHref={WA_URL} />
        </div>
      </section>
    </>
  );
}
