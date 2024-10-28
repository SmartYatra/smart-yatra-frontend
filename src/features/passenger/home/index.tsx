import * as React from 'react';

import { CreditCard, History, Map, Settings2, User } from 'lucide-react';

import IconLogo from '@/assets/logo-icon.png';
import { AppSidebar } from '@/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const passengerSidebarData = {
  user: {
    name: 'Passenger',
    email: 'passenger@example.com',
    avatar: '/avatars/passenger.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: User,
      isActive: true,
      items: [
        { title: 'Overview', url: '#' },
        { title: 'Notifications', url: '#' },
      ],
    },
    {
      title: 'Trip History',
      url: '#',
      icon: History,
      items: [
        { title: 'Past Trips', url: '#' },
        { title: 'Favorite Routes', url: '#' },
      ],
    },
    {
      title: 'Routes & Maps',
      url: '#',
      icon: Map,
      items: [
        { title: 'Live Map', url: '#' },
        { title: 'Saved Routes', url: '#' },
      ],
    },
    {
      title: 'Payments',
      url: '#',
      icon: CreditCard,
      items: [
        { title: 'Payment History', url: '#' },
        { title: 'Top-up Account', url: '#' },
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
    { name: 'Frequent Routes', url: '#', icon: History },
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
      label: 'Billing',
      icon: CreditCard,
      action: () => {
        console.log('Open Billing');
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
  logo: IconLogo,
};

const PassengerHome = () => {
  return (
    <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
      <AppSidebar {...passengerSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-5" orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PassengerHome;
