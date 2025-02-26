import { toast } from 'sonner';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from '@/i18n/routing';
import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import { IOnBoardingFormData } from '../_types';

type IOnboardDriverResponse = {
  bus_number: string;
  status: 'active';
  route_id: number;
  model: string;
  capacity: number;
  driver_id: number;
};

const onboarding = async (
  payload: IOnBoardingFormData
): Promise<ISuccessResponse<IOnboardDriverResponse>> => {
  const res = await api.post(`/buses`, {
    bus_number: payload.busNumber,
    status: payload.status,
    route_id: payload.routeId,
    model: payload.model,
    capacity: payload.capacity,
    driver_id: payload.driverId,
  });
  return res.data;
};

export const useDriverOnboarding = () => {
  const router = useRouter();
  const { user } = useAuth();

  console.log(user);

  return useMutation({
    mutationKey: ['onboarding'],
    mutationFn: onboarding,
    onSuccess: data => {
      toast.success(data.message);
      router.push('/driver/dashboard');
    },
    onError: error => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });
};
