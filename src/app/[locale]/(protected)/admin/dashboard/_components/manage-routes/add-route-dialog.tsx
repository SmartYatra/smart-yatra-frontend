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

import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

interface IAddRouteDialogProps {
  onAdd: (data: ManageRoutesValues) => void;
}

const AddRouteDialog = ({ onAdd }: IAddRouteDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant={'secondary'}>
        <Plus className='mr-2 h-4 w-4' /> Add New Route
      </Button>
    </DialogTrigger>
    <DialogContent className='max-w-3xl'>
      <DialogHeader>
        <DialogTitle>Add New Route</DialogTitle>
      </DialogHeader>
      <RouteForm onSubmit={onAdd} />
    </DialogContent>
  </Dialog>
);

export default AddRouteDialog;
