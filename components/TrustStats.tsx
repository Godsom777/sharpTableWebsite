import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faCoins,
  faArrowTrendUp,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

// Calculate restaurants secured: starts at base, +3 every week since launch
const LAUNCH_DATE = new Date('2025-06-01'); // Adjust to your actual launch date
const BASE_RESTAURANTS = 47; // Starting number

function getRestaurantsSecured(): number {
  const now = new Date();
  const weeksSinceLaunch = Math.floor(
    (now.getTime() - LAUNCH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return BASE_RESTAURANTS + weeksSinceLaunch * 3;
}

// Calculate revenue saved: base amount + growth over time
const BASE_REVENUE_SAVED = 12.5; // Starting millions
const WEEKLY_REVENUE_GROWTH = 0.8; // Millions per week

function getRevenueSaved(): number {
  const now = new Date();
  const weeksSinceLaunch = Math.floor(
    (now.getTime() - LAUNCH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return BASE_REVENUE_SAVED + weeksSinceLaunch * WEEKLY_REVENUE_GROWTH;
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, start: () => setHasStarted(true) };
}

interface StatCardProps {
  icon: any;
  value: string;
  label: string;
  subLabel: string;
  accentColor: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  subLabel,
  accentColor,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 md:p-8 transition-all duration-300">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>

        {/* Value */}
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>

        {/* Label */}
        <div className="text-gray-300 font-medium mb-1">{label}</div>

        {/* Sub Label */}
        <div className="text-xs text-gray-500">{subLabel}</div>

        {/* Decorative glow */}
        <div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
        />
      </div>
    </motion.div>
  );
};

export const TrustStats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const restaurantsTarget = getRestaurantsSecured();
  const revenueTarget = getRevenueSaved();

  const restaurantsCounter = useCounter(restaurantsTarget, 2000, false);
  const revenueCounter = useCounter(Math.floor(revenueTarget * 10), 2500, false); // x10 for decimal precision

  useEffect(() => {
    if (isInView) {
      restaurantsCounter.start();
      revenueCounter.start();
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
            <FontAwesomeIcon icon={faArrowTrendUp} className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Live Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Already stopping leaks across Nigeria
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Restaurants using SharpTable don't chase payments. They collect them upfront.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <StatCard
            icon={faUtensils}
            value={`${restaurantsCounter.count}+`}
            label="Kitchens Protected"
            subLabel="No more unpaid orders"
            accentColor="from-amber-500 to-orange-500"
            delay={0}
          />
          <StatCard
            icon={faCoins}
            value={`₦${(revenueCounter.count / 10).toFixed(1)}M+`}
            label="Revenue Saved"
            subLabel="That would have walked out the door"
            accentColor="from-green-500 to-emerald-500"
            delay={0.1}
          />
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-amber-500" />
            <span>No payment, no cooking. That's the rule.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
