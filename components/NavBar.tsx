import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContact = () => {
    window.location.href = "mailto:sharptable.ng@gmail.com";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-white">SharpTable</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#roles" className="hover:text-white transition-colors">Roles</a>
          <a href="#analytics" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#scenario" className="hover:text-white transition-colors">Stories</a>
          <button 
            onClick={handleContact}
            className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors"
          >
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden flex flex-col gap-4">
          <a href="#features" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#roles" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Roles</a>
          <a href="#analytics" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Intelligence</a>
          <button 
            onClick={() => {
                handleContact();
                setIsMobileMenuOpen(false);
            }}
            className="bg-white text-black px-4 py-3 rounded-full text-sm font-semibold w-full"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};