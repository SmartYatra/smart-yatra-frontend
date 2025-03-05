import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export interface IShortestRoute {
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
    pivot?: {
      route_id: number;
      stop_id: number;
      order: number;
    };
  }>;
  distance: number;
  fare: number;
}

type TShortestRouteParams = {
  start_stop_id?: number;
  end_stop_id?: number;
};

const fetchShortestRoute = async (
  params: TShortestRouteParams
): Promise<IShortestRoute[]> => {
  const res = await api.get('/shortest-route', { params });
  return res.data.shortest_route;
};

export const useFetchShortestRoutes = ({
  start_stop_id,
  end_stop_id,
  enabled = false,
}: TShortestRouteParams & { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['shortest-route', start_stop_id, end_stop_id],
    queryFn: () => fetchShortestRoute({ start_stop_id, end_stop_id }),
    enabled, // Prevent auto-fetching
  });
};
