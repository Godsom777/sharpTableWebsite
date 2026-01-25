import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faShieldHalved,
  faQrcode,
  faBolt,
  faCircleCheck,
  faLock
} from '@fortawesome/free-solid-svg-icons';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Subtle background glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-12 md:pt-28 md:pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest flex-wrap justify-center text-center leading-tight whitespace-normal max-w-[92vw]">
            <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3" />
            <span className="sm:hidden">Take back revenue</span>
            <span className="hidden sm:inline">Take back lost revenue</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
        >
          More revenue control, better service, one system.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-center text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Keep every plate paid, and every naira accounted for.
          <span className="text-white font-medium">{' '}Your Marshall confirms payment before the any activity starts.</span>
        </motion.p>

        {/* CTA buttons  */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            onClick={() => (window.location.href = 'mailto:info@sharptable.com.ng')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3.5 font-bold text-sm shadow-lg hover:bg-zinc-100 transition"
          >
            Book a demo
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 text-white border border-white/15 px-6 py-3.5 font-semibold text-sm hover:bg-white/10 transition"
          >
            See how it works
            <FontAwesomeIcon icon={faQrcode} className="w-4 h-4 text-amber-300" />
          </motion.button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-2 text-xs"
        >
          {[
            { icon: faLock, text: 'Kitchen locked until verified' },
            { icon: faShieldHalved, text: 'Stops walkouts & leakage' },
            { icon: faCircleCheck, text: 'Marshall verifies payment' },
            { icon: faBolt, text: 'Real-time accountability' }
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-gray-300"
            >
              <FontAwesomeIcon icon={item.icon} className="w-3 h-3 text-amber-400" />
              {item.text}
            </span>
          ))}
        </motion.div>

        {/* Hero image: happy diners + manager (African photos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 md:mt-14 relative"
        >
          {/* Main image container */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Replace with actual African happy diners photo */}
            <img
              src="/assets/photos/happy-diners.png"
              alt="Happy guests enjoying their meal"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              loading="eager"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating stat card */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto">
              <div className="flex items-center gap-3 rounded-xl bg-black/80 backdrop-blur border border-white/10 px-4 py-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Less leakage. More profit.</div>
                  <div className="text-gray-400 text-xs">Every order tied to verified payment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manager photo - positioned as accent */}
          <div className="hidden md:block absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-32 lg:w-40">
            <div className="rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl">
              {/* Replace with actual African restaurant manager photo */}
              <img
                src="/assets/photos/happy-manager.png"
                alt="Restaurant manager reviewing dashboard"
                className="w-full h-40 lg:h-48 object-cover"
                loading="eager"
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs text-amber-300 font-semibold">Full control</div>
              <div className="text-[10px] text-gray-500">Real-time dashboard</div>
            </div>
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center text-xs text-gray-500"
        >
          Built for Nigerian restaurants that want tighter revenue control without slowing service
        </motion.p>
      </div>
    </section>
  );
};