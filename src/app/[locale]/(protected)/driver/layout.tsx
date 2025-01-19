import React from 'react';

import ProtectedRoute from '@/components/protected-route';

/**
 * ProtectedDriverLayout Component
 * Wraps all pages with localization and theming support.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The wrapped layout for protected routes.
 */
export default function ProtectedDriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute allowedRoles={['driver']}>{children}</ProtectedRoute>;
}
