import React from 'react';
import { cookies } from 'next/headers';

import BackgroundGlow from '@/components/background-glow';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import AppSidebar from './_components/app-sidebar';

const DriverDashboardLayout = async ({
  children,
}: Readonly<{ children: string }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='relative m-2 w-full overflow-hidden rounded-lg border bg-muted/20 p-2'>
        <BackgroundGlow />
        <BackgroundGlow position={'bottom-right'} />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DriverDashboardLayout;
