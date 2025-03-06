import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface IUseStoreFarePayload {
  distance_range_start: number;
  distance_range_end: number;
  fare: number;
}

export const useStoreFare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IUseStoreFarePayload) => {
      const res = await api.post('/standard-fares', payload);
      return res.data.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fares] });
      toast.success('Fare added successfully');
    },
    onError: error => handleApiError(error),
  });
};
