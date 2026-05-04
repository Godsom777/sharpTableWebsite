
import { Hero } from '@/components/Hero';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { BentoGrid } from '@/components/BentoGrid';
import { Testimonials } from '@/components/Testimonials';
import { WhoIsThisFor } from '@/components/WhoIsThisFor';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <WhoIsThisFor />
      <BentoGrid />
      <Testimonials />
    </>
  );
}
