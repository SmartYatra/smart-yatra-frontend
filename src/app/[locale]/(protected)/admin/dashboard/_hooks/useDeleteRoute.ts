import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (routeId: number | string) => {
      await api.delete(`/routes/${routeId}`);
      return routeId;
    },
    onSuccess: async () => {
      toast.success('Route deleted successfully');
      await queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
    onError: error => {
      toast.error('Error deleting route');
      console.error('Error deleting route:', error);
    },
  });
};
