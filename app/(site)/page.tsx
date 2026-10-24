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
          <p className="sub">Your restaurant, in your pocket.</p>
          <Cta more="Learn more" moreHref="/features" />
        </div>
        <div className="art dev"><Phone src="/app-shots/diner-menu.png" alt="SharpTable diner menu on a phone" /></div>
        <Demo />
      </section>

      <section className="tile photo" aria-label="A busy restaurant evening">
        <img className="par" src="/assets/photos/happy_diners.jpg" alt="Friends sharing a meal at a busy restaurant" />
        <div className="head"><h2>Made for busy nights.</h2></div>
      </section>

      <section className="tile">
        <div className="head">
          <h2>Order. Pay. Cook.</h2>
          <p className="sub">Guests order and pay from the table.</p>
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
          <p className="sub">Every sale, void and discount. Live.</p>
        </div>
        <div className="art dev"><div className="dash"><figure className="dash-main"><Screen kind="laptop" src="/app-shots/admin-desktop.webp" alt="SharpTable Admin menu manager with dishes and naira prices" /><Cap>Your menu, live.</Cap></figure><figure className="dash-side"><Phone src="/app-shots/admin-mobile.webp" alt="SharpTable Admin menu on a phone" /><Cap>Same Admin. Pocket.</Cap></figure></div></div>
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
          <p className="sub">Every feature. Every plan.</p>
          <Cta more="See pricing" moreHref="/pricing" />
        </div>
      </section>
    </>
  );
}
