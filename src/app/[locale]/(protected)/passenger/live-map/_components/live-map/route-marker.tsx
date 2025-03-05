import { Popup } from 'react-leaflet';

import { IShortestRoute } from '../../../dashboard/_hooks/useFetchShortestRoute';
import { IGetAllPossibleRoutes } from '../../../dashboard/_hooks/useGetAllPossibleRoutes';

interface RouteMarkerProps {
  routeObj: {
    routeId: number;
    path: { lat: number; lng: number }[];
  };
  hoveredRouteDetails: IShortestRoute | IGetAllPossibleRoutes | null;
  setHoveredRouteId: (id: number | null) => void;
  setPopupPosition: (pos: { lat: number; lng: number } | null) => void;
  popupPosition: { lat: number; lng: number } | null;
}

const RouteMarker: React.FC<RouteMarkerProps> = ({
  routeObj,
  hoveredRouteDetails,
  setHoveredRouteId,
  setPopupPosition,
  popupPosition,
}) => {
  return (
    <>
      {/* Popup for route details when hovered */}
      {popupPosition && hoveredRouteDetails?.route?.id === routeObj.routeId && (
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
    </>
  );
};

export default RouteMarker;
