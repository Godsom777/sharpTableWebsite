import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, MessageCircle, MapPin, Database, CreditCard, TrendingUp, ShieldCheck } from 'lucide-react';
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
    <section id="features" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Owner's Ecosystem</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Operational harmony isn't a luxury—it's your new baseline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-800/50 transition-colors duration-300 group ${feature.colSpan || ''}`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};