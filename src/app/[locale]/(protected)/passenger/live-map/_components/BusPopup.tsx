import React from 'react';

interface IBus {
  id: string;
  route: string;
  type?: string;
  speed?: number;
  eta?: number;
  occupancy?: string;
  locationName?: string;
  lat: number;
  lng: number;
}

interface IBusPopupProps {
  bus: IBus;
}

const BusDetail: React.FC<{
  label: string;
  value: string | number | undefined;
}> = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value !== undefined ? value : 'Unavailable'}
  </p>
);

const BusPopup: React.FC<IBusPopupProps> = ({ bus }) => {
  const {
    route,
    id,
    type = 'Standard',
    speed,
    eta,
    occupancy = 'Not specified',
    locationName = 'Fetching location...',
    lat,
    lng,
  } = bus;

  return (
    <div>
      <h3 className='font-bold'>Bus Details</h3>
      <BusDetail label='Route' value={route} />
      <BusDetail label='Bus ID' value={id} />
      <BusDetail label='Type' value={type} />
      <BusDetail
        label='Current Speed'
        value={speed ? `${speed} km/h` : undefined}
      />
      <BusDetail label='ETA' value={eta ? `${eta} mins` : undefined} />
      <BusDetail label='Occupancy' value={occupancy} />
      <BusDetail label='Location' value={locationName} />
      <BusDetail
        label='Coordinates'
        value={`${lat.toFixed(5)}, ${lng.toFixed(5)}`}
      />
    </div>
  );
};

export default BusPopup;
