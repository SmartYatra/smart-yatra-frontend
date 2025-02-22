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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['routes'] });
      toast.success('Route updated successfully');
    },
    onError: error => {
      console.error('Error updating route:', error);
      toast.error('Failed to update route');
    },
  });
};
