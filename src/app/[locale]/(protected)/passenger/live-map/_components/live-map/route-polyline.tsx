import { Fragment, useMemo, useState } from 'react';
import { Marker, Polyline, Popup } from 'react-leaflet';

import { icon } from 'leaflet';

import UserMarker from '@/assets/passenger/user-marker.png';

import { IShortestRoute } from '../../../dashboard/_hooks/useFetchShortestRoute';
import { IGetAllPossibleRoutes } from '../../../dashboard/_hooks/useGetAllPossibleRoutes';
import { IRoutePath } from '../../_types/map.types';

interface Props {
  routeObj: IRoutePath;
  routes: IShortestRoute[] | IGetAllPossibleRoutes[];
}

const RoutePolyline = ({ routeObj, routes }: Props) => {
  const [hoveredRouteId, setHoveredRouteId] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getColorForRoute = (routeId: number) => {
    const colors = ['blue', 'red', 'green', 'purple', 'orange'];
    return colors[routeId % colors.length];
  };

  const hoveredRouteDetails = useMemo(
    () => routes.find(route => route.route.id === hoveredRouteId) || null,
    [hoveredRouteId, routes]
  );

  return (
    <Fragment>
      <Polyline
        color={getColorForRoute(routeObj.routeId)}
        positions={routeObj.path}
        weight={4}
        eventHandlers={{
          mouseover: e => {
            setHoveredRouteId(routeObj.routeId);
            setPopupPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
          },
          mouseout: () => {
            setHoveredRouteId(null);
            setPopupPosition(null);
          },
        }}
      />

      <RoutePolyline
        key={routeObj.routeId}
        routeObj={routeObj}
        routes={routes}
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

      {popupPosition && hoveredRouteDetails && (
        <Popup position={[popupPosition.lat, popupPosition.lng]}>
          <div>
            <h3 className='font-bold'>{hoveredRouteDetails.route.name}</h3>
            <p>
              <strong>Distance:</strong> {hoveredRouteDetails.distance} km
            </p>
            <p>
              {/* <strong>Fare:</strong> Rs. {hoveredRouteDetails.fare.toFixed(2)} */}
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
    </Fragment>
  );
};

export default RoutePolyline;
