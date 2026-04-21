import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PaymentCallback } from './components/PaymentCallback';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { FAQPage } from './pages/FAQPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { PartnershipApplyPage } from './pages/PartnershipApplyPage';
import { PartnershipPage } from './pages/PartnershipPage';
import { AccountPage } from './pages/AccountPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PaymentProvider>
          <ScrollToTop />
          <Routes>
            <Route
              path="/payment/callback"
              element={
                <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
                  <PaymentCallback />
                </div>
              }
            />

            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/partnership" element={<PartnershipPage />} />
              <Route path="/partnership/apply" element={<PartnershipApplyPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/reset-password" element={<ResetPasswordPage />} />
            </Route>
          </Routes>
        </PaymentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
