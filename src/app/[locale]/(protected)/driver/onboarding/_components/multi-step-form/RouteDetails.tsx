import React from 'react';

import { useFetchRoutes } from '@/app/[locale]/(protected)/admin/dashboard/_hooks/useFetchRoutes';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { IOnBoardingFormProps } from '../../_types';

const RouteDetails = ({ errors, setValue }: IOnBoardingFormProps) => {
  const { data } = useFetchRoutes();
  const routes = data?.data || [];

  return (
    <div className='space-y-1'>
      <Label>Select Route</Label>
      <Select
        onValueChange={value => {
          setValue('routeId', Number(value));
          setValue(
            'routeName',
            routes.find(route => route.id === Number(value))?.name || ''
          );
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='Choose a route' />
        </SelectTrigger>
        <SelectContent>
          {routes.map(route => (
            <SelectItem key={route.id} value={String(route.id)}>
              {route.name} ({route.distance} km, {route.duration} min)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.routeId && (
        <p className='text-sm text-red-500'>{errors.routeId.message}</p>
      )}
    </div>
  );
};

export default RouteDetails;
