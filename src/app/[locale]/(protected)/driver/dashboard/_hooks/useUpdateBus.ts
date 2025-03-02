import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TYourBusData } from '../_schema';

export const useUpdateBus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { payload: TYourBusData; busId: number }) => {
      const res = await api.put(`/buses/${data.busId}`, data.payload);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.your_bus] });
      toast.success('Bus updated successfully');
    },
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An error occurred');
      }
    },
  });
};
