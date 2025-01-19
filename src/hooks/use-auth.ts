import { useRouter } from 'next/navigation';

import { nextApi } from '@/lib/api-client';

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    await nextApi.delete('/api/session').then(() => {
      router.refresh();
    });
  };

  return { logout };
};
