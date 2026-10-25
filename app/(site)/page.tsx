import { Cta, Demo, Phone, Screen, Card, Cap } from '@/components/apple/Bits';
import { BASE_PRICES_NGN } from '@godsom777/sharptable-backend';
import Link from 'next/link';

const naira = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

export default function HomePage() {
  const from = naira(Math.min(BASE_PRICES_NGN.lite, BASE_PRICES_NGN.pro, BASE_PRICES_NGN.enterprise));
  return (
    <>
      <section className="tile pale">
        <div className="head">
          <h1>SharpTable.</h1>
          <p className="sub">Your restaurant or hotel, in your pocket.</p>
          <Cta more="Learn more" moreHref="/features" />
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu.png" alt="SharpTable diner menu on a phone" /></div>
        <Demo />
      </section>

      <section className="tile pb">
        <div className="head">
          <h2>One system. Your whole restaurant.</h2>
          <p className="sub">SharpTable runs ordering, payments, the kitchen and every branch, for restaurants and hotels across Nigeria.</p>
          <p className="points">Every feature, every plan. · No commission. No setup fee. · Cancel anytime.</p>
        </div>
      </section>

      <section className="tile photo" aria-label="A busy restaurant evening">
        <img className="par" src="/assets/photos/happy_diners.jpg" alt="Friends sharing a meal at a busy restaurant" />
        <div className="head"><h2>Made for busy nights.</h2></div>
      </section>

      <section className="tile">
        <div className="head">
          <h2>Order. Pay. Cook.</h2>
          <p className="sub">Guests scan, order and pay from the table.</p>
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu-cart-390.png" alt="SharpTable diner menu with an item in the cart and a checkout button" /></div>
        <Demo />
      </section>

      <section className="tile pale">
        <div className="head"><h2>Only paid orders<br />reach the kitchen.</h2></div>
        <div className="art dev"><figure><Screen kind="tablet" src="/app-shots/kitchen.webp" alt="SharpTable kitchen display with paid orders queued by table" /><Cap>Every order, in order.</Cap></figure></div>
      </section>

      <section className="tile">
        <div className="head dash-h">
          <h2>Every branch.<br />One screen.</h2>
          <p className="sub">Every sale, void and discount. Live, from anywhere.</p>
        </div>
        <div className="art dev"><figure className="dash-lockup"><img src="/app-shots/admin-lockup-desktop.webp" srcSet="/app-shots/admin-lockup-desktop.webp 1x, /app-shots/admin-lockup-desktop@2x.webp 2x, /app-shots/admin-lockup-desktop@3x.webp 3x" width={1247} height={772} alt="SharpTable Admin menu manager on a laptop, with the same Admin on a phone" loading="lazy" decoding="async" /><Cap>Your menu, live. Same Admin, pocket.</Cap></figure><div className="dash"><figure className="dash-main"><Screen kind="laptop" src="/app-shots/admin-desktop.webp" alt="SharpTable Admin menu manager with dishes and naira prices" /><Cap>Your menu, live.</Cap></figure><figure className="dash-side"><Phone src="/app-shots/admin-mobile.webp" alt="SharpTable Admin menu on a phone" /><Cap>Same Admin. Pocket.</Cap></figure></div></div>
      </section>

      <section className="tile pale pb">
        <div className="head">
          <h2>Hotels too.</h2>
          <p className="sub">Room service and keycard logging.</p>
          <div className="links"><Link className="lm" href="/for-hotels">Learn more ›</Link></div>
        </div>
      </section>

      <section className="tile pb">
        <div className="head">
          <h2>From {from} a month.</h2>
          <p className="sub">Every feature. Every plan. No commission.</p>
          <Cta more="See pricing" moreHref="/pricing" />
        </div>
      </section>
    </>
  );
}
