import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWifi, faUsers, faUtensils, faReceipt, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

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
    title: 'Order Intercepted',
    description: 'An elite guest orders the Tasting Menu. The action is captured instantly across the system — holding back kitchen execution until clearance.',
    icon: <FontAwesomeIcon icon={faUtensils} style={{ width: 20, height: 20 }} />,
    color: '#ffffff',
    view: {
      title: 'Order Captured',
      description: 'Table 7 — Tasting Menu & Champagne. Status: AWAITING CLEARANCE. Execution on hold.',
      bgColor: '#111111',
      borderColor: 'rgba(255,255,255,0.1)',
      iconColor: '#ffffff'
    }
  },
  {
    id: 2,
    title: 'Revenue Secured',
    description: 'Marshall secures the transaction. The amount, precise methodology, and executor identity are rigidly logged into the audit ledger.',
    icon: <FontAwesomeIcon icon={faReceipt} style={{ width: 20, height: 20 }} />,
    color: '#ffffff',
    view: {
      title: 'Transaction Logged',
      description: 'Marshall "ALEX" secured funds via secure terminal. Time: 7:32 PM. Awaiting protocol verification.',
      bgColor: '#111111',
      borderColor: 'rgba(255,255,255,0.1)',
      iconColor: '#ffffff'
    }
  },
  {
    id: 3,
    title: 'Protocol Verified',
    description: 'Marshall validates the ledger. The strict operational gate officially opens. The queue is systematically unlocked.',
    icon: <FontAwesomeIcon icon={faUsers} style={{ width: 20, height: 20 }} />,
    color: '#ffffff',
    view: {
      title: 'Protocol Verified ✓',
      description: 'Marshall "ALEX" cleared ledgers. Status: SECURED. Ready for flawless execution.',
      bgColor: '#111111',
      borderColor: 'rgba(255,255,255,0.1)',
      iconColor: '#ffffff'
    }
  },
  {
    id: 4,
    title: 'Kitchen Execution',
    description: 'Your brigade prepares and serves the sequence knowing the revenue is absolutely unequivocally secured.',
    icon: <FontAwesomeIcon icon={faWifi} style={{ width: 20, height: 20 }} />,
    color: '#ffffff',
    view: {
      title: 'Execution Display',
      description: 'SECURED ✓ — Table 7. Tasting Menu. Clear to serve.',
      bgColor: '#111111',
      borderColor: 'rgba(255,255,255,0.1)',
      iconColor: '#ffffff'
    }
  },
  {
    id: 5,
    title: 'Absolute Audit',
    description: 'Executor identity, timestamp, void history. Absolutely everything is subjected to your permanent real-time record.',
    icon: <FontAwesomeIcon icon={faChartLine} style={{ width: 20, height: 20 }} />,
    color: '#ffffff',
    view: {
      title: 'Audit Complete',
      description: 'Order #4521 — Taken: "ADAEZE" → Secured: "CHIDI" → Served. Uncompromising accountability.',
      bgColor: '#111111',
      borderColor: 'rgba(255,255,255,0.1)',
      iconColor: '#ffffff'
    }
  }
];

export const Story: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => setCurrentStep((prev) => (prev + 1) % steps.length), 3500);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <Box component="section" id="scenario" sx={{ py: { xs: 16, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 12, md: 16 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, color: 'white', mb: 3, letterSpacing: '-0.04em' }}>
              The Operational Gate
            </Typography>
            <Typography sx={{ color: 'grey.400', fontSize: '1.25rem', maxWidth: 'md', mx: 'auto' }}>
              Order enters. Ledger clears. Only then does your kitchen execute. No exceptions, no walkouts, no margin bleed.
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 } }}>
            <Box
                component={motion.div}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                sx={{ flex: 1, bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2.5rem', p: { xs: 4, md: 6 } }}
                onMouseEnter={() => setIsAnimating(false)}
                onMouseLeave={() => setIsAnimating(true)}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                         <FontAwesomeIcon icon={faReceipt} style={{ color: 'white', width: 24, height: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                          Ledger #4521
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', fontWeight: 600 }}>
                             <FontAwesomeIcon icon={faStar} style={{ width: 14, height: 14 }} />
                             <Box component="span">Absolute Enforcement</Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ '& > * + *': { mt: 4 }, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: 15, top: 12, bottom: 12, width: 2, bgcolor: 'rgba(255,255,255,0.05)' }}></Box>
                    {steps.map((step, index) => (
                      <Box
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        sx={{ position: 'relative', pl: 7, cursor: 'pointer', opacity: currentStep === index ? 1 : 0.4 }}
                      >
                        <Box
                          sx={{ position: 'absolute', left: 0, top: 0, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', fontSize: '0.85rem', fontWeight: 700,
                            bgcolor: currentStep === index ? 'white' : '#0a0a0a',
                            color: currentStep === index ? 'black' : 'grey.600',
                            borderColor: currentStep === index ? 'white' : 'rgba(255,255,255,0.1)',
                          }}
                        >
                          {step.id}
                        </Box>
                        <Typography sx={{ fontSize: '1rem', color: currentStep === index ? 'white' : 'grey.500', transition: 'color 0.2s', lineHeight: 1.5 }}>
                          <Box component="strong" sx={{ color: 'white', display: 'block', mb: 0.5, fontSize: '1.1rem' }}>{step.title}</Box>
                          {step.description}
                        </Typography>
                      </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: { xs: 300, md: 0 } }}>
              <AnimatePresence mode="wait">
                <Box
                  component={motion.div}
                  key={currentStep}
                  initial={{ scale: 0.9, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.9, opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  sx={{ bgcolor: steps[currentStep].view.bgColor, border: '1px solid', borderColor: steps[currentStep].view.borderColor, p: { xs: 4, md: 6 }, borderRadius: '2rem', width: '100%', position: 'relative' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Box sx={{ color: steps[currentStep].view.iconColor, bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: '1rem' }}>
                      {steps[currentStep].icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', mb: 1.5, letterSpacing: '-0.02em' }}>
                        {steps[currentStep].view.title}
                      </Typography>
                      <Typography sx={{ color: 'grey.400', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        {steps[currentStep].view.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ position: 'absolute', top: 24, right: 24, width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem', fontWeight: 800 }}>
                    {currentStep + 1}
                  </Box>
                </Box>
              </AnimatePresence>
            </Box>
        </Box>
      </Container>
    </Box>
  );
};