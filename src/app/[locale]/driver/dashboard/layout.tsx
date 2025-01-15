import React from 'react';
import { cookies } from 'next/headers';

import { SidebarProvider } from '@/components/ui/sidebar';

import DriverNavbar from './_components/driver-navbar';
import DriverSidebar from './_components/driver-sidebar';

const DriverDashboardLayout = async ({
  children,
}: Readonly<{ children: string }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider
      className='container relative max-w-[1920px]'
      defaultOpen={defaultOpen}
    >
      <DriverSidebar />
      <main className='relative min-h-[calc(100svh-1rem)] w-full p-2 sm:m-2'>
        <DriverNavbar />

        {children}
      </main>
    </SidebarProvider>
  );
};

export default DriverDashboardLayout;
