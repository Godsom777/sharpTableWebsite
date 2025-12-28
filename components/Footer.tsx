import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-6">SharpTable</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            The complete customer intelligence platform. <br/>
            Understand, serve, and retain.
        </p>
        
        <a 
            href="mailto:sharptable.ng@gmail.com" 
            className="text-amber-500 hover:text-amber-400 transition-colors text-lg font-medium mb-8"
        >
            sharptable.ng@gmail.com
        </a>

        <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:sharptable.ng@gmail.com" className="hover:text-white transition-colors">Contact Sales</a>
        </div>
        <div className="mt-12 text-zinc-700 text-xs">
            © {new Date().getFullYear()} SharpTable Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};