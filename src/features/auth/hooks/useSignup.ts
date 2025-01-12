import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { signUp } from '../api';

const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: error => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });
};

export default useSignUp;
