import { CreditCard, History, Map, Settings2, User, Users } from 'lucide-react';

import IconLogo from '@/assets/logo-icon.png';

import { ROUTES } from './routes';

interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: Array<{
    title: string;
    url?: string;
    icon: React.ElementType;
    items?: Array<{
      title: string;
      url: string;
    }>;
  }>;
  projects?: Array<{
    name: string;
    url: string;
    icon: React.ElementType;
  }>;
  footerItems: Array<{
    label: string;
    icon: React.ElementType;
    action: () => void;
  }>;
  appName: string;
  appDescription?: string;
  appUrl: string;
  logo: string;
}

export const passengerSidebarData: SidebarData = {
  user: {
    name: 'Passenger',
    email: 'passenger@example.com',
    avatar: '/avatars/passenger.jpg',
  },
  navMain: [
    {
      title: 'Live Map',
      url: ROUTES.PASSENGER.LIVE_MAP,
      icon: Map,
    },
    {
      title: 'Past Trips',
      icon: History,
      url: ROUTES.PASSENGER.PAST_TRIPS,
    },
    {
      title: 'Upcoming Trips',
      icon: CreditCard,
      url: ROUTES.PASSENGER.UPCOMING_TRIPS,
    },
    {
      title: 'Transaction History',
      icon: CreditCard,
      url: ROUTES.PASSENGER.TRANSACTION_HISTORY,
    },
    {
      title: 'Add Funds',
      icon: CreditCard,
      url: ROUTES.PASSENGER.ADD_FUNDS,
    },
  ],

  footerItems: [
    {
      label: 'Account Settings',
      icon: Settings2,
      action: () => {
        console.log('Open Account Settings');
      },
    },
  ],
  appName: 'Smart Yatra',
  appDescription: 'Passenger',
  appUrl: ROUTES.PASSENGER.LIVE_MAP,
  logo: IconLogo,
};

export const driverSidebarData = {
  user: {
    name: 'Driver',
    email: 'driver@example.com',
    avatar: '/avatars/driver.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: User,
      isActive: true,
      items: [
        { title: 'Overview', url: '#' },
        { title: 'Earnings', url: '#' },
      ],
    },
    {
      title: 'Trip History',
      url: '#',
      icon: History,
      items: [
        { title: 'Completed Trips', url: '#' },
        { title: 'Pending Trips', url: '#' },
      ],
    },
    {
      title: 'Routes & Maps',
      url: '#',
      icon: Map,
      items: [
        { title: 'Live Map', url: '#' },
        { title: 'My Routes', url: '#' },
      ],
    },
    {
      title: 'Payments',
      url: '#',
      icon: CreditCard,
      items: [
        { title: 'Payment History', url: '#' },
        { title: 'Withdraw Earnings', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        { title: 'Profile', url: '#' },
        { title: 'Preferences', url: '#' },
      ],
    },
  ],
  projects: [
    { name: 'Upcoming Trips', url: '#', icon: Map },
    { name: 'Driver Guidelines', url: '#', icon: History },
  ],
  footerItems: [
    {
      label: 'Account',
      icon: Settings2,
      action: () => {
        console.log('Open Account');
      },
    },
    {
      label: 'Earnings',
      icon: CreditCard,
      action: () => {
        console.log('Open Earnings');
      },
    },
    {
      label: 'Notifications',
      icon: History,
      action: () => {
        console.log('Open Notifications');
      },
    },
  ],
  appName: 'Smart Yatra',
  appDescription: 'Driver',
  appUrl: ROUTES.DRIVER_HOME,
  logo: IconLogo,
};

export const adminSidebarData = {
  user: {
    name: 'Admin',
    email: 'admin@example.com',
    avatar: '/avatars/admin.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        { title: 'Overview', url: '#' },
        { title: 'User Management', url: '#' },
      ],
    },
    {
      title: 'Trip Management',
      url: '#',
      icon: History,
      items: [
        { title: 'Current Trips', url: '#' },
        { title: 'Completed Trips', url: '#' },
      ],
    },
    {
      title: 'Analytics',
      url: '#',
      icon: Map,
      items: [
        { title: 'Live Analytics', url: '#' },
        { title: 'Reports', url: '#' },
      ],
    },
    {
      title: 'Payments',
      url: '#',
      icon: CreditCard,
      items: [
        { title: 'Transaction History', url: '#' },
        { title: 'Billing', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        { title: 'Admin Profile', url: '#' },
        { title: 'System Preferences', url: '#' },
      ],
    },
  ],
  projects: [
    { name: 'User Feedback', url: '#', icon: Users },
    { name: 'System Logs', url: '#', icon: History },
  ],
  footerItems: [
    {
      label: 'User Accounts',
      icon: Users,
      action: () => {
        console.log('Manage User Accounts');
      },
    },
    {
      label: 'Analytics',
      icon: Map,
      action: () => {
        console.log('View Analytics');
      },
    },
    {
      label: 'Settings',
      icon: Settings2,
      action: () => {
        console.log('Open Settings');
      },
    },
  ],
  appName: 'Smart Yatra',
  appDescription: 'Admin',
  appUrl: ROUTES.ADMIN_HOME,
  logo: IconLogo,
};
