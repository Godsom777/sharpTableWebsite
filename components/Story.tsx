import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faStar, faWifi, faUsers, faUtensils, faReceipt, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography, Grid } from '@mui/material';

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
    description: 'Customer orders jollof rice and drinks. The order is captured — but your team can\'t fulfil it yet.',
    icon: <FontAwesomeIcon icon={faUtensils} style={{ width: 20, height: 20 }} />,
    color: '#3b82f6', // blue-500
    view: {
      title: 'Order Captured',
      description: 'Table 7 — Jollof Rice + Chapman. Status: AWAITING PAYMENT. Order is on hold.',
      bgColor: 'rgba(30, 58, 138, 0.1)',
      borderColor: 'rgba(30, 58, 138, 0.3)',
      iconColor: '#3b82f6'
    }
  },
  {
    id: 2,
    title: 'Payment Collected',
    description: 'Your Marshall collects $45. The amount, method, and who collected it are all logged.',
    icon: <FontAwesomeIcon icon={faReceipt} style={{ width: 20, height: 20 }} />,
    color: '#a855f7', // purple-500
    view: {
      title: 'Payment Logged',
      description: 'Marshall "Alex" collected $45 via card. Time: 7:32 PM. Awaiting verification.',
      bgColor: 'rgba(88, 28, 135, 0.1)',
      borderColor: 'rgba(88, 28, 135, 0.3)',
      iconColor: '#a855f7'
    }
  },
  {
    id: 3,
    title: 'Payment Verified',
    description: 'Marshall confirms the money is in. The gate opens. Order queue unlocks.',
    icon: <FontAwesomeIcon icon={faUsers} style={{ width: 20, height: 20 }} />,
    color: '#22c55e', // green-500
    view: {
      title: 'Payment Verified ✓',
      description: 'Marshall "Alex" verified payment. Order status: PAID. Ready to fulfil.',
      bgColor: 'rgba(20, 83, 45, 0.1)',
      borderColor: 'rgba(20, 83, 45, 0.3)',
      iconColor: '#22c55e'
    }
  },
  {
    id: 4,
    title: 'Order Fulfilled',
    description: 'Your team prepares and serves the order — knowing the money is already secured.',
    icon: <FontAwesomeIcon icon={faWifi} style={{ width: 20, height: 20 }} />,
    color: '#f97316', // orange-500
    view: {
      title: 'Order Display',
      description: 'PAID ✓ — Table 7. Jollof Rice + Chapman. Ready to serve!',
      bgColor: 'rgba(124, 45, 18, 0.1)',
      borderColor: 'rgba(124, 45, 18, 0.3)',
      iconColor: '#f97316'
    }
  },
  {
    id: 5,
    title: 'Full Trail Logged',
    description: 'Who took payment, when, how much, for what order. Everything is on record.',
    icon: <FontAwesomeIcon icon={faChartLine} style={{ width: 20, height: 20 }} />,
    color: '#f59e0b', // amber-500
    view: {
      title: 'Audit Complete',
      description: 'Order #4521 — Taken by "Adaeze" → Paid to "Chidi" → Cooked → Served. Full accountability.',
      bgColor: 'rgba(120, 53, 15, 0.1)',
      borderColor: 'rgba(120, 53, 15, 0.3)',
      iconColor: '#f59e0b'
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
    <Box component="section" id="scenario" sx={{ py: { xs: 16, md: 24 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Background Gradient */}
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', maxWidth: '900px', background: 'linear-gradient(to right, rgba(88,28,135,0.2), rgba(30,58,138,0.2))', filter: 'blur(64px)', borderRadius: '50%', opacity: 0.4, pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 12, md: 20 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700, color: 'white', mb: 2 }}>
              How the Gate Works
            </Typography>
            <Typography sx={{ color: 'grey.400' }}>
              Order comes in. Payment gets verified. Only then does your team fulfil it. No exceptions.
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 } }}>
            {/* Left Card: The Experience */}
            <Box
                component={motion.div}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                sx={{ flex: 1, bgcolor: 'grey.900', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', p: { xs: 4, md: 6 }, boxShadow: 24 }}
                onMouseEnter={() => setIsAnimating(false)}
                onMouseLeave={() => setIsAnimating(true)}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(245,158,11,0.2)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245,158,11,0.3)' }}>
                         <FontAwesomeIcon icon={faReceipt} style={{ color: '#f59e0b', width: 24, height: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                          Order #4521
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f59e0b', fontSize: '0.875rem' }}>
                             <FontAwesomeIcon icon={faStar} style={{ width: 14, height: 14 }} />
                             <Box component="span">Payment-First Protected</Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ '& > * + *': { mt: 3 }, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: 12, top: 8, bottom: 8, width: 2, bgcolor: 'grey.800' }}></Box>

                    {steps.map((step, index) => (
                      <Box
                        component={motion.div}
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        animate={{
                          scale: currentStep === index ? 1.02 : 1,
                          opacity: currentStep === index ? 1 : 0.6
                        }}
                        transition={{ duration: 0.3 }}
                        sx={{ position: 'relative', pl: 6, cursor: 'pointer' }}
                      >
                        <Box
                          component={motion.div} 
                          animate={{
                            scale: currentStep === index ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ 
                            duration: 0.5,
                            repeat: currentStep === index ? Infinity : 0,
                            repeatDelay: 2
                          }}
                          sx={{
                            position: 'absolute', left: 0, top: 0, width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', fontSize: '0.75rem',
                            bgcolor: currentStep === index ? step.color : currentStep > index ? 'grey.700' : 'grey.800',
                            color: currentStep === index ? 'white' : currentStep > index ? 'grey.400' : 'grey.500',
                            borderColor: currentStep === index ? step.color : currentStep > index ? 'grey.600' : 'grey.700',
                          }}
                        >
                          {step.id}
                        </Box>
                        <Typography sx={{ fontSize: '0.875rem', transition: 'color 0.2s', color: currentStep === index ? 'white' : 'grey.400' }}>
                          <Box component="strong" sx={{ color: 'white' }}>{step.title}:</Box> {step.description}
                        </Typography>
                      </Box>
                    ))}
                </Box>

                {/* Progress Indicator */}
                <Box sx={{ mt: 5, display: 'flex', gap: 1, justifyContent: 'center' }}>
                  {steps.map((_, index) => (
                    <Box
                      component="button"
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      sx={{
                        height: 6, borderRadius: '9999px', transition: 'all 0.3s', p: 0, border: 'none', cursor: 'pointer',
                        width: currentStep === index ? 32 : 6,
                        bgcolor: currentStep === index ? '#3b82f6' : 'grey.700'
                      }}
                    />
                  ))}
                </Box>
            </Box>

            {/* Right Card: Dynamic Views */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: { xs: 300, md: 0 } }}>
              <AnimatePresence mode="wait">
                <Box
                  component={motion.div}
                  key={currentStep}
                  initial={{ scale: 0.8, opacity: 0, x: 50, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, x: -50, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  sx={{
                    bgcolor: steps[currentStep].view.bgColor,
                    border: '1px solid',
                    borderColor: steps[currentStep].view.borderColor,
                    p: { xs: 3, md: 4 },
                    borderRadius: '1rem',
                    boxShadow: 24,
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      component={motion.div}
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      sx={{ color: steps[currentStep].view.iconColor }}
                    >
                      {steps[currentStep].icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        component={motion.p} 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        sx={{ color: 'white', fontWeight: 500, fontSize: '1.125rem', mb: 1 }}
                      >
                        {steps[currentStep].view.title}
                      </Typography>
                      <Typography
                        component={motion.p} 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        sx={{ color: 'grey.300', fontSize: '0.875rem', lineHeight: 1.625 }}
                      >
                        {steps[currentStep].view.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Step indicator in corner */}
                  <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    sx={{ position: 'absolute', top: { xs: 12, md: 16 }, right: { xs: 12, md: 16 }, width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 }, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    {currentStep + 1}
                  </Box>
                </Box>
              </AnimatePresence>

              {/* Additional context card - Hidden on mobile, shown below on small screens */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', bottom: 0, right: 0, bgcolor: 'rgba(120,53,15,0.1)', border: '1px solid rgba(120,53,15,0.3)', p: 2, borderRadius: '0.75rem', maxWidth: '320px' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <FontAwesomeIcon icon={faHeart} style={{ color: '#f59e0b', marginTop: 2, width: 16, height: 16 }} />
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '0.75rem' }}>Zero Walkouts</Typography>
                    <Typography sx={{ color: 'grey.400', fontSize: '0.75rem', mt: 0.5 }}>
                      Nothing leaves your floor unless it's paid for. No more chasing customers.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
        </Box>

        {/* Mobile Retention Card - Shows below on mobile */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          sx={{ display: { xs: 'block', md: 'none' }, mt: 3, bgcolor: 'rgba(120,53,15,0.1)', border: '1px solid rgba(120,53,15,0.3)', p: 2, borderRadius: '0.75rem' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <FontAwesomeIcon icon={faHeart} style={{ color: '#f59e0b', marginTop: 2, flexShrink: 0, width: 16, height: 16 }} />
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '0.75rem' }}>Zero Walkouts</Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '0.75rem', mt: 0.5 }}>
                Nothing leaves your floor unless it's paid for. No more chasing customers.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};