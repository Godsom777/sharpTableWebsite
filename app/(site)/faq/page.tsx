
import { PageHeader } from '@/components/PageHeader';
import { FAQ } from '@/components/FAQ';

// Abstract symbols subtly related to "questions" / answers / knowledge / clarity
const faqSymbols = [
  '◯', '◈', '⊹', '⟐', '⊙', '◇', '⟡', '⊛',
  '⊕', '✧', '◎', '⏣', '⊡', '⬡', '⟠', '◉',
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Questions? Sorted."
        subtitle="We know you've got questions before you commit. Here's everything — straight, no fluff."
        badge="Frequently Asked"
        symbols={faqSymbols}
      />
      <FAQ />
    </>
  );
}
