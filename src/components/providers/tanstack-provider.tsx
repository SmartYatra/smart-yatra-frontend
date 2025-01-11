'use client';

import React, { JSX } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * Creates a global instance of QueryClient.
 * This client is used to manage the cache for React Query's data fetching.
 * The query client will be shared across the entire app.
 */
const queryClient = new QueryClient();

/**
 * TanstackQueryProvider component provides React Query's context to its child components.
 * It ensures the query cache is available and provides devtools for debugging.
 *
 * @param {React.ReactNode} children - The child components to be wrapped with the provider.
 * @returns {JSX.Element} - The JSX element with React Query context and devtools.
 */
export default function TanstackQueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* React Query Devtools for inspecting queries */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
