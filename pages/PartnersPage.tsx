import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PartnerSignup } from '../components/PartnerSignup';

// Abstract symbols subtly related to partnerships / connections / growth / money
const partnerSymbols = [
  '⟐', '◈', '⊹', '⟡', '✦', '⊕', '◇', '⊛',
  '△', '⬡', '✧', '⬥', '⊙', '◉', '⟠', '⊗',
];

export const PartnersPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Earn With SharpTable"
        subtitle="Refer restaurants. Earn 50% upfront and 20% recurring for 6 months on every subscription. No caps. No catches."
        badge="Partner Program"
        symbols={partnerSymbols}
      />
      <PartnerSignup />
    </>
  );
};
