import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import App from './App';

// Native scrolling (no Lenis). Keep anchor navigation smooth via CSS (`html.scroll-smooth`).
(window as any).lenis = undefined;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);