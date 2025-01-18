import { api } from '@/lib/api-client';
import { IBadRequestResponse, ISuccessResponse } from '@/types/response';
import { TUserType } from '@/types/user.type';

import { SignupFormValues } from '../_schema';

export type TSignupResponseData = {
  token: string;
  name: string;
  user_type: TUserType;
};

export const signup = async (
  values: SignupFormValues
): Promise<ISuccessResponse<TSignupResponseData> | IBadRequestResponse> => {
  // Payload for the register request
  const payload = {
    name: values.name,
    email: values.email,
    password: values.password,
    c_password: values.confirmPassword,
    user_type: values.role,
  };

  const response = await api.post('/register', payload);
  return response.data;
};
