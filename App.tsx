import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { FeatureStack } from './components/FeatureStack';
import { Roles } from './components/Roles';
import { Intelligence } from './components/Intelligence';
import { Testimonials } from './components/Testimonials';
import { ROICalculator } from './components/ROICalculator';
import { PricingTiers } from './components/PricingTiers';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { PaymentCallback } from './components/PaymentCallback';
import { PaymentProvider } from './contexts/PaymentContext';

function App() {
  // Simple routing for payment callback
  const isPaymentCallback = window.location.pathname === '/payment/callback';

  if (isPaymentCallback) {
    return (
      <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
        <PaymentCallback />
      </div>
    );
  }

  return (
    <PaymentProvider>
      <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
        <NavBar />
        <main>
          <Hero />
          <BentoGrid />
          <FeatureStack />
          <Intelligence />
          <Roles />
          <Testimonials />
          <ROICalculator />
          <PricingTiers />
        </main>
        <Footer />
        <PaymentModal />
      </div>
    </PaymentProvider>
  );
}

export default App;