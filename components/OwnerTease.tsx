import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faStar, faLock } from '@fortawesome/free-solid-svg-icons';

export const OwnerTease: React.FC = () => {
  const handleContact = () => {
    window.location.href = "mailto:info@sharptable.com.ng";
  };

  return (
    <section className="py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight"
            >
              How much money is <br/>
              <span className="text-amber-500 italic font-serif">walking out your door?</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex gap-4 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="shrink-0 w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 transition-colors group-hover:border-white/20"
                >
                  <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500 w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold">What most POS systems allow</h4>
                  <p className="text-gray-500 text-sm">“Food goes out before payment is confirmed. That’s where walkouts and ‘missing cash’ start.”</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex gap-4 group cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 transition-all group-hover:bg-amber-500/20"
                >
                  <FontAwesomeIcon icon={faEye} className="text-amber-500 w-5 h-5 animate-pulse" />
                </motion.div>
                <div>
                  <h4 className="text-amber-500 font-semibold">What SharpTable changes</h4>
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    “The kitchen stays locked until your Marshall confirms payment. Every payment is logged — who took it, when, and how much.”
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-500 max-w-lg leading-relaxed border-l border-zinc-800 pl-6"
            >
              SharpTable gives you a clean money trail from order to payment to kitchen —
              <span className="text-white font-medium"> so you can spot problems fast and keep what you earn.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* The "Tease" Card */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full"
            />
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
              className="relative bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl"
            >
              
              {/* Blurred Background Mockup Data */}
              <motion.div
                animate={{ opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 left-0 bottom-0 pointer-events-none select-none filter blur-md p-12"
              >
                <div className="h-4 w-full bg-white rounded mb-4" />
                <div className="h-4 w-3/4 bg-white rounded mb-4" />
                <div className="h-32 w-full border border-white rounded mb-4" />
                <div className="h-4 w-1/2 bg-white rounded mb-4" />
                <div className="h-4 w-full bg-white rounded" />
              </motion.div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20"
                >
                    <FontAwesomeIcon icon={faLock} className="text-amber-500 w-6 h-6" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  Stop the leakage today
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 mb-10 text-lg"
                >
                  Most restaurants lose 5-15% to theft and walkouts. Want to keep what you earn?
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  onClick={handleContact}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-full py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
                >
                  Talk to us <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 flex items-center justify-center gap-2"
                >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <FontAwesomeIcon icon={faStar} className="text-amber-500 w-4 h-4" />
                    </motion.div>
                    <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-bold">
                        Invite-Only Access
                    </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};