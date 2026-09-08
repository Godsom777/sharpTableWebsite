
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { PricingTiers } from '@/components/PricingTiers';
import { ROICalculator } from '@/components/ROICalculator';
import { FAQ } from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Pricing — SharpTable Restaurant & Hotel Operating System',
  description: "Transparent monthly pricing for SharpTable's restaurant and hotel operations platform. Compare Lite, Pro, and Enterprise plans built for multi-branch Nigerian hospitality businesses.",
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
        subtitle="No hidden fees. No surprise charges. Pick a plan that fits and scale when you're ready."
        badge="Plans & Pricing"
        symbols={pricingSymbols}
      />
      <PricingTiers />
      <ROICalculator />
      <FAQ />
    </>
  );
}
