import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Roles } from './components/Roles';
import { Intelligence } from './components/Intelligence';
import { Story } from './components/Story';
import { OwnerTease } from './components/OwnerTease';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500/30">
      <NavBar />
      <main>
        <Hero />
        <BentoGrid />
        <Intelligence />
        <Roles />
        <OwnerTease />
        <Story />
      </main>
      <Footer />
    </div>
  );
}

export default App;