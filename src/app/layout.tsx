import React from 'react';

interface RootLayoutProps {
  /**
   * The content to be rendered inside the layout.
   */
  children?: React.ReactNode;
}

/**
 * RootLayout Component
 * Provides a root layout wrapper for the application.
 *
 * @param {RootLayoutProps} props - Props containing children to be rendered.
 * @returns The rendered layout with children.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
