import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManageRoutesValues } from '../_schema/manage-routes.schema';

export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (routeId: number | string) => {
      await api.delete(`/routes/${routeId}`);
      return routeId;
    },
    onSuccess: async (_, routeId) => {
      await queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.setQueryData(
        ['routes'],
        (oldData: ManageRoutesValues[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter(route => route.id !== routeId);
        }
      );
    },
    onError: error => {
      console.error('Error deleting route:', error);
    },
  });
};
