import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Sparkles, Lock } from 'lucide-react';

export const OwnerTease: React.FC = () => {
  const handleContact = () => {
    window.location.href = "mailto:sharptable.ng@gmail.com";
  };

  return (
    <section className="py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
              What are your <br/>
              <span className="text-amber-500 italic font-serif">guests hiding?</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 transition-colors group-hover:border-white/20">
                  <EyeOff className="text-gray-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Standard View</h4>
                  <p className="text-gray-500 text-sm">"Table 4 ordered 2 Pastas and a Coke. They paid and left."</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 transition-all group-hover:bg-amber-500/20">
                  <Eye className="text-amber-500 w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-amber-500 font-semibold">SharpTable View</h4>
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    "That's David. He's been here 4 times this month. He prefers gluten-free but hasn't told you yet. He's 80% likely to return if you offer him a complimentary dessert today."
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-500 max-w-lg leading-relaxed border-l border-zinc-800 pl-6">
              We don't just process orders. We decode the DNA of your business so you can stay three steps ahead of the competition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* The "Tease" Card */}
            <div className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full" />
            <div className="relative bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
              
              {/* Blurred Background Mockup Data */}
              <div className="absolute top-0 right-0 left-0 bottom-0 opacity-10 pointer-events-none select-none filter blur-md p-12">
                <div className="h-4 w-full bg-white rounded mb-4" />
                <div className="h-4 w-3/4 bg-white rounded mb-4" />
                <div className="h-32 w-full border border-white rounded mb-4" />
                <div className="h-4 w-1/2 bg-white rounded mb-4" />
                <div className="h-4 w-full bg-white rounded" />
              </div>

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20">
                    <Lock className="text-amber-500 w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">The Unfair Advantage</h3>
                <p className="text-gray-400 mb-10 text-lg">
                  Most of your revenue data is walking out the door every night. Ready to see the rest?
                </p>
                
                <button 
                  onClick={handleContact}
                  className="group w-full py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  Claim Your Market <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-2">
                    <Sparkles className="text-amber-500 w-4 h-4" />
                    <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-bold">
                        Invite-Only Access
                    </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};