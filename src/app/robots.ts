import { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/helpers';

/**
 * The `robots` function is used for robots.txt metadata used by search engines
 * @returns The metadata object
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Allow all search engines
        allow: '/', // Allow all pages to be crawled
        // Optional: Disallow specific paths (uncomment if needed)
        // disallow: ['/admin', '/login'],
      },
      // You can add more rules for specific user agents if necessary
      // {
      //   userAgent: 'Googlebot',
      //   disallow: '/private'
      // },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`, // Sitemap URL
  };
}
