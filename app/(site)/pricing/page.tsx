import type { Metadata } from 'next';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';
import { PricingContent } from '@/components/homepage/PricingContent';

export const metadata: Metadata = {
  title: 'Pricing — SharpTable Restaurant & Hotel Operating System',
  description: "Transparent monthly pricing for SharpTable's restaurant and hotel operations platform. Simple pricing by branch: Solo, Growth and Group plans from ₦50,000/month, every feature included. Hotels from ₦3,000 per room.",
};

export default function PricingPage() {
  return (
    <div className="st-home">
      <HomeNav />
      <PricingContent />
      <HomeFooter />
    </div>
  );
}
