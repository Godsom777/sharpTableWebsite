import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PricingTiers } from '../components/PricingTiers';
import { ROICalculator } from '../components/ROICalculator';
import { FAQ } from '../components/FAQ';

// Abstract symbols subtly related to "pricing" / value / currency / growth
const pricingSymbols = [
  '◈', '⟐', '⊹', '✦', '⊙', '◇', '⟡', '⊛',
  '△', '⊕', '✧', '⬥', '⏣', '◉', '⊗', '⟠',
];

export const PricingPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Simple, Honest Pricing"
        subtitle="No hidden fees. No surprise charges. Pick a plan that fits and scale when you're ready."
        badge="Plans & Pricing"
        symbols={pricingSymbols}
      />
      <PricingTiers />
      <ROICalculator />
      <FAQ />
    </>
  );
};
