import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, MessageCircle, MapPin, Database, CreditCard, TrendingUp, ShieldCheck, UtensilsCrossed, ChefHat, Users, BarChart3, Clock, Sparkles, ArrowRight, CheckCircle2, Star, Utensils, PieChart, Wallet } from 'lucide-react';
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
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 border border-amber-500/30 rounded-full px-6 py-3 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <UtensilsCrossed className="text-amber-500" size={20} />
            </motion.div>
            <span className="text-amber-400 font-semibold text-sm tracking-wide">RESTAURANT INTELLIGENCE SUITE</span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChefHat className="text-amber-500" size={20} />
            </motion.div>
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
            <span className="text-white font-medium"> complete operational harmony.</span>
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
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    className="mt-6 flex items-center gap-2 text-amber-500/0 group-hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore feature</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900 border border-zinc-700/50 rounded-[2rem] p-10 md:p-16 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
                x: [0, -20, 0],
                y: [0, 30, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px]"
            />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left Content */}
              <div className="text-center lg:text-left max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6"
                >
                  <Star className="text-amber-500 fill-amber-500" size={14} />
                  <span className="text-amber-400 text-sm font-medium">Limited Early Access</span>
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to transform your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">restaurant operations?</span>
                </h3>
                <p className="text-gray-400 text-lg">
                  Join forward-thinking restaurant owners who've already discovered their competitive edge.
                </p>
                
                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6"
                >
                  {[
                    { icon: <CheckCircle2 size={16} />, text: 'Free Setup' },
                    { icon: <CheckCircle2 size={16} />, text: 'No Credit Card' },
                    { icon: <CheckCircle2 size={16} />, text: '24/7 Support' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-green-500">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Right CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};