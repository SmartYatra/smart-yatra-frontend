import { Marker, Popup } from 'react-leaflet';

import L from 'leaflet';

import { ICoordinate } from '../../_types/map.types';

interface Props {
  userLocation: ICoordinate;
  userLocationName: string | null;
}

const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [28, 40],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34],
  shadowSize: [40, 40],
});

const UserLocationMarker = ({ userLocation, userLocationName }: Props) => {
  return (
    <Marker
      // icon={icon({ iconUrl: UserMarker.src, iconSize: [35, 35] })}
      icon={userIcon}
      position={[userLocation.lat, userLocation.lng]}
    >
      <Popup>
        <h3 className='font-bold'>Your Location</h3>
        <p>
          <strong>Coordinates:</strong> {userLocation.lat}, {userLocation.lng}
        </p>
        <p>
          <strong>Location:</strong>{' '}
          {userLocationName || 'Fetching location...'}
        </p>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
