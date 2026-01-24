import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShield, faFileLines } from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 md:gap-3"
        >
          <img 
            src="/assets/logos/logo-white.png" 
            alt="SharpTable" 
            className="h-8 md:h-10 w-auto"
          />
          <span className="font-bold text-xl md:text-2xl tracking-tight text-white">SharpTable</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-500 text-sm max-w-md mx-auto mb-6"
        >
            Customer intelligence for restaurants. <br/>
            Know your guests. Bring them back.
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          href="mailto:info@sharptable.com.ng" 
          className="text-amber-500 hover:text-amber-400 transition-colors text-lg font-medium mb-8 flex items-center gap-2"
        >
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
           info@sharptable.com.ng
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-6 text-sm text-gray-400"
        >
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faShield} className="w-3.5 h-3.5" />
              Privacy Policy
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faFileLines} className="w-3.5 h-3.5" />
              Terms of Service
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="mailto:info@sharptable.com.ng"
              className="hover:text-white transition-colors"
            >
              Contact
            </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-zinc-700 text-xs"
        >
            © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};