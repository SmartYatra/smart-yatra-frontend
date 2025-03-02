import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

import { IRoute } from '../../../admin/dashboard/_hooks/useFetchRoutes';

const fetchRoutesFromMultipleIds = async ({
  ids,
}: {
  ids: number[];
}): Promise<IRoute[]> => {
  console.log(ids);
  const res = await api.get(`route/get-multiple`, {
    params: { route_ids: ids },
  });
  console.log(res.data.data);
  return res.data.data;
};

export const useFetchRoutesFromMultipleIds = ({ ids }: { ids: number[] }) => {
  return useQuery({
    queryKey: ['routes'],
    queryFn: () => fetchRoutesFromMultipleIds({ ids }),
    enabled: !!ids.length,
  });
};
