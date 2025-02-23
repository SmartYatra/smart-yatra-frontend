import { api } from '@/lib/api-client';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface IStops {
  stops: Array<{
    id: number;
    name: string;
    location_lat: string;
    location_lng: string;
    created_at: string;
    updated_at: string;
    geohash: string | null;
  }>;
}

const fetchStops = async (): Promise<IStops> => {
  const res = await api.get('/stops');
  return res.data;
};

export const useFetchStops = () => {
  return useSuspenseQuery({
    queryKey: ['stops'],
    queryFn: fetchStops,
  });
};
