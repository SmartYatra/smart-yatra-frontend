import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { icon } from 'leaflet';

import BusMarker from '@/assets/passenger/bus-marker.png';
import UserMarker from '@/assets/passenger/user-marker.png';
import Skeleton from '@/components/Skeleton';

import BusPopup from './components/BusPopup';
import RecenterMap from './components/RecenterMap';
import { useBuses } from './hooks/useBuses';
import { fetchLocationName } from './utils/geocoding';

import 'leaflet/dist/leaflet.css';

const LiveMap = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [busLocations, setBusLocations] = useState<{ [id: string]: string }>({});
  const { data: buses, isFetching, error } = useBuses();

  // Fetch user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  // Fetch location names for buses
  useEffect(() => {
    const fetchBusLocations = async () => {
      if (buses) {
        const locations = await Promise.all(
          buses.map(async (bus) => ({
            id: bus.id,
            locationName: await fetchLocationName(bus.lat, bus.lng),
          }))
        );
        const locationsMap: { [id: string]: string } = {};
        locations.forEach((location) => {
          locationsMap[location.id] = location.locationName;
        });
        setBusLocations(locationsMap);
      }
    };
    fetchBusLocations();
  }, [buses]);

  if (isFetching) {
    return (
      <div className="flex size-full items-center justify-center">
        <Skeleton className="size-full" />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="size-full">
      <MapContainer
        center={userLocation || [27.7172, 85.324]}
        className="z-50 size-full rounded-lg"
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <RecenterMap userLocation={userLocation} />}
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            icon={icon({ iconUrl: BusMarker, iconSize: [35, 35] })}
            position={[bus.lat, bus.lng]}
          >
            <Popup>
              <BusPopup
                bus={{
                  ...bus,
                  locationName: busLocations[bus.id],
                }}
              />
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            icon={icon({ iconUrl: UserMarker, iconSize: [35, 35] })}
            position={[userLocation.lat, userLocation.lng]}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
