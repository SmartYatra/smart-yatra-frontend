'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { AlertCircle, Loader2, Map, MapPin } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogDescription } from '@radix-ui/react-dialog';

import { useNearbyStops } from '../_hooks/useNearbyStops';

// Dynamically import the MapPopup component to avoid SSR issues with Leaflet
const MapPopup = dynamic(() => import('./map-popup'), { ssr: false });
const AllStopsMap = dynamic(() => import('./all-stops-map'), { ssr: false });

export const NearbyStops = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isAllStopsMapOpen, setIsAllStopsMapOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setLocationError(null);
      },
      error => {
        console.log(error);
        setLocationError(
          'Unable to retrieve your location. Please enable location services.'
        );
      }
    );
  }, []);

  const {
    data: nearbyStops,
    isLoading,
    error,
  } = useNearbyStops({
    latitude: latitude || '0',
    longitude: longitude || '0',
  });

  if (locationError || error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {locationError || 'Failed to fetch nearby stops. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !latitude || !longitude) {
    return (
      <Card className='mx-auto size-full'>
        <CardContent className='flex items-center justify-center py-10'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
          <p className='ml-2 text-lg font-medium'>Locating nearby stops...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mx-auto size-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex items-center text-2xl font-bold'>
          <MapPin className='mr-2 h-6 w-6 text-primary' />
          Nearby Bus Stops
        </CardTitle>
        <Dialog open={isAllStopsMapOpen} onOpenChange={setIsAllStopsMapOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Map className='mr-2 h-4 w-4' />
              View All Stops on Map
            </Button>
          </DialogTrigger>
          <DialogContent className='flex h-[calc(100vh-90px)] w-[calc(100vw-200px)] max-w-full flex-col p-4'>
            <DialogHeader className='h-fit'>
              <DialogTitle>All Nearby Bus Stops</DialogTitle>
            </DialogHeader>
            <div className='flex-1 rounded-lg'>
              <AllStopsMap
                stops={nearbyStops || []}
                userLat={Number.parseFloat(latitude || '0')}
                userLng={Number.parseFloat(longitude || '0')}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className='h-full'>
        {nearbyStops && nearbyStops.length > 0 ? (
          <ScrollArea className='h-full'>
            {nearbyStops.map(stop => (
              <Card
                className='mb-4 transition-colors last:mb-0 hover:bg-accent'
                key={stop.id}
              >
                <CardContent className='p-4'>
                  <h3 className='mb-2 text-lg font-semibold'>{stop.name}</h3>
                  <p className='mb-2 text-sm text-muted-foreground'>
                    Distance: {stop.distance.toFixed(2)} km
                  </p>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>
                      {stop.location_lat}, {stop.location_lng}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size='sm' variant='outline'>
                          <Map className='mr-2 h-4 w-4' />
                          View on Map
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='flex h-[calc(100vh-90px)] w-[calc(100vw-200px)] max-w-full flex-col p-4'>
                        <DialogHeader className='h-fit'>
                          <DialogTitle>{stop.name}</DialogTitle>
                          <DialogDescription>
                            {stop.location_lat}, {stop.location_lng}
                          </DialogDescription>
                          <DialogDescription>
                            Distance: {stop.distance.toFixed(2).toString()} km
                          </DialogDescription>
                        </DialogHeader>
                        <div className='flex-1 rounded-lg'>
                          <MapPopup
                            lat={Number.parseFloat(stop.location_lat)}
                            lng={Number.parseFloat(stop.location_lng)}
                            name={stop.name}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        ) : (
          <p className='py-4 text-center text-muted-foreground'>
            No nearby stops found.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyStops;
