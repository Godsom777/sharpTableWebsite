
import { PageHeader } from '@/components/PageHeader';
import { PartnerApplyForm } from '@/components/PartnerApplyForm';

const applySymbols = [
  '✦', '◈', '⊹', '⟡', '⊕', '◇', '⟐', '⊛',
  '△', '⬡', '✧', '⬥', '⊙', '◉', '⟠', '⊗',
];

export default function PartnershipApplyPage() {
  return (
    <>
      <PageHeader
        title="Become a Partner"
        subtitle="Fill out the quick application form below and start earning commissions within 24 hours."
        badge="Apply Now"
        symbols={applySymbols}
      />
      <PartnerApplyForm />
    </>
  );
}
