import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const GateSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 via-white/5 to-white/0 p-6 md:p-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-5 py-3">
            <span className="text-white font-extrabold tracking-tight text-base sm:text-lg">
              This is not a POS.
            </span>
            <span className="text-amber-300 font-extrabold tracking-tight text-base sm:text-lg">
              This is a gate.
            </span>
          </div>

          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            SharpTable forces payment verification before the kitchen sees the order.
            No begging. No chasing. No "Oga I will transfer".
          </p>

          <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-3xl mx-auto">
            If an order is not paid, it doesnt move.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
