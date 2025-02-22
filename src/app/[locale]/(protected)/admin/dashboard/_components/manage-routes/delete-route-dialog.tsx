'use client';

import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useDeleteRoute } from '../../_hooks/useDeleteRoute';

interface DeleteRouteDialogProps {
  routeId: number | string;
  routeName: string;
}

export default function DeleteRouteDialog({
  routeId,
  routeName,
}: DeleteRouteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteRoute, isPending } = useDeleteRoute();

  const handleDelete = () => {
    deleteRoute(routeId, { onSuccess: () => setIsOpen(false) });
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label={`Delete route: ${routeName}`}
          size='icon'
          variant='ghost'
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Route</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete the route &quot;
          <strong>{routeName}</strong>&quot;?
        </p>
        <DialogFooter>
          <Button
            disabled={isPending}
            variant='outline'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            isLoading={isPending}
            variant='destructive'
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
