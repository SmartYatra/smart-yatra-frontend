'use client';

import React from 'react';

import { Bell, LogOut, Search, Settings, User } from 'lucide-react';

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
import { AvatarImage } from '@radix-ui/react-avatar';

const DriverNavbar = () => {
  return (
    <div className='mb-4 flex items-center justify-between gap-6 border-b pb-2 md:gap-8'>
      <div className='flex items-center gap-8'>
        <SidebarTrigger className='text-muted-foreground [&_svg]:size-6' />

        {/* Search Bar */}
        <div className='hidden w-72 md:block'>
          <Input
            leftIcon={Search}
            placeholder='Search for trips, earnings, etc.'
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
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className='mr-2 h-4 w-4' />
              Notifications
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
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

export default DriverNavbar;
