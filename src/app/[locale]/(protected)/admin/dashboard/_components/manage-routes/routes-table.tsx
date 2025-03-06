import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import DeleteRouteDialog from './delete-route-dialog';
import EditRouteDialog from './edit-route-dialog';

import { IRoute } from '../../_hooks/useFetchRoutes';

interface RoutesTableProps {
  routes: IRoute[];
  searchQuery: string;
}

const RoutesTable: React.FC<RoutesTableProps> = ({ routes, searchQuery }) => {
  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
          {filteredRoutes.map(route => (
            <TableRow key={route.id}>
              <TableCell className='font-medium'>{route.name}</TableCell>
              <TableCell>
                <Badge
                  className='min-w-16 capitalize'
                  variant={
                    route.status === 'active' ? 'success' : 'destructive'
                  }
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
                  <EditRouteDialog
                    route={{
                      id: route.id,
                      name: route.name,
                      distance: route.distance,
                      description: route.description,
                      duration: route.duration,
                      status: route.status,
                      stops: route.stops.map(stop => ({
                        name: stop.name,
                        location_lat: stop.location_lat,
                        location_lng: stop.location_lng,
                        order: stop.pivot.order,
                      })),
                    }}
                  />

                  <DeleteRouteDialog
                    routeId={route.id}
                    routeName={route.name}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoutesTable;
