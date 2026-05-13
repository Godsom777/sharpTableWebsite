
import SharpTableHero from '@/components/SharpTableHero';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { Testimonials } from '@/components/Testimonials';
import { WhoIsThisFor } from '@/components/WhoIsThisFor';
import { PricingAnchor } from '@/components/PricingAnchor';
import SharpTableFlow from '@/components/SharpTableFlow';
import SharpTableDashboard from '@/components/SharpTableDashboard';
import SharpTableOversight from '@/components/SharpTableOversight';
import SharpTableWhatsApp from '@/components/SharpTableWhatsApp';

export default function HomePage() {
  return (
    <>
      <SharpTableHero />
      <FeatureShowcase />
      <SharpTableWhatsApp />
      <WhoIsThisFor />
      <SharpTableFlow />
      <SharpTableDashboard />
      <SharpTableOversight />
      <Testimonials />
      <PricingAnchor />
    </>
  );
}
