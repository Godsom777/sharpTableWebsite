import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, Smartphone, TrendingUp, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-5xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold mb-8 backdrop-blur-sm uppercase tracking-widest"
        >
          <Sparkles size={12} /> The Missing Ingredient Found
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.05]">
          See the Blind Spots <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            in Your Business.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
          Most owners only see <span className="text-white italic">what</span> was ordered. SharpTable reveals <span className="text-amber-500 font-semibold">who</span> is ordering and <span className="text-amber-500 font-semibold">why</span> they really keep coming back—so you can stay three steps ahead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={() => window.location.href = "mailto:sharptable.ng@gmail.com"}
            className="group px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/5 active:scale-95"
          >
            Claim Your Edge <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-semibold text-xl hover:bg-white/10 transition-all backdrop-blur-md active:scale-95"
          >
            Explore the Unseen
          </button>
        </div>
      </motion.div>

      {/* Floating UI Elements as Abstract Representation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-16 relative w-full max-w-6xl h-[450px] perspective-1000"
      >
        {/* Abstract Card 1: Guest (Left) */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [-6, -4, -6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute left-2 md:left-12 lg:left-24 top-20 w-44 md:w-56 h-64 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl origin-bottom-right z-0"
        >
            <div className="flex justify-between items-start">
              <Smartphone className="text-white w-6 h-6" />
              <div className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Live</div>
            </div>
            <div>
                <div className="h-2 w-20 bg-zinc-700 rounded-full mb-3"></div>
                <div className="h-2 w-12 bg-zinc-800 rounded-full"></div>
            </div>
            <div className="text-xs text-zinc-500 leading-tight">
                Guest Identity<br/>
                <span className="text-white font-medium text-sm">Decoded</span>
            </div>
        </motion.div>

        {/* Abstract Card 2: Centerpiece / Advantage (Center) */}
        <motion.div 
          animate={{ y: [0, 20, 0], scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-64 md:w-80 h-80 md:h-96 bg-gradient-to-br from-zinc-800 to-black backdrop-blur-2xl border border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between z-20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)]"
        >
             <TrendingUp className="text-amber-500 w-10 h-10 mb-4" />
            <div>
                <div className="h-2 w-full bg-zinc-600 rounded-full mb-3"></div>
                <div className="h-2 w-2/3 bg-zinc-700 rounded-full"></div>
                <div className="h-2 w-1/2 bg-zinc-800 rounded-full mt-3"></div>
            </div>
            <div className="text-xs text-zinc-400">
                Revenue Growth<br/>
                <span className="text-amber-500 font-bold text-lg md:text-2xl">+22% Optimization</span>
            </div>
        </motion.div>

        {/* Abstract Card 3: Data (Right) */}
        <motion.div 
          animate={{ y: [0, -18, 0], rotate: [6, 4, 6] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute right-2 md:right-12 lg:right-24 top-24 w-44 md:w-56 h-64 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl origin-bottom-left z-0"
        >
             <Database className="text-blue-500 w-6 h-6" />
            <div className="flex flex-col items-end">
                <div className="h-2 w-20 bg-zinc-700 rounded-full mb-3"></div>
                <div className="h-2 w-12 bg-zinc-800 rounded-full"></div>
            </div>
            <div className="text-xs text-zinc-500 leading-tight text-right">
                Lifetime Value<br/>
                <span className="text-blue-400 font-medium text-sm">Auto-Tracked</span>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};