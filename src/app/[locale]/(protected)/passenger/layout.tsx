import React from 'react';

import ProtectedRoute from '@/components/protected-route';

/**
 * ProtectedPassengerLayout Component
 * Wraps all pages with localization and theming support.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The wrapped layout for protected routes.
 */
export default function ProtectedPassengerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute allowedRoles={['user']}>{children}</ProtectedRoute>;
}
