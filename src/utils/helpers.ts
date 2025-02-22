import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

export const handleApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    const errorData = error.response?.data;
    const errorMessages = errorData?.data
      ? Object.values(errorData.data).flat() // Flatten nested error messages
      : [];

    if (errorMessages.length > 0) {
      (errorMessages as string[]).forEach(message => {
        toast.error(message);
      });
    } else {
      toast.error(
        errorData?.message || 'An unexpected error occurred. Please try again.'
      );
    }
  } else {
    console.error(error);
    toast.error('An unexpected error occurred. Please try again.');
  }
};
