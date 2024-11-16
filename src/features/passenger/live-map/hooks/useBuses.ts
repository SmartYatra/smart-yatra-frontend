import { QUERY_KEYS } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchBuses } from '../api';

export const useBuses = () => {
  return useSuspenseQuery({
    queryFn: fetchBuses,
    queryKey: [QUERY_KEYS.buses],
  });
};
