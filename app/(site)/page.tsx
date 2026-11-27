import Link from 'next/link';
import { Cta, DEMO_URL, WA_URL } from '@/components/apple/Bits';
import Compare from '@/components/apple/Compare';
import { EcosystemBeams } from '@/components/apple/EcosystemBeams';
import { Faq, type QA } from '@/components/apple/Faq';
import {
  IconBed,
  IconKey,
  IconReceipt,
  IconShieldCheck,
} from '@/components/apple/Icons';
import { OldVsSharpTable, Reveal } from '@/components/apple/StoryVisuals';
import { ZohoHomeCore } from '@/components/apple/ZohoHomeCore';

const faqs: QA[] = [
  {
    q: 'How much does it cost?',
    a: '₦50,000 a month per branch. Every feature is included, with no commission and no setup fee.',
  },
  {
    q: 'How long is setup?',
    a: 'About 30 minutes. Use the phones, tablets, or laptops you already own.',
  },
  {
    q: 'Do guests need an app?',
    a: 'No. They scan a QR code at the table or room and order in their phone’s browser, or on WhatsApp.',
  },
  {
    q: 'What happens if a guest orders but doesn’t pay?',
    a: 'The order never reaches the kitchen until payment is confirmed. No unpaid plates get prepared.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No lock-in contracts.',
  },
];

const HOTEL_ITEMS = [
  {
    icon: <IconBed size={20} />,
    title: 'Room service ordering',
    desc: 'Guests scan in their room and pay before the kitchen prepares the order.',
  },
  {
    icon: <IconReceipt size={20} />,
    title: 'Charge to room ledger',
    desc: 'Bar and dining outlet charges post straight to the guest ledger with staff name and time.',
  },
  {
    icon: <IconKey size={20} />,
    title: 'Keycard logging & housekeeping',
    desc: 'Know who entered which room and track room status from dirty to inspected.',
  },
];

const BLUE_STATS = [
  { num: '₦50,000', label: 'Per branch each month, every feature included' },
  { num: '0%', label: 'Commission taken on any guest order' },
  { num: '30 min', label: 'Setup on phones and tablets you already own' },
  { num: '100%', label: 'Payments settled straight to your bank via Paystack' },
];

export default function HomePage() {
  return (
    <div className="home zh-page">
      {/* Bands 1, 2, 3: Zoho Split Hero + Featured Modules Card + Yellow Banner + Interactive Suite Tabs */}
      <ZohoHomeCore />

      {/* Band 4: Iconic Zoho Deep Blue/Navy Full-Bleed Brand & Hotels Band */}
      <section className="zh-blue-band" aria-label="Built for Nigerian hospitality and hotels">
        <div className="zh-blue-in">
          <div className="zh-blue-left">
            <Reveal>
              <span className="zh-blue-kicker">Made in Lagos</span>
              <h2>Built for how Nigerian hospitality actually runs</h2>
              <p>
                Naira-first pricing, WhatsApp ordering paid upfront, and instant Cash, POS,
                Transfer, and Card breakdowns. No imported POS boxes and no percentage cuts on your
                sales.
              </p>
            </Reveal>

            <div className="zh-stats-grid">
              {BLUE_STATS.map((s) => (
                <div key={s.num} className="zh-stat-cell">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="zh-blue-right">
            <div className="zh-hotel-panel">
              <div className="zh-hotel-panel-head">
                <h3>Hotels &amp; multi-outlet properties</h3>
                <p>Run rooms, lounges, bars, and dining outlets on one connected ledger.</p>
              </div>
              <div className="zh-hotel-list">
                {HOTEL_ITEMS.map((item) => (
                  <div key={item.title} className="zh-hotel-row">
                    <span className="zh-hotel-ic">{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link className="zh-hotel-link" href="/for-hotels">
                Explore SharpTable for Hotels <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Band 5: Interactive Payment Gate Light-Beam Flow + Without vs With SharpTable */}
      <section className="tile pale pb">
        <Reveal>
          <div className="head">
            <h2>See how one paid order protects the whole floor</h2>
            <p className="sub">
              Test a paid order, then try an unpaid order. Watch how SharpTable connects guest
              payments to the kitchen, named staff audit log, live inventory, and closing report.
            </p>
          </div>
        </Reveal>
        <EcosystemBeams />

        <div style={{ marginTop: 64 }}>
          <OldVsSharpTable />
        </div>
      </section>

      {/* Band 6: Honest Comparison Table */}
      <Compare />

      {/* Band 7: Zoho-Style Editorial Photography + Trust & Accountability Band */}
      <section className="zh-editorial-band">
        <div className="zh-editorial-in">
          <Reveal>
            <div className="zh-editorial-photo">
              <img
                src="/assets/photos/lagos-hospitality-editorial.jpg"
                alt="Hospitality owner reviewing live branch operations on a tablet inside an upscale Lagos lounge and dining room"
                width={1408}
                height={768}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="zh-editorial-copy">
              <div className="zh-trust-shield" aria-hidden="true">
                <IconShieldCheck size={30} />
              </div>
              <h2>Your money and records stay yours</h2>
              <p>
                Payments settle directly from Paystack into your bank account. SharpTable never
                holds your funds, never takes a commission on your orders, and keeps an encrypted
                audit log under every worker’s own name.
              </p>
              <div className="zh-editorial-actions">
                <Link className="zh-btn-navy" href={DEMO_URL}>
                  Book a 15-minute demo <span aria-hidden="true">→</span>
                </Link>
                <Link className="lm" href="/pricing">
                  See branch pricing ›
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Band 8: Straight Answers FAQ */}
      <section className="tile pb">
        <Reveal>
          <div className="head">
            <h2>Common questions</h2>
          </div>
        </Reveal>
        <Faq items={faqs} />
        <div className="head">
          <div className="links">
            <Link className="lm" href="/faq">
              All questions ›
            </Link>
          </div>
        </div>
      </section>

      {/* Band 9: Clean Pre-Footer CTA Band */}
      <section className="zh-prefoot">
        <Reveal>
          <div className="head">
            <h2>Ready to run every branch with clarity?</h2>
            <p className="sub">
              See a live order move from guest phone to kitchen screen to end-of-day report in 15
              minutes.
            </p>
            <Cta
              href={DEMO_URL}
              label="Book a 15-minute demo"
              more="Chat on WhatsApp"
              moreHref={WA_URL}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
