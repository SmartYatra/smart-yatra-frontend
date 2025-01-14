import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IOnBoardingFormProps } from '../../_types';

const BusDetails = ({ errors, register }: IOnBoardingFormProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <div className='space-y-2'>
        <Label>Bus Name</Label>
        <Input
          placeholder='Enter bus name'
          type='text'
          {...register('busName')}
          error={errors.busName?.message}
        />
      </div>
      <div className='space-y-2'>
        <Label>Bus Number</Label>
        <Input
          placeholder='Enter bus number'
          type='text'
          {...register('busNumber')}
          error={errors.busNumber?.message}
        />
      </div>
    </div>
  );
};

export default BusDetails;
