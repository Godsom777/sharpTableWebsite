import type { Metadata } from 'next';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';
import { PartnerApplyContent } from '@/components/homepage/PartnerApplyContent';

export const metadata: Metadata = {
  title: 'Apply to Partner Program — SharpTable',
  description: 'Apply to become a SharpTable referral partner. Earn 50% upfront and 20% recurring monthly commissions.',
};

export default function PartnershipApplyPage() {
  return (
    <div className="st-home">
      <HomeNav />
      <PartnerApplyContent />
      <HomeFooter />
    </div>
  );
}
