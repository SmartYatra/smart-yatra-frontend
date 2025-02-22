'use client';

import { Filter, Search } from 'lucide-react';

import { DashboardTitle } from '@/components/dashboard-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AddRouteDialog from './add-route-dialog';
import RoutesTable from './routes-table';

// import { useFetchRouteById } from '../../_hooks/useFetchRouteById';
import { useFetchRoutes } from '../../_hooks/useFetchRoutes';

const ManageRoutes = () => {
  const { data: routes } = useFetchRoutes();
  // const { data: route } = useFetchRouteById({ id: 1 });

  return (
    <div>
      <header className='mb-8 flex items-center justify-between'>
        <DashboardTitle>Manage Routes</DashboardTitle>
        <AddRouteDialog />
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

      <RoutesTable routes={routes.data} />
    </div>
  );
};

export default ManageRoutes;
