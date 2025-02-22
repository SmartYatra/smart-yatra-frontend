import { useState } from 'react';

import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { RouteForm } from './route-form';

import { useEditRoute } from '../../_hooks/useEditRoute';
import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

const EditRouteDialog = ({ route }: { route: ManageRoutesValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: editRoute, isPending } = useEditRoute();

  // Function to handle updating a route
  const handleEditRoute = (updatedRoute: ManageRoutesValues) => {
    editRoute(updatedRoute, { onSuccess: () => setIsOpen(false) });
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label={`Edit route: ${route.name}`}
          size='icon'
          variant='ghost'
          onClick={() => setIsOpen(true)}
        >
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Edit Route</DialogTitle>
        </DialogHeader>
        <RouteForm
          initialData={route}
          isLoading={isPending}
          onSubmit={handleEditRoute}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditRouteDialog;
