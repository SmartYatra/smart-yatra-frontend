import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface IStop {
  id: number;
  name: string;
  location_lat: string;
  location_lng: string;
  created_at: string;
  updated_at: string;
  pivot: {
    route_id: number;
    stop_id: number;
    order: number;
  };
}

export interface IRoute {
  id: number;
  name: string;
  description: string;
  distance: number;
  duration: number;
  status: 'active';
  created_at: string;
  updated_at: string;
  stops: Array<IStop>;
}

const fetchRoutes = async (): Promise<ISuccessResponse<IRoute[]>> => {
  const res = await api.get('/routes');
  return res.data;
};

export const useFetchRoutes = () => {
  return useSuspenseQuery({
    queryKey: ['routes'],
    queryFn: fetchRoutes,
  });
};
