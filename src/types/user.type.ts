export type TUserType = 'user' | 'driver' | 'admin';

export type TUser = {
  id: number;
  username: string;
  email: string;
  is_service: boolean;
  is_customer: boolean;
  is_staff: boolean;
  image: string;
};
