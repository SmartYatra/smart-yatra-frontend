import * as React from 'react';

import { CreditCard, History, Map, Settings2, Users } from 'lucide-react';

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

const adminSidebarData = {
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
  logo: IconLogo,
};

const AdminHome = () => {
  return (
    <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
      <AppSidebar {...adminSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-5" orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Admin Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>System Overview</BreadcrumbPage>
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

export default AdminHome;
