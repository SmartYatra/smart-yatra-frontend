import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

import { IRoute } from './useFetchRoutes';

const fetchRouteById = async ({ id }: { id: number | null }) => {
  const res = await api.get(`/routes/${id}`);
  return res.data.data;
};

export const useFetchRouteById = ({ id }: { id: number | null }) => {
  return useQuery<IRoute>({
    queryKey: ['routes'],
    queryFn: () => fetchRouteById({ id }),
    enabled: !!id,
  });
};
