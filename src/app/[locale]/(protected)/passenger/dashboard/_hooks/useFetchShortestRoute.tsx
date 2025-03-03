import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export interface IShortestRoute {
  shortest_route: Array<{
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
      geohash: string | null;
    }>;
    distance: number;
    fare: number;
  }>;
}

type TShortestRouteParams = {
  start_stop_id?: number;
  end_stop_id?: number;
};

const fetchShortestRoute = async (
  params: TShortestRouteParams
): Promise<IShortestRoute> => {
  const res = await api.get('/shortest-route', { params });
  return res.data;
};

export const useFetchShortestRoutes = (params: TShortestRouteParams) => {
  return useQuery({
    queryKey: ['shortest-route', params],
    queryFn: () => fetchShortestRoute(params),
    enabled: false, // Prevent auto-fetching
  });
};
