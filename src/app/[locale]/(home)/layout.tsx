import React from 'react';

import BackgroundGlow from '@/components/BackgroundGlow';
import { Footer } from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';

/**
 * HomeLayout Component
 * Provides a layout wrapper for the home page.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The wrapped layout.
 */
export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      {/* Sticky Navbar with Discord Banner */}
      <Navbar />

      {/* Main content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <Footer />

      {/* Top-left - Background circles */}
      <BackgroundGlow className='-left-40 bottom-auto top-20 size-[600px]' />

      {/* Top-center - Background circles */}
      <BackgroundGlow className='-top-96 bottom-auto left-1/2 size-[600px] -translate-x-1/2' />

      {/* Bottom-left - Background circles */}
      <BackgroundGlow />
    </div>
  );
}
