import { PartnerApplyForm } from '@/components/PartnerApplyForm';

export default function PartnershipApplyPage() {
  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <p className="eyebrow">Partners</p>
          <h1>Become a partner.</h1>
          <p className="sub">A short form. Your link comes right after.</p>
        </div>
      </section>
      <PartnerApplyForm />
    </>
  );
}
