import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface IRecenterMapProps {
  userLocation: { lat: number; lng: number };
}

const RecenterMap = ({ userLocation }: IRecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], map.getZoom());
    }
  }, [userLocation, map]);

  return null;
};

export default RecenterMap;
