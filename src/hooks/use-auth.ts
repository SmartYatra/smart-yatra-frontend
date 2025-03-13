import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { nextApi } from '@/lib/api-client';
import { TUser } from '@/types/user.type';

export type TSession = {
  token: string;
  role: string;
  name: string;
  expiresAt: string;
  iat: number;
  exp: number;
};

export const useAuth = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const session: TSession = await nextApi
        .get('/api/session')
        .then(res => res.data)
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));

      setUser(
        session?.role ? { role: session.role, name: session.name } : null
      );
    };

    void getSession();
  }, []);

  const logout = async () => {
    await nextApi.delete('/api/session').then(() => {
      toast.success('Successfully logged out!');
      window.location.reload();
    });
  };

  return { logout, user, isLoading };
};
