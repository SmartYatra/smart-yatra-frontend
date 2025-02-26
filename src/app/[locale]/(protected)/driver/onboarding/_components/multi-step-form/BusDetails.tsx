import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IOnBoardingFormData, IOnBoardingFormProps } from '../../_types';

interface IBusDetails extends Omit<IOnBoardingFormProps, 'setValue'> {
  register: UseFormRegister<IOnBoardingFormData>;
}

const BusDetails = ({ errors, register }: IBusDetails) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <div className='space-y-2'>
        <Label>Bus Number</Label>
        <Input
          placeholder='Enter bus number'
          type='text'
          {...register('busNumber')}
          error={errors.busNumber?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label>Model</Label>
        <Input
          placeholder='Enter bus model'
          type='text'
          {...register('model')}
          error={errors.model?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label>Capacity</Label>
        <Input
          max={100}
          min={0}
          placeholder='Enter bus capacity'
          type='number'
          {...register('capacity', { valueAsNumber: true })}
          error={errors.capacity?.message}
        />
      </div>
    </div>
  );
};

export default BusDetails;
