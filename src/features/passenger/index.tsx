import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { AppSidebar } from '@/components/AppSidebar';
import Logo from '@/components/Logo';
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
import { passengerSidebarData } from '@/constants/sidebar';

import QRScannerModal from './components/QRScannerModal';

const PassengerLayout = () => {
  const location = useLocation();

  // Function to generate breadcrumb items from the current path
  const generateBreadcrumbs = (pathname: string) => {
    const paths = pathname.split('/').filter((path) => path);
    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');

      return {
        href,
        label,
      };
    });

    return breadcrumbs;
  };

  // Generate breadcrumbs from the current location's pathname
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  // Handle successful QR scan
  const handleScanSuccess = (data: string) => {
    console.log('Scanned Data:', data);
    // TODO: Add logic to handle scanned data
  };

  return (
    <SidebarProvider
      className="bg-muted/10"
      style={{ '--sidebar-width': '19rem' } as React.CSSProperties}
    >
      <AppSidebar {...passengerSidebarData} />
      <SidebarInset className="bg-transparent">
        <header className="my-4 flex shrink-0 flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between px-3 py-4 sm:hidden">
            <Logo />
            <SidebarTrigger />
          </div>
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hidden sm:block" />
            <Separator className="mr-2 hidden h-5 sm:block" orientation="vertical" />
            {/* Breadcrumb */}
            <Breadcrumb className="w-full">
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink asChild>
                          <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>
                          <span>{breadcrumb.label}</span>
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {/* Add separator except for the last item */}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="mt-px" />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <QRScannerModal onScanSuccess={handleScanSuccess} />
          </div>
        </header>

        <main className="size-full p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PassengerLayout;
