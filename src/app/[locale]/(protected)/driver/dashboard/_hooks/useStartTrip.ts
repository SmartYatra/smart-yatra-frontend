import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useStartTrip = ({ routeId }: { routeId: number | null }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post('/bus/start-trip', { route_id: routeId });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trip_status],
      });

      toast.success('Trip started successfully');
    },
    onError: error => handleApiError(error),
  });
};
