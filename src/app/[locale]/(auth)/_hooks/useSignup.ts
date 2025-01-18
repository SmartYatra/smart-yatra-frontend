import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { IBadRequestResponse, ISuccessResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import { signup, TSignupResponseData } from '../_api/signup';

const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signup,
    onSuccess: (
      data: ISuccessResponse<TSignupResponseData> | IBadRequestResponse
    ) => {
      if (data.success) {
        // Save token to local storage
        localStorage.setItem('authToken', data.data.token);

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
        toast.error('An error occurred. Please try again.');
      }
    },
  });
};

export default useSignUp;
