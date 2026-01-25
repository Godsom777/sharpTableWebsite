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
              <h3 className="text-white font-bold tracking-wide text-sm uppercase">Who is this for?</h3>
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-green-400" />
                  <h4 className="text-white font-semibold">SharpTable is built for:</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />Busy kitchens</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />Kitchen bars</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />Food courts</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/80" />Restaurants losing money during rush hours</li>
                </ul>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-red-400" />
                  <h4 className="text-white font-semibold">Not built for:</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />Quiet cafes</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />Low-volume lounges</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/80" />Restaurants that don't mind serving unpaid orders</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              If you run fast service, high traffic, or multiple hand-offs between cashier and kitchen  the gate matters.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
