import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { RouteForm } from './route-form';

import { useAddRoute } from '../../_hooks/useAddRoute';
import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

const AddRouteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addRoute, isPending } = useAddRoute();

  // Function to handle adding a new route
  const handleAddRoute = (
    newRoute: ManageRoutesValues,
    reset: UseFormReset<ManageRoutesValues>
  ) => {
    addRoute(newRoute, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>
          <Plus className='mr-2 h-4 w-4' /> Add New Route
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
        </DialogHeader>
        <RouteForm isLoading={isPending} onSubmit={handleAddRoute} />
      </DialogContent>
    </Dialog>
  );
};

export default AddRouteDialog;
