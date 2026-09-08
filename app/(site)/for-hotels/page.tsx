import type { Metadata } from 'next';
import { HotelsPage } from '@/components/HotelsPage';

export const metadata: Metadata = {
  title: 'SharpTable for Hotels — Revenue Control & Operations Layer',
  description: 'A unified operations layer for Nigerian hotels: room ledgers, outlet charge capture, housekeeping, EOD reconciliation, and staff accountability in one system.',
};

export default function ForHotelsPage() {
  return <HotelsPage />;
}
