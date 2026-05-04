import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeRegistry } from '@/components/ThemeRegistry';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'SharpTable - Absolute Command of Hospitality Operations',
  description: 'Uncompromising luxury restaurant operations without the friction. QR ordering, kitchen management, and analytics.',
  icons: {
    icon: '/assets/logos/favIcon.png',
  },
  other: {
    'facebook-domain-verification': '486kokhn3pbbbp9fwp9fxo8jin5ff5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SharpTable",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "128"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "NGN"
              },
              "description": "Absolute command of hospitality operations across ordering, visitor tracking, room service logistics, and fraud prevention."
            })
          }}
        />
      </head>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>

        {/* Paystack Inline JS SDK V2 for subscription payments */}
        <Script src="https://js.paystack.co/v2/inline.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
