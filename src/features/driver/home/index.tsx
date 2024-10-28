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

const driverSidebarData = {
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
  logo: IconLogo,
};

const DriverHome = () => {
  return (
    <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
      <AppSidebar {...driverSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-5" orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Driver Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Overview</BreadcrumbPage>
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

export default DriverHome;
