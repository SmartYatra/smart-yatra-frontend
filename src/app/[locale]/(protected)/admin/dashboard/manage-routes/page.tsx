'use client';

import { useState } from 'react';

import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react';

import { DashboardTitle } from '@/components/dashboard-components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RouteForm } from '../_components/manage-routes/route-form';
import { ManageRoutesValues } from '../_schema/manage-routes.schema';

// Mock data for routes
const routes: ManageRoutesValues[] = [
  {
    id: 1,
    name: 'Ratnapark - Kalanki',
    type: 'Bus',
    stops: 15,
    frequency: '10 min',
  },
  {
    id: 2,
    name: 'Lagankhel - Budhanilkantha',
    type: 'Micro',
    stops: 20,
    frequency: '15 min',
  },
  {
    id: 3,
    name: 'Gongabu - Sankhu',
    type: 'Tempo',
    stops: 12,
    frequency: '20 min',
  },
  {
    id: 4,
    name: 'Koteshwor - Balaju',
    type: 'Bus',
    stops: 18,
    frequency: '12 min',
  },
  {
    id: 5,
    name: 'Satdobato - Maharajgunj',
    type: 'Micro',
    stops: 22,
    frequency: '18 min',
  },
];

export default function ManageRoutes() {
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<ManageRoutesValues | null>(
    null
  );

  const handleAddRoute = (newRoute: ManageRoutesValues) => {
    console.log('Adding new route:', newRoute);
    setIsAddRouteOpen(false);
  };

  const handleEditRoute = (route: ManageRoutesValues) => {
    setEditingRoute(route);
  };

  const handleUpdateRoute = (updatedRoute: ManageRoutesValues) => {
    console.log('Updating route:', updatedRoute);
    setEditingRoute(null);
  };

  const handleDeleteRoute = (routeId: string | number) => {
    console.log('Deleting route:', routeId);
  };

  return (
    <div>
      <header className='mb-8 flex items-center justify-between'>
        <DashboardTitle>Manage Routes</DashboardTitle>
        <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
          <DialogTrigger asChild>
            <Button variant={'secondary'}>
              <Plus className='mr-2 h-4 w-4' /> Add New Route
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
            </DialogHeader>
            <RouteForm onSubmit={handleAddRoute} />
          </DialogContent>
        </Dialog>
      </header>

      <div className='mb-6 flex justify-between gap-4'>
        <Input
          className='w-full min-w-96'
          leftIcon={Search}
          placeholder='Search routes...'
        />
        <Button variant='outline'>
          <Filter className='mr-2 h-4 w-4' /> Filter
        </Button>
      </div>

      <div className='overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map(route => (
              <TableRow key={route.id}>
                <TableCell className='font-medium'>{route.name}</TableCell>
                <TableCell>
                  <Badge className='min-w-16' variant='outline'>
                    {route.type}
                  </Badge>
                </TableCell>
                <TableCell>{route.stops}</TableCell>
                <TableCell>{route.frequency}</TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handleEditRoute(route)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handleDeleteRoute(route.id)}
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

      {editingRoute && (
        <Dialog
          open={!!editingRoute}
          onOpenChange={() => setEditingRoute(null)}
        >
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Route</DialogTitle>
            </DialogHeader>
            <RouteForm
              initialData={editingRoute}
              onSubmit={handleUpdateRoute}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
