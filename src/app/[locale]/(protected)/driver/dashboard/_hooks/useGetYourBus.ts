import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

interface IGetYourBusResponse {
  id: number;
  bus_number: string;
  model: string;
  capacity: number;
  status: 'active';
  latitude: number;
  longitude: number;
  geohash: number;
  created_at: string;
  updated_at: string;
  driver_id: number;
  route_id: number;
}

export const useGetYourBus = () => {
  return useQuery<IGetYourBusResponse>({
    queryKey: [QUERY_KEYS.your_bus],
    queryFn: async () => {
      const response = await api.get(`bus/get-for-driver`);
      return response.data.data;
    },
  });
};
