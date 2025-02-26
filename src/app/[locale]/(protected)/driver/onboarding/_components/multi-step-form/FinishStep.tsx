import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IOnBoardingFormData } from '../../_types';

const FinishStep = () => {
  const { watch } = useFormContext<IOnBoardingFormData>();
  const formData = watch();

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Bus Number Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Bus Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.busNumber}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Capacity Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.capacity}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Bus Modal Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.model}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Bus Status Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.status}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Route Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.routeName}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinishStep;
