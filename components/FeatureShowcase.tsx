import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

interface ShowcaseItem {
  number: string;
  title: string;
  tags: string[];
  description: string;
  plan: string;
  image: string;
}

const items: ShowcaseItem[] = [
  {
    number: '01.',
    title: 'In-house ordering',
    tags: ['QR Menus', 'Fast Service'],
    description: 'Eliminate the noise of messy ordering. Give your guests a seamless, luxury dining experience with instant live menus and wait-free orders.',
    plan: 'Pro',
    image: '/in_house_ordering.png'
  },
  {
    number: '02.',
    title: 'Table flexibility',
    tags: ['Split Payment', 'Group Dining'],
    description: "Group dining shouldn't end in billing chaos. Let multiple guests pay separately while keeping the table flow perfectly intact and completely transparent.",
    plan: 'Pro',
    image: '/table_flexibility.png'
  },
  {
    number: '03.',
    title: 'Kitchen flow',
    tags: ['Live Alerts', 'Peak Sync'],
    description: 'Replace slow turnarounds with synchronized service. Absolute connection between the front of house and back of house, ensuring every dish drops perfectly on time.',
    plan: 'Pro',
    image: '/kitchen_flow.png'
  },
  {
    number: '04.',
    title: 'Remote channel',
    tags: ['WhatsApp', 'Omnichannel'],
    description: 'Extend your luxury experience directly into WhatsApp. Own the off-premise channel seamlessly without adding an inch of complexity to your existing workflow.',
    plan: 'Enterprise',
    image: '/remote_channel.png'
  },
  {
    number: '05.',
    title: 'Owner oversight',
    tags: ['Multi-branch', 'Live Audit'],
    description: 'Total command across every location. Consolidate your live audits, spot inventory shrinkage instantly, and protect your margins before they leak.',
    plan: 'Enterprise',
    image: '/owner_oversight.png'
  }
];

export const FeatureShowcase: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: '#000000', py: { xs: 12, md: 20 } }}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, px: { xs: 2.5, md: 4 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
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
            <Typography sx={{ color: 'grey.500', display: { xs: 'none', md: 'block' }, fontSize: '1.5rem', fontWeight: 600 }}>04</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <Box
                key={item.number}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  bgcolor: '#131313', 
                  borderRadius: { xs: '1.5rem', md: '2rem' },
                  px: { xs: 3, md: 5 },
                  py: { xs: 3, md: 4 },
                  border: '1px solid rgba(255,255,255,0.03)',
                  transition: 'background-color 0.3s'
                }}
              >
                {/* Header Row */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: { xs: 2, md: 4 } }}>
                  
                  {/* Left Side: Number + Title & Tags */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 3, md: 6 }, flex: 1 }}>
                    <Typography sx={{ color: isExpanded ? 'white' : 'grey.600', fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 0.8, letterSpacing: '-0.05em', transition: 'color 0.3s' }}>
                      {item.number}
                    </Typography>

                    <Box sx={{ pt: 1, flex: 1 }}>
                      <Typography sx={{ color: isExpanded ? 'white' : 'grey.400', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 2, letterSpacing: '-0.02em', transition: 'color 0.3s', cursor: 'pointer' }} onClick={() => toggleItem(index)}>
                        {item.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        {item.tags.map(tag => (
                          <Box key={tag} sx={{ px: 2, py: 0.75, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.400', fontSize: '0.8rem', fontWeight: 600 }}>
                            {tag}
                          </Box>
                        ))}
                      </Box>

                      {/* Expanded Content (Images & Text) placed directly below tags */}
                      <AnimatePresence>
                        {isExpanded && (
                          <Box
                            component={motion.div as any}
                            initial={{ height: 0, opacity: 0, mt: 0 }}
                            animate={{ height: 'auto', opacity: 1, mt: 32 }}
                            exit={{ height: 0, opacity: 0, mt: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            sx={{ overflow: 'hidden' }}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: { xs: 'column', md: 'row' }, 
                              gap: 4,
                              alignItems: 'center',
                              pt: 2,
                              pb: 2
                            }}>
                              <Box 
                                component="img"
                                src={item.image}
                                alt={item.title}
                                sx={{ 
                                  width: { xs: '100%', md: '50%' }, 
                                  aspectRatio: '16/10',
                                  objectFit: 'cover',
                                  borderRadius: '1rem',
                                  border: '1px solid rgba(255,255,255,0.05)'
                                }}
                              />
                              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Typography sx={{ color: 'grey.400', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 400 }}>
                                  {item.description}
                                </Typography>
                                <Box sx={{ alignSelf: 'flex-start' }}>
                                  <Box 
                                    component="button"
                                    sx={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 1.5,
                                      px: 3,
                                      py: 1.5,
                                      borderRadius: '999px',
                                      bgcolor: 'white',
                                      color: 'black',
                                      fontWeight: 700,
                                      fontSize: '0.9rem',
                                      border: 'none',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s',
                                      '&:hover': { transform: 'scale(1.05)', bgcolor: 'grey.200' }
                                    }}
                                  >
                                    Explore Now
                                    <Box sx={{ bgcolor: 'black', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <FontAwesomeIcon icon={faArrowRight} style={{ width: 10, height: 10 }} />
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </AnimatePresence>
                    </Box>
                  </Box>

                  {/* Toggle Button */}
                  <Box 
                    component="button" 
                    onClick={() => toggleItem(index)}
                    sx={{ 
                      flexShrink: 0,
                      width: 44, 
                      height: 44, 
                      borderRadius: '50%', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      bgcolor: 'transparent',
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      mt: { xs: 1, md: 2 },
                      '&:hover': { borderColor: 'white' }
                    }}
                  >
                    <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} style={{ width: 16, height: 16 }} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
