'use client';

import React from 'react';
import Link from 'next/link';

import {
  Car,
  ChevronDown,
  DollarSign,
  Grid,
  HelpCircle,
  LogOut,
  Map,
  Settings,
  User2,
} from 'lucide-react';

import LogoIcon from '@/components/logo-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from '@/i18n/routing';
import { TUserType } from '@/types/user.type';

interface SidebarProps {
  role: TUserType;
}

const sidebarConfig = {
  admin: [
    { title: 'Dashboard', url: '/admin/dashboard', icon: Grid },
    {
      title: 'Manage Routes',
      url: '/admin/dashboard/manage-routes',
      icon: Map,
    },
    { title: 'Settings', url: '/admin/dashboard/settings', icon: Settings },
  ],
  driver: [
    { title: 'Dashboard', url: '/driver/dashboard', icon: Grid },
    { title: 'Trips', url: '/driver/dashboard/trips', icon: Car },
    { title: 'Earnings', url: '/driver/dashboard/earnings', icon: DollarSign },
    { title: 'Settings', url: '/driver/dashboard/settings', icon: Settings },
  ],
  user: [
    { title: 'Dashboard', url: '/passenger/dashboard', icon: Grid },
    { title: 'Live Map', url: '/passenger/live-map', icon: Map },
    { title: 'My Trips', url: '/passenger/my-trips', icon: Car },
    {
      title: 'Payments',
      url: '/passenger/payments',
      icon: DollarSign,
    },
    { title: 'Settings', url: '/passenger/settings', icon: Settings },
  ],
};

const DashboardSidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // remove /en, /ne, /fr, etc. from pathname
  const path = pathname.split('/').slice(2).join('/');

  return (
    <Sidebar collapsible='icon' side='left' variant='sidebar'>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <SidebarMenuButton asChild size='lg'>
              <div>
                <LogoIcon className='size-8' />
                <div className='flex flex-col'>
                  <span className='truncate font-semibold'>Smart Yatra</span>
                  <span className='text-xs capitalize'>{role} Dashboard</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarConfig[role].map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={`/${path}` === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Help & Support */}
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help & Support
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip='Help Center'>
                      <Link href='/help'>
                        <HelpCircle />
                        <span>Help Center</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip='Contact Support'>
                      <Link href='/contact'>
                        <User2 />
                        <span>Contact Support</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarSeparator />

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <ThemeToggle showText />
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                className='flex w-full items-center gap-2'
                onClick={handleLogout}
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
