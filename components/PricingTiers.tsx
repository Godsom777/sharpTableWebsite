import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Sparkles, 
  Crown, 
  Rocket, 
  Building2, 
  QrCode, 
  ShoppingCart, 
  LayoutDashboard, 
  ChefHat, 
  Bot, 
  CreditCard, 
  FileText, 
  Receipt, 
  Shield, 
  Code, 
  Users, 
  Clock, 
  Table2,
  ArrowRight,
  Infinity,
  Zap
} from 'lucide-react';

interface Feature {
  key: string;
  label: string;
  icon: React.ReactNode;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const features: Feature[] = [
  { key: 'qr_menu', label: 'QR Menu', icon: <QrCode size={18} />, starter: true, pro: true, enterprise: true },
  { key: 'self_ordering', label: 'Self Ordering', icon: <ShoppingCart size={18} />, starter: true, pro: true, enterprise: true },
  { key: 'marshall_dashboard', label: 'Marshall Dashboard', icon: <LayoutDashboard size={18} />, starter: false, pro: true, enterprise: true },
  { key: 'chef_dashboard', label: 'Chef Dashboard', icon: <ChefHat size={18} />, starter: false, pro: true, enterprise: true },
  { key: 'ai_waiter', label: 'AI Waiter', icon: <Bot size={18} />, starter: false, pro: false, enterprise: true },
  { key: 'digital_tab', label: 'Digital Tab', icon: <CreditCard size={18} />, starter: false, pro: true, enterprise: true },
  { key: 'daily_summary', label: 'Daily Summary', icon: <FileText size={18} />, starter: false, pro: true, enterprise: true },
  { key: 'custom_receipts', label: 'Custom Receipts', icon: <Receipt size={18} />, starter: false, pro: true, enterprise: true },
  { key: 'super_admin', label: 'Super Admin', icon: <Shield size={18} />, starter: false, pro: false, enterprise: true },
  { key: 'api_access', label: 'API Access', icon: <Code size={18} />, starter: false, pro: false, enterprise: true },
];

const limits = [
  { key: 'max_tables', label: 'Max Tables', icon: <Table2 size={18} />, starter: '10', pro: '30', enterprise: '∞' },
  { key: 'max_staff', label: 'Max Staff', icon: <Users size={18} />, starter: '2', pro: '10', enterprise: '∞' },
  { key: 'order_history_days', label: 'Order History', icon: <Clock size={18} />, starter: '7 days', pro: '30 days', enterprise: '∞' },
];

interface TierCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  price: string;
  period: string;
  features: Feature[];
  limits: typeof limits;
  tierKey: 'starter' | 'pro' | 'enterprise';
  popular?: boolean;
  gradient: string;
  accentColor: string;
  delay: number;
}

const TierCard: React.FC<TierCardProps> = ({ 
  name, 
  icon, 
  description, 
  price, 
  period, 
  features, 
  limits, 
  tierKey, 
  popular, 
  gradient,
  accentColor,
  delay 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${popular ? 'md:-mt-4 md:mb-4' : ''}`}
    >
      {/* Popular Badge */}
      {popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/30">
            <Sparkles size={14} />
            MOST POPULAR
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div className={`relative h-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-900/80 border ${popular ? 'border-amber-500/50' : 'border-zinc-800'} hover:border-amber-500/40 rounded-3xl p-8 transition-all duration-500 overflow-hidden`}>
        {/* Background Glow */}
        <motion.div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${gradient}`}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />

        {/* Shine Effect */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-amber-500/50 transition-all duration-500" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {icon}
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-zinc-800">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{price}</span>
              <span className="text-gray-500">{period}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Features</p>
            {features.map((feature, idx) => {
              const value = feature[tierKey];
              const isIncluded = value === true;
              
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.1 + idx * 0.03 }}
                  className={`flex items-center gap-3 ${isIncluded ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isIncluded ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-gray-600'}`}>
                    {isIncluded ? <Check size={14} /> : <X size={14} />}
                  </div>
                  <span className="flex items-center gap-2 text-sm">
                    {feature.icon}
                    {feature.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Limits */}
          <div className="space-y-3 mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Limits</p>
            {limits.map((limit, idx) => (
              <motion.div
                key={limit.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.4 + idx * 0.05 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-gray-400">
                  {limit.icon}
                  {limit.label}
                </span>
                <span className={`font-semibold ${limit[tierKey] === '∞' ? 'text-amber-400' : 'text-white'}`}>
                  {limit[tierKey] === '∞' ? (
                    <span className="flex items-center gap-1">
                      <Infinity size={18} />
                    </span>
                  ) : limit[tierKey]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => window.location.href = "mailto:sharptable.ng@gmail.com"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              popular 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600'
            }`}
          >
            Get Started
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const PricingTiers: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 border border-amber-500/30 rounded-full px-5 py-2 mb-6"
          >
            <Zap className="text-amber-500" size={16} />
            <span className="text-amber-400 font-semibold text-sm tracking-wide">TRANSPARENT PRICING</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            Choose Your{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Growth Plan
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
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Scale your restaurant operations with the right tools. 
            <span className="text-white font-medium"> Upgrade anytime as you grow.</span>
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <TierCard
            name="Starter"
            icon={<Rocket className="text-white" size={24} />}
            description="Perfect for small cafes"
            price="Contact Us"
            period=""
            features={features}
            limits={limits}
            tierKey="starter"
            gradient="bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
            accentColor="from-blue-500 to-cyan-500"
            delay={0}
          />
          
          <TierCard
            name="Pro"
            icon={<Crown className="text-white" size={24} />}
            description="For growing restaurants"
            price="Contact Us"
            period=""
            features={features}
            limits={limits}
            tierKey="pro"
            popular={true}
            gradient="bg-gradient-to-br from-amber-500/10 to-orange-500/5"
            accentColor="from-amber-500 to-orange-500"
            delay={0.1}
          />
          
          <TierCard
            name="Enterprise"
            icon={<Building2 className="text-white" size={24} />}
            description="For restaurant chains"
            price="Custom"
            period=""
            features={features}
            limits={limits}
            tierKey="enterprise"
            gradient="bg-gradient-to-br from-purple-500/5 to-pink-500/5"
            accentColor="from-purple-500 to-pink-500"
            delay={0.2}
          />
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            All plans include 24/7 support, secure cloud hosting, and automatic updates.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              Free migration
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
