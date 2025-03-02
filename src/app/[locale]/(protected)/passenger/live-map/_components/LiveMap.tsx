'use client';

import { Fragment, useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  // Tooltip,
} from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSearchParams } from 'next/navigation';

import { icon } from 'leaflet';

// import BusMarker from '@/assets/passenger/bus-marker.png';
import UserMarker from '@/assets/passenger/user-marker.png';

// import { Skeleton } from '@/components/ui/skeleton';
// import BusPopup from './BusPopup';
import RecenterButton from './RecenterButton';
import RecenterMap from './RecenterMap';

import 'leaflet/dist/leaflet.css';

import 'react-leaflet-markercluster/styles';
import { getRoadPath } from '../_api/get-route-path';
// import { useBuses } from '../_hooks/useBuses';
import { useFetchRoutesFromMultipleIds } from '../_hooks/useFetchRoutesFromMultipleIds';
import { fetchLocationName } from '../_utils/geocoding';

export const LiveMap = () => {
  const searchParams = useSearchParams();
  const routeIds = searchParams.get('routes')?.split(',').map(Number) || [];

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // const [busLocations, setBusLocations] = useState<Record<string, string>>({});
  const [userLocationName, setUserLocationName] = useState<string | null>(null);
  const [routePaths, setRoutePaths] = useState<
    Record<number, { lat: number; lng: number }[]>
  >({});

  // const { data: buses, isFetching, error } = useBuses();

  // Fetch route data for all IDs
  const { data: routes } = useFetchRoutesFromMultipleIds({ ids: routeIds });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        console.log('Geolocation position:', position); // Log the raw position data
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const locationName = await fetchLocationName(latitude, longitude);
        setUserLocationName(locationName);
      },
      error => console.error('Error getting user location:', error),
      { enableHighAccuracy: true, timeout: 5000 } // Force high accuracy and set a timeout
    );
  }, []);

  // useEffect(() => {
  //   if (buses?.length) {
  //     const fetchBusLocations = async () => {
  //       const locationPromises = buses.map(async bus => {
  //         const locationName = await fetchLocationName(bus.lat, bus.lng);
  //         return { [bus.id]: locationName };
  //       });
  //       const resolvedLocations = await Promise.all(locationPromises);
  //       setBusLocations(Object.assign({}, ...resolvedLocations));
  //     };

  //     fetchBusLocations().catch(error =>
  //       console.error('Error fetching bus locations:', error)
  //     );
  //   }
  // }, [buses]);

  useEffect(() => {
    if (routes?.length) {
      const fetchRoutes = async () => {
        const routePromises = routes.map(async route => {
          const path = await getRoadPath(route.stops);
          return { id: route.id, path };
        });

        const resolvedRoutes = await Promise.all(routePromises);
        const routeMap = Object.fromEntries(
          resolvedRoutes.map(route => [route.id, route.path])
        );
        setRoutePaths(routeMap);
      };

      fetchRoutes().catch(error =>
        console.error('Error fetching route paths:', error)
      );
    }
  }, [routes]);

  // if (isFetching) {
  //   return (
  //     <div className='flex size-full items-center justify-center'>
  //       <Skeleton className='size-full' />
  //     </div>
  //   );
  // }

  // if (error) return <p>Error: {error.message}</p>;

  // Function to extract route polyline coordinates from stops
  interface Stop {
    location_lat: string;
    location_lng: string;
  }

  const getRoutePolyline = (stops: Stop[]) => {
    return stops.map(stop => ({
      lat: parseFloat(stop.location_lat),
      lng: parseFloat(stop.location_lng),
    }));
  };

  // Function to generate a unique color for each route
  const getRouteColor = (index: number) => {
    const colors = [
      'blue',
      'green',
      'red',
      'purple',
      'orange',
      'yellow',
      'pink',
      'brown',
    ];
    return colors[index % colors.length]; // Loop through colors if there are more routes
  };

  return (
    <MapContainer
      scrollWheelZoom
      center={userLocation || [27.7172, 85.324]}
      className='relative z-50 size-full rounded-lg'
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {userLocation && <RecenterMap userLocation={userLocation} />}
      {/* <MarkerClusterGroup>
        {buses.map(bus => (
          <Marker
            icon={icon({ iconUrl: BusMarker.src, iconSize: [35, 35] })}
            key={bus.id}
            position={[bus.lat, bus.lng]}
          >
            <Tooltip>
              Route: {bus.route} | ETA:{' '}
              {bus.eta ? `${bus.eta} mins` : 'Unknown'}
            </Tooltip>
            <Popup>
              <BusPopup
                bus={{
                  ...bus,
                  locationName: busLocations[bus.id] || 'Fetching location...',
                }}
              />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup> */}

      {routes?.map((route, index) => {
        const routeColor = getRouteColor(index);
        const routePath = routePaths[route.id] || getRoutePolyline(route.stops); // Use fetched route or fallback

        return (
          <Fragment key={route.id}>
            <Polyline color={routeColor} positions={routePath} weight={4} />

            {/* Start Marker */}
            {route.stops.length > 0 && (
              <Marker
                icon={icon({ iconUrl: UserMarker.src, iconSize: [20, 20] })}
                position={[
                  parseFloat(route.stops[0].location_lat),
                  parseFloat(route.stops[0].location_lng),
                ]}
              >
                <Popup>Start: {route.stops[0].location_lat}</Popup>
              </Marker>
            )}

            {/* End Marker */}
            {route.stops.length > 0 && (
              <Marker
                icon={icon({ iconUrl: UserMarker.src, iconSize: [20, 20] })}
                position={[
                  parseFloat(route.stops[route.stops.length - 1].location_lat),
                  parseFloat(route.stops[route.stops.length - 1].location_lng),
                ]}
              >
                <Popup>
                  End: {route.stops[route.stops.length - 1].location_lat}
                </Popup>
              </Marker>
            )}
          </Fragment>
        );
      })}

      {userLocation && (
        <Marker
          icon={icon({ iconUrl: UserMarker.src, iconSize: [35, 35] })}
          position={[userLocation.lat, userLocation.lng]}
        >
          <Popup>
            <h3 className='font-bold'>Your Location</h3>
            <p>
              <strong>Coordinates:</strong> {userLocation.lat},{' '}
              {userLocation.lng}
            </p>
            <p>
              <strong>Location</strong>:{' '}
              {userLocationName || 'Fetching location...'}
            </p>
          </Popup>
        </Marker>
      )}

      {userLocation && <RecenterButton userLocation={userLocation} />}
    </MapContainer>
  );
};
