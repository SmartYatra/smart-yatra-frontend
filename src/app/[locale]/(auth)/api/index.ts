import { adapter, mockApi } from '@/lib/api-client';

import {
  ForgotPasswordFormValues,
  SigninFormValues,
  SignupFormValues,
} from '../_schema';

adapter
  .onPost('/signin')
  .reply(200, { message: 'User signed in successfully' });

adapter.onPost('/signup').reply(config => {
  const { name, email, role } = JSON.parse(config.data);
  return [
    200,
    {
      message: `User ${name} signed up successfully with email ${email}`,
      data: {
        name,
        email,
        role,
      },
    },
  ];
});

export const signIn = async (values: SigninFormValues) => {
  const response = await mockApi.post('/signin', values);
  return response.data;
};

export const signUp = async (values: SignupFormValues) => {
  const response = await mockApi.post('/signup', values);
  return response.data as {
    message: string;
    data: { name: string; email: string; role: string };
  };
};

export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const response = await mockApi.post('/forgot-password', values);
  return response.data;
};
