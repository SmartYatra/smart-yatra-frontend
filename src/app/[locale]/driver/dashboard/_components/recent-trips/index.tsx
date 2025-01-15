import React from 'react';

import { columns, Trip } from './columns';
import { DataTable } from './data-table';

const RecentTrips = () => {
  // Sample data for recent trips
  const data: Trip[] = [
    {
      id: '1',
      route: 'Kathmandu to Bhaktapur',
      passengers: 30,
      earnings: 3000,
      status: 'Completed',
    },
    {
      id: '2',
      route: 'Patan to Kathmandu',
      passengers: 25,
      earnings: 2500,
      status: 'Ongoing',
    },
    {
      id: '3',
      route: 'Bhaktapur to Lalitpur',
      passengers: 40,
      earnings: 4000,
      status: 'Completed',
    },
    {
      id: '4',
      route: 'Kathmandu to Pokhara',
      passengers: 20,
      earnings: 2000,
      status: 'Scheduled',
    },
    {
      id: '5',
      route: 'Kathmandu to Bhaktapur',
      passengers: 30,
      earnings: 3000,
      status: 'Completed',
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default RecentTrips;
