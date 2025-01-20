import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManageRoutesValues } from '../_schema/manage-routes.schema';

export const useEditRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedRoute: ManageRoutesValues) => {
      const res = await api.put(`/routes/${updatedRoute.id}`, updatedRoute);
      return res.data;
    },
    onSuccess: async (_, updatedRoute) => {
      await queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.setQueryData(
        ['routes'],
        (oldData: ManageRoutesValues[] | undefined) => {
          if (!oldData) return [];
          return oldData.map(route =>
            route.id === updatedRoute.id ? updatedRoute : route
          );
        }
      );

      toast.success('Route updated successfully');
    },
    onError: error => {
      console.error('Error updating route:', error);
      toast.error('Failed to update route');
    },
  });
};
