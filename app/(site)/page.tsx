import { HeroSection } from '@/components/homepage/HeroSection';
import { MechanismSection } from '@/components/homepage/MechanismSection';
import { PricingAnchor } from '@/components/PricingAnchor';
import { FAQ } from '@/components/FAQ';

// Home is intentionally short: hero -> how it works -> pricing teaser -> FAQ (first five questions).
// The final call to action lives in the site footer (components/ui/motion-footer.tsx).
// Feature, proof, WhatsApp and integration sections remain available as components for other pages.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MechanismSection />
      <PricingAnchor />
      <FAQ compact />
    </>
  );
}
