'use client';

import type React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// Custom icon setup
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Stop {
  id: number;
  name: string;
  location_lat: string;
  location_lng: string;
  distance: number;
}

interface AllStopsMapProps {
  stops: Stop[];
  userLat: number;
  userLng: number;
}

const AllStopsMap: React.FC<AllStopsMapProps> = ({
  stops,
  userLat,
  userLng,
}) => {
  const bounds = L.latLngBounds([[userLat, userLng]]);
  stops.forEach(stop => {
    bounds.extend([
      Number.parseFloat(stop.location_lat),
      Number.parseFloat(stop.location_lng),
    ]);
  });

  return (
    <MapContainer
      bounds={bounds}
      center={[userLat, userLng]}
      className='relative z-50 size-full rounded-lg border-4 border-border'
      zoom={15}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={20}
        url='https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=gMt2woAdsfdFjkKmmE3r'
      /> */}

      {/* <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={22}
        url='https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=gMt2woAdsfdFjkKmmE3r'
      /> */}

      {/* <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={22}
        url='https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=gMt2woAdsfdFjkKmmE3r'
      /> */}

      {/* <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={22}
        url='https://api.maptiler.com/maps/streets/{z}/{x}/{y}@2x.png?key=gMt2woAdsfdFjkKmmE3r'
      /> */}

      <TileLayer
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
        maxZoom={20}
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />

      {/* Realistic map */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={22}
        url='https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=gMt2woAdsfdFjkKmmE3r'
      /> */}

      {stops.map(stop => (
        <Marker
          icon={customIcon}
          key={stop.id}
          position={[
            Number.parseFloat(stop.location_lat),
            Number.parseFloat(stop.location_lng),
          ]}
        >
          <Popup>
            <strong>{stop.name}</strong>
            <br />
            Distance: {stop.distance.toFixed(2)} km
          </Popup>
        </Marker>
      ))}
      <Marker icon={userIcon} position={[userLat, userLng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default AllStopsMap;
