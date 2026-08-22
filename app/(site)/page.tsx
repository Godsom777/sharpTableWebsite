
import { HeroSection } from '@/components/homepage/HeroSection';
import { RestaurantMomentSection } from '@/components/homepage/RestaurantMomentSection';
import { FourthSetOfEyesSection } from '@/components/homepage/FourthSetOfEyesSection';
import { MechanismSection } from '@/components/homepage/MechanismSection';
import { ModuleOrdersSection } from '@/components/homepage/ModuleOrdersSection';
import { ModuleCustomersSection } from '@/components/homepage/ModuleCustomersSection';
import { ModuleKitchenSection } from '@/components/homepage/ModuleKitchenSection';
import { ModuleInventorySection } from '@/components/homepage/ModuleInventorySection';
import { ModuleInsightsSection } from '@/components/homepage/ModuleInsightsSection';
import { WhatsAppDemoSection } from '@/components/homepage/WhatsAppDemoSection';
import { CredibilitySection } from '@/components/homepage/CredibilitySection';
import { FinalCTASection } from '@/components/homepage/FinalCTASection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — "Every naira. Every branch. Every shift." */}
      <HeroSection />

      {/* 2. Restaurant Moment — "Friday. 8:17 PM." + InteractiveParticles */}
      <RestaurantMomentSection />

      {/* 3. The Fourth Set of Eyes — Accountability / Auditor */}
      <FourthSetOfEyesSection />

      {/* 4. The Mechanism — "Orders have a way of coming from everywhere." + MorphText */}
      <MechanismSection />

      {/* 5–9. Five Product Modules */}
      <ModuleOrdersSection />
      <ModuleCustomersSection />
      <ModuleKitchenSection />
      <ModuleInventorySection />
      <ModuleInsightsSection />

      {/* 10. WhatsApp Demo — phone mockup + dashboard flow */}
      <WhatsAppDemoSection />

      {/* 11. Credibility — restyled testimonials */}
      <CredibilitySection />

      {/* 12. Final CTA — "Run the restaurant. We'll keep the orders together." */}
      <FinalCTASection />
    </>
  );
}
