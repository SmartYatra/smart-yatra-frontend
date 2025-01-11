import { Metadata } from 'next';

import { getBaseUrl } from '@/utils/helpers';

export const siteConfig: Metadata = {
  title: 'SmartYatra',
  metadataBase: new URL(getBaseUrl()),
  // alternates: {
  //   canonical: new URL(getBaseUrl()),
  // },
  authors: [{ name: 'Diwash Bhattarai', url: 'https://diwashb.com.np' }],
  description:
    'SmartYatra is an innovative Public Transport Digitization System, streamlining bus management with QR code tracking, automatic fare deduction, and seamless passenger experience.',

  openGraph: {
    title: 'SmartYatra',
    description:
      'SmartYatra is an innovative Public Transport Digitization System, streamlining bus management with QR code tracking, automatic fare deduction, and seamless passenger experience.',
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}/og-image.png`,
        alt: 'SmartYatra',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    'public transport',
    'bus management',
    'QR code tracking',
    'automatic fare deduction',
    'transportation technology',
    'smart transit',
    'nextjs',
    'react',
    'typescript',
    'frontend',
  ],
} as const;
