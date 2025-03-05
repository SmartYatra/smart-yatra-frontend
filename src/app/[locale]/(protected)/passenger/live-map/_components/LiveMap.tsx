'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { useSearchParams } from 'next/navigation';

import { icon } from 'leaflet';

import UserMarker from '@/assets/passenger/user-marker.png';

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
import { fetchLocationName } from '..//_utils/geocoding';
import { getRoadPath } from '../_api/get-route-path';

interface ICoordinate {
  lat: number;
  lng: number;
}

export const LiveMap = () => {
  const searchParams = useSearchParams();
  const startStop = searchParams.get('startStop');
  const endStop = searchParams.get('endStop');
  const allRoutesFlag = searchParams.get('allRoutes') === 'true'; // if present, show all routes

  // Convert stop IDs to numbers.
  const startStopId = startStop ? Number(startStop) : undefined;
  const endStopId = endStop ? Number(endStop) : undefined;

  const [userLocation, setUserLocation] = useState<ICoordinate | null>(null);
  const [userLocationName, setUserLocationName] = useState<string | null>(null);
  const [routesPaths, setRoutesPaths] = useState<
    Array<{ routeId: number; path: ICoordinate[] }>
  >([]);
  // State to track which route is selected (for showing details) and where to show the Popup.
  const [hoveredRouteId, setHoveredRouteId] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<ICoordinate | null>(null);

  // Fetch routes based on the provided stop IDs.
  // If "allRoutes" flag is set, use useGetAllPossibleRoutes; otherwise, use useFetchShortestRoutes.
  const { data: shortestRoutesData } = useFetchShortestRoutes({
    start_stop_id: startStopId,
    end_stop_id: endStopId,
    enabled: !allRoutesFlag,
  });
  const { data: allRoutesData } = useGetAllPossibleRoutes({
    startStopId,
    endStopId,
    enabled: allRoutesFlag,
  });

  // Choose the routes to display.
  const routes = useMemo(
    () => (allRoutesFlag ? allRoutesData || [] : shortestRoutesData || []),
    [allRoutesFlag, allRoutesData, shortestRoutesData]
  );

  // Helper: extract coordinates from a route.
  const extractCoordinates = (route: IShortestRoute | IGetAllPossibleRoutes) =>
    route.segment.map(stop => ({
      lat: parseFloat(stop.location_lat),
      lng: parseFloat(stop.location_lng),
    }));

  // Get user location and reverse geocode.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const locationName = await fetchLocationName(latitude, longitude);
        setUserLocationName(locationName);
      },
      error => console.error('Error getting user location:', error),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  console.log(routesPaths);

  // For each route, compute its road path.
  useEffect(() => {
    routes.forEach(route => {
      const coords = extractCoordinates(route);
      if (coords.length > 1) {
        getRoadPath(coords)
          .then(path => {
            setRoutesPaths(prev => [
              ...prev,
              { routeId: route.route.id, path },
            ]);
          })
          .catch(error =>
            console.error(
              'Error fetching route path for route id',
              route.route.id,
              error
            )
          );
      }
    });
  }, [routes]);

  // Helper: assign a color based on route ID.
  const getColorForRoute = (routeId: number) => {
    const colors = ['blue', 'red', 'green', 'purple', 'orange'];
    return colors[routeId % colors.length];
  };

  // Get the details of the hovered route (from the routes data).
  const hoveredRouteDetails = useMemo(() => {
    if (hoveredRouteId == null) return null;
    return routes.find(route => route.route.id === hoveredRouteId) || null;
  }, [hoveredRouteId, routes]);

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

      {/* Render each route's polyline and markers */}
      {routesPaths.map(routeObj => (
        <Fragment key={routeObj.routeId}>
          <Polyline
            color={getColorForRoute(routeObj.routeId)}
            positions={routeObj.path}
            weight={4}
            eventHandlers={{
              mouseover: e => {
                // On polyline hover, store the route ID and the hovered position.
                setHoveredRouteId(routeObj.routeId);
                setPopupPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
              },
              mouseout: () => {
                // On polyline mouseout, clear the hovered route ID and popup position.
                setHoveredRouteId(null);
                setPopupPosition(null);
              },
            }}
          />
          {routeObj.path.length > 0 && (
            <Marker
              icon={icon({ iconUrl: UserMarker.src, iconSize: [20, 20] })}
              position={[routeObj.path[0].lat, routeObj.path[0].lng]}
            >
              <Popup>Route {routeObj.routeId} Start</Popup>
            </Marker>
          )}
          {routeObj.path.length > 1 && (
            <Marker
              icon={icon({ iconUrl: UserMarker.src, iconSize: [20, 20] })}
              position={[
                routeObj.path[routeObj.path.length - 1].lat,
                routeObj.path[routeObj.path.length - 1].lng,
              ]}
            >
              <Popup>Route {routeObj.routeId} End</Popup>
            </Marker>
          )}
        </Fragment>
      ))}

      {/* If a route is hovered, show its details in a Popup */}
      {popupPosition && hoveredRouteDetails && (
        <Popup
          position={[popupPosition.lat, popupPosition.lng]}
          eventHandlers={{
            remove: () => {
              setHoveredRouteId(null);
              setPopupPosition(null);
            },
          }}
        >
          <div>
            <h3 className='font-bold'>{hoveredRouteDetails.route.name}</h3>
            <p>
              <strong>Distance:</strong>{' '}
              {hoveredRouteDetails.distance.toFixed(3)} km
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
              <strong>Location:</strong>{' '}
              {userLocationName || 'Fetching location...'}
            </p>
          </Popup>
        </Marker>
      )}

      {userLocation && <RecenterButton userLocation={userLocation} />}
    </MapContainer>
  );
};
