'use client';

import { useState } from 'react';

import { Filter, Search } from 'lucide-react';

import { DashboardTitle } from '@/components/dashboard-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AddRouteDialog from './add-route-dialog';
import RoutesTable from './routes-table';

import { useFetchRoutes } from '../../_hooks/useFetchRoutes';

const ManageRoutes = () => {
  const { data: routes } = useFetchRoutes();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant='outline'>
          <Filter className='mr-2 h-4 w-4' /> Filter
        </Button>
      </div>

      <RoutesTable routes={routes.data} searchQuery={searchQuery} />
    </div>
  );
};

export default ManageRoutes;
