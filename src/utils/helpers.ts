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
    let errorMessages: string[] = [];

    if (errorData?.data) {
      // Handle nested error messages
      errorMessages = Object.values(errorData.data).flat() as string[];
    } else if (errorData?.errors) {
      // Handle errors in the format {"success":false,"errors":{"route_id":["The route id field is required."]}}
      errorMessages = Object.values(errorData.errors).flat() as string[];
    }

    if (errorMessages.length > 0) {
      errorMessages.forEach(message => {
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
