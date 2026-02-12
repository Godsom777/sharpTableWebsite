import React from 'react';
import { Hero } from '../components/Hero';
import { BentoGrid } from '../components/BentoGrid';
import { FeatureStack } from '../components/FeatureStack';
import { Roles } from '../components/Roles';
import { Intelligence } from '../components/Intelligence';
import { Testimonials } from '../components/Testimonials';
import { ROICalculator } from '../components/ROICalculator';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <BentoGrid />
      <FeatureStack />
      <Intelligence />
      <Roles />
      <Testimonials />
      <ROICalculator />
    </>
  );
};
