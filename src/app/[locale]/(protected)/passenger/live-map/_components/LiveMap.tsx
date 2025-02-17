'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { icon } from 'leaflet';

import BusMarker from '@/assets/passenger/bus-marker.png';
import UserMarker from '@/assets/passenger/user-marker.png';
import { Skeleton } from '@/components/ui/skeleton';

import BusPopup from './BusPopup';
import RecenterButton from './RecenterButton';
import RecenterMap from './RecenterMap';

import 'leaflet/dist/leaflet.css';

import 'react-leaflet-markercluster/styles';
import { useBuses } from '../_hooks/useBuses';
import { fetchLocationName } from '../_utils/geocoding';

export const LiveMap = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [busLocations, setBusLocations] = useState<Record<string, string>>({});
  const [userLocationName, setUserLocationName] = useState<string | null>(null);

  const { data: buses, isFetching, error } = useBuses();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const locationName = await fetchLocationName(latitude, longitude);
        setUserLocationName(locationName);
      },
      error => console.error('Error getting user location:', error)
    );
  }, []);

  useEffect(() => {
    if (buses?.length) {
      const fetchBusLocations = async () => {
        const locationPromises = buses.map(async bus => {
          const locationName = await fetchLocationName(bus.lat, bus.lng);
          return { [bus.id]: locationName };
        });
        const resolvedLocations = await Promise.all(locationPromises);
        setBusLocations(Object.assign({}, ...resolvedLocations));
      };

      fetchBusLocations().catch(error =>
        console.error('Error fetching bus locations:', error)
      );
    }
  }, [buses]);

  if (isFetching) {
    return (
      <div className='flex size-full items-center justify-center'>
        <Skeleton className='size-full' />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <MapContainer
      scrollWheelZoom
      center={userLocation || [27.7172, 85.324]}
      className='relative z-50 size-full rounded-lg'
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {userLocation && <RecenterMap userLocation={userLocation} />}
      <MarkerClusterGroup>
        {buses.map(bus => (
          <Marker
            icon={icon({ iconUrl: BusMarker.src, iconSize: [35, 35] })}
            key={bus.id}
            position={[bus.lat, bus.lng]}
          >
            <Tooltip>
              Route: {bus.route} | ETA:{' '}
              {bus.eta ? `${bus.eta} mins` : 'Unknown'}
            </Tooltip>
            <Popup>
              <BusPopup
                bus={{
                  ...bus,
                  locationName: busLocations[bus.id] || 'Fetching location...',
                }}
              />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {userLocation && (
        <Marker
          icon={icon({ iconUrl: UserMarker.src, iconSize: [35, 35] })}
          position={[userLocation.lat, userLocation.lng]}
        >
          <Popup>
            <h3 className='font-bold'>Your Location</h3>
            <p>
              <strong>Coordinates:</strong> {userLocation.lat},{' '}
              {userLocation.lng}
            </p>
            <p>
              <strong>Location</strong>:{' '}
              {userLocationName || 'Fetching location...'}
            </p>
          </Popup>
        </Marker>
      )}

      {userLocation && <RecenterButton userLocation={userLocation} />}
    </MapContainer>
  );
};
