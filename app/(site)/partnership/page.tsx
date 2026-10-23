import type { Metadata } from 'next';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';
import { PartnershipContent } from '@/components/homepage/PartnershipContent';

export const metadata: Metadata = {
  title: 'Partnership Program — Earn With SharpTable',
  description: 'Refer restaurants and hotels to SharpTable. Earn 50% upfront and 20% recurring for 6 months on every subscription. No caps. No catches.',
};

export default function PartnershipPage() {
  return (
    <div className="st-home">
      <HomeNav />
      <PartnershipContent />
      <HomeFooter />
    </div>
  );
}
