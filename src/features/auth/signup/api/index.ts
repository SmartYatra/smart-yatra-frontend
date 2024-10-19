import { adapter, mockApi } from '@/lib/api-client';

import { SignUpFormValues } from '../schema';

adapter.onPost('/signup').reply(200, { message: 'User signed up successfully' });

export const signUp = async (values: SignUpFormValues) => {
  const response = await mockApi.post('/signup', values);
  return response.data;
};
