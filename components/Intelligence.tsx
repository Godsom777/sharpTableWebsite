import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const visitData = [
  { name: 'Mon', visits: 120 },
  { name: 'Tue', visits: 132 },
  { name: 'Wed', visits: 101 },
  { name: 'Thu', visits: 154 },
  { name: 'Fri', visits: 290 },
  { name: 'Sat', visits: 330 },
  { name: 'Sun', visits: 310 },
];

const itemData = [
  { name: 'Butter Ckn', count: 470 },
  { name: 'Biryani', count: 380 },
  { name: 'Naan', count: 520 },
  { name: 'Lassi', count: 210 },
];

export const Intelligence: React.FC = () => {
  return (
    <section id="analytics" className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Automatic Intelligence</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
             When a session is paid, the trigger fires. 
             Orders are saved, profiles are updated, and favorites are recalculated instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Customer Visits */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8"
            >
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white">Visit Patterns</h3>
                    <p className="text-sm text-gray-500">Know when your regulars usually come.</p>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={visitData}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="visits" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

             {/* Chart 2: Item Popularity */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8"
            >
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white">Top Items</h3>
                    <p className="text-sm text-gray-500">Identify trends & bestsellers automatically.</p>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={itemData} layout="vertical">
                            <XAxis type="number" hide />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                            />
                             <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                                {itemData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#f59e0b', '#3b82f6', '#10b981', '#ef4444'][index % 4]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>

        {/* The Trigger Logic Visual */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-8 border border-dashed border-zinc-700 rounded-3xl bg-zinc-900/20 text-center"
        >
             <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">The Trigger Loop</span>
             <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm md:text-base text-gray-300 font-medium">
                <span className="px-4 py-2 bg-zinc-800 rounded-full">Guest Pays</span>
                <span className="text-zinc-600">→</span>
                <span className="px-4 py-2 bg-zinc-800 rounded-full">Save Order History</span>
                <span className="text-zinc-600">→</span>
                <span className="px-4 py-2 bg-zinc-800 rounded-full">Update Total Spent</span>
                <span className="text-zinc-600">→</span>
                <span className="px-4 py-2 bg-zinc-800 rounded-full text-amber-500">Recalculate Favorites</span>
                <span className="text-zinc-600">→</span>
                <span className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-800 rounded-full">WhatsApp Receipt Sent</span>
             </div>
        </motion.div>
      </div>
    </section>
  );
};