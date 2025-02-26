import { FieldErrors, UseFormSetValue } from 'react-hook-form';

export interface IOnBoardingFormData {
  busNumber: string;
  routeId: number | null;
  routeName: string;
  status: 'active';
  model: string;
  capacity: number;
  driverId: number | null;
}

// {
//   "bus_number": "BA161297",
//   "status": "active",
//   "route_id": 5,
//   "model": "Volvo B7R",
//   "capacity": 50,
//   "driver_id": 6
// }

export interface IOnBoardingFormProps {
  setValue: UseFormSetValue<IOnBoardingFormData>;
  errors: FieldErrors<IOnBoardingFormData>;
}
