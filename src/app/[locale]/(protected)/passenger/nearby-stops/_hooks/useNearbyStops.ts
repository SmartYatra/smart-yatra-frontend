import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

interface INearbyStop {
  id: number;
  name: string;
  location_lat: string;
  location_lng: string;
  created_at: string;
  updated_at: string;
  geohash: string;
  distance: number;
}

interface IUseNearbyStopsPayload {
  latitude: string;
  longitude: string;
}

export const useNearbyStops = ({
  latitude,
  longitude,
}: IUseNearbyStopsPayload) => {
  return useQuery<INearbyStop[]>({
    queryKey: [QUERY_KEYS.nearby_stop, latitude, longitude],
    queryFn: async () => {
      const res = await api.get('/stops/get-nearby', {
        params: { latitude, longitude },
      });
      return res.data.data;
    },
  });
};
