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

interface MapPopupProps {
  lat: number;
  lng: number;
  name: string;
}

const MapPopup: React.FC<MapPopupProps> = ({ lat, lng, name }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      className='relative z-50 size-full rounded-lg border-4 border-border'
      zoom={15}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        maxZoom={20}
        url='https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=gMt2woAdsfdFjkKmmE3r'
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker icon={customIcon} position={[lat, lng]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapPopup;
