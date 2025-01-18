import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { ISuccessResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import { signIn, TSigninResponseData } from '../_api/signin';

const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: ISuccessResponse<TSigninResponseData>) => {
      if (data.success) {
        // Save token in localStorage
        localStorage.setItem('authToken', data.data.token);

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
