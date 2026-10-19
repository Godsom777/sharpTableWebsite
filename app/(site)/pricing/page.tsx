
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { PricingTiers } from '@/components/PricingTiers';
import { ROICalculator } from '@/components/ROICalculator';
import { FAQ } from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Pricing — SharpTable Restaurant & Hotel Operating System',
  description: "Transparent monthly pricing for SharpTable's restaurant and hotel operations platform. Simple pricing by branch: Solo, Growth and Group plans from ₦50,000/month, every feature included. Hotels from ₦3,000 per room.",
};

// Abstract symbols subtly related to "pricing" / value / currency / growth
const pricingSymbols = [
  '◈', '⟐', '⊹', '✦', '⊙', '◇', '⟡', '⊛',
  '△', '⊕', '✧', '⬥', '⏣', '◉', '⊗', '⟠',
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Simple, Honest Pricing"
        subtitle="No setup fees. Pick the plan that fits your number of branches."
        badge="Plans & Pricing"
        symbols={pricingSymbols}
      />
      <PricingTiers />
      <ROICalculator />
      <FAQ />
    </>
  );
}
