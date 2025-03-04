import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const RouteFinderSkeleton = () => {
  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-1/3' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-2/3' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-4 w-full' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </CardContent>
    </Card>
  );
};

export default RouteFinderSkeleton;
