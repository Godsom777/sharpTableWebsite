'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { Box } from '@mui/material';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PaymentProvider>
        <Box sx={{
          bgcolor: 'black',
          minHeight: '100vh',
          color: 'white',
          '& ::selection': { bgcolor: 'rgba(245, 158, 11, 0.3)' }
        }}>
          <NavBar />
          <Box component="main">
            {children}
          </Box>
          <Footer />
          <PaymentModal />
        </Box>
      </PaymentProvider>
    </AuthProvider>
  );
}
