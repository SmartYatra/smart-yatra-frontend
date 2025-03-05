import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export interface IGetAllPossibleRoutes {
  route: {
    id: number;
    name: string;
  };
  segment: Array<{
    id: number;
    name: string;
    location_lat: string;
    location_lng: string;
    created_at: string;
    updated_at: string;
    geohash: string;
    pivot?: {
      route_id: number;
      stop_id: number;
      order: number;
    };
  }>;
  distance: number;
  fare: string | number;
}

export const useGetAllPossibleRoutes = ({
  startStopId,
  endStopId,
  enabled = false,
}: {
  startStopId?: number;
  endStopId?: number;
  enabled?: boolean;
}) => {
  return useQuery<IGetAllPossibleRoutes[]>({
    queryKey: [QUERY_KEYS.all_possible_routes, startStopId, endStopId],
    queryFn: async () => {
      const response = await api.get('/possible-routes', {
        params: { start_stop_id: startStopId, end_stop_id: endStopId },
      });
      return response.data.all_routes ? response.data.all_routes : [];
    },
    enabled,
  });
};
