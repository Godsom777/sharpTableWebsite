import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faDatabase, faMobileScreen, faChartLine, faStar } from '@fortawesome/free-solid-svg-icons';

export const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive Background with Mouse Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px]"
          animate={{ 
            opacity: isHovering ? 0.3 : 0.2,
            scale: isHovering ? 1.1 : 1
          }}
          transition={{ duration: 0.6 }}
        />
        {/* Additional interactive orbs */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]"
          animate={{ 
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            opacity: isHovering ? 0.25 : 0.15
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px]"
          animate={{ 
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
            opacity: isHovering ? 0.2 : 0.1
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
      </motion.div>

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
          <FontAwesomeIcon icon={faStar} className="w-3 h-3" /> Turn receipts into repeat visits
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.05]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-block"
          >
            Know your guests.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 inline-block"
          >
            Grow your restaurant.
          </motion.span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          POS shows you <span className="text-white italic">what</span> sold. SharpTable shows you <span className="text-amber-500 font-semibold">who</span> bought it, what they love, and what keeps them coming back. So you can personalize service and get more <span className="text-amber-500 font-semibold">repeat visits</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button 
            onClick={() => window.location.href = "mailto:sharptable.ng@gmail.com"}
            className="group px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/5"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 60px rgba(255,255,255,0.15)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-semibold text-xl hover:bg-white/10 transition-all backdrop-blur-md"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255,255,255,0.3)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            See how it works
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating UI Elements as Abstract Representation with Mouse Interactivity */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-16 relative w-full max-w-7xl h-[280px] md:h-[500px] perspective-1000 mx-auto hidden md:block"
      >
        {/* Abstract Card 1: Guest (Left) */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0], 
            rotate: [-6, -4, -6],
            x: mousePosition.x * -15
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            x: { type: "spring", stiffness: 50, damping: 20 }
          }}
          whileHover={{ 
            scale: 1.05, 
            rotate: 0,
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            zIndex: 50
          }}
          className="absolute left-0 top-20 w-44 md:w-56 h-64 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl origin-bottom-right z-10 cursor-pointer"
        >
            <div className="flex justify-between items-start">
              <FontAwesomeIcon icon={faMobileScreen} className="text-white w-6 h-6" />
              <motion.div 
                className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-400 font-bold uppercase tracking-tighter"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Live
              </motion.div>
            </div>
            <div>
                <motion.div 
                  className="h-2 w-20 bg-zinc-700 rounded-full mb-3"
                  whileHover={{ width: "100%", backgroundColor: "#10b981" }}
                />
                <motion.div 
                  className="h-2 w-12 bg-zinc-800 rounded-full"
                  whileHover={{ width: "80%", backgroundColor: "#3b82f6" }}
                />
            </div>
            <div className="text-xs text-zinc-500 leading-tight">
                Guest Identity<br/>
                <span className="text-white font-medium text-sm">Decoded</span>
            </div>
        </motion.div>

        {/* Abstract Card 2: Centerpiece / Advantage (Center) - UPDATED TO +32% */}
        <motion.div 
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.02, 1],
            rotateY: mousePosition.x * 5
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
            scale: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
            rotateY: { type: "spring", stiffness: 50, damping: 20 }
          }}
          whileHover={{ 
            scale: 1.08, 
            y: -10,
            boxShadow: "0 40px 80px rgba(245,158,11,0.4)",
            borderColor: "rgba(245,158,11,0.6)",
            zIndex: 100
          }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-64 md:w-80 h-80 md:h-96 bg-gradient-to-br from-zinc-800 to-black backdrop-blur-2xl border border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between z-30 shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] cursor-pointer"
        >
             <FontAwesomeIcon icon={faChartLine} className="text-amber-500 w-10 h-10 mb-4" />
            <div>
                <motion.div 
                  className="h-2 w-full bg-zinc-600 rounded-full mb-3"
                  whileHover={{ backgroundColor: "#f59e0b", height: "12px" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="h-2 w-2/3 bg-zinc-700 rounded-full"
                  whileHover={{ width: "90%", backgroundColor: "#f59e0b" }}
                />
                <motion.div 
                  className="h-2 w-1/2 bg-zinc-800 rounded-full mt-3"
                  whileHover={{ width: "75%", backgroundColor: "#f59e0b" }}
                />
            </div>
            <div className="text-xs text-zinc-400">
                Revenue Growth<br/>
                <motion.span 
                  className="text-amber-500 font-bold text-lg md:text-2xl"
                  whileHover={{ scale: 1.1, color: "#fbbf24" }}
                >
                  +32% Optimization
                </motion.span>
            </div>
        </motion.div>

        {/* Abstract Card 3: Data (Right) */}
        <motion.div 
          animate={{ 
            y: [0, -18, 0], 
            rotate: [6, 4, 6],
            x: mousePosition.x * 15
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 },
            rotate: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 },
            x: { type: "spring", stiffness: 50, damping: 20 }
          }}
          whileHover={{ 
            scale: 1.05, 
            rotate: 0,
            boxShadow: "0 25px 50px rgba(59,130,246,0.3)",
            zIndex: 50
          }}
          className="absolute right-0 top-24 w-44 md:w-56 h-64 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl origin-bottom-left z-10 cursor-pointer"
        >
             <FontAwesomeIcon icon={faDatabase} className="text-blue-500 w-6 h-6" />
            <div className="flex flex-col items-end">
                <motion.div 
                  className="h-2 w-20 bg-zinc-700 rounded-full mb-3"
                  whileHover={{ width: "100%", backgroundColor: "#3b82f6" }}
                />
                <motion.div 
                  className="h-2 w-12 bg-zinc-800 rounded-full"
                  whileHover={{ width: "80%", backgroundColor: "#60a5fa" }}
                />
            </div>
            <div className="text-xs text-zinc-500 leading-tight text-right">
                Lifetime Value<br/>
                <span className="text-blue-400 font-medium text-sm">Auto-Tracked</span>
            </div>
        </motion.div>
      </motion.div>

      {/* Mobile Cards - Simplified horizontal layout */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 w-full px-4 md:hidden"
      >
        <div className="flex justify-center gap-2">
          {/* Mobile Card 1 */}
          <motion.div 
            className="flex-1 max-w-[110px] h-40 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col justify-between"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faMobileScreen} className="text-white w-4 h-4" />
            <div>
              <div className="h-1 w-12 bg-zinc-700 rounded-full mb-1.5" />
              <div className="h-1 w-8 bg-zinc-800 rounded-full" />
            </div>
            <div className="text-[9px] text-zinc-500 leading-tight">
              Guest Identity<br/>
              <span className="text-white font-medium text-[10px]">Decoded</span>
            </div>
          </motion.div>

          {/* Mobile Card 2 - Center */}
          <motion.div 
            className="flex-1 max-w-[130px] h-44 bg-gradient-to-br from-zinc-800 to-black border border-amber-500/30 rounded-2xl p-3 flex flex-col justify-between shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faChartLine} className="text-amber-500 w-5 h-5" />
            <div>
              <div className="h-1 w-full bg-zinc-600 rounded-full mb-1.5" />
              <div className="h-1 w-2/3 bg-zinc-700 rounded-full" />
            </div>
            <div className="text-[9px] text-zinc-400">
              Revenue Growth<br/>
              <span className="text-amber-500 font-bold text-[11px]">+32% Optimization</span>
            </div>
          </motion.div>

          {/* Mobile Card 3 */}
          <motion.div 
            className="flex-1 max-w-[110px] h-40 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col justify-between"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faDatabase} className="text-blue-500 w-4 h-4" />
            <div className="flex flex-col items-end">
              <div className="h-1 w-12 bg-zinc-700 rounded-full mb-1.5" />
              <div className="h-1 w-8 bg-zinc-800 rounded-full" />
            </div>
            <div className="text-[9px] text-zinc-500 leading-tight text-right">
              Lifetime Value<br/>
              <span className="text-blue-400 font-medium text-[10px]">Auto-Tracked</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};