'use client';

import { useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'next/navigation';

import L from 'leaflet';

import { Skeleton } from '@/components/ui/skeleton';

import OSRMRouting from './live-map/osrm-routing';
import UserLocationMarker from './live-map/user-location-marker';
import RecenterButton from './RecenterButton';
import RecenterMap from './RecenterMap';

import 'leaflet/dist/leaflet.css';

import 'react-leaflet-markercluster/styles';
import {
  IShortestRoute,
  useFetchShortestRoutes,
} from '../../dashboard/_hooks/useFetchShortestRoute';
import {
  IGetAllPossibleRoutes,
  useGetAllPossibleRoutes,
} from '../../dashboard/_hooks/useGetAllPossibleRoutes';
import { useUserLocation } from '../_hooks/useUserLocation';

interface ICoordinate {
  lat: number;
  lng: number;
}

// Create a custom icon using the imported image.
const stopIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [20, 31],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34],
  shadowSize: [32, 32],
});

export const LiveMap = () => {
  const searchParams = useSearchParams();
  const startStop = searchParams.get('startStop');
  const endStop = searchParams.get('endStop');
  const allRoutesFlag = searchParams.get('allRoutes') === 'true';

  const startStopId = startStop ? Number(startStop) : undefined;
  const endStopId = endStop ? Number(endStop) : undefined;

  const { userLocation, userLocationName } = useUserLocation();

  const [hoveredRouteId, setHoveredRouteId] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<ICoordinate | null>(null);

  const { data: shortestRoutesData, isPending: isShortestRoutePending } =
    useFetchShortestRoutes({
      start_stop_id: startStopId,
      end_stop_id: endStopId,
      enabled: !allRoutesFlag,
    });
  const { data: allRoutesData, isPending: isAllRoutesPending } =
    useGetAllPossibleRoutes({
      startStopId,
      endStopId,
      enabled: allRoutesFlag,
    });

  const routes = useMemo(
    () => (allRoutesFlag ? allRoutesData || [] : shortestRoutesData || []),
    [allRoutesFlag, allRoutesData, shortestRoutesData]
  );

  // Helper to convert a route's stops into coordinates.
  const extractCoordinates = (route: IShortestRoute | IGetAllPossibleRoutes) =>
    route.segment.map(stop => ({
      lat: parseFloat(stop.location_lat),
      lng: parseFloat(stop.location_lng),
    }));

  const hoveredRouteDetails = useMemo(() => {
    if (hoveredRouteId == null) return null;
    return routes.find(route => route.route.id === hoveredRouteId) || null;
  }, [hoveredRouteId, routes]);

  const getColorForRoute = (routeId: number) => {
    const colors = ['blue', 'red', 'green', 'purple', 'orange'];
    return colors[routeId % colors.length];
  };

  if (!allRoutesFlag && isShortestRoutePending)
    return <Skeleton className='size-full' />;

  if (allRoutesFlag && isAllRoutesPending)
    return <Skeleton className='size-full' />;

  return (
    <MapContainer
      scrollWheelZoom
      center={userLocation || { lat: 27.7172, lng: 85.324 }}
      className='relative z-50 size-full rounded-lg border-4 border-border'
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={20}
        url='https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=gMt2woAdsfdFjkKmmE3r'
      />

      {userLocation && <RecenterMap userLocation={userLocation} />}

      {routes.map(route => {
        const routeCoordinates = extractCoordinates(route);
        return (
          <div key={route.route.id}>
            <OSRMRouting
              color={getColorForRoute(route.route.id)}
              waypoints={routeCoordinates}
              eventHandlers={{
                mouseover: e => {
                  setHoveredRouteId(route.route.id);
                  setPopupPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
                },
                mouseout: () => {
                  setHoveredRouteId(null);
                  setPopupPosition(null);
                },
              }}
            />

            {/* Render a marker for each stop in the segment */}
            {route.segment.map(stop => (
              <Marker
                icon={stopIcon}
                key={`stop-${stop.id}`}
                position={{
                  lat: parseFloat(stop.location_lat),
                  lng: parseFloat(stop.location_lng),
                }}
              >
                <Popup>{stop.name}</Popup>
              </Marker>
            ))}

            {popupPosition &&
              hoveredRouteDetails &&
              hoveredRouteDetails.route.id === route.route.id && (
                <Popup position={[popupPosition.lat, popupPosition.lng]}>
                  <div>
                    <h3 className='font-bold'>
                      {hoveredRouteDetails.route.name}
                    </h3>
                    <p>
                      <strong>Distance:</strong> {hoveredRouteDetails.distance}{' '}
                      km
                    </p>
                    <p>
                      <strong>Fare:</strong> Rs.{' '}
                      {typeof hoveredRouteDetails.fare === 'string'
                        ? hoveredRouteDetails.fare
                        : hoveredRouteDetails.fare.toFixed(2)}
                    </p>
                    <h4 className='mt-2 font-semibold'>Stops:</h4>
                    <ol className='list-decimal pl-4'>
                      {hoveredRouteDetails.segment.map(stop => (
                        <li key={stop.id}>{stop.name}</li>
                      ))}
                    </ol>
                  </div>
                </Popup>
              )}
          </div>
        );
      })}

      {userLocation && (
        <UserLocationMarker
          userLocation={userLocation}
          userLocationName={userLocationName}
        />
      )}

      {userLocation && <RecenterButton userLocation={userLocation} />}
    </MapContainer>
  );
};
