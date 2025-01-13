import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IOnBoardingFormProps } from '../../_types';

const RouteDetails = ({ errors, register }: IOnBoardingFormProps) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-1'>
        <Label>Start Location</Label>
        <Input
          placeholder='Enter start location'
          type='text'
          {...register('routeStart')}
          error={errors.routeStart?.message}
        />
      </div>

      <div className='space-y-1'>
        <Label>End Location</Label>
        <Input
          placeholder='Enter end location'
          type='text'
          {...register('routeEnd')}
          error={errors.routeEnd?.message}
        />
      </div>
    </div>
  );
};

export default RouteDetails;
