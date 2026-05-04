'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, YAxis } from 'recharts';
import { Box, Container, Typography } from '@mui/material';

const visitData = [
  { name: 'Mon', visits: 120 },
  { name: 'Tue', visits: 132 },
  { name: 'Wed', visits: 101 },
  { name: 'Thu', visits: 154 },
  { name: 'Fri', visits: 290 },
  { name: 'Sat', visits: 330 },
  { name: 'Sun', visits: 310 },
];

const itemData = [
  { name: 'Tasting Menu', count: 470 },
  { name: 'Wagyu A5', count: 380 },
  { name: 'Caviar', count: 520 },
  { name: 'Dom Perignon', count: 210 },
];

export const Intelligence: React.FC = () => {
  return (
    <Box component="section" id="analytics" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 10, md: 16 } }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, letterSpacing: '-0.04em', color: 'white', mb: 3 }}>
            Eradicate the guesswork.
          </Typography>
          <Typography sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: 'grey.500', maxWidth: 'md', mx: 'auto', lineHeight: 1.6 }}>
            SharpTable translates daily restaurant activity into irrefutable evidence: revenue surges, explicit voids, detailed inventory depletion, and cashier behavior isolated precisely by branch.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
          <Box
            component={motion.div}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            sx={{ bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2rem', p: { xs: 4, md: 6 } }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', mb: 1 }}>Revenue by Day</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: 'grey.500' }}>Monitor performance meticulously to anticipate staffing and high-volume stock requisitions.</Typography>
            </Box>
            <Box sx={{ height: 300, width: '100%', minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="visits" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            sx={{ bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2rem', p: { xs: 4, md: 6 } }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', mb: 1 }}>Premium Item Depletion</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: 'grey.500' }}>Track demand and intercept margin leakage on your most valuable inventory instantly.</Typography>
            </Box>
            <Box sx={{ height: 300, width: '100%', minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={itemData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="count" barSize={24} radius={[0, 4, 4, 0]}>
                    {itemData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ffffff', '#cccccc', '#999999', '#666666'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          sx={{ mt: 10, p: { xs: 4, md: 6 }, border: '1px solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '2rem', bgcolor: '#0a0a0a', textAlign: 'center' }}
        >
          <Box component="span" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'grey.600', fontWeight: 800 }}>Permanent Action Ledger</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 3, mt: 4, fontSize: { xs: '0.875rem', md: '1rem' }, color: 'white', fontWeight: 700 }}>
            {['Order Intercepted', 'Payment Secured', 'Executor Logged', 'Inventory Deducted', 'Live Sync'].map((step, index) => (
              <React.Fragment key={index}>
                <Box
                  component={motion.span}
                  sx={{ px: 3, py: 1.5, borderRadius: '9999px', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {step}
                </Box>
                {index < 4 && <Box component="span" sx={{ color: 'grey.700' }}>→</Box>}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

