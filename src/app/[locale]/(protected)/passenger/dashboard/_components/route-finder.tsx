'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChevronDown, ChevronUp, Map, MapPin, Route } from 'lucide-react';

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
    <Card className='mx-auto w-full max-w-3xl'>
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

interface IRouteCardProps {
  route: {
    route: { id: number; name: string };
    segment: {
      id: number;
      name: string;
      location_lat: string;
      location_lng: string;
      created_at: string;
      updated_at: string;
      geohash: string | null;
      pivot?: { route_id: number; stop_id: number; order: number } | undefined;
    }[];
    distance: number;
    fare: number | string;
  };
  expandedRoute: number | null;
  setExpandedRoute: (routeId: number | null) => void;
  handleViewSpecificRouteOnMap: (routeId: number) => void;
}

const RouteCard = ({
  route,
  expandedRoute,
  setExpandedRoute,
  handleViewSpecificRouteOnMap,
}: IRouteCardProps) => {
  const isExpanded = expandedRoute === route.route.id;

  return (
    <Card className='overflow-hidden'>
      <CardHeader
        className='flex cursor-pointer flex-row items-center justify-between bg-muted px-4 py-3 hover:bg-muted/70'
        onClick={() => setExpandedRoute(isExpanded ? null : route.route.id)}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex items-center space-x-2'>
            <Route className='h-5 w-5 text-blue-500' />
            <CardTitle className='text-muted-foreground'>
              {route.route.name}
            </CardTitle>
          </div>
          <CardDescription>
            <span className='text-secondary-foreground'>Distance:</span>{' '}
            {route.distance.toFixed(3)} km |{' '}
            <span className='text-secondary-foreground'>Fare:</span> Rs.{' '}
            {typeof route.fare === 'string'
              ? route.fare
              : route.fare.toFixed(2)}
          </CardDescription>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            size='sm'
            variant='ghost'
            onClick={e => {
              e.stopPropagation();
              handleViewSpecificRouteOnMap(route.route.id);
            }}
          >
            <Map className='mr-2 h-4 w-4' />
            View on Map
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={e => {
              e.stopPropagation();
              setExpandedRoute(isExpanded ? null : route.route.id);
            }}
          >
            {isExpanded ? (
              <ChevronUp className='h-5 w-5' />
            ) : (
              <ChevronDown className='h-5 w-5' />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className='px-6 py-4'>
          <ol className='relative border-l border-gray-200 dark:border-gray-700'>
            {route.segment.map(stop => (
              <li className='mb-10 ml-6' key={stop.id}>
                <span className='absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900'>
                  <MapPin className='h-3 w-3 text-blue-800 dark:text-blue-300' />
                </span>
                <h3 className='mb-1 font-semibold text-gray-900 dark:text-white'>
                  {stop.name}
                </h3>
              </li>
            ))}
          </ol>
        </CardContent>
      )}
    </Card>
  );
};

export default function RouteFinderWithSuspense() {
  return (
    <Suspense fallback={<RouteFinderSkeleton />}>
      <RouteFinder />
    </Suspense>
  );
}
