import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

import { useGetYourBus } from './useGetYourBus';

type IQRDataResponse = {
  route_id: null;
  bus_number: string;
  timestamp: number;
  auth_token: string;
};

const fetchQRData = async ({
  id,
}: {
  id: number;
}): Promise<ISuccessResponse<IQRDataResponse>> => {
  const res = await api.get(`/buses/${id}/qr-data`);
  return res.data;
};

export const useFetchQR = () => {
  const { data } = useGetYourBus();
  return useQuery({
    queryKey: ['qr'],
    queryFn: () => fetchQRData({ id: data?.driver_id as number }),
    enabled: !!data,
  });
};
