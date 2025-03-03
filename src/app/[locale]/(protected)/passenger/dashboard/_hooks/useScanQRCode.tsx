import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { handleApiError } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';

type TScanQrCodePayload = {
  bus_id: number;
  longitude: number;
  latitude: number;
};

export const useScanQrCode = () => {
  return useMutation({
    mutationFn: async (payload: TScanQrCodePayload) => {
      const res = await api.post('/trips/scan', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Successfully scanned QR code');
    },
    onError: error => {
      handleApiError(error);
    },
  });
};
