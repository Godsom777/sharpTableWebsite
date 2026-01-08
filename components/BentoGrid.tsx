import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, MessageCircle, MapPin, Database, CreditCard, TrendingUp, ShieldCheck, UtensilsCrossed, ChefHat, Users, BarChart3, Clock, Sparkles, ArrowRight, CheckCircle2, Star, Utensils, PieChart, Wallet } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Guest profiles without the forms",
    description: "Capture guest history automatically. See spending, favorites, and visit frequency at a glance—no awkward sign-ups.",
    icon: <Database className="w-8 h-8 text-indigo-500" />,
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Protect your profit",
    description: "Spot slow movers, shrinking margins, and peak-demand shifts early—so you cut waste before it shows up in costs.",
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Make shifts smoother",
    description: "Automate handoffs between floor and kitchen. Less chaos, fewer mistakes, happier staff.",
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Run multiple locations like one",
    description: "Whether it's 2 or 20 stores, compare performance, spot outliers, and share what works—from one dashboard.",
    icon: <MapPin className="w-8 h-8 text-red-500" />,
    colSpan: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Loyalty that happens automatically",
    description: "Build repeat-visit habits over WhatsApp—personal messages, timed nudges, and receipts—without manual blasts.",
    icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
    colSpan: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Fast checkout, faster table turns",
    description: "Make payment frictionless. When guests pay quickly, tables free up sooner—and revenue follows.",
    icon: <CreditCard className="w-8 h-8 text-purple-400" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
];

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-black relative overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_60%)]" />
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <UtensilsCrossed className="text-amber-500" size={20} />
            <span className="text-amber-400 font-semibold text-sm tracking-wide">RESTAURANT INTELLIGENCEALL IN ONE PLACE</span>
            <ChefHat className="text-amber-500" size={20} />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            The Owner's{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Ecosystem
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
            From kitchen to cashier, from tables to tablets—
            <span className="text-white font-medium"> everything stays in sync.</span>
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
              { value: '100%', label: 'Guest Data Capture', icon: <Database size={18} /> },
              { value: '40%', label: 'Less Food Waste', icon: <PieChart size={18} /> },
              { value: '2x', label: 'Staff Efficiency', icon: <Users size={18} /> },
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
              A short demo can show you where revenue leaks and repeat visits are hiding—and how to fix it.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => window.location.href = "mailto:sharptable.ng@gmail.com"}
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
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
          <p className="text-gray-500 text-sm">Usually responds within 2 hours</p>
        </motion.div>
      </div>
    </section>
  );
};