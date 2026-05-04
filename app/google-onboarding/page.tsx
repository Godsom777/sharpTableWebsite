'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { GoogleOnboardingPage as GoogleOnboardingContent } from '@/screens/GoogleOnboardingPage';

export default function GoogleOnboardingPage() {
  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <GoogleOnboardingContent />
      </div>
    </AuthProvider>
  );
}
