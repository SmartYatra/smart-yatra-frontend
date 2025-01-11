import { adapter, mockApi } from '@/lib/api-client';

import { LoginFormValues } from '../schema';

adapter
  .onPost('/signin')
  .reply(200, { message: 'User signed in successfully' });

export const signIn = async (values: LoginFormValues) => {
  const response = await mockApi.post('/signin', values);
  return response.data;
};
