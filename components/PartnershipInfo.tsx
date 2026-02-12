import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faMoneyBillTrendUp,
  faLink,
  faRepeat,
  faUser,
  faGift,
  faChartLine,
  faArrowRight,
  faChevronDown,
  faCircleInfo,
  faClock,
  faWallet,
  faShieldHalved,
  faCalendarCheck,
  faCalculator,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/* ── How-It-Works steps ──────────────────────────────────── */
const steps = [
  {
    icon: faUser,
    title: 'Apply',
    desc: 'Complete the short form with your details and get a referral link immediately.',
  },
  {
    icon: faLink,
    title: 'Get Your Link',
    desc: 'You will receive a unique referral link to share with restaurant owners.',
  },
  {
    icon: faHandshake,
    title: 'They Subscribe',
    desc: 'When a restaurant subscribes through your link, we attribute it automatically.',
  },
  {
    icon: faMoneyBillTrendUp,
    title: 'You Get Paid',
    desc: 'Earn 50% upfront, plus 20% monthly for 6 months, paid to your bank account.',
  },
];

/* ── Commission cards ────────────────────────────────────── */
const commissions = [
  {
    rate: '50%',
    label: 'Upfront',
    desc: "50% of one month's subscription price, paid once after the first successful charge.",
    icon: faGift,
    accent: 'amber' as const,
  },
  {
    rate: '20%',
    label: 'Recurring',
    desc: "20% of one month's subscription price, paid monthly for 6 consecutive months.",
    icon: faRepeat,
    accent: 'emerald' as const,
  },
];

/* ── Earnings examples ───────────────────────────────────── 
   Yearly plans now cost the same as monthly, so commissions
   are identical for both billing cycles.                      */
const earnings = [
  {
    plan: 'Control · Monthly',
    price: '₦99,999/mo',
    upfront: '₦49,999',
    recurring: '₦20,000 × 6',
    total: '₦169,999',
  },
  {
    plan: 'Command · Monthly',
    price: '₦199,999/mo',
    upfront: '₦99,999',
    recurring: '₦40,000 × 6',
    total: '₦339,999',
  },
  {
    plan: 'Control · Yearly',
    price: '₦99,999/yr',
    upfront: '₦49,999',
    recurring: '₦20,000 × 6',
    total: '₦169,999',
  },
  {
    plan: 'Command · Yearly',
    price: '₦199,999/yr',
    upfront: '₦99,999',
    recurring: '₦40,000 × 6',
    total: '₦339,999',
  },
];

/* ── FAQ items ───────────────────────────────────────────── */
const faqs: { q: string; a: string; icon: any }[] = [
  {
    q: 'How much can I earn?',
    a: 'There is no cap. For example, 10 referrals on the Command monthly plan can generate about ₦3.3 million in commissions over 7 months. Earnings scale with the number of referrals you make.',
    icon: faWallet,
  },
  {
    q: 'What if the restaurant subscribes for a yearly plan?',
    a: 'Your earnings are the same. Monthly and yearly plans are priced identically, ₦99,999 for Control, ₦199,999 for Command, so commission is unchanged across billing cycles.',
    icon: faCalendarCheck,
  },
  {
    q: 'When do I get paid?',
    a: "Payouts are processed within 7 business days after each qualifying event. The upfront commission is paid after the restaurant's first successful charge. Recurring commissions are paid after subsequent renewals.",
    icon: faClock,
  },
  {
    q: 'How do I track my referrals and earnings?',
    a: 'After you sign up, you will be able to view referrals and earnings in the partner dashboard, including subscription status and total earnings.',
    icon: faChartLine,
  },
  {
    q: 'Is there a minimum payout threshold?',
    a: 'No. Commissions are paid according to the payout schedule, with no minimum threshold.',
    icon: faCalculator,
  },
  {
    q: 'Do I need to be technical or own a restaurant?',
    a: 'No. Partners typically succeed by having access to restaurant owners and managers who can benefit from SharpTable.',
    icon: faUser,
  },
  {
    q: 'What happens if a restaurant cancels?',
    a: 'You keep all commissions already earned. Recurring commissions stop from the next billing cycle after cancellation, and there is no clawback.',
    icon: faShieldHalved,
  },
  {
    q: 'Can I refer restaurants outside Nigeria?',
    a: 'SharpTable currently operates in Nigeria. As new markets are supported, your referral link will remain valid under the same commission structure.',
    icon: faCircleInfo,
  },
];

