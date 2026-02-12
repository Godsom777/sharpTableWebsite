import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { PaymentModal } from './PaymentModal';

export const Layout: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <PaymentModal />
    </div>
  );
};
