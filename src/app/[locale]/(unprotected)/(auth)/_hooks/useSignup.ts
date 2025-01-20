import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { useToken } from '@/hooks/use-token';
import { useRouter } from '@/i18n/routing';
import { nextApi } from '@/lib/api-client';
import { IBadRequestResponse, ISuccessResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import { signup, TSignupResponseData } from '../_api/signup';

const useSignUp = () => {
  const router = useRouter();
  const { addTokenToLocalStorage } = useToken();

  return useMutation({
    mutationFn: signup,
    onSuccess: async (
      data: ISuccessResponse<TSignupResponseData> | IBadRequestResponse
    ) => {
      if (data.success) {
        await nextApi.post('/api/session', {
          token: data.data.token,
          role: data.data.user_type,
        });

        addTokenToLocalStorage(data.data.token);

        // Redirect based on user role
        switch (data.data.user_type) {
          case 'driver':
            router.push('/driver/onboarding');
            break;
          case 'user':
            router.push('/passenger/onboarding');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
        }

        // Show success message
        toast.success(data.message);
      }
    },
    onError: error => {
      console.error(error);

      // Show error message
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    },
  });
};

export default useSignUp;
