import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type RecenterMapProps = {
  userLocation: { lat: number; lng: number };
};

const RecenterMap = ({ userLocation }: RecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], map.getZoom());
    }
  }, [userLocation, map]);

  return null;
};

export default RecenterMap;
