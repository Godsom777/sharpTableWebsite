import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PartnershipInfo } from '../components/PartnershipInfo';

const partnerSymbols = [
  '⟐', '◈', '⊹', '⟡', '✦', '⊕', '◇', '⊛',
  '△', '⬡', '✧', '⬥', '⊙', '◉', '⟠', '⊗',
];

export const PartnershipPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Earn With SharpTable"
        subtitle="Refer restaurants. Earn 50% upfront and 20% recurring for 6 months on every subscription. No caps. No catches."
        badge="Partnership Program"
        symbols={partnerSymbols}
      />
      <PartnershipInfo />
    </>
  );
};
