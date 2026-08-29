'use client';

import React from 'react';
import { PageHeader } from '../components/PageHeader';
import FeaturesCards from '../components/ui/feature-shader-cards';
import { Intelligence } from '../components/Intelligence';

// Abstract symbols subtly related to "features" / building blocks / tools
const featureSymbols = [
  '◈', '⬡', '◇', '⊞', '△', '▣', '⏣', '◉',
  '⊕', '⬢', '⏢', '◎', '⊡', '▲', '◆', '⬟',
];

export const FeaturesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Built Different"
        subtitle="Every feature exists because a real restaurant needed it. Nothing theoretical. Nothing bloated."
        badge="Platform Capabilities"
        symbols={featureSymbols}
      />
      <FeaturesCards />
      <Intelligence />
    </>
  );
};

