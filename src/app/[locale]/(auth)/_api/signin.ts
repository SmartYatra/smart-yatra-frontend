import { api } from '@/lib/api-client';
import { ISuccessResponse } from '@/types/response';
import { TUserType } from '@/types/user.type';

import { SigninFormValues } from '../_schema';

export type TSigninResponseData = {
  token: string;
  name: string;
  type: TUserType;
};

export const signIn = async (
  values: SigninFormValues
): Promise<ISuccessResponse<TSigninResponseData>> => {
  // Payload for the login request
  const payload = {
    email: values.email,
    password: values.password,
  };

  const response = await api.post('/login', payload);
  return response.data;
};
