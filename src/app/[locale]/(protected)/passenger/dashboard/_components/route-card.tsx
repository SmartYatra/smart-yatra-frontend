import { ChevronDown, ChevronUp, Map, MapPin, Route } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

export const RouteCard = ({
  route,
  expandedRoute,
  setExpandedRoute,
  handleViewSpecificRouteOnMap,
}: IRouteCardProps) => {
  const isExpanded = expandedRoute === route.route.id;

  return (
    <Card className='overflow-hidden'>
      <CardHeader
        className='flex cursor-pointer flex-col space-y-3 bg-muted px-4 py-3 hover:bg-muted/70 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'
        onClick={() => setExpandedRoute(isExpanded ? null : route.route.id)}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex items-center space-x-2'>
            <Route className='h-5 w-5 text-blue-500' />
            <CardTitle className='text-sm text-muted-foreground sm:text-base'>
              {route.route.name}
            </CardTitle>
          </div>
          <CardDescription className='text-xs sm:text-sm'>
            <span className='text-secondary-foreground'>Distance:</span>{' '}
            {route.distance} km |{' '}
            <span className='text-secondary-foreground'>Fare:</span> Rs.{' '}
            {route.fare}
          </CardDescription>
        </div>

        <div className='flex items-center justify-between sm:space-x-2'>
          <Button
            className='h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
            size='sm'
            variant='ghost'
            onClick={e => {
              e.stopPropagation();
              handleViewSpecificRouteOnMap(route.route.id);
            }}
          >
            <Map className='mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4' />
            <span className='xs:inline hidden'>View on Map</span>
            <span className='xs:hidden'>Map</span>
          </Button>
          <Button
            className='h-8 w-8 sm:h-9 sm:w-9'
            size='icon'
            variant='ghost'
            onClick={e => {
              e.stopPropagation();
              setExpandedRoute(isExpanded ? null : route.route.id);
            }}
          >
            {isExpanded ? (
              <ChevronUp className='h-4 w-4 sm:h-5 sm:w-5' />
            ) : (
              <ChevronDown className='h-4 w-4 sm:h-5 sm:w-5' />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className='px-4 py-3 sm:px-6 sm:py-4'>
          <ol className='relative border-l border-gray-200 dark:border-gray-700'>
            {route.segment.map((stop, index) => (
              <li className='mb-6 ml-4 sm:mb-10 sm:ml-6' key={index}>
                <span className='absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:-left-3 sm:h-6 sm:w-6 sm:ring-8'>
                  <MapPin className='h-2 w-2 text-blue-800 dark:text-blue-300 sm:h-3 sm:w-3' />
                </span>
                <h3 className='mb-1 text-sm font-semibold text-gray-900 dark:text-white sm:text-base'>
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
