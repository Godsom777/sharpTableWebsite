
import { HeroSection } from '@/components/homepage/HeroSection';
import { FourthSetOfEyesSection } from '@/components/homepage/FourthSetOfEyesSection';
import { MechanismSection } from '@/components/homepage/MechanismSection';
import FeaturesCards from '@/components/ui/feature-shader-cards';
import IntegrationsSection from '@/components/ui/integrations-3';
import { WhatsAppDemoSection } from '@/components/homepage/WhatsAppDemoSection';
import { CredibilitySection } from '@/components/homepage/CredibilitySection';
import { FinalCTASection } from '@/components/homepage/FinalCTASection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — "Every naira. Every branch. Every shift." */}
      <HeroSection />

      {/* 2. The Fourth Set of Eyes — Accountability / Auditor */}
      <FourthSetOfEyesSection />

      {/* 3. The Mechanism — "Orders have a way of coming from everywhere." + MorphText */}
      <MechanismSection />

      {/* 4. Core Platform Features with Shader Cards */}
      <FeaturesCards />

      {/* 5. Connected Operations Hub (Integrations) */}
      <IntegrationsSection />

      {/* 6. WhatsApp Demo — phone mockup + dashboard flow */}
      <WhatsAppDemoSection />

      {/* 7. Credibility — restyled testimonials */}
      <CredibilitySection />

      {/* 8. Final CTA — "Run the restaurant. We'll keep the orders together." */}
      <FinalCTASection />
    </>
  );
}

