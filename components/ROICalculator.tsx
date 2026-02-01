import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faCoins, 
  faArrowRight, 
  faChartLine,
  faUtensils,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export const ROICalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000);
  const [estimatedLeakage, setEstimatedLeakage] = useState<number>(8);

  const calculations = useMemo(() => {
    const annualRevenue = monthlyRevenue * 12;
    const currentLeakage = (annualRevenue * estimatedLeakage) / 100;
    const recoveredWithSharpTable = currentLeakage * 0.85; // 85% recovery rate
    const annualCost = 65 * 12; // Control tier
    const netSavings = recoveredWithSharpTable - annualCost;
    const roi = ((netSavings / annualCost) * 100).toFixed(0);

    return {
      annualRevenue,
      currentLeakage,
      recoveredWithSharpTable,
      annualCost,
      netSavings,
      roi: Number(roi) > 0 ? roi : '0'
    };
  }, [monthlyRevenue, estimatedLeakage]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-20 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.05)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
            <FontAwesomeIcon icon={faCalculator} className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">ROI Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            See how much you could save
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Most restaurants lose 5-15% of revenue to walkouts, cash handling errors, and untracked orders. Calculate your potential recovery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faUtensils} className="w-5 h-5 text-amber-400" />
              Your Restaurant Details
            </h3>

            {/* Monthly Revenue Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-400 text-sm">Monthly Revenue</label>
                <span className="text-white font-bold text-lg">{formatCurrency(monthlyRevenue)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                aria-label="Monthly revenue slider"
                title="Adjust your monthly revenue"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$5k</span>
                <span>$100k</span>
              </div>
            </div>

            {/* Leakage Estimate Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-400 text-sm flex items-center gap-2">
                  Estimated Revenue Leakage
                  <span className="text-amber-400 text-xs">(walkouts + errors + theft)</span>
                </label>
                <span className="text-red-400 font-bold text-lg">{estimatedLeakage}%</span>
              </div>
              <input
                type="range"
                min="3"
                max="20"
                step="1"
                value={estimatedLeakage}
                onChange={(e) => setEstimatedLeakage(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                aria-label="Estimated revenue leakage slider"
                title="Adjust your estimated revenue leakage percentage"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>3% (Low)</span>
                <span>20% (High)</span>
              </div>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold text-sm">You're currently losing</p>
                  <p className="text-red-300 text-2xl font-bold">{formatCurrency(calculations.currentLeakage)}/year</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-amber-500/10 via-zinc-900/80 to-zinc-900/80 border border-amber-500/30 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 text-green-400" />
              With SharpTable
            </h3>

            {/* Recovery Stats */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                <span className="text-gray-400 text-sm">Revenue recovered annually</span>
                <span className="text-green-400 font-bold text-xl">{formatCurrency(calculations.recoveredWithSharpTable)}</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                <span className="text-gray-400 text-sm">SharpTable annual cost (Control)</span>
                <span className="text-gray-300 font-medium">-{formatCurrency(calculations.annualCost)}</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 font-semibold">Net Annual Savings</span>
                <span className="text-green-400 font-bold text-2xl">{formatCurrency(calculations.netSavings)}</span>
              </div>
            </div>

            {/* ROI Highlight */}
            <div className="text-center p-6 rounded-xl bg-amber-500/20 border border-amber-500/30 mb-6">
              <p className="text-amber-300 text-sm mb-1">Return on Investment</p>
              <p className="text-5xl font-extrabold text-white">{calculations.roi}%</p>
              <p className="text-amber-300/70 text-xs mt-2">Based on 85% leakage recovery rate</p>
            </div>

            {/* CTA */}
            <button
              onClick={() => window.location.href = 'mailto:info@sharptable.com.ng'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Saving Now
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-gray-500 text-xs mt-8"
        >
          * Calculations based on industry averages. Actual results may vary based on your specific situation.
        </motion.p>
      </div>
    </section>
  );
};
