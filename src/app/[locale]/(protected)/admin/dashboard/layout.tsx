import React from 'react';
import { cookies } from 'next/headers';

import { SidebarProvider } from '@/components/ui/sidebar';

import AdminNavbar from './_components/admin-navbar';
import AdminSidebar from './_components/admin-sidebar';

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
      <AdminSidebar />
      <main className='relative min-h-[calc(100svh-1rem)] w-full p-2 sm:m-2'>
        <AdminNavbar />

        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
