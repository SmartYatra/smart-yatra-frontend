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

const fetchRouteById = async ({
  id,
}: {
  id: number;
}): Promise<ISuccessResponse<IRoute>> => {
  const res = await api.get(`/routes/${id}`);
  return res.data;
};

export const useFetchRouteById = ({ id }: { id: number }) => {
  return useSuspenseQuery({
    queryKey: ['routes'],
    queryFn: () => fetchRouteById({ id }),
  });
};
