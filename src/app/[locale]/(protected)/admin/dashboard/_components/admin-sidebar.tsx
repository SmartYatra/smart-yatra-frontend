'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ChevronDown,
  Grid,
  HelpCircle,
  LogOut,
  Map,
  Settings,
  User2,
} from 'lucide-react';

import LogoIcon from '@/components/logo-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
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
import { useAuth } from '@/context/auth.context';
import { usePathname } from '@/i18n/routing';

const AdminSidebar = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: Grid,
    },
    {
      title: 'Manage Routes',
      url: '/admin/dashboard/manage-routes',
      icon: Map,
    },
    {
      title: 'Settings',
      url: '/admin/dashboard/settings',
      icon: Settings,
    },
  ];

  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.refresh();
  };

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
                  <span className='text-xs'>Admin Dashboard</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Main Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
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

        {/* Help Section */}
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
              <Button
                className='justify-start'
                variant={'ghost'}
                onClick={handleLogout}
              >
                <LogOut />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
