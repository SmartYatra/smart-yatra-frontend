import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEndTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post('/bus/end-trip');
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trip_status],
      });
      toast.success('Trip ended successfully');
    },
    onError: error => handleApiError(error),
  });
};
