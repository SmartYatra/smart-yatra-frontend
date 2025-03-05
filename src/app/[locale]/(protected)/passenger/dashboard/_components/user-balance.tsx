'use client';
import { Wallet } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetBalance } from '../_hooks/useGetBalance';

const UserBalance = () => {
  const { data, isLoading, error } = useGetBalance();

  const balance = Number(data);

  if (error) {
    return (
      <Card className='w-full bg-destructive/10 2xl:max-w-3xl'>
        <CardContent className='pt-6'>
          <p className='text-center text-destructive'>
            Error loading balance. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full overflow-hidden 2xl:max-w-3xl'>
      <CardHeader className='bg-primary/90 pb-4 text-primary-foreground'>
        <CardTitle className='flex items-center text-xl font-semibold'>
          <Wallet className='mr-2 size-6 stroke-2' />
          Your Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        {isLoading ? (
          <Skeleton className='h-12 w-3/4' />
        ) : (
          <div className='flex items-baseline'>
            <span className='text-2xl font-bold md:text-4xl'>
              Rs. {balance?.toFixed(2)}
            </span>
            <span className='ml-2 text-sm text-muted-foreground'>
              Available
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserBalance;
