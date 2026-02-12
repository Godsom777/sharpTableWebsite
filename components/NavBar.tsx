import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/pricing';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
          onClick={() => { window.location.href = '/'; }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/assets/logos/logo-white.png" 
            alt="SharpTable" 
            className="h-6 md:h-8 w-auto"
          />
          <span className="font-semibold text-base md:text-xl tracking-tight text-white">SharpTable</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300"
        >
          <Link to="/">
            <motion.span
              className={`hover:text-white transition-colors ${isActive('/') ? 'text-white' : ''}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              Home
            </motion.span>
          </Link>
          <Link to="/features">
            <motion.span
              className={`hover:text-white transition-colors ${isActive('/features') ? 'text-white' : ''}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              Features
            </motion.span>
          </Link>
          <Link to="/pricing">
            <motion.span
              className={`hover:text-white transition-colors ${isActive('/pricing') ? 'text-white' : ''}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              Pricing
            </motion.span>
          </Link>
          <Link to="/faq">
            <motion.span
              className={`hover:text-white transition-colors ${isActive('/faq') ? 'text-white' : ''}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              FAQ
            </motion.span>
          </Link>
          <motion.button
            onClick={handleGetStarted}
            className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden flex flex-col gap-4 overflow-hidden"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/"
                className={`text-gray-300 hover:text-white block ${isActive('/') ? 'text-white' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Link
                to="/features"
                className={`text-gray-300 hover:text-white block ${isActive('/features') ? 'text-white' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/pricing"
                className={`text-gray-300 hover:text-white block ${isActive('/pricing') ? 'text-white' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                to="/faq"
                className={`text-gray-300 hover:text-white block ${isActive('/faq') ? 'text-white' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </motion.div>
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                  handleGetStarted();
                  setIsMobileMenuOpen(false);
              }}
              className="bg-white text-black px-4 py-3 rounded-full text-sm font-semibold w-full"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};