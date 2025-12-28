import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ChefHat, Users, CheckCircle2 } from 'lucide-react';

const roles = [
  {
    id: 'admin',
    title: 'Admin & Manager',
    icon: <LayoutDashboard />,
    subtitle: 'Complete visibility across all locations.',
    content: [
      "View all customers & profiles",
      "Access analytics dashboard",
      "Send targeted WhatsApp promos",
      "Configure menu & location settings"
    ],
    highlight: "Make data-driven decisions."
  },
  {
    id: 'kds',
    title: 'Kitchen Staff',
    icon: <ChefHat />,
    subtitle: 'Kitchen-focused, real-time operations.',
    content: [
      "Real-time order queue",
      "See special requests instantly",
      "Mark items cooking/ready",
      "Sync status with floor staff"
    ],
    highlight: "Zero miscommunication."
  },
  {
    id: 'marshall',
    title: 'Floor Marshall',
    icon: <Users />,
    subtitle: 'Front-of-house coordination.',
    content: [
      "Assign tables to guests",
      "Track order progress",
      "Notify when food is ready",
      "Manage seating flow"
    ],
    highlight: "Proactive guest service."
  }
];

export const Roles: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="roles" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Navigation */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
            >
              Power for every <br/>
              <span className="text-gray-500">role in your team.</span>
            </motion.h2>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                    activeTab === index 
                      ? 'bg-zinc-800 border border-zinc-700 shadow-xl' 
                      : 'bg-transparent border border-transparent hover:bg-zinc-900'
                  }`}
                >
                  <motion.div
                    animate={{
                      rotate: activeTab === index ? [0, 360] : 0,
                      scale: activeTab === index ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      duration: activeTab === index ? 0.5 : 0.3,
                      ease: "easeInOut"
                    }}
                    className={`p-3 rounded-full ${activeTab === index ? 'bg-white text-black' : 'bg-zinc-800 text-gray-400'}`}
                  >
                    {role.icon}
                  </motion.div>
                  <div>
                    <h3 className={`text-lg font-semibold transition-colors ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                      {role.title}
                    </h3>
                  </div>
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-amber-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column: Display Card */}
          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center shadow-2xl"
              >
                 <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="absolute top-0 right-0 p-32 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"
                 />
                
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {roles[activeTab].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-gray-400 text-lg mb-8"
                >
                  {roles[activeTab].subtitle}
                </motion.p>

                <ul className="space-y-4 mb-8">
                  {roles[activeTab].content.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto pt-6 border-t border-white/10"
                >
                   <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Impact</span>
                   <p className="text-xl text-white font-medium mt-1">{roles[activeTab].highlight}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};