import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { signUp } from '../api';

const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      console.log(data);

      // If driver take to driver/onboarding page
      if (data.data.role === 'driver') {
        router.push('/driver/onboarding');
      }

      // If passenger take to passenger/onboarding page
      if (data.data.role === 'passenger') {
        router.push('/passenger/onboarding');
      }

      // If admin take to admin/dashboard page
      if (data.data.role === 'admin') {
        router.push('/admin/dashboard');
      }

      toast.success(data.message);
    },
    onError: error => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });
};

export default useSignUp;
