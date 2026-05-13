'use client';

import React from 'react';
import SharpTableHero from '../components/SharpTableHero';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { Testimonials } from '../components/Testimonials';
import { WhoIsThisFor } from '../components/WhoIsThisFor';
import SharpTableFlow from '../components/SharpTableFlow';
import SharpTableDashboard from '../components/SharpTableDashboard';
import SharpTableOversight from '../components/SharpTableOversight';
import SharpTableWhatsApp from '../components/SharpTableWhatsApp';

export const HomePage: React.FC = () => {
  return (
    <>
      <SharpTableHero />
      <FeatureShowcase />
      <WhoIsThisFor />
      <SharpTableFlow />
      <SharpTableDashboard />
      <SharpTableOversight />
      <SharpTableWhatsApp />
      <Testimonials />
    </>
  );
};
