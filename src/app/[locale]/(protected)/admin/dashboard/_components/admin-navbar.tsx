'use client';

import React from 'react';
import { useRouter } from 'nextjs-toploader/app';

import { Bell, LogOut, LucideIcon, Search, Settings, User } from 'lucide-react';

import CustomTrigger from '@/components/custom-sidebar-trigger';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth.context';
import { AvatarImage } from '@radix-ui/react-avatar';

interface IMenuItems {
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  onClick: () => void;
}

const AdminNavbar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  // Dropdown Menu Items
  const menuItems: IMenuItems[] = [
    {
      label: 'Profile',
      icon: User,
      onClick: () => router.push('/admin/profile'),
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => router.push('/admin/settings'),
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: () => router.push('/admin/notifications'),
    },
  ];

  return (
    <div className='mb-4 flex items-center justify-between gap-6 border-b pb-2 md:gap-8'>
      <div className='flex items-center gap-16'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger className='hidden text-muted-foreground md:block [&_svg]:size-6' />

          <CustomTrigger className='p-0 md:hidden [&_svg]:size-6' />
          <Logo className='md:hidden' />

          {/* Admin Branding */}
          <h2 className='hidden text-lg font-semibold md:block'>Admin Panel</h2>
        </div>

        {/* Search Bar */}
        <div className='hidden w-72 md:block'>
          <Input
            leftIcon={Search}
            placeholder='Search for routes, users, etc.'
          />
        </div>
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarImage alt='User Avatar' src='/images/avatar.jpg' />
            <AvatarFallback>DB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-60'>
          {/* User Info */}
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Mapped Menu Items */}
          <DropdownMenuGroup>
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} onClick={item.onClick}>
                <item.icon className='mr-2 h-4 w-4' />
                {item.label}
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminNavbar;
