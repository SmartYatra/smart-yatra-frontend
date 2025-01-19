import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuth } from '@/context/auth.context';
import { useRouter } from '@/i18n/routing';
import { ISuccessResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import { signIn, TSigninResponseData } from '../_api/signin';

const useSignin = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: ISuccessResponse<TSigninResponseData>) => {
      if (data.success) {
        // Login the user by saving te token and user type in the local storage
        login(data.data.token, data.data.type);

        // Redirect based on user role
        switch (data.data.type) {
          case 'driver':
            router.push('/driver/dashboard');
            break;
          case 'user':
            router.push('/passenger/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
        }

        toast.success(data.message);
      }
    },
    onError: (error: unknown) => {
      console.error(error);

      if (isAxiosError(error)) {
        if (error.response?.data.message === 'Unauthorized.') {
          toast.error(
            error.response?.data.error || 'Invalid email or password'
          );
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    },
  });
};

export default useSignin;
