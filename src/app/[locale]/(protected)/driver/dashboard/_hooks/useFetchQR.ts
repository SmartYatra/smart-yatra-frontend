import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

import { useGetYourBus } from './useGetYourBus';

type IQRDataResponse = {
  bus_id: number;
  route_id: null;
  bus_number: string;
  timestamp: number;
  auth_token: string;
};

export const useFetchQR = () => {
  const { data } = useGetYourBus();
  return useQuery<IQRDataResponse>({
    queryKey: ['qr'],
    queryFn: async () => {
      const res = await api.get(`/bus/qr-data`);
      return res.data.data;
    },
    enabled: !!data,
  });
};
