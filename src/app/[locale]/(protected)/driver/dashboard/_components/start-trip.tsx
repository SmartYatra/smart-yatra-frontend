'use client';

import { Check, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useFetchRouteById } from '../../../admin/dashboard/_hooks/useFetchRouteById';
import { useEndTrip } from '../_hooks/useEndTrip';
import { useGetYourBus } from '../_hooks/useGetYourBus';
import { useStartTrip } from '../_hooks/useStartTrip';
import { useTripStatus } from '../_hooks/useTripStatus';

export function StartTrip() {
  const { data, isPending: isBusLoading } = useGetYourBus();
  const { data: routeData, isPending: isRouteLoading } = useFetchRouteById({
    id: data?.route_id || null,
  });
  const { data: tripStatus, isLoading: isTripLoading } = useTripStatus();
  const { mutate: startTrip, isPending: isStarting } = useStartTrip({
    routeId: data?.route_id || null,
  });
  const { mutate: endTrip, isPending: isEnding } = useEndTrip();

  const handleStartTrip = () => startTrip();
  const handleEndTrip = () => endTrip();

  if (isBusLoading || isRouteLoading || isTripLoading) {
    return (
      <Card className='mt-8 size-full'>
        <CardHeader className='rounded-t-lg bg-primary/5'>
          <Badge className='mb-2 w-fit' variant='outline'>
            Loading Route Data
          </Badge>
          <Skeleton className='h-6' />
          <Skeleton className='h-4' />
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='mb-4 flex items-center gap-2 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <Check className='h-4 w-4 text-green-500' />
            <Skeleton className='h-4 w-40' />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className='h-10 w-full' />
        </CardFooter>
      </Card>
    );
  }

  // Check if there is an active trip
  const isTripActive =
    tripStatus?.success && tripStatus?.data?.status === 'in_progress';

  return (
    <section className='mt-8 flex size-full flex-1 flex-col gap-6'>
      {isTripActive ? (
        <Card className='flex size-full flex-col'>
          <CardHeader className='rounded-t-lg bg-primary/5'>
            <Badge className='mb-2 w-fit' variant='outline'>
              Active Trip
            </Badge>
            <CardTitle>{routeData?.name}</CardTitle>
            <CardDescription>
              Started at{' '}
              {new Date(tripStatus?.data.start_time).toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 pt-6'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <span>{routeData?.stops?.length} stops</span>
            </div>

            {/* Estimated duration */}
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <span>Estimated duration: {routeData?.duration} min</span>
            </div>

            <div className='flex items-center gap-2 text-sm font-medium'>
              <Check className='h-4 w-4 text-green-500' />
              <span>Trip in progress</span>
            </div>
          </CardContent>
          <CardFooter className='flex-1 items-end'>
            <Button
              className='w-full'
              disabled={isEnding}
              isLoading={isEnding}
              variant='destructive'
              onClick={handleEndTrip}
            >
              {isEnding ? 'Ending Trip...' : 'End Trip'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Assigned Route</CardTitle>
            <CardDescription>
              {`Start your trip when you're ready to depart`}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='rounded-lg border bg-muted/50 p-4'>
              <div className='flex flex-col items-start justify-between'>
                <h3 className='text-lg font-medium'>{routeData?.name}</h3>
                <p>{routeData?.description}</p>
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                  <span>
                    {routeData?.stops?.length} stops • Est.{' '}
                    {routeData?.duration} min
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              disabled={isStarting}
              isLoading={isStarting}
              onClick={handleStartTrip}
            >
              {isStarting ? 'Starting Trip...' : 'Start Trip'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
