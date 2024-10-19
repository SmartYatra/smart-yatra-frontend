import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {children}

          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
};

export default MainProvider;
