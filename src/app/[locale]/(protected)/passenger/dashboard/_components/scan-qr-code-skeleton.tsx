import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ScanQRCodeSkeleton = () => {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <Skeleton className='h-6 w-1/3' />
          <Skeleton className='h-6 w-6' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-2/3' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </CardContent>
    </Card>
  );
};

export default ScanQRCodeSkeleton;
