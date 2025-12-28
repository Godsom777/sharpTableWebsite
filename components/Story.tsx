import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Star } from 'lucide-react';

export const Story: React.FC = () => {
  return (
    <section id="scenario" className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl rounded-full opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Monday Evening at Restaurant #1</h2>
            <p className="text-gray-400">See how SharpTable changes the experience for Aisha.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Card: The Experience */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden relative">
                         <img src="https://picsum.photos/200" alt="Aisha" className="object-cover w-full h-full opacity-80" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Aisha</h3>
                        <div className="flex items-center gap-2 text-sm text-amber-500">
                             <Star size={14} fill="currentColor" />
                             <span>VIP Customer (12 Visits)</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-zinc-800"></div>

                    <div className="relative pl-10">
                        <div className="absolute left-0 top-0 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 text-xs">1</div>
                        <p className="text-gray-300 text-sm"><strong className="text-white">Arrival:</strong> System recognizes her Device ID instantly.</p>
                    </div>

                    <div className="relative pl-10">
                         <div className="absolute left-0 top-0 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 text-xs">2</div>
                        <p className="text-gray-300 text-sm"><strong className="text-white">Ordering:</strong> Marshall sees she loves Butter Chicken & Mango Lassi.</p>
                    </div>

                    <div className="relative pl-10">
                         <div className="absolute left-0 top-0 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 text-xs">3</div>
                        <p className="text-gray-300 text-sm"><strong className="text-white">Kitchen:</strong> KDS flags order as "VIP Regular" for priority.</p>
                    </div>

                     <div className="relative pl-10">
                         <div className="absolute left-0 top-0 w-6 h-6 bg-green-900 text-green-400 rounded-full flex items-center justify-center border border-green-700 text-xs">4</div>
                        <p className="text-gray-300 text-sm"><strong className="text-white">Checkout:</strong> Receipt sent via WhatsApp. Visit #13 recorded.</p>
                    </div>
                </div>
            </motion.div>

            {/* Right Card: The Result */}
             <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center"
            >
                <div className="bg-green-900/10 border border-green-900/30 p-6 rounded-2xl mb-6">
                    <div className="flex items-start gap-4">
                        <MessageSquare className="text-green-500 mt-1" />
                        <div>
                            <p className="text-white font-medium text-sm">WhatsApp Notification</p>
                            <p className="text-gray-400 text-xs mt-1">
                                "Thanks for visiting, Aisha! We hope you enjoyed the Butter Chicken. Here is your receipt..."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-900/10 border border-amber-900/30 p-6 rounded-2xl">
                    <div className="flex items-start gap-4">
                        <Heart className="text-amber-500 mt-1" />
                        <div>
                            <p className="text-white font-medium text-sm">Retention Impact</p>
                            <p className="text-gray-400 text-xs mt-1">
                                Aisha feels recognized. The system now knows she tried a new appetizer, updating her recommendations for next time.
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