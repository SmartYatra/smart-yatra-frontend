import { History, Map, Settings2, User, Users } from 'lucide-react';

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

const adminSidebarData = {
  user: { name: 'Admin', email: 'admin@example.com', avatar: '/avatars/admin.jpg' },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: User,
      isActive: true,
      items: [
        { title: 'Overview', url: '#' },
        { title: 'System Notifications', url: '#' },
      ],
    },
    {
      title: 'User Management',
      url: '#',
      icon: Users,
      items: [
        { title: 'Passengers', url: '#' },
        { title: 'Drivers', url: '#' },
        { title: 'Admins', url: '#' },
      ],
    },
    {
      title: 'Trip Management',
      url: '#',
      icon: History,
      items: [
        { title: 'All Trips', url: '#' },
        { title: 'Ongoing Trips', url: '#' },
      ],
    },
    {
      title: 'Reports',
      url: '#',
      icon: Map,
      items: [
        { title: 'Earnings Reports', url: '#' },
        { title: 'User Activity Reports', url: '#' },
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
    { name: 'Manage Routes', url: '#', icon: Map },
    { name: 'View Analytics', url: '#', icon: History },
  ],
};

const AdminHome = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar {...adminSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Admin Dashboard</BreadcrumbLink>
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

export default AdminHome;
