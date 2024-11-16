// components/BusPopup.tsx
type BusPopupProps = {
  bus: {
    id: string;
    lat: number;
    lng: number;
    route: string;
    type?: string;
    speed?: number;
    eta?: number;
    occupancy?: string;
    locationName?: string;
  };
};

const BusPopup = ({ bus }: BusPopupProps) => (
  <div>
    <h3 className="font-bold">Bus Details</h3>
    <p>
      <strong>Route:</strong> {bus.route}
    </p>
    <p>
      <strong>Bus ID:</strong> {bus.id}
    </p>
    <p>
      <strong>Type:</strong> {bus.type || 'Standard'}
    </p>
    <p>
      <strong>Current Speed:</strong> {bus.speed ? `${bus.speed} km/h` : 'Unavailable'}
    </p>
    <p>
      <strong>ETA:</strong> {bus.eta ? `${bus.eta} mins` : 'Not available'}
    </p>
    <p>
      <strong>Occupancy:</strong> {bus.occupancy || 'Not specified'}
    </p>
    <p>
      <strong>Location:</strong> {bus.locationName || 'Fetching location...'}
    </p>
    <p>{`Lat: ${bus.lat.toFixed(5)}, Lng: ${bus.lng.toFixed(5)}`}</p>
  </div>
);

export default BusPopup;
