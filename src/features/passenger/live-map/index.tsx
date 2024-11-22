import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { icon } from 'leaflet';

import BusMarker from '@/assets/passenger/bus-marker.png';
import UserMarker from '@/assets/passenger/user-marker.png';
import Skeleton from '@/components/Skeleton';

import BusPopup from './components/BusPopup';
import RecenterButton from './components/RecenterButton';
import RecenterMap from './components/RecenterMap';
import { useBuses } from './hooks/useBuses';
import { fetchLocationName } from './utils/geocoding';

import 'leaflet/dist/leaflet.css';

const LiveMap = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [busLocations, setBusLocations] = useState<{ [id: string]: string }>({});
  const [userLocationName, setUserLocationName] = useState<string | null>(null);

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

  // Fetch location name for user
  useEffect(() => {
    const fetchUserLocationName = async () => {
      if (userLocation) {
        setUserLocationName(await fetchLocationName(userLocation.lat, userLocation.lng));
      }
    };
    fetchUserLocationName();
  }, [userLocation]);

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
        scrollWheelZoom
        center={userLocation || [27.7172, 85.324]}
        className="relative z-50 size-full rounded-lg"
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <RecenterMap userLocation={userLocation} />}
        <MarkerClusterGroup>
          {buses.map((bus) => (
            <Marker
              key={bus.id}
              icon={icon({ iconUrl: BusMarker, iconSize: [35, 35] })}
              position={[bus.lat, bus.lng]}
            >
              <Tooltip>
                Route: {bus.route} | ETA: {bus.eta ? `${bus.eta} mins` : 'Unknown'}
              </Tooltip>
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
        </MarkerClusterGroup>

        {userLocation && (
          <Marker
            icon={icon({ iconUrl: UserMarker, iconSize: [35, 35] })}
            position={[userLocation.lat, userLocation.lng]}
          >
            <Popup>
              <h3 className="font-bold">Your Location</h3>
              <p>
                <strong>Coordinates:</strong> {userLocation.lat}, {userLocation.lng}
              </p>
              <p>
                <strong>Location</strong>:{' '}
                {userLocationName ? userLocationName : 'Fetching location...'}
              </p>
            </Popup>
          </Marker>
        )}

        {userLocation && <RecenterButton userLocation={userLocation} />}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
