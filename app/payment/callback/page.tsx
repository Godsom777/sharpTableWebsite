'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PaymentCallback as PaymentCallbackContent } from '@/components/PaymentCallback';

export default function PaymentCallbackPage() {
  return (
    <AuthProvider>
      <div className="bg-black min-h-screen text-white" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <PaymentCallbackContent />
      </div>
    </AuthProvider>
  );
}
