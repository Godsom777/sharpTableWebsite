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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Power for every <br/>
              <span className="text-gray-500">role in your team.</span>
            </h2>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <button
                  key={role.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                    activeTab === index 
                      ? 'bg-zinc-800 border border-zinc-700' 
                      : 'bg-transparent border border-transparent hover:bg-zinc-900'
                  }`}
                >
                  <div className={`p-3 rounded-full ${activeTab === index ? 'bg-white text-black' : 'bg-zinc-800 text-gray-400'}`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                      {role.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Display Card */}
          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center"
              >
                 <div className="absolute top-0 right-0 p-32 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <h3 className="text-3xl font-bold text-white mb-2">{roles[activeTab].title}</h3>
                <p className="text-gray-400 text-lg mb-8">{roles[activeTab].subtitle}</p>

                <ul className="space-y-4 mb-8">
                  {roles[activeTab].content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-white/10">
                   <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Impact</span>
                   <p className="text-xl text-white font-medium mt-1">{roles[activeTab].highlight}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};