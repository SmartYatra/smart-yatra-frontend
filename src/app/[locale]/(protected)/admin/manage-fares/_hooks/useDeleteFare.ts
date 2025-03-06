import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IUseDeleteFarePayload {
  fareId: number;
}

export const useDeleteFare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fareId }: IUseDeleteFarePayload) => {
      const res = await api.delete(`/standard-fares/${fareId}`);
      return res.data.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fares] });
      toast.success('Fare deleted successfully');
    },
    onError: error => handleApiError(error),
  });
};
