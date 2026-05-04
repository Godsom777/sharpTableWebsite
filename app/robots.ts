import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/payment/', '/api/'],
    },
    sitemap: 'https://sharptable.com.ng/sitemap.xml',
  };
}
