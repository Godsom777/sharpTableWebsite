import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faShieldHalved, faBolt, faLocationDot, faChartLine, faCreditCard, faUtensils, faUsers, faChartPie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Kitchen locked until payment verified",
    description: "No order reaches the kitchen without confirmed payment. Every ticket is tied to money, eliminating walkouts and internal theft.",
    icon: <FontAwesomeIcon icon={faShieldHalved} className="w-8 h-8 text-amber-500" />,
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Full audit trail on every naira",
    description: "Every transaction is logged with who took payment, when, and for what. No hiding, no shortcuts, no shrinkage.",
    icon: <FontAwesomeIcon icon={faDatabase} className="w-8 h-8 text-green-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Marshall role verifies payments",
    description: "A dedicated staff role confirms every payment before the kitchen starts cooking. Your frontline defense against loss.",
    icon: <FontAwesomeIcon icon={faBolt} className="w-8 h-8 text-amber-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Multi-location loss visibility",
    description: "Compare revenue leakage across branches. Spot outliers, identify problem areas, and apply controls everywhere.",
    icon: <FontAwesomeIcon icon={faLocationDot} className="w-8 h-8 text-red-500" />,
    colSpan: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Guest profiles built automatically",
    description: "Know your customers without forms. Track spending, favorites, and visit frequency to boost loyalty and retention.",
    icon: <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-blue-400" />,
    colSpan: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Faster service, cleaner handoffs",
    description: "Streamlined floor-to-kitchen workflow means less chaos, fewer mistakes, and tables turning faster.",
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
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          {/* Animated Icon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 border border-amber-500/30 rounded-full px-6 py-3 mb-8"
          >
            <FontAwesomeIcon icon={faUtensils} className="text-amber-500 w-5 h-5" />
            <span className="text-amber-400 font-semibold text-sm tracking-wide">STOP REVENUE LEAKAGE AT THE SOURCE</span>
            <FontAwesomeIcon icon={faUtensils} className="text-amber-500 w-5 h-5" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            Built-in{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Loss Prevention
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Orders don’t hit the kitchen until money is confirmed —
            <span className="text-white font-medium"> so your sales stop leaking.</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { value: '0%', label: 'Walkouts', icon: <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4" /> },
              { value: '100%', label: 'Payment Verified', icon: <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" /> },
              { value: 'Full', label: 'Audit Trail', icon: <FontAwesomeIcon icon={faDatabase} className="w-4 h-4" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="text-amber-500">{stat.icon}</div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How it works — in 30 seconds */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-16 mb-20"
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
                <p className="mt-3 text-sm text-gray-300 font-medium">Nothing is sent to the kitchen yet.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">3</div>
                  <h4 className="text-white font-bold">Marshall verifies payment</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A dedicated Marshall confirms payment on their dashboard.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">This single action unlocks the kitchen.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-300 font-extrabold">4</div>
                  <h4 className="text-white font-bold">Kitchen starts cooking</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Only verified, paid orders appear on the kitchen screen.
                </p>
                <p className="mt-3 text-sm text-gray-300 font-medium">No payment = no cooking. No arguments. No exceptions.</p>
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

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`group relative cursor-pointer ${feature.colSpan || ''}`}
            >
              {/* Card Container */}
              <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 rounded-3xl p-8 transition-all duration-500 overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-500/10 group-hover:via-orange-500/5 group-hover:to-transparent transition-all duration-700 rounded-3xl" />
                
                {/* Top Shine Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-500" />
                
                {/* Content */}
                <div className="flex flex-col h-full relative z-10">
                  {/* Icon with Background */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Icon Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-zinc-800/80 group-hover:bg-gradient-to-br group-hover:from-amber-500/20 group-hover:to-orange-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-zinc-700 group-hover:border-amber-500/30 transition-all duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>
                    
                    {/* Feature Number Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-amber-500/20 border border-zinc-700 group-hover:border-amber-500/30 flex items-center justify-center transition-all duration-300"
                    >
                      <span className="text-xs font-bold text-zinc-500 group-hover:text-amber-400 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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