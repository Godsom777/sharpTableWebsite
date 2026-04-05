import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faUtensils, faUsers, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

const roles = [
  {
    id: 'admin',
    title: 'Owner & Manager',
    icon: <FontAwesomeIcon icon={faGauge} />,
    subtitle: 'Control reliability, staff activity, and branch performance from anywhere.',
    content: [
      'Review cashier activity, payment flow, and branch summaries without asking for manual reports',
      'Track voids, compare trends, and catch irregular patterns before they become losses',
      'Update menu status, pricing, and inventory controls from your phone',
      'See multiple restaurants in one place instead of managing each branch blindly',
    ],
    highlight: 'You do not need to be on-site to stay in control of the business.',
  },
  {
    id: 'kds',
    title: 'Kitchen Team',
    icon: <FontAwesomeIcon icon={faUtensils} />,
    subtitle: 'They work from clean, confirmed orders instead of confusion.',
    content: [
      'A clean queue of confirmed orders keeps production focused and predictable',
      'Less wasted prep because unpaid or suspicious orders do not slip through',
      'Inventory consumption becomes easier to follow when every order is logged properly',
      'One tap to mark food ready keeps service coordinated without shouting across the floor',
    ],
    highlight: 'The kitchen works inside a more reliable system, not a louder one.',
  },
  {
    id: 'marshall',
    title: 'Marshall (Floor)',
    icon: <FontAwesomeIcon icon={faUsers} />,
    subtitle: 'Front-of-house actions stay visible, accountable, and easy to review.',
    content: [
      'Confirm payments and release orders through a process that leaves a clear record',
      'Every transaction is tied to a person, a time, and a table for stronger accountability',
      'Cashier and floor activity become reviewable when something feels off',
      'Handle service flow with less confusion and fewer opportunities for theft to hide',
    ],
    highlight: 'Accountability improves without turning management into constant surveillance.',
  },
];

export const Roles: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="section" id="roles" sx={{ py: { xs: 16, md: 24 }, bgcolor: 'black', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 8, lg: 16 }, alignItems: 'center' }}>
          <Box>
            <Typography
              component={motion.h2}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ fontSize: { xs: '2.25rem', md: '3rem' }, fontWeight: 700, color: 'white', mb: 4, letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              One system for the people <br />
              <Box component="span" sx={{ color: 'grey.500' }}>who keep every shift moving.</Box>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {roles.map((role, index) => (
                <Box
                  component={motion.button}
                  key={role.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    width: '100%', textAlign: 'left', p: 3, borderRadius: '1rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
                    ...(activeTab === index ? {
                      bgcolor: 'grey.900', borderColor: 'grey.800', boxShadow: 3
                    } : {
                      bgcolor: 'transparent', borderColor: 'transparent', '&:hover': { bgcolor: 'rgba(24,24,27,0.5)' }
                    })
                  }}
                >
                  <Box
                    component={motion.div}
                    animate={{
                      rotate: activeTab === index ? [0, 360] : 0,
                      scale: activeTab === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: activeTab === index ? 0.5 : 0.3,
                      ease: 'easeInOut',
                    }}
                    sx={{
                      p: 1.5, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40,
                      ...(activeTab === index ? { bgcolor: 'white', color: 'black' } : { bgcolor: 'grey.900', color: 'grey.500' })
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '1.125rem', fontWeight: 600, transition: 'color 0.2s',
                        color: activeTab === index ? 'white' : 'grey.400'
                      }}
                    >
                      {role.title}
                    </Typography>
                  </Box>
                  {activeTab === index && (
                    <Box
                      component={motion.div}
                      layoutId="activeIndicator"
                      sx={{ ml: 'auto', width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ position: 'relative', height: { xs: 550, md: 500 } }}>
            <AnimatePresence mode="wait">
              <Box
                component={motion.div}
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 200,
                }}
                sx={{
                  position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(24,24,27,1), black)', border: '1px solid', borderColor: 'grey.800', borderRadius: '1.5rem', p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 24, overflow: 'hidden'
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  sx={{ position: 'absolute', top: 0, right: 0, p: 16, bgcolor: 'rgba(245,158,11,0.1)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }}
                />

                <Typography
                  component={motion.h3}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'white', mb: 1 }}
                >
                  {roles[activeTab].title}
                </Typography>
                <Typography
                  component={motion.p}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  sx={{ color: 'grey.400', fontSize: { xs: '1rem', md: '1.125rem' }, mb: 4 }}
                >
                  {roles[activeTab].subtitle}
                </Typography>

                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  {roles[activeTab].content.map((item, i) => (
                    <Box
                      component={motion.li}
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, color: 'grey.300', fontSize: '0.9375rem' }}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} style={{ width: 20, height: 20, color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
                      <Box component="span">{item}</Box>
                    </Box>
                  ))}
                </Box>

                <Box
                  component={motion.div}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  sx={{ mt: 'auto', pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Typography sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'grey.500', fontWeight: 600 }}>
                    Impact
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: 'white', fontWeight: 500, mt: 0.5 }}>
                    {roles[activeTab].highlight}
                  </Typography>
                </Box>
              </Box>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
