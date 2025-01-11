import React from 'react';

import BackgroundGlow from '@/components/background-glow';

/**
 * AuthLayout Component
 * Provides a layout wrapper for the home page.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The wrapped layout.
 */
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      {/* Main content */}
      <main className='flex-1'>{children}</main>

      {/* Top-left - Background circles */}
      <BackgroundGlow />

      {/* Bottom-right - Background circles */}
      <BackgroundGlow className='-bottom-80 -right-80 left-auto' />
    </div>
  );
}
