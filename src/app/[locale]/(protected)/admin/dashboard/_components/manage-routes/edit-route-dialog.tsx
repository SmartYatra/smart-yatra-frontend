import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RouteForm } from './route-form';

import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

const EditRouteDialog = ({
  route,
  onClose,
  onUpdate,
}: {
  route: ManageRoutesValues | null;
  onClose: () => void;
  onUpdate: (updatedRoute: ManageRoutesValues) => void;
}) => (
  <Dialog open={!!route} onOpenChange={onClose}>
    <DialogContent className='max-w-3xl'>
      <DialogHeader>
        <DialogTitle>Edit Route</DialogTitle>
      </DialogHeader>
      {route && <RouteForm initialData={route} onSubmit={onUpdate} />}
    </DialogContent>
  </Dialog>
);

export default EditRouteDialog;
