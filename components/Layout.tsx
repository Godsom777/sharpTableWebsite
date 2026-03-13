import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { PaymentModal } from './PaymentModal';

export const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      bgcolor: 'black', 
      minHeight: '100vh', 
      color: 'white',
      '& ::selection': { bgcolor: 'rgba(245, 158, 11, 0.3)' }
    }}>
      <NavBar />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
      <PaymentModal />
    </Box>
  );
};
