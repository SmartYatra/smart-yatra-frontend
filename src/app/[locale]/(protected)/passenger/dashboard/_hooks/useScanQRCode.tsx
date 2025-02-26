import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

type TScanQrCodePayload = {
  bus_id: number;
  passenger_id: number;
  auth_token: string;
  longitude: number;
  latitude: number;
};

const scanQrCode = async (payload: TScanQrCodePayload) => {
  const res = await api.post('/trips/scan', payload);
  return res.data;
};

export const useScanQrCode = () => {
  return useMutation({
    mutationFn: scanQrCode,
    onSuccess: () => {
      toast.success('Successfully scanned QR code');
    },
    onError: error => {
      toast.error(error.message || 'Failed to scan QR code');
    },
  });
};
