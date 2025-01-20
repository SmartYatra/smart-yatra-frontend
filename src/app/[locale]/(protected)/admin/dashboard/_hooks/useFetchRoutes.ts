import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface IRoute {
  id: number;
  name: string;
  location_lng: string;
  location_lat: string;
  order: number;
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
