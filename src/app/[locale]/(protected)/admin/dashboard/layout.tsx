import React from 'react';
import { cookies } from 'next/headers';

import DashboardNavbar from '@/components/dashboard-navbar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminDashboardLayout = async ({
  children,
}: Readonly<{ children: string }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider
      className='container relative max-w-[1920px]'
      defaultOpen={defaultOpen}
    >
      <DashboardSidebar role='admin' />
      <main className='relative min-h-[calc(100svh-1rem)] w-full p-2 sm:m-2'>
        <DashboardNavbar role='admin' />

        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
