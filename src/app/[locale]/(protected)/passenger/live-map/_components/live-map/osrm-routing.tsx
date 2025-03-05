'use client';

import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';

import { nextApi } from '@/lib/api-client';

interface ICoordinate {
  lat: number;
  lng: number;
}

interface OSRMRoutingProps {
  waypoints: ICoordinate[];
  color?: string;
  eventHandlers?: L.LeafletEventHandlerFnMap;
}

const OSRMRouting = ({
  waypoints,
  color = 'blue',
  eventHandlers = {},
}: OSRMRoutingProps) => {
  const [route, setRoute] = useState<ICoordinate[]>([]);

  useEffect(() => {
    if (waypoints.length < 2) return;

    // Build coordinate string as "lng,lat;lng,lat;..."
    const coords = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
    nextApi
      .get(`/api/osrm-route?coords=${encodeURIComponent(coords)}`)
      .then(({ data }) => {
        if (data.routes && data.routes.length > 0) {
          const osrmCoords = data.routes[0].geometry.coordinates;
          const routeLatLng = osrmCoords.map((pt: number[]) => ({
            lat: pt[1],
            lng: pt[0],
          }));
          setRoute(routeLatLng);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, [waypoints]);

  return route.length > 0 ? (
    <Polyline
      color={color}
      eventHandlers={eventHandlers}
      opacity={0.8}
      positions={route}
      weight={4}
    />
  ) : null;
};

export default OSRMRouting;
