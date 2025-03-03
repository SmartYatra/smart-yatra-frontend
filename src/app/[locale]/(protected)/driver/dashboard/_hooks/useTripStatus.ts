import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

interface ITripStatus {
  id: number;
  bus_id: number;
  route_id: number;
  start_time: string;
  end_time: null;
  status: 'in_progress';
  current_passenger_count: number;
  total_passenger_count: number;
  total_fare_collected: string;
  distance_traveled: string;
  created_at: string;
  updated_at: string;
}

export const useTripStatus = () => {
  return useQuery<ISuccessResponse<ITripStatus>>({
    queryKey: [QUERY_KEYS.trip_status],
    queryFn: async () => {
      const res = await api.get('bus/trip-status');
      return res.data;
    },
  });
};
