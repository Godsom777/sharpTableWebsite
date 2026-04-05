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
  { name: 'Jollof Rice', count: 470 },
  { name: 'Fried Rice', count: 380 },
  { name: 'Chicken', count: 520 },
  { name: 'Chapman', count: 210 },
];

export const Intelligence: React.FC = () => {
  return (
    <Box component="section" id="analytics" sx={{ py: { xs: 12, md: 16 }, bgcolor: '#09090b', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 10, md: 12 } }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3rem' }, fontWeight: 700, color: 'white', mb: 3 }}>
            You should not have to guess what happened in the business
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: 'grey.400', maxWidth: 'md', mx: 'auto' }}>
            SharpTable turns daily activity into evidence: revenue, voids, inventory movement, cashier behavior, and customer patterns tracked in one place across all your restaurants.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15)' }}
            transition={{ duration: 0.3 }}
            sx={{ bgcolor: 'rgba(24,24,27,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', p: { xs: 3, md: 4 }, cursor: 'pointer', transition: 'border-color 0.2s', '&:hover': { borderColor: 'rgba(168,85,247,0.3)' } }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              sx={{ mb: 4 }}
            >
              <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Revenue by Day</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'grey.500' }}>See performance clearly enough to plan staffing, stock, and support.</Typography>
            </Box>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              sx={{ height: 300, width: '100%', minHeight: 300 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="visits" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(59, 130, 246, 0.15)' }}
            sx={{ bgcolor: 'rgba(24,24,27,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', p: { xs: 3, md: 4 }, cursor: 'pointer', transition: 'border-color 0.2s', '&:hover': { borderColor: 'rgba(59,130,246,0.3)' } }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              sx={{ mb: 4 }}
            >
              <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Top Items Sold</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'grey.500' }}>Track demand and inventory pressure without relying on guesswork.</Typography>
            </Box>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              sx={{ height: 300, width: '100%', minHeight: 300 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={itemData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                    {itemData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#f59e0b', '#3b82f6', '#10b981', '#ef4444'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          sx={{ mt: 8, p: { xs: 4, md: 6 }, border: '1px dashed', borderColor: 'grey.700', borderRadius: '1.5rem', bgcolor: 'rgba(24,24,27,0.2)', textAlign: 'center', transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(245,158,11,0.3)', bgcolor: 'rgba(24,24,27,0.3)' } }}
        >
          <Box component="span" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'grey.500', fontWeight: 700 }}>Every action leaves a trail</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3, fontSize: { xs: '0.875rem', md: '1rem' }, color: 'grey.300', fontWeight: 500 }}>
            {['Order Placed', 'Payment Confirmed', 'Cashier Logged', 'Inventory Updated', 'Branch View Synced'].map((step, index) => (
              <React.Fragment key={index}>
                <Box
                  component={motion.span}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  sx={{
                    px: 2, py: 1, borderRadius: '9999px',
                    ...(index === 1 ? { bgcolor: 'rgba(120,53,15,0.3)', color: '#fbbf24', border: '1px solid rgba(146,64,14,1)' } :
                      index === 4 ? { bgcolor: 'rgba(20,83,45,0.3)', color: '#4ade80', border: '1px solid rgba(22,101,52,1)' } :
                        { bgcolor: 'grey.800' })
                  }}
                >
                  {step}
                </Box>
                {index < 4 && (
                  <Box
                    component={motion.span}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 + 0.05 }}
                    sx={{ color: 'grey.600' }}
                  >
                    →
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
