import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IOnBoardingFormData {
  busName: string;
  busNumber: string;
  routeStart: string;
  routeEnd: string;
  documents: File[];
}

export interface IOnBoardingFormProps {
  register: UseFormRegister<IOnBoardingFormData>;
  errors: FieldErrors<IOnBoardingFormData>;
}
