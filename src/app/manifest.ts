import { MetadataRoute } from 'next';

/**
 * The `manifest` function is used for Progressive Web App (PWA) metadata
 * @returns The metadata object
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SmartYatra',
    short_name: 'SmartYatra',
    description:
      'A collection of functional programming utilities for JavaScript developers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9f9f9',
    theme_color: '#5e5bfb',
    scope: '/', // Defining the scope for the app
    lang: 'en', // Language of the app (consider adding this for better i18n support)
    icons: [
      {
        src: '/android-chrome-192x192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
