import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { forgotPassword } from '../api';

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
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

export default useForgotPassword;
