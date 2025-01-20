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
  onEdit,
}: {
  route: ManageRoutesValues | null;
  onClose: () => void;
  onEdit: (updatedRoute: ManageRoutesValues) => void;
}) => (
  <Dialog open={!!route} onOpenChange={onClose}>
    <DialogContent className='max-h-[calc(100vh-96px)] max-w-3xl overflow-y-auto'>
      <DialogHeader>
        <DialogTitle>Edit Route</DialogTitle>
      </DialogHeader>
      {route && <RouteForm initialData={route} onSubmit={onEdit} />}
    </DialogContent>
  </Dialog>
);

export default EditRouteDialog;
