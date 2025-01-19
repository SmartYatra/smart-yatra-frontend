import React from 'react';

import BackgroundGlow from '@/components/background-glow';
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
    <div className='flex min-h-screen flex-col overflow-hidden'>
      {/* Sticky Navbar with Discord Banner */}
      <Navbar />

      {/* Main content */}
      <main className='container relative flex-1'>
        {children}

        <BackgroundGlow position={'top-center'} />
        <BackgroundGlow position={'top-left'} size={'lg'} />
        <BackgroundGlow position={'bottom-left'} size={'lg'} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
