import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faShieldHalved, faBolt, faLocationDot, faChartLine, faCreditCard, faUtensils, faUsers, faChartPie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Full trail on every dollar",
    description: "Who took payment, when, how much, for what. Everything logged. No hiding, no shortcuts.",
    icon: <FontAwesomeIcon icon={faDatabase} className="w-8 h-8 text-green-500" />,
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Marshall verifies every payment",
    description: "A dedicated staff role confirms payment before any order is fulfilled. Your frontline defense.",
    icon: <FontAwesomeIcon icon={faBolt} className="w-8 h-8 text-amber-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "See where money leaks across locations",
    description: "Compare revenue across branches. Spot outliers. Identify problem areas before they drain you.",
    icon: <FontAwesomeIcon icon={faLocationDot} className="w-8 h-8 text-red-500" />,
    colSpan: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Know your regulars automatically",
    description: "Guest profiles are built without forms. Track spending and visits — useful intel, not the main event.",
    icon: <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-blue-400" />,
    colSpan: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Faster service, cleaner handoffs",
    description: "Orders flow from floor to fulfilment without confusion. Fewer mistakes, tables turn faster.",
    icon: <FontAwesomeIcon icon={faCreditCard} className="w-8 h-8 text-purple-400" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
];

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-black relative overflow-hidden">
      {/* Optimized Background - Static for better performance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* How it works — in 30 seconds */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.22em] text-amber-300/80 uppercase">How SharpTable Works (30 seconds)</p>
              <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">How it works — in 30 seconds</h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                No training manuals. No behavior change. Just enforced flow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">1</div>
                  <h4 className="text-white font-bold">Guests place an order</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Guests scan the table QR, browse the menu, and place orders into a shared digital tab.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">Multiple guests. One table. One tab.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">2</div>
                  <h4 className="text-white font-bold">Payment is collected</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Orders are submitted for payment — cash, POS, transfer, or card.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">Nothing moves yet.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">3</div>
                  <h4 className="text-white font-bold">Marshall verifies payment</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A dedicated Marshall confirms payment on their dashboard.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">This single action unlocks the order.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">4</div>
                  <h4 className="text-white font-bold">Order gets fulfilled</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Only verified, paid orders appear on the order screen.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">No payment = no service. No arguments. No exceptions.</p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-6 text-center">
              <div className="text-white font-extrabold text-2xl md:text-3xl leading-tight">
                SharpTable doesn’t trust hope.
                <span className="text-amber-300"> It enforces payment.</span>
              </div>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 text-white border border-white/15 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                See a real order flow 
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="max-w-md mx-auto mb-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
            >
              Ready to see SharpTable on your floor?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400"
            >
              A short demo can show you where revenue leaks and repeat visits are hiding, and how to fix it.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => window.location.href = "mailto:info@sharptable.com.ng"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-amber-500/25 inline-flex items-center gap-3 hover:shadow-amber-500/40"
            style={{ backgroundPosition: '0% 50%' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = '100% 50%'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = '0% 50%'}
          >
            <span>Start Your Free Consultation</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </motion.div>
          </motion.button>
          <p className="text-gray-500 text-sm">Usually responds within 2 hours</p>
        </motion.div>
      </div>
    </section>
  );
};