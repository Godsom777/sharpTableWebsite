import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faStar, faWifi, faUsers, faUtensils, faReceipt, faChartLine } from '@fortawesome/free-solid-svg-icons';

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  view: {
    title: string;
    description: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
  };
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Order Placed',
    description: 'Guest orders Butter Chicken. The order is captured but does NOT go to the kitchen.',
    icon: <FontAwesomeIcon icon={faUtensils} className="w-5 h-5" />,
    color: 'blue',
    view: {
      title: 'Order Captured',
      description: 'Table 7 - Butter Chicken + Mango Lassi. Status: PENDING PAYMENT. Kitchen will not see this order until payment is verified.',
      bgColor: 'bg-blue-900/10',
      borderColor: 'border-blue-900/30',
      iconColor: 'text-blue-500'
    }
  },
  {
    id: 2,
    title: 'Payment Collected',
    description: 'The Marshall collects ₦8,500. Payment method and amount are logged.',
    icon: <FontAwesomeIcon icon={faReceipt} className="w-5 h-5" />,
    color: 'purple',
    view: {
      title: 'Payment Logged',
      description: 'Marshall "Chidi" collected ₦8,500 via POS. Transaction ID: #TXN-4521. Timestamp: 7:32 PM. Awaiting verification.',
      bgColor: 'bg-purple-900/10',
      borderColor: 'border-purple-900/30',
      iconColor: 'text-purple-500'
    }
  },
  {
    id: 3,
    title: 'Payment Verified',
    description: 'The Marshall confirms payment is complete. Only now does the order unlock.',
    icon: <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />,
    color: 'green',
    view: {
      title: 'Payment Verified ✓',
      description: 'Marshall "Chidi" verified payment for Table 7. Order status changed to PAID. Kitchen queue unlocked.',
      bgColor: 'bg-green-900/10',
      borderColor: 'border-green-900/30',
      iconColor: 'text-green-500'
    }
  },
  {
    id: 4,
    title: 'Kitchen Activated',
    description: 'The kitchen now sees the order. They cook knowing it is already paid for.',
    icon: <FontAwesomeIcon icon={faWifi} className="w-5 h-5" />,
    color: 'orange',
    view: {
      title: 'Kitchen Display',
      description: 'PAID ORDER - Table 7. Butter Chicken + Mango Lassi. No risk of walkout. Start cooking!',
      bgColor: 'bg-orange-900/10',
      borderColor: 'border-orange-900/30',
      iconColor: 'text-orange-500'
    }
  },
  {
    id: 5,
    title: 'Full Audit Trail',
    description: 'Every step is logged. Who took payment, when, and for what. No hiding, no shortcuts.',
    icon: <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />,
    color: 'amber',
    view: {
      title: 'Audit Complete',
      description: 'Order #4521 - Created by "Adaeze" → Paid to "Chidi" → Verified at 7:32 PM → Cooked by Kitchen → Served. Full accountability.',
      bgColor: 'bg-amber-900/10',
      borderColor: 'border-amber-900/30',
      iconColor: 'text-amber-500'
    }
  }
];

export const Story: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3500); // Change step every 3.5 seconds

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section id="scenario" className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl rounded-full opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See the Payment-First Workflow in Action</h2>
            <p className="text-gray-400">Every order is blocked until payment is verified. No exceptions. No shortcuts.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Card: The Experience */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
                onMouseEnter={() => setIsAnimating(false)}
                onMouseLeave={() => setIsAnimating(true)}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 overflow-hidden relative flex items-center justify-center border border-amber-500/30">
                         <FontAwesomeIcon icon={faReceipt} className="text-amber-500 w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Order #4521</h3>
                        <div className="flex items-center gap-2 text-sm text-amber-500">
                             <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5" />
                             <span>Payment-First Protected</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-zinc-800"></div>

                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className="relative pl-10 cursor-pointer"
                        onClick={() => setCurrentStep(index)}
                        animate={{
                          scale: currentStep === index ? 1.02 : 1,
                          opacity: currentStep === index ? 1 : 0.6
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center border text-xs ${
                            currentStep === index 
                              ? `bg-${step.color}-600 text-white border-${step.color}-500` 
                              : currentStep > index
                              ? 'bg-zinc-700 text-zinc-400 border-zinc-600'
                              : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                          }`}
                          animate={{
                            scale: currentStep === index ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ 
                            duration: 0.5,
                            repeat: currentStep === index ? Infinity : 0,
                            repeatDelay: 2
                          }}
                        >
                          {currentStep >= index ? step.id : step.id}
                        </motion.div>
                        <p className={`text-sm transition-colors ${
                          currentStep === index ? 'text-white' : 'text-gray-400'
                        }`}>
                          <strong className="text-white">{step.title}:</strong> {step.description}
                        </p>
                      </motion.div>
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 flex gap-2 justify-center">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentStep === index ? 'w-8 bg-blue-500' : 'w-1.5 bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
            </motion.div>

            {/* Right Card: Dynamic Views */}
            <div className="flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0.8, opacity: 0, x: 50, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, x: -50, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className={`${steps[currentStep].view.bgColor} border ${steps[currentStep].view.borderColor} p-6 md:p-8 rounded-2xl shadow-2xl w-full relative`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={steps[currentStep].view.iconColor}
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                    <div className="flex-1">
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white font-medium text-lg mb-2"
                      >
                        {steps[currentStep].view.title}
                      </motion.p>
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-sm leading-relaxed"
                      >
                        {steps[currentStep].view.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Step indicator in corner */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    {currentStep + 1}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Additional context card - Hidden on mobile, shown below on small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="hidden md:block absolute bottom-0 right-0 bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl max-w-xs"
              >
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faHeart} className="text-amber-500 mt-0.5 w-4 h-4" />
                  <div>
                    <p className="text-white font-medium text-xs">Loss Prevention</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Payment-first workflow eliminates walkouts and internal theft. Every naira accounted for.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>

        {/* Mobile Retention Card - Shows below on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:hidden mt-6 bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faHeart} className="text-amber-500 mt-0.5 flex-shrink-0 w-4 h-4" />
            <div>
              <p className="text-white font-medium text-xs">Loss Prevention</p>
              <p className="text-gray-400 text-xs mt-1">
                Payment-first workflow eliminates walkouts and internal theft. Every naira accounted for.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};