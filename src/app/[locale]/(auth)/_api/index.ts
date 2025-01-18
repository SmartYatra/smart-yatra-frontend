import { mockApi } from '@/lib/api-client';

import { ForgotPasswordFormValues } from '../_schema';

export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const response = await mockApi.post('/forgot-password', values);
  return response.data;
};
