import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, FileText } from 'lucide-react';

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
            src="/assets/logos/sharptablelogonew(lowRES_WHITE).png" 
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
            The complete customer intelligence platform. <br/>
            Understand, serve, and retain.
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          href="mailto:sharptable.ng@gmail.com" 
          className="text-amber-500 hover:text-amber-400 transition-colors text-lg font-medium mb-8 flex items-center gap-2"
        >
            <Mail size={20} />
            sharptable.ng@gmail.com
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
              <Shield size={14} />
              Privacy
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText size={14} />
              Terms
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="mailto:sharptable.ng@gmail.com"
              className="hover:text-white transition-colors"
            >
              Contact Sales
            </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-zinc-700 text-xs"
        >
            © {new Date().getFullYear()} SharpTable Inc. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};