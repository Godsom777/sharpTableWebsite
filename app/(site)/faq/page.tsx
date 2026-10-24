import type { Metadata } from 'next';
import { Faq } from '@/components/apple/Faq';
import { Cta } from '@/components/apple/Bits';

export const metadata: Metadata = {
  title: 'FAQ — SharpTable Restaurant & Hotel Operations',
  description: 'Answers to common questions about SharpTable: ordering, payments, billing in naira, hardware and data.',
};

const FAQS = [
  { q: 'Do my customers need to download an app?', a: 'No. Guests scan a QR code at the table and the menu opens in their phone’s browser.' },
  { q: 'What happens if a customer orders but doesn’t pay?', a: 'The order doesn’t reach the kitchen until payment is confirmed.' },
  { q: 'What payment methods do you support?', a: 'Payments run through Paystack: cards, bank transfer and other methods Paystack supports. Money settles from Paystack to your bank account; SharpTable does not hold it.' },
  { q: 'What currency is billed?', a: 'All plans are billed in Nigerian Naira (NGN) via Paystack: Solo at ₦50,000/month (1 branch), Growth at ₦99,999/month (2 to 5 branches), and Group at ₦199,999/month (6 to 10 branches). Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing.' },
  { q: 'Which plan do I pick?', a: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.' },
  { q: 'Do I need special hardware?', a: 'No. Staff use any phone, tablet or computer with a browser. Guests use their own phones.' },
  { q: 'What if the internet goes down?', a: 'SharpTable is a cloud system and needs internet to take new orders. Orders already confirmed stay on the kitchen screen.' },
  { q: 'Can customers split bills?', a: 'Yes. Each guest can select their items and pay their share.' },
  { q: 'How do refunds work?', a: 'Refunds are issued from your Paystack dashboard. The SharpTable audit log shows the order and payment reference.' },
  { q: 'Can I edit my menu and mark items sold out?', a: 'Yes. Add items, prices, photos and categories, and mark items sold out from the admin app.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Your subscription runs until the end of your paid period, then stops.' },
  { q: 'Is my data safe?', a: 'Connections are encrypted. Card details go to Paystack and never touch SharpTable servers.' },
];

export default function FAQPage() {
  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <h1>Questions.</h1>
          <p className="sub">Straight answers.</p>
        </div>
      </section>
      <section className="tile pb">
        <Faq items={FAQS} />
        <div className="head" style={{ marginTop: 48 }}>
          <p className="sub">Still stuck? <a className="lm" href="mailto:info@sharptable.com.ng">Email us ›</a></p>
          <Cta />
        </div>
      </section>
    </>
  );
}
