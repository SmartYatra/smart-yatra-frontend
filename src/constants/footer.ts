import { Mail, MapPin, Phone } from 'lucide-react';

export const FOOTER_CONTACTS = [
  { title: 'support@smartyatra.com', link: 'mailto:support@smartyatra.com', icon: Mail },
  { title: '+977 9812345678', link: 'tel:+9779812345678', icon: Phone },
  { title: 'Dudhpati, Bhaktapur', link: '/', icon: MapPin },
];

export const FOOTER_INFOS = [
  {
    title: 'About Us',
    links: [
      { title: 'Our Mission', link: '/our-mission' },
      { title: 'Leadership', link: '/leadership' },
      { title: 'Careers', link: '/careers' },
    ],
  },
  {
    title: 'Our Services',
    links: [
      { title: 'Real-Time Tracking', link: '/real-time-tracking' },
      { title: 'Fare Management', link: '/fare-management' },
      { title: 'QR Code Payments', link: '/qr-payments' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { title: 'For Passengers', link: '/passengers' },
      { title: 'For Drivers', link: '/drivers' },
      { title: 'For Operators', link: '/operators' },
    ],
  },
  {
    title: 'Support',
    links: [
      { title: 'FAQs', link: '/faqs' },
      { title: 'Contact Support', link: '/contact-support' },
      { title: 'Community Help', link: '/community-help' },
    ],
  },
];
