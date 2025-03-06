import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IUseStoreFarePayload } from './useStoreFare';

interface IUseUpdateFarePayload extends IUseStoreFarePayload {
  fareId: number;
}

export const useUpdateFare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IUseUpdateFarePayload) => {
      const { fareId, ...rest } = payload;
      const res = await api.put(`/standard-fares/${fareId}`, { ...rest });
      return res.data.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fares] });
      toast.success('Fare updated successfully');
    },
    onError: error => handleApiError(error),
  });
};
