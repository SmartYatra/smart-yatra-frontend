import { Marker, Popup } from 'react-leaflet';

import { icon } from 'leaflet';

import UserMarker from '@/assets/passenger/user-marker.png';

import { ICoordinate } from '../../_types/map.types';

interface Props {
  userLocation: ICoordinate;
  userLocationName: string | null;
}

const UserLocationMarker = ({ userLocation, userLocationName }: Props) => {
  return (
    <Marker
      icon={icon({ iconUrl: UserMarker.src, iconSize: [35, 35] })}
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
