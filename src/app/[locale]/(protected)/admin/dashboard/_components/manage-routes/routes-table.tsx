import { Dispatch, SetStateAction } from 'react';

import { Edit, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

interface RoutesTableProps {
  routes: ManageRoutesValues[];
  onEdit: (route: ManageRoutesValues) => void;
  onDelete: Dispatch<
    SetStateAction<{ id: string | number; name: string } | null>
  >;
}

const RoutesTable: React.FC<RoutesTableProps> = ({
  routes,
  onEdit,
  onDelete,
}) => (
  <div className='overflow-hidden'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Route Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Distance (km)</TableHead>
          <TableHead>Duration (min)</TableHead>
          <TableHead>Stops</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routes.map(route => (
          <TableRow key={route.id}>
            <TableCell className='font-medium'>{route.name}</TableCell>
            <TableCell>
              <Badge
                className='min-w-16 capitalize'
                variant={route.status === 'active' ? 'success' : 'destructive'}
              >
                {route.status}
              </Badge>
            </TableCell>
            <TableCell>{route.distance} km</TableCell>
            <TableCell>{route.duration} min</TableCell>
            <TableCell>
              {/* Displaying the number of stops */}
              {route.stops.length} Stops
            </TableCell>
            <TableCell>
              <div className='flex gap-2'>
                <Button
                  aria-label={`Edit route: ${route.name}`}
                  size='icon'
                  variant='ghost'
                  onClick={() => onEdit(route)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  aria-label={`Delete route: ${route.name}`}
                  size='icon'
                  variant='ghost'
                  onClick={() => onDelete({ id: route.id, name: route.name })}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default RoutesTable;
