import React from 'react';
import { Hero } from '../components/Hero';
import { BentoGrid } from '../components/BentoGrid';
import { Testimonials } from '../components/Testimonials';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <BentoGrid />
      <Testimonials />
    </>
  );
};
