import { adapter, mockApi } from '@/lib/api-client';

import { IOnBoardingFormData } from '../_types';

adapter
  .onPost('/driver/onboarding')
  .reply(200, { message: 'Driver onboarding successful' });

export const onboarding = async (values: IOnBoardingFormData) => {
  const response = await mockApi.post('/driver/onboarding', values);
  return response.data as { message: string };
};
