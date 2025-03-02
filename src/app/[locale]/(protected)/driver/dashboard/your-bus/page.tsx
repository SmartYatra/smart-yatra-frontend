import React, { Suspense } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import YourBus from '../_components/your-bus/your-bus';

const YourBusPage = () => {
  return (
    <Suspense fallback={<BusCardSkeleton />}>
      <YourBus />
    </Suspense>
  );
};

export default YourBusPage;

export const BusCardSkeleton = () => (
  <Card className='mx-auto w-full max-w-2xl'>
    <CardHeader>
      <CardTitle>
        <Skeleton className='h-6 w-32' />
      </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      {[...Array(6)].map((_, i) => (
        <Skeleton className='h-4 w-full' key={i} />
      ))}
    </CardContent>
  </Card>
);
