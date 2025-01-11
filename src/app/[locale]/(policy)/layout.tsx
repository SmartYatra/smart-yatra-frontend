import React from 'react';

import Back from '@/components/back';
import BackgroundGlow from '@/components/background-glow';
import Logo from '@/components/logo';
import { PageWrapper } from '@/components/page-wrapper';

/**
 * PolicyLayout Component
 * Provides a layout wrapper for the home page.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The wrapped layout.
 */
export default function PolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      {/* Main content */}
      <main className='flex-1'>
        <PageWrapper className='min-h-screen'>
          <div className='container pb-16'>
            <div className='mx-auto max-w-4xl'>
              <div className='mb-12 flex w-full items-center justify-between'>
                <Logo />

                <Back />
              </div>
              {children}
            </div>
          </div>
        </PageWrapper>
      </main>

      {/* Top-left - Background circles */}
      <BackgroundGlow position={'top-left'} />

      {/* Bottom-right - Background circles */}
      <BackgroundGlow position={'bottom-right'} />
    </div>
  );
}
