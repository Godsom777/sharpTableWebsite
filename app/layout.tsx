import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ThemeRegistry } from '@/components/ThemeRegistry';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@/app/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'SharpTable — Operating System for Nigerian Restaurants & Hotels',
  description: 'SharpTable is an operating system for multi-branch Nigerian restaurants and hotels. Manage omnichannel ordering, kitchen sync, split payments, staff oversight, room ledgers, and recipe inventory.',
  icons: {
    icon: '/assets/logos/favIcon.png',
  },
  other: {
    'facebook-domain-verification': '486kokhn3pbbbp9fwp9fxo8jin5ff5',
  },

  verification: {
    google: 'google9fba54373eea274e',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SharpTable",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "50000",
                "priceCurrency": "NGN"
              },
              "description": "Restaurant and hotel software for Nigeria: table ordering and payment, kitchen display, owner oversight and keycard logging."
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>

        {/* Paystack Inline JS SDK V2 for subscription payments */}
        <Script src="https://js.paystack.co/v2/inline.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
