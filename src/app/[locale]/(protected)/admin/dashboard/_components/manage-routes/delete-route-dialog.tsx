'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDeleteRoute } from '../../_hooks/useDeleteRoute';

interface DeleteRouteDialogProps {
  routeId: number | string | null;
  routeName?: string;
  onClose: () => void;
}

export default function DeleteRouteDialog({
  routeId,
  routeName,
  onClose,
}: DeleteRouteDialogProps) {
  const [loading, setLoading] = useState(false);
  const { mutate: deleteRoute } = useDeleteRoute();

  const handleDelete = () => {
    if (!routeId) return;
    setLoading(true);
    deleteRoute(routeId, {
      onSuccess: () => {
        setLoading(false);
        onClose();
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <Dialog open={!!routeId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Route</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete the route &quot;
          <strong>{routeName}</strong>&quot;?
        </p>
        <DialogFooter>
          <Button disabled={loading} variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            isLoading={loading}
            variant='destructive'
            onClick={handleDelete}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
