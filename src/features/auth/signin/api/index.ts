import { adapter, mockApi } from '@/lib/api-client';

import { SignInFormValues } from '../schema';

adapter.onPost('/signin').reply(200, { message: 'User signed in successfully' });

export const signIn = async (values: SignInFormValues) => {
  const response = await mockApi.post('/signin', values);
  return response.data;
};
