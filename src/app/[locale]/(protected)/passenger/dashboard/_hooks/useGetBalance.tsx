import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export const useGetBalance = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.balance],
    queryFn: async () => {
      const response = await api.get(`/user/balance`);
      return response.data.data.balance;
    },
  });
};
