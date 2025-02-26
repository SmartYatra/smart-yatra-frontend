'use client';

import { useState } from 'react';
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

import { useFetchShortestRoutes } from '../_hooks/useFetchShortestRoute';
import { useFetchStops } from '../_hooks/useFetchStops';

export default function RouteFinder() {
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
    data: routesData,
    isLoading: routeLoading,
    error: routeError,
    refetch: fetchShortestRoute,
  } = useFetchShortestRoutes({
    start_stop_id: startStop,
    end_stop_id: endStop,
  });

  const STOPS = stopsData?.stops || [];
  const ROUTES = routesData?.shortest_route || [];

  const handleFindRoute = async () => {
    if (startStop !== undefined && endStop !== undefined) {
      await fetchShortestRoute();
    }
  };

  const handleViewAllRoutesOnMap = () => {
    // const routeIds = ROUTES.map(route => route.routeId).join(',');

    const routeIds = [5, 6].join(',');
    router.push(`/passenger/live-map?routes=${routeIds}`);
  };

  const handleViewSpecificRouteOnMap = (routeId: number) => {
    router.push(`/passenger/live-map?routes=${routeId}`);
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

        {routeLoading && <p>Loading routes...</p>}
        {routeError && (
          <p className='text-sm text-red-500'>Error: {routeError.message}</p>
        )}

        {/* Minimal Route Display */}
        {ROUTES.length > 0 && (
          <div className='mt-6 space-y-6'>
            <h2 className='text-xl font-semibold'>Available Routes</h2>
            <Button
              className='w-full'
              variant='outline'
              onClick={handleViewAllRoutesOnMap}
            >
              <Map className='mr-2 h-4 w-4' />
              View All Routes on Map
            </Button>
            {ROUTES.map((route, index) => {
              const isExpanded = expandedRoute === index;

              return (
                <Card className='overflow-hidden' key={index}>
                  <CardHeader
                    className='flex cursor-pointer flex-row items-center justify-between bg-muted px-4 py-3 hover:bg-muted/70'
                    onClick={() => setExpandedRoute(isExpanded ? null : index)}
                  >
                    <div className='flex items-center space-x-2'>
                      <Route className='h-5 w-5 text-blue-500' />
                      <CardTitle className='text-muted-foreground'>
                        {route.route}
                      </CardTitle>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={e => {
                          e.stopPropagation();
                          // handleViewSpecificRouteOnMap(route.routeId);
                          handleViewSpecificRouteOnMap(5);
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
                          setExpandedRoute(isExpanded ? null : index);
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
                            <h3 className='mb-1 flex items-center font-semibold text-gray-900 dark:text-white'>
                              {stop.name}
                            </h3>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
