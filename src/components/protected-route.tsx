'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/auth.context';
import { TUserType } from '@/types/user.type';

interface ProtectedRouteProps {
  allowedRoles: TUserType[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin'); // Redirect if not authenticated
    } else if (role && !allowedRoles.includes(role)) {
      router.push('/unauthorized'); // Redirect if user role is not allowed
    }

    setIsLoading(false); // Mark loading as complete
  }, [isAuthenticated, role, router, allowedRoles]);

  if (isLoading) return <div>Loading...</div>; // Prevent flashing content

  return <>{children}</>;
};

export default ProtectedRoute;
