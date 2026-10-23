import React from 'react';
import Link from 'next/link';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';

export default function HomePage() {
  return (
    <div className="st-home">
      {/* Band 0: Nav */}
      <HomeNav />

      <main>
        {/* Band 1: Hero */}
        <section className="hero" id="top">
          <span id="hero" style={{ position: 'absolute', top: 0 }} aria-hidden="true" />
          <div className="w">
            <h1>See every naira at every branch.</h1>
            <p className="lead">
              SharpTable runs orders, kitchen and payments for Nigerian restaurants and hotels, and shows you every sale from your phone.
            </p>
            <div className="cta">
              <Link className="btn" href="/pricing">Get started</Link>
              <Link className="lnk" href="/pricing">See pricing</Link>
            </div>
            <div className="lock" aria-hidden="true">
              <div className="laptop">
                <div className="lid">
                  <div className="scr">
                    <div className="lt">
                      <b>Live overview</b>
                      <span>All branches</span>
                      <span className="live">● Live</span>
                    </div>
                    <div className="lg">
                      <div>
                        <div className="bc">
                          <b>Lekki</b>
                          <strong>₦385,500</strong>
                          <small>127 orders, avg order ₦3,035</small>
                          <em>1 alert: void override logged</em>
                        </div>
                        <div className="bc">
                          <b>Victoria Island</b>
                          <strong>₦512,800</strong>
                          <small>203 orders, avg order ₦2,526</small>
                        </div>
                        <div className="bc">
                          <b>Ikeja</b>
                          <strong>₦198,200</strong>
                          <small>84 orders, avg order ₦2,360</small>
                          <em>2 alerts: stock low on 2 items</em>
                        </div>
                      </div>
                      <div className="kp">
                        Total sales today
                        <strong>₦1,096,500</strong>
                        +18.2% vs last Friday
                        <div className="bars">
                          <i style={{ height: '18%' }}></i>
                          <i style={{ height: '26%' }}></i>
                          <i style={{ height: '22%' }}></i>
                          <i style={{ height: '34%' }}></i>
                          <i style={{ height: '46%' }}></i>
                          <i style={{ height: '40%' }}></i>
                          <i style={{ height: '58%' }}></i>
                          <i style={{ height: '72%' }}></i>
                          <i style={{ height: '90%' }}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="base"></div>
              </div>
              <div className="phone hp">
                <div className="isl"></div>
                <div className="ps">
                  <div className="pt">
                    <b>All branches</b>
                    <span className="live">● Live</span>
                  </div>
                  <div className="big">
                    ₦1,096,500
                    <small>Total sales today, +18.2%</small>
                  </div>
                  <div className="row">
                    <b>Lekki</b>
                    <span className="amt">₦385,500</span>
                    <span className="al">1 alert: void override logged</span>
                  </div>
                  <div className="row">
                    <b>Victoria Island</b>
                    <span className="amt">₦512,800</span>
                  </div>
                  <div className="row">
                    <b>Ikeja</b>
                    <span className="amt">₦198,200</span>
                    <span className="al">2 alerts: stock low on 2 items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Paid orders */}
        <section className="alt" id="mechanism">
          <div className="w">
            <h2>The kitchen only cooks paid orders.</h2>
            <p className="lead">
              Guests order and pay from their table. Nothing reaches your kitchen until payment is confirmed.
            </p>
            <div className="grid">
              <div className="tile">
                <i>1</i>
                <h3>Guest orders</h3>
                <p>From the table, on their own phone. No app to download.</p>
              </div>
              <div className="tile">
                <i>2</i>
                <h3>Guest pays</h3>
                <p>Payment is confirmed before the kitchen is told anything.</p>
              </div>
              <div className="tile">
                <i>3</i>
                <h3>Kitchen cooks</h3>
                <p>Only paid orders appear on the right kitchen screen.</p>
              </div>
            </div>
            <div className="card win" aria-hidden="true">
              <div className="tb">
                <span className="dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                Kitchen screen: all channels
                <em>4 open</em>
              </div>
              <div className="row">
                <b>#1082 WhatsApp</b>
                <span className="it">Chicken Shawarma × 2, Coke × 1</span>
                <span className="st ok">Paid</span>
                <span className="st">Confirmed</span>
                <span className="amt">₦8,500</span>
              </div>
              <div className="row">
                <b>#1083 Walk-in</b>
                <span className="it">Jollof Rice Special × 3</span>
                <span className="st ok">Paid</span>
                <span className="st">Preparing</span>
                <span className="amt">₦12,000</span>
              </div>
              <div className="row">
                <b>#1084 Website</b>
                <span className="it">Grilled Fish Platter × 1, Chapman × 2</span>
                <span className="st ok">Paid</span>
                <span className="st">New</span>
                <span className="amt">₦15,200</span>
              </div>
              <div className="row">
                <b>#1085 Phone</b>
                <span className="it">Chicken &amp; Chips × 4</span>
                <span className="st ok">Paid</span>
                <span className="st">New</span>
                <span className="amt">₦18,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Band 3: Audit */}
        <section id="fourth-set-of-eyes">
          <div className="w">
            <h2>Every void and discount, on record.</h2>
            <p className="lead">
              Each cancelled order, free item and price edit is logged with the staff name, the table and the time. Voids after printing need a manager’s PIN.
            </p>
            <Link className="lnk" href="/features">Explore features</Link>
            <div className="card log" aria-hidden="true">
              <div className="tb">
                <span className="dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                Auditor view: live audit log
                <em className="fl">3 flags</em>
              </div>
              <div className="row">
                <b>Void override</b>
                <span>Tunde A. · Lekki</span>
                <span>8:42 PM</span>
              </div>
              <div className="row">
                <b>Comp order #1094</b>
                <span>Ngozi E. · V/Island</span>
                <span>8:38 PM</span>
              </div>
              <div className="row">
                <b>Price edit: Chicken &amp; Chips</b>
                <span>Samuel B. · Ikeja</span>
                <span>8:31 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Band 4: WhatsApp */}
        <section className="alt" id="whatsapp-demo">
          <div className="w">
            <h2>Take paid orders on WhatsApp.</h2>
            <p className="lead">
              Customers order and pay inside WhatsApp, and the order goes straight to your kitchen. No delivery-app commission.
            </p>
            <Link className="lnk" href="/features">See how it works</Link>
            <div className="duo" aria-hidden="true">
              <div className="phone">
                <div className="isl"></div>
                <div className="ps">
                  <div className="wh">
                    <b>ST</b>
                    <span>
                      SharpTable Orders
                      <small>Online · Official</small>
                    </span>
                  </div>
                  <div className="chat">
                    <div className="m me">Can I order 2 Chicken Shawarma and 1 Coke please?</div>
                    <div className="m biz">🧾 Order received! Total: ₦8,500. Reply YES to confirm.</div>
                    <div className="m me">YES</div>
                    <div className="m biz">✅ Order #1082 confirmed. Ready in about 15 mins.</div>
                  </div>
                </div>
              </div>
              <div className="card sync">
                <div className="tb">
                  Staff dashboard
                  <em>Live</em>
                </div>
                <div className="sy">
                  <b>Order #1082</b>
                  <p className="d">Order received</p>
                  <p className="d">Staff confirmed</p>
                  <p className="n">Kitchen preparing</p>
                  <p>Ready for pickup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 5: Proof */}
        <section id="credibility">
          <div className="w">
            <h2 className="num">+42%</h2>
            <p className="lead">weekend revenue at Old English Bar and Grills, Owerri.</p>
            <blockquote>
              “The direct-to-kitchen routing practically eliminated order errors, and the turnaround time keeps customers ordering more.”
              <cite>Mr. Uzochukwu, Owner</cite>
            </blockquote>
          </div>
        </section>

        {/* Band 6: Pricing */}
        <section className="alt" id="pricing">
          <span id="pricing-anchor" style={{ position: 'absolute', top: 0 }} aria-hidden="true" />
          <div className="w">
            <h2>One flat monthly price.</h2>
            <p className="lead">Plans from ₦50,000 a month, whatever your sales.</p>
            <div className="two">
              <div className="tier">
                <h3>Simple plans</h3>
                <p className="p">From ₦50,000/month</p>
                <ul>
                  <li>No commission on orders</li>
                  <li>No hidden fees</li>
                  <li>Set up in about 30 minutes</li>
                  <li>Cancel anytime</li>
                </ul>
                <Link className="btn" href="/pricing">See all plans</Link>
              </div>
              <div className="tier">
                <h3>Built for the floor</h3>
                <p className="p">The kitchen, the till and every branch</p>
                <ul>
                  <li>Stock deducted as each dish sells</li>
                  <li>Every branch on one screen</li>
                  <li>Access set by staff role</li>
                  <li>Kitchen controls from your phone</li>
                </ul>
                <Link className="lnk" href="/features">Explore features</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Band 7: Closing CTA */}
        <section id="final-cta">
          <div className="w">
            <h2>See what’s really happening at your branches.</h2>
            <p className="lead">Set up takes about 30 minutes. Your customers don’t need to download anything.</p>
            <div className="cta">
              <Link className="btn" href="/pricing">Get started</Link>
              <a className="lnk" href="mailto:info@sharptable.com.ng">Talk to us</a>
            </div>
            <p className="fine">No setup fees · Cancel anytime</p>

            {/* SharpTable Manager App */}
            <div className="app-cta">
              <h3 style={{ fontSize: '28px', fontWeight: 600, margin: '0 auto 12px', letterSpacing: '-0.02em', color: 'var(--tx)' }}>
                SharpTable Manager
              </h3>
              <p className="lead" style={{ fontSize: '17px', margin: '0 auto 24px', maxWidth: '540px' }}>
                Floor oversight, live alerts, void approvals, and multi-venue stock tracking right from your pocket.
              </p>
              <div className="cta" style={{ gap: '16px' }}>
                <a
                  className="btn"
                  href="https://play.google.com/store/apps/details?id=com.godsom.sharptable.manager&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.638.225-1.226.609-1.636zm11.242 11.243l2.366 2.366-11.83 6.745 9.464-9.111zm0-2.114L5.387 1.832l11.83 6.745-2.366 2.366zm1.472 1.057l3.665 2.09c.895.511.895 1.346 0 1.857l-3.665 2.09-2.057-2.057 2.057-2.057z" />
                  </svg>
                  <span>Get it on Google Play</span>
                </a>
                <span style={{ fontSize: '15px', color: 'var(--mu)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--mu)' }}></span>
                  iOS version coming soon
                </span>
              </div>
              <div className="app-gallery">
                <img src="/assets/app/screenshot-1.png" alt="Locked to your branch" loading="lazy" />
                <img src="/assets/app/screenshot-2.png" alt="Missed alerts go to WhatsApp and SMS" loading="lazy" />
                <img src="/assets/app/screenshot-3.png" alt="Choose how you get alerted" loading="lazy" />
                <img src="/assets/app/screenshot-4.png" alt="Know before it runs out" loading="lazy" />
                <img src="/assets/app/screenshot-5.png" alt="Every change with who made it" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Band 8: Footer */}
      <HomeFooter />
    </div>
  );
}
