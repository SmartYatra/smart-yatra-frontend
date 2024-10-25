import { CreditCard, History, Map, Settings2, User } from 'lucide-react';

import { AppSidebar } from '@/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-select';

const driverSidebarData = {
  user: { name: 'Driver', email: 'driver@example.com', avatar: '/avatars/driver.jpg' },
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
      title: 'Trip Management',
      url: '#',
      icon: History,
      items: [
        { title: 'Current Trips', url: '#' },
        { title: 'Completed Trips', url: '#' },
      ],
    },
    {
      title: 'Routes & Maps',
      url: '#',
      icon: Map,
      items: [
        { title: 'Live Map', url: '#' },
        { title: 'Route History', url: '#' },
      ],
    },
    {
      title: 'Earnings',
      url: '#',
      icon: CreditCard,
      items: [
        { title: 'Earnings Overview', url: '#' },
        { title: 'Payouts', url: '#' },
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
    { name: 'Driver Ratings', url: '#', icon: History },
  ],
};

const DriverHome = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar {...driverSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Driver Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
