'use client';

import React from 'react';

import { DollarSign, MapPin, Users } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

import StatsCard from './stats-card';

import { useTripStatus } from '../_hooks/useTripStatus';

const DriverStats = () => {
  const { data, isLoading, error } = useTripStatus();

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {[...Array(4)].map((_, index) => (
          <div
            className='rounded-lg bg-gray-200 p-4 dark:bg-gray-700'
            key={index}
          >
            <Skeleton className='mb-2 h-6 w-3/4' />
            <Skeleton className='h-8 w-1/2' />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className='text-center text-red-500'>Error loading trip data</p>;
  }

  const {
    total_fare_collected,
    current_passenger_count,
    total_passenger_count,
    distance_traveled,
  } = data?.data || {};

  const stats = [
    {
      id: 1,
      title: 'Total Balance',
      value: `Rs. ${total_fare_collected || '0'}`,
      Icon: DollarSign,
    },
    {
      id: 2,
      title: 'Current Passengers',
      value: current_passenger_count || 0,
      Icon: Users,
    },
    {
      id: 3,
      title: 'Total Passengers',
      value: total_passenger_count || 0,
      Icon: Users,
    },
    {
      id: 4,
      title: 'Distance Traveled',
      value: `${distance_traveled || '0 km'}`,
      Icon: MapPin,
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map(stat => (
        <StatsCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};

export default DriverStats;
