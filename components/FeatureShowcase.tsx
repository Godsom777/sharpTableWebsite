'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import ChatBubblesAnimation from '../public/assets/3d_services/Chat Bubbles.json';
import StatsGoingUpAnimation from '../public/assets/3d_services/Stats Going Up.json';
import QrCodeAnimation from '../public/assets/3d_services/qrcode.json';
import MoneyAnalysisAnimation from '../public/assets/3d_services/money analysis.json';
import ChefAnimation from '../public/assets/3d_services/chef animation.json';

interface ShowcaseItem {
  number: string;
  title: string;
  tags: string[];
  description: string;
  plan: string;
  lottie: any;
}

const items: ShowcaseItem[] = [
  {
    number: '01',
    title: 'In-house ordering',
    tags: ['QR Menus', 'Fast Service'],
    description: 'Eliminate the noise of messy ordering. Give your guests a seamless, luxury dining experience with instant live menus and wait-free orders.',
    plan: 'Pro',
    lottie: QrCodeAnimation
  },
  {
    number: '02',
    title: 'Table flexibility',
    tags: ['Split Payment', 'Group Dining'],
    description: "Group dining shouldn't end in billing chaos. Let multiple guests pay separately while keeping the table flow perfectly intact and completely transparent.",
    plan: 'Pro',
    lottie: MoneyAnalysisAnimation
  },
  {
    number: '03',
    title: 'Kitchen flow',
    tags: ['Live Alerts', 'Peak Sync'],
    description: 'Replace slow turnarounds with synchronized service. Absolute connection between the front of house and back of house, ensuring every dish drops perfectly on time.',
    plan: 'Pro',
    lottie: ChefAnimation
  },
  {
    number: '04',
    title: 'Remote channel',
    tags: ['WhatsApp', 'Omnichannel'],
    description: 'Extend your luxury experience directly into WhatsApp. Own the off-premise channel seamlessly without adding an inch of complexity to your existing workflow.',
    plan: 'Enterprise',
    lottie: ChatBubblesAnimation
  },
  {
    number: '05',
    title: 'Owner oversight',
    tags: ['Multi-branch', 'Live Audit'],
    description: 'Total command across every location. Consolidate your live audits, spot inventory shrinkage instantly, and protect your margins before they leak.',
    plan: 'Enterprise',
    lottie: StatsGoingUpAnimation
  },
  {
    number: '06',
    title: 'Hotels & Visitor Tracking',
    tags: ['Guest Logs', 'Room Service'],
    description: 'A dedicated suite for hospitality. Seamlessly manage visitor booking tracking and digital room service menus without bloating your operations or confusing your front desk.',
    plan: 'Enterprise',
    lottie: ChatBubblesAnimation
  }
];

export const FeatureShowcase: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const [isClientMediumUp, setIsClientMediumUp] = React.useState(true); // default to true to match server

  React.useEffect(() => {
    const checkSize = () => setIsClientMediumUp(window.innerWidth >= 900);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: '#000000', py: { xs: 12, md: 20 } }}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, px: { xs: 2.5, md: 4 } }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', mb: 2 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
            Shape what's next.
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.5rem', md: '5rem', lg: '6rem' }, letterSpacing: '-0.04em', lineHeight: 1 }}>
              Our Services
            </Typography>
            <Typography sx={{ color: 'grey.500', display: { xs: 'none', md: 'block' }, fontSize: '1.5rem', fontWeight: 600 }}>06</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 2, md: 3 } }}>
          {items.map((item, index) => {
            const isExpanded = expandedIndex === index || isClientMediumUp; // Auto expand on large screens

            return (
              <Box
                key={item.number}
                component={motion.div}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  bgcolor: '#1e1b20ff', 
                  borderRadius: { xs: '1.5rem', md: '2rem' },
                  px: { xs: 3, md: 4 },
                  py: { xs: 3, md: 4 },
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  gridColumn: { md: (index === 0 || index === items.length - 1) ? '1 / -1' : 'auto' } // First and last span full width
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: { md: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                    <Typography sx={{ color: isExpanded ? 'white' : 'grey.600', fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 0.8, letterSpacing: '-0.05em', transition: 'color 0.3s' }}>
                      {item.number}
                    </Typography>
                    <Box sx={{ pt: 1, flex: 1 }}>
                      <Typography sx={{ color: isExpanded ? 'white' : 'grey.400', fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.75rem' }, mb: 1.5, letterSpacing: '-0.02em', transition: 'color 0.3s', cursor: { xs: 'pointer', md: 'default' } }} onClick={() => toggleItem(index)}>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {item.tags.map(tag => (
                          <Box key={tag} sx={{ px: 1.5, py: 0.5, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.300', fontSize: '0.75rem', fontWeight: 600 }}>
                            {tag}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box 
                    component="button" 
                    onClick={() => toggleItem(index)}
                    sx={{ 
                      display: { xs: 'flex', md: 'none' },
                      flexShrink: 0, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'transparent',
                      color: 'white', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', mt: 1,
                      '&:hover': { borderColor: 'white' }
                    }}
                  >
                    <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} style={{ width: 14, height: 14 }} />
                  </Box>
                </Box>

                <AnimatePresence>
                  {isExpanded && (
                    <Box
                      component={motion.div as any}
                      initial={{ height: 0, opacity: 0, mt: 0 }}
                      animate={{ height: 'auto', opacity: 1, mt: 24 }}
                      exit={{ height: 0, opacity: 0, mt: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      sx={{ overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: (index === 0 || index === items.length - 1) ? 'row' : 'column' }, 
                        gap: 3,
                        alignItems: { xs: 'flex-start', md: (index === 0 || index === items.length - 1) ? 'center' : 'flex-start' },
                        flex: 1
                      }}>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, order: { xs: 2, md: (index === 0 || index === items.length - 1) ? 1 : 2 } }}>
                          <Typography sx={{ color: 'grey.400', fontSize: '1rem', lineHeight: 1.6 }}>
                            {item.description}
                          </Typography>
                          <Box sx={{ mt: 'auto', alignSelf: 'flex-start' }}>
                            <Box 
                              component="button"
                              sx={{
                                display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 3, py: 1.5, borderRadius: '999px', bgcolor: 'white', color: 'black',
                                fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'scale(1.05)', bgcolor: 'grey.200' }
                              }}
                            >
                              Explore Now
                              <Box sx={{ bgcolor: 'black', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faArrowRight} style={{ width: 10, height: 10 }} />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: { xs: '70%', md: (index === 0 || index === items.length - 1) ? '30%' : '60%' }, aspectRatio: (index === 0 || index === items.length - 1) ? '16/10' : '4/3', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', order: { xs: 1, md: (index === 0 || index === items.length - 1) ? 2 : 1 }, mx: 'auto' }}>
                          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lottie animationData={item.lottie} loop={true} style={{ width: '100%', height: '100%' }} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </AnimatePresence>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

