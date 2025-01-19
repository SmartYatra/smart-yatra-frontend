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
interface IComponentProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IComponentProps> = ({ children }) => {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      {/* Main content */}
      <main className='flex-1'>{children}</main>

      {/* Top-left - Background circles */}
      <BackgroundGlow className='-left-40 -top-40' position={'top-left'} />

      {/* Bottom-right - Background circles */}
      <BackgroundGlow position={'bottom-right'} />
    </div>
  );
};

export default AuthLayout;
