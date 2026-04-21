import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { BentoGrid } from '../components/BentoGrid';
import { Testimonials } from '../components/Testimonials';
import { WhoIsThisFor } from '../components/WhoIsThisFor';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <WhoIsThisFor />
      <BentoGrid />
      <Testimonials />
    </>
  );
};
