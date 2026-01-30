import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons';

export const WhoIsThisFor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h3 className="text-white font-bold tracking-wide text-sm uppercase">Who is SharpTable for?</h3>
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-green-400" />
                  <h4 className="text-white font-semibold">Built for you if:</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />You run a busy kitchen with high order volume</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />You've had walkouts or "missing cash" before</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />You want staff accountability without micromanaging</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />You want to know exactly where every naira went</li>
                </ul>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-red-400" />
                  <h4 className="text-white font-semibold">Not the right fit if:</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />You run a quiet cafe with 10 orders a day</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />You're fine with "pay later" or running tabs</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />You don't mind chasing customers after they've eaten</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              SharpTable works best for restaurants, kitchen bars, and food courts where speed, volume, and payment control matter.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
