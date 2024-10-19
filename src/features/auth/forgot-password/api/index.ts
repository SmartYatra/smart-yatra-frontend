import { adapter, mockApi } from '@/lib/api-client';

import { ForgotPasswordFormValues } from '../schema';

adapter.onPost('/forgot-password').reply(200, { message: 'Password reset link sent successfully' });

export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const response = await mockApi.post('/forgot-password', values);
  return response.data;
};
