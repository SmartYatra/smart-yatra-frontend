'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/auth.context';
import { TUserType } from '@/types/user.type';

interface RedirectAuthenticatedUserProps {
  children: React.ReactNode;
}

const RedirectAuthenticatedUser = ({
  children,
}: RedirectAuthenticatedUserProps) => {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const getDashboardRoute = (userRole: TUserType | null) => {
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'driver':
        return '/driver/dashboard';
      case 'user':
        return '/passenger/dashboard';
      default:
        return '/'; // Default to home if role is unknown
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (role) {
        // Redirect authenticated user to their respective dashboard
        router.replace(getDashboardRoute(role));
      }
    } else {
      // Stop loading and render children if not authenticated
      setIsLoading(false);
    }
  }, [isAuthenticated, role, router]);

  // If still loading, return null, else return the children
  if (isLoading) return null;

  return <>{children}</>;
};

export default RedirectAuthenticatedUser;
