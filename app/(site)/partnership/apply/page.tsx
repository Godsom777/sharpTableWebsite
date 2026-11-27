import { PartnerApplyForm } from '@/components/PartnerApplyForm';

export default function PartnershipApplyPage() {
  return (
    <>
      <section className="tile hero-band pb">
        <div className="head">
          <h1>Become a partner</h1>
          <p className="sub">A short form, and your referral link comes right after.</p>
        </div>
      </section>
      <PartnerApplyForm />
    </>
  );
}
