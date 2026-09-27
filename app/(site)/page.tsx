import { HeroSection } from '@/components/homepage/HeroSection';
import { FourthSetOfEyesSection } from '@/components/homepage/FourthSetOfEyesSection';
import { MechanismSection } from '@/components/homepage/MechanismSection';
import FeaturesCards from '@/components/ui/feature-shader-cards';
import IntegrationsSection from '@/components/ui/integrations-3';
import { WhatsAppDemoSection } from '@/components/homepage/WhatsAppDemoSection';
import { CredibilitySection } from '@/components/homepage/CredibilitySection';
import { PricingAnchor } from '@/components/PricingAnchor';

// Section order follows the UI/UX copy doc (sharptable-copy-v1.md, section 1):
// problem -> fix -> proof -> price, with integrations as a detail after pricing.
// The closing call to action lives in the site footer (components/ui/motion-footer.tsx).
export default function HomePage() {
  return (
    <>
      {/* 1. Hero — "Every naira. Every branch. Every shift." */}
      <HeroSection />

      {/* 2. Accountability — "a fourth set of eyes" */}
      <FourthSetOfEyesSection />

      {/* 3. How orders come in (Mechanism) */}
      <MechanismSection />

      {/* 4. Features (six cards) */}
      <FeaturesCards />

      {/* 5. WhatsApp ordering demo */}
      <WhatsAppDemoSection />

      {/* 6. Proof — Old English Bar and Grills */}
      <CredibilitySection />

      {/* 7. Pricing */}
      <PricingAnchor />

      {/* 8. Integrations */}
      <IntegrationsSection />
    </>
  );
}
