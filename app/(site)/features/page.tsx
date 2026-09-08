
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import FeaturesCards from '@/components/ui/feature-shader-cards';
import { RestaurantLayers } from '@/components/RestaurantLayers';
import { Intelligence } from '@/components/Intelligence';

export const metadata: Metadata = {
  title: 'Features — SharpTable Restaurant Operating System',
  description: 'Fraud and void tracking, live kitchen display sync, WhatsApp ordering, multi-branch dashboards, and role-based staff access — everything SharpTable runs for you.',
};

// Abstract symbols subtly related to "features" / building blocks / tools
const featureSymbols = [
  '◈', '⬡', '◇', '⊞', '△', '▣', '⏣', '◉',
  '⊕', '⬢', '⏢', '◎', '⊡', '▲', '◆', '⬟',
];

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Built Different"
        subtitle="Every feature exists because a real restaurant needed it. Nothing theoretical. Nothing bloated."
        badge="Platform Capabilities"
        symbols={featureSymbols}
      />
      <FeaturesCards />
      <RestaurantLayers />
      <Intelligence />
    </>
  );
}

