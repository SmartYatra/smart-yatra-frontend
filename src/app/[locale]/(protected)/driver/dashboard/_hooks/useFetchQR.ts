import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

type IQRDataResponse = {
  route_id: null;
  bus_number: string;
  timestamp: number;
  auth_token: string;
};

const fetchQRData = async ({
  id = 3,
}: {
  id: number;
}): Promise<ISuccessResponse<IQRDataResponse>> => {
  const res = await api.get(`/buses/${id}/qr-data`);
  return res.data;
};

export const useFetchQR = ({ id = 3 }: { id: number }) => {
  return useQuery({
    queryKey: ['qr'],
    queryFn: () => fetchQRData({ id }),
  });
};