/* ── FAQ accordion item ──────────────────────────────────── */
const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-white/10 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left group"
      >
        <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="flex-1 text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
          {item.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <FontAwesomeIcon icon={faChevronDown} className="w-3.5 h-3.5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed pl-16">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================================================================
   PartnershipInfo — main component (no form, just info + CTA)
   ================================================================ */

export const PartnershipInfo: React.FC = () => {
  return (
    <section className="relative bg-black">
      {/* ─── How It Works ─── */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Four simple steps, start earning immediately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center group hover:border-amber-500/20 transition-colors"
            >
              <div className="absolute top-3 right-4 text-amber-500/15 text-3xl font-black select-none">{i + 1}</div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-500/15 flex items-center justify-center group-hover:bg-amber-500/25 transition-colors">
                <FontAwesomeIcon icon={s.icon} className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-1.5">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Commission Structure ─── */}
      <div className="bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Commission</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
              Clear terms, consistent payouts. Whether a restaurant bills monthly or yearly, your commission is calculated the same way.
            </p>
          </motion.div>

          {/* Commission cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {commissions.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-8 text-center ${
                  c.accent === 'amber'
                    ? 'border-amber-500/25 bg-amber-500/[0.03]'
                    : 'border-emerald-500/25 bg-emerald-500/[0.03]'
                }`}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  c.accent === 'amber' ? 'bg-amber-500/15' : 'bg-emerald-500/15'
                }`}>
                  <FontAwesomeIcon icon={c.icon} className={`w-6 h-6 ${c.accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`} />
                </div>
                <div className={`text-5xl font-black mb-2 ${c.accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {c.rate}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{c.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Yearly plan callout */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-6 py-4 flex items-start gap-3 mb-10"
          >
            <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">Monthly or yearly, same earnings.</span> Both billing cycles are priced identically, so commission remains the same.
            </p>
          </motion.div>

          {/* Earnings table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="bg-white/[0.03] px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-amber-400" />
                Example Earnings Per Referral
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-white/5 text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-medium">Plan</th>
                    <th className="text-right px-6 py-3 font-medium">Price</th>
                    <th className="text-right px-6 py-3 font-medium">Upfront (50%)</th>
                    <th className="text-right px-6 py-3 font-medium">Recurring (20%)</th>
                    <th className="text-right px-6 py-3 font-medium text-amber-400">You Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.map((e) => (
                    <tr key={e.plan} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="text-white font-medium">{e.plan}</span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-400 text-right">{e.price}</td>
                      <td className="px-6 py-3.5 text-amber-400 text-right font-medium">{e.upfront}</td>
                      <td className="px-6 py-3.5 text-emerald-400 text-right font-medium">{e.recurring}</td>
                      <td className="px-6 py-3.5 text-white text-right font-bold">{e.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/15 flex items-center justify-center">
            <FontAwesomeIcon icon={faHandshake} className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Started</h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-8">
            The application takes less than 2 minutes. There are no fees and no long term commitments.
          </p>
          <Link to="/partnership/apply">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(245,158,11,0.15)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* ─── Partnership FAQ ─── */}
      <div className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Partnership FAQ</h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Everything you need to know before you start.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FAQItem key={i} item={f} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
            <a
              href="mailto:support@sharptable.com.ng"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
            >
              support@sharptable.com.ng
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
