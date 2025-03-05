'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Map, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { RouteCard } from './route-card';
import RouteFinderSkeleton from './route-finder-skeleton';

import { useFetchShortestRoutes } from '../_hooks/useFetchShortestRoute';
import { useFetchStops } from '../_hooks/useFetchStops';
import { useGetAllPossibleRoutes } from '../_hooks/useGetAllPossibleRoutes';

function RouteFinder() {
  const [startStop, setStartStop] = useState<number>();
  const [endStop, setEndStop] = useState<number>();
  const [expandedRoute, setExpandedRoute] = useState<number | null>(null);
  const router = useRouter();

  const {
    data: stopsData,
    isLoading: stopsLoading,
    error: stopsError,
  } = useFetchStops();

  const {
    data: SHORTEST_ROUTES = [],
    isLoading: shortestRouteLoading,
    error: shortestRouteError,
    refetch: fetchShortestRoute,
  } = useFetchShortestRoutes({
    start_stop_id: startStop,
    end_stop_id: endStop,
  });

  const {
    data: ALL_ROUTES = [],
    isLoading: allRoutesLoading,
    error: allRoutesError,
    refetch: fetchAllPossibleRoutes,
  } = useGetAllPossibleRoutes({
    startStopId: startStop,
    endStopId: endStop,
  });

  const STOPS = stopsData?.stops || [];

  const handleFindRoute = async () => {
    if (startStop !== undefined && endStop !== undefined) {
      await Promise.all([fetchShortestRoute(), fetchAllPossibleRoutes()]);
    }
  };

  const handleViewAllRoutesOnMap = () => {
    if (startStop !== undefined && endStop !== undefined) {
      router.push(
        `/passenger/live-map?startStop=${startStop}&endStop=${endStop}&allRoutes=true`
      );
    }
  };

  // For viewing a specific route, you can pass just the stop IDs.
  // The LiveMap can then use useFetchShortestRoutes to display the shortest route.
  const handleViewSpecificRouteOnMap = () => {
    if (startStop !== undefined && endStop !== undefined) {
      router.push(
        `/passenger/live-map?startStop=${startStop}&endStop=${endStop}`
      );
    }
  };

  return (
    <Card className='w-full xl:max-w-3xl'>
      <CardHeader>
        <CardTitle>Find Shortest Route</CardTitle>
        <CardDescription>
          Select your start and end stops to find the best route.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {stopsLoading && <p>Loading stops...</p>}
        {stopsError && (
          <p className='text-sm text-red-500'>Error: {stopsError.message}</p>
        )}

        {/* Dropdowns */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium' htmlFor='start-stop'>
              Start Stop
            </label>
            <Select onValueChange={value => setStartStop(Number(value))}>
              <SelectTrigger id='start-stop'>
                <SelectValue placeholder='Select start stop' />
              </SelectTrigger>
              <SelectContent>
                {STOPS.map(stop => (
                  <SelectItem key={stop.id} value={stop.id.toString()}>
                    <div className='flex items-center'>
                      <MapPin className='mr-2 h-4 w-4' /> {stop.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium' htmlFor='end-stop'>
              End Stop
            </label>
            <Select onValueChange={value => setEndStop(Number(value))}>
              <SelectTrigger id='end-stop'>
                <SelectValue placeholder='Select end stop' />
              </SelectTrigger>
              <SelectContent>
                {STOPS.map(stop => (
                  <SelectItem key={stop.id} value={stop.id.toString()}>
                    <div className='flex items-center'>
                      <MapPin className='mr-2 h-4 w-4' /> {stop.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className='w-full'
          disabled={startStop === undefined || endStop === undefined}
          onClick={handleFindRoute}
        >
          Find Route
        </Button>

        {(shortestRouteLoading || allRoutesLoading) && <p>Loading routes...</p>}
        {shortestRouteError && (
          <p className='text-sm text-red-500'>
            Error: {shortestRouteError.message}
          </p>
        )}
        {allRoutesError && (
          <p className='text-sm text-red-500'>
            Error: {allRoutesError.message}
          </p>
        )}

        {/* Display Routes */}
        {SHORTEST_ROUTES.length === 0 && ALL_ROUTES.length === 0 ? (
          <p className='text-center text-sm text-gray-500'>No routes found.</p>
        ) : (
          <div className='mt-6 space-y-6'>
            <h2 className='text-xl font-semibold'>Available Routes</h2>

            {/* Show the "View All Routes on Map" button only when there are any routes*/}
            {(SHORTEST_ROUTES.length > 0 || ALL_ROUTES.length > 0) && (
              <Button
                className='w-full'
                variant='outline'
                onClick={handleViewAllRoutesOnMap}
              >
                <Map className='mr-2 h-4 w-4' />
                View All Routes on Map
              </Button>
            )}
            {/* Shortest Route */}
            {SHORTEST_ROUTES.length > 0 && (
              <>
                <h3 className='text-lg font-medium'>Shortest Route</h3>
                {SHORTEST_ROUTES.map((route, index) => (
                  <RouteCard
                    expandedRoute={expandedRoute}
                    handleViewSpecificRouteOnMap={handleViewSpecificRouteOnMap}
                    key={index}
                    route={route}
                    setExpandedRoute={setExpandedRoute}
                  />
                ))}
              </>
            )}
            {/* All Possible Routes */}
            {ALL_ROUTES.length > 0 && (
              <>
                <h3 className='text-lg font-medium'>All Possible Routes</h3>
                {ALL_ROUTES.map((route, index) => (
                  <RouteCard
                    expandedRoute={expandedRoute}
                    handleViewSpecificRouteOnMap={handleViewSpecificRouteOnMap}
                    key={index}
                    route={route}
                    setExpandedRoute={setExpandedRoute}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function RouteFinderWithSuspense() {
  return (
    <Suspense fallback={<RouteFinderSkeleton />}>
      <RouteFinder />
    </Suspense>
  );
}
