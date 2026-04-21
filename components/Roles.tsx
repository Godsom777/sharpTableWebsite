import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faUtensils, faUsers, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

const roles = [
  {
    id: 'admin',
    title: 'Executive View (Owner)',
    icon: <FontAwesomeIcon icon={faGauge} />,
    subtitle: 'Maintain absolute authority and pinpoint margin leakage across branches.',
    content: [
      'Expose cashier activity, payment flow, and branch anomalies without requesting manual reports.',
      'Intercept voids and isolate unusual patterns before they materialize into permanent revenue loss.',
      'Deploy updates and command inventory restrictions from your device.',
      'Observe the holistic enterprise from one singular interface.',
    ],
    highlight: 'You command the entire operation without setting foot on the floor.',
  },
  {
    id: 'kds',
    title: 'Kitchen Command (KDS)',
    icon: <FontAwesomeIcon icon={faUtensils} />,
    subtitle: 'A brigade that executes exclusively on secured, paid orders.',
    content: [
      'An uncompromising queue of secured orders eradicates operational confusion.',
      'No wasted premium ingredients due to unpaid or fictitious orders slipping through.',
      'Inventory depletion drops exactly corresponding to paid ledger entries.',
      'Clear, silent coordination replaces disruptive shouting from front to back.',
    ],
    highlight: 'The back-of-house operates with military precision on guaranteed revenue.',
  },
  {
    id: 'marshall',
    title: 'Marshall Protocol',
    icon: <FontAwesomeIcon icon={faUsers} />,
    subtitle: 'A strict gatekeeper who holds all accountability on the floor.',
    content: [
      'Execute payments and release tickets leaving an uncompromising, permanent trace.',
      'Every interaction binds to the Marshall identity, the table, and the exact timestamp.',
      'Eradicate operational obscurity when shift closing registers show irregular gaps.',
      'Maintain an unbroken chain of custody over every single generated ticket.',
    ],
    highlight: 'Unforgiving accountability applied systematically, without surveillance.',
  },
];

export const Roles: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="section" id="roles" sx={{ py: { xs: 16, md: 32 }, bgcolor: '#000000', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 10, lg: 16 }, alignItems: 'center' }}>
          <Box>
            <Typography
              component={motion.h2}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, color: 'white', mb: 6, letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              One architecture <br />
              <Box component="span" sx={{ color: 'grey.600' }}>for the entire ecosystem.</Box>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {roles.map((role, index) => (
                <Box
                  component="button"
                  key={role.id}
                  onClick={() => setActiveTab(index)}
                  sx={{
                    width: '100%', textAlign: 'left', p: 4, borderRadius: '1.5rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 3, border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
                    ...(activeTab === index ? {
                      bgcolor: '#111111', borderColor: 'rgba(255,255,255,0.1)'
                    } : {
                      bgcolor: 'transparent', borderColor: 'transparent', '&:hover': { bgcolor: '#0a0a0a' }
                    })
                  }}
                >
                  <Box
                    sx={{
                      p: 2, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48,
                      ...(activeTab === index ? { bgcolor: 'white', color: 'black' } : { bgcolor: 'rgba(255,255,255,0.05)', color: 'white' })
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, transition: 'color 0.2s', color: activeTab === index ? 'white' : 'grey.600' }}>
                      {role.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ position: 'relative', height: { xs: 650, md: 600 } }}>
            <AnimatePresence mode="wait">
              <Box
                component={motion.div}
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                sx={{ position: 'absolute', inset: 0, bgcolor: '#111111', border: '1px solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '2rem', p: { xs: 5, md: 8 }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                <Typography sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 900, color: 'white', mb: 2, letterSpacing: '-0.02em' }}>
                  {roles[activeTab].title}
                </Typography>
                <Typography sx={{ color: 'grey.500', fontSize: { xs: '1rem', md: '1.125rem' }, mb: 6, lineHeight: 1.6 }}>
                  {roles[activeTab].subtitle}
                </Typography>

                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
                  {roles[activeTab].content.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: 'grey.300', fontSize: '1rem' }}>
                      <FontAwesomeIcon icon={faCircleCheck} style={{ width: 16, height: 16, color: 'white', flexShrink: 0, marginTop: 4 }} />
                      <Box component="span" sx={{ lineHeight: 1.5 }}>{item}</Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 'auto', pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'grey.600', fontWeight: 800, mb: 1 }}>
                    Sovereign Impact
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: 'white', fontWeight: 700, lineHeight: 1.5 }}>
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
