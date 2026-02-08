import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
              <p className="text-xs font-semibold tracking-[0.22em] text-amber-300/80 uppercase">Simple enough for day one</p>
              <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">Your staff can learn this in 30 seconds</h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                No training manuals. No week-long setup. No IT guy needed. If your team can use WhatsApp, they can use SharpTable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">1</div>
                  <h4 className="text-white font-bold">Customer scans & orders</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A QR code on the table. Customer opens it, sees your menu, picks what they want. No app to download.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">Faster than waiting for a waiter to bring a menu.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">2</div>
                  <h4 className="text-white font-bold">They pay before the kitchen starts</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Cash, transfer, card — however they want. But the order doesn't move until money lands.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">No more "I'll pay later" headaches.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">3</div>
                  <h4 className="text-white font-bold">Your Marshall confirms it</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  One tap from your floor staff confirms the payment is real. That's it — order unlocks.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">One person. One tap. Zero confusion.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">4</div>
                  <h4 className="text-white font-bold">Kitchen gets it, customer gets fed</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The kitchen only sees paid orders. They cook, you serve, everyone's happy.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">No arguments. No walkouts. No missing money.</p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-6 text-center">
              <div className="text-white font-extrabold text-2xl md:text-3xl leading-tight">
                Not another bloated POS.
                <span className="text-amber-300"> Just what actually works.</span>
              </div>
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
          <motion.button
            onClick={() => window.location.href = "mailto:info@sharptable.com.ng"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-amber-500/25 inline-flex items-center gap-3 hover:shadow-amber-500/40"
            style={{ backgroundPosition: '0% 50%' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = '100% 50%'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = '0% 50%'}
          >
            <span>Book a Demo</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </motion.div>
          </motion.button>
          <p className="text-gray-500 text-sm mt-2">Usually responds within 2 hours</p>
        </motion.div>
      </div>
    </section>
  );
};