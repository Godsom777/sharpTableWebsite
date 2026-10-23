import type { Metadata } from 'next';
import '@/app/homepage.css';
import { HomeNav } from '@/components/homepage/HomeNav';
import { HomeFooter } from '@/components/homepage/HomeFooter';
import { FAQContent } from '@/components/homepage/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ — SharpTable Restaurant & Hotel Operations',
  description: 'Answers to common questions about SharpTable: offline support, billing in Naira, multi-branch setup, hardware compatibility, and operational security.',
};

export default function FAQPage() {
  return (
    <div className="st-home">
      <HomeNav />
      <FAQContent />
      <HomeFooter />
    </div>
  );
}
