import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { useMutation } from '@tanstack/react-query';

import { onboarding } from '../_api';

export const useDriverOnboarding = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['onboarding'],
    mutationFn: onboarding,
    onSuccess: data => {
      toast.success(data.message);
      router.push('/driver/dashboard');
    },
    onError: error => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });
};
