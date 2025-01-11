import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/helpers';

/**
 * The `sitemap` function is used for sitemap.xml metadata used by search engines
 * @returns The metadata object
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Main page gets the highest priority
    },
    // Example additional static pages
    // {
    //   url: `${getBaseUrl()}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${getBaseUrl()}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
