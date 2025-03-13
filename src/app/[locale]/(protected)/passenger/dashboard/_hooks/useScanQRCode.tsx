import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TScanQrCodePayload = {
  bus_id: number;
  stop_id: number | null;
};

export const useScanQrCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TScanQrCodePayload) => {
      const res = await api.post('/trips/scan', payload);
      return res.data;
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.passenger_trip_status],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.balance],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trip_status],
      });
      toast.success(data.message || 'Successfully scanned QR code');
    },
    onError: error => {
      handleApiError(error);
    },
  });
};
