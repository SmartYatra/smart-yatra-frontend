import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { signIn } from '../api';

const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });
};

export default useSignIn;
