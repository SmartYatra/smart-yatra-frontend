import { adapter, mockApi } from '@/lib/api-client';

import { ForgotPasswordFormValues, SigninFormValues } from '../_schema';

adapter
  .onPost('/signin')
  .reply(200, { message: 'User signed in successfully' });

export const signIn = async (values: SigninFormValues) => {
  const response = await mockApi.post('/signin', values);
  return response.data;
};

export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const response = await mockApi.post('/forgot-password', values);
  return response.data;
};
