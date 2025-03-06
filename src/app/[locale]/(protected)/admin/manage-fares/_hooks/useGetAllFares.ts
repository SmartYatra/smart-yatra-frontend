import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

interface IFare {
  id: number;
  distance_range_start: string;
  distance_range_end: string;
  fare: string;
  created_at: string;
  updated_at: string;
}

export const useGetAllFares = () => {
  return useQuery<IFare[]>({
    queryKey: [QUERY_KEYS.fares],
    queryFn: async () => {
      const res = await api.get('/standard-fares');
      return res.data.data;
    },
  });
};
