import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManageRoutesValues } from '../_schema/manage-routes.schema';

const addRoute = async (newRoute: ManageRoutesValues) => {
  delete newRoute.id;

  const res = await api.post('/routes', newRoute);
  return res.data;
};

export const useAddRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRoute,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['routes'],
      });

      toast.success('Route added successfully');
    },
    onError: error => {
      console.error('Error adding route:', error);
      toast.error('Failed to add route');
    },
  });
};
