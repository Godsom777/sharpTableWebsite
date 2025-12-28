import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, MessageCircle, MapPin, Database, CreditCard, TrendingUp, ShieldCheck, UtensilsCrossed, ChefHat, Users, BarChart3, Clock, Sparkles } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "The Invisible Guest Profile",
    description: "Capture 100% of guest data without invasive forms. Know their LTV (Lifetime Value) before they pay.",
    icon: <Database className="w-8 h-8 text-indigo-500" />,
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Profit Protection",
    description: "Identify slow-moving inventory and peak demand trends in real-time to slash waste.",
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Staff Empowerment",
    description: "Reduce front-of-house stress with automated coordination. Happy staff = Lower turnover.",
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Multi-Unit Mastery",
    description: "Whether it's 2 or 20 locations, see which manager is winning and why, from one screen.",
    icon: <MapPin className="w-8 h-8 text-red-500" />,
    colSpan: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Automated Loyalty",
    description: "SharpTable builds loyalty loops on WhatsApp while you sleep. No manual blasts required.",
    icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
    colSpan: "md:col-span-2 md:row-span-1",
  },
    {
    title: "Frictionless Pay",
    description: "The faster they pay, the faster your tables turn. Simple math, massive impact.",
    icon: <CreditCard className="w-8 h-8 text-purple-400" />,
    colSpan: "md:col-span-1 md:row-span-1",
  },
];

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-surface relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Floating Icon Row */}
          <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
            {[
              { icon: <UtensilsCrossed size={24} />, color: 'text-amber-500', delay: 0 },
              { icon: <ChefHat size={24} />, color: 'text-orange-500', delay: 0.1 },
              { icon: <Users size={24} />, color: 'text-blue-500', delay: 0.2 },
              { icon: <BarChart3 size={24} />, color: 'text-green-500', delay: 0.3 },
              { icon: <Clock size={24} />, color: 'text-purple-500', delay: 0.4 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20, scale: 0 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                className={`${item.color} bg-white/5 p-3 rounded-2xl backdrop-blur-sm border border-white/10 cursor-pointer`}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>

          {/* Main Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight"
          >
            The Owner's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
              Ecosystem
            </span>
          </motion.h2>

          {/* Subtitle with Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-amber-500" size={20} />
            </motion.div>
            <p className="text-xl text-gray-400 max-w-3xl">
              From kitchen to cashier, from tables to tablets—complete operational harmony.
            </p>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-amber-500" size={20} />
            </motion.div>
          </motion.div>

          {/* Tag Line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-zinc-500 uppercase tracking-widest font-semibold"
          >
            🍽️ Restaurant Intelligence • 📊 Real-Time Analytics • 🚀 Growth Engine
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.2 }
              }}
              className={`bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-800/50 hover:border-amber-500/20 transition-all duration-300 group cursor-pointer relative overflow-hidden ${feature.colSpan || ''}`}
            >
              {/* Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 rounded-3xl" />
              
              {/* Content */}
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/20"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Decorative Corner Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-xs font-bold text-amber-500/50 group-hover:text-amber-500 transition-colors"
                  >
                    #{index + 1}
                  </motion.div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Hover Arrow Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 text-amber-500 text-sm font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Learn more →
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to transform your restaurant operations?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join forward-thinking restaurant owners who've already discovered their competitive edge.
              </p>
              <motion.button
                onClick={() => window.location.href = "mailto:sharptable.ng@gmail.com"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 inline-flex items-center gap-2"
              >
                Start Your Free Consultation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};