import { useEffect, useState } from 'react';

import { ICoordinate } from '../_types/map.types';
import { fetchLocationName } from '../_utils/geocoding';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<ICoordinate | null>(null);
  const [userLocationName, setUserLocationName] = useState<string | null>(null);

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

  return { userLocation, userLocationName };
};
