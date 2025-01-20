'use client';

import { useState } from 'react';

import { Filter, Search } from 'lucide-react';

import { DashboardTitle } from '@/components/dashboard-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AddRouteDialog from './add-route-dialog';
import DeleteRouteDialog from './delete-route-dialog';
import EditRouteDialog from './edit-route-dialog';
import RoutesTable from './routes-table';

import { useAddRoute } from '../../_hooks/useAddRoute';
import { useEditRoute } from '../../_hooks/useEditRoute';
import { useFetchRouteById } from '../../_hooks/useFetchRouteById';
import { useFetchRoutes } from '../../_hooks/useFetchRoutes';
import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

const initialRoutes: ManageRoutesValues[] = [
  {
    id: 1,
    name: 'Ratnapark - Kalanki',
    description: 'A busy route connecting Ratnapark to Kalanki.',
    status: 'inactive',
    distance: 12.5,
    duration: 30,
    stops: [
      {
        name: 'Ratnapark',
        location_lat: '27.7101',
        location_lng: '85.2913',
        order: 1,
      },
      {
        name: 'Thamel',
        location_lat: '27.7152',
        location_lng: '85.3000',
        order: 2,
      },
      {
        name: 'Basantapur',
        location_lat: '27.7106',
        location_lng: '85.2918',
        order: 3,
      },
      {
        name: 'Kalanki',
        location_lat: '27.6727',
        location_lng: '85.2824',
        order: 4,
      },
    ],
  },
  {
    id: 2,
    name: 'Lagankhel - Budhanilkantha',
    description:
      'Connecting Lagankhel with the north of Kathmandu, passing through key areas.',
    status: 'active',
    distance: 14.3,
    duration: 35,
    stops: [
      {
        name: 'Lagankhel',
        location_lat: '27.6553',
        location_lng: '85.3365',
        order: 1,
      },
      {
        name: 'Jawalakhel',
        location_lat: '27.6534',
        location_lng: '85.3372',
        order: 2,
      },
      {
        name: 'Sanepa',
        location_lat: '27.6555',
        location_lng: '85.3307',
        order: 3,
      },
      {
        name: 'Budhanilkantha',
        location_lat: '27.7130',
        location_lng: '85.3350',
        order: 4,
      },
    ],
  },
  {
    id: 3,
    name: 'Gongabu - Sankhu',
    description:
      'This route connects Gongabu to the northern region of Kathmandu.',
    status: 'active',
    distance: 18.2,
    duration: 40,
    stops: [
      {
        name: 'Gongabu',
        location_lat: '27.7117',
        location_lng: '85.3006',
        order: 1,
      },
      {
        name: 'Budanilkantha',
        location_lat: '27.7130',
        location_lng: '85.3350',
        order: 2,
      },
      {
        name: 'Sankhu',
        location_lat: '27.7234',
        location_lng: '85.4627',
        order: 3,
      },
    ],
  },
  {
    id: 4,
    name: 'Koteshwor - Balaju',
    description: 'A route linking Koteshwor to the industrial area of Balaju.',
    status: 'active',
    distance: 10.8,
    duration: 25,
    stops: [
      {
        name: 'Koteshwor',
        location_lat: '27.6622',
        location_lng: '85.3742',
        order: 1,
      },
      {
        name: 'Chabahil',
        location_lat: '27.7063',
        location_lng: '85.3430',
        order: 2,
      },
      {
        name: 'Balaju',
        location_lat: '27.6900',
        location_lng: '85.2711',
        order: 3,
      },
    ],
  },
  {
    id: 5,
    name: 'Satdobato - Maharajgunj',
    description:
      'This route connects the south of the valley with the central regions.',
    status: 'active',
    distance: 16.4,
    duration: 38,
    stops: [
      {
        name: 'Satdobato',
        location_lat: '27.6021',
        location_lng: '85.3405',
        order: 1,
      },
      {
        name: 'Lalitpur',
        location_lat: '27.5926',
        location_lng: '85.3429',
        order: 2,
      },
      {
        name: 'Maharajgunj',
        location_lat: '27.7144',
        location_lng: '85.3097',
        order: 3,
      },
    ],
  },
];

const ManageRoutes = () => {
  const [editingRoute, setEditingRoute] = useState<ManageRoutesValues | null>(
    null
  );
  const [deletingRoute, setDeletingRoute] = useState<{
    id: number | string;
    name: string;
  } | null>(null);

  const { data: routes } = useFetchRoutes();
  const { data: route } = useFetchRouteById({ id: 1 });

  const { mutate: addRoute } = useAddRoute();
  const { mutate: editRoute } = useEditRoute();

  console.log('routes', routes.data);
  console.log('route', route.data);

  // Function to handle adding a new route
  const handleAddRoute = (newRoute: ManageRoutesValues) => {
    addRoute(newRoute);
  };

  // Function to handle updating a route
  const handleEditRoute = (updatedRoute: ManageRoutesValues) => {
    editRoute(updatedRoute, { onSuccess: () => setEditingRoute(null) });
  };

  return (
    <div>
      <header className='mb-8 flex items-center justify-between'>
        <DashboardTitle>Manage Routes</DashboardTitle>
        <AddRouteDialog onAdd={handleAddRoute} />
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

      <RoutesTable
        routes={initialRoutes}
        onDelete={setDeletingRoute}
        onEdit={setEditingRoute}
      />

      <EditRouteDialog
        route={editingRoute}
        onClose={() => setEditingRoute(null)}
        onEdit={handleEditRoute}
      />

      <DeleteRouteDialog
        routeId={deletingRoute?.id || null}
        routeName={deletingRoute?.name}
        onClose={() => setDeletingRoute(null)}
      />
    </div>
  );
};

export default ManageRoutes;
