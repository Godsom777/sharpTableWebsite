import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaymentCallback } from './components/PaymentCallback';
import { PaymentProvider } from './contexts/PaymentContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <PaymentProvider>
        <ScrollToTop />
        <Routes>
          {/* Payment callback — standalone page, no nav/footer */}
          <Route
            path="/payment/callback"
            element={
              <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
                <PaymentCallback />
              </div>
            }
          />

          {/* All pages that share NavBar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>
        </Routes>
      </PaymentProvider>
    </BrowserRouter>
  );
}

export default App;