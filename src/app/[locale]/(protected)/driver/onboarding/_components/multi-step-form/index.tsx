'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Rocket } from 'lucide-react';

import { SectionSubtitle, SectionTitle } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { useStepStore } from '@/store/useStepStore';
import { zodResolver } from '@hookform/resolvers/zod';

import BusDetails from './BusDetails';
import FinishStep from './FinishStep';
import RouteDetails from './RouteDetails';

import { useDriverOnboarding } from '../../_hooks/useDriverOnboarding';
import {
  busDetailsSchema,
  finishStepSchema,
  routeDetailsSchema,
} from '../../_schema';
import { IOnBoardingFormData } from '../../_types';

const MultiStepForm = () => {
  const { currentStep, nextStep, prevStep } = useStepStore();
  const { mutate: onBoardDriver, isPending } = useDriverOnboarding();

  const defaultValues: IOnBoardingFormData = {
    busNumber: '',
    routeId: null,
    routeName: '',
    status: 'active',
    capacity: 0,
    driverId: null,
    model: '',
  };

  const methods = useForm({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(
      currentStep === 0
        ? busDetailsSchema
        : currentStep === 1
          ? routeDetailsSchema
          : finishStepSchema
    ),
  });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid }, // Track the validity of the form
    trigger, // Used to trigger validation programmatically
  } = methods;

  console.log(errors);

  const onSubmit = (data: IOnBoardingFormData) => {
    console.log(data);
    // Submit the data to the server
    onBoardDriver(data);
  };

  const steps = [
    {
      title: 'Bus Details',
      description: "Tell us about your bus and we'll get the ball rolling",
      content: <BusDetails errors={errors} register={register} />,
    },
    {
      title: 'Route Details',
      description: 'Specify your bus route for better tracking',
      content: <RouteDetails errors={errors} setValue={setValue} />,
    },
    {
      title: 'Finish Setup',
      description: 'Review and confirm your details before submitting',
      content: <FinishStep />,
    },
  ];

  // Trigger validation before proceeding to the next step
  const handleNextStep = async () => {
    const isStepValid = await trigger(); // Trigger validation for the current step
    if (isStepValid) {
      nextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='w-full max-w-4xl'>
        <SectionSubtitle>{steps[currentStep].title}</SectionSubtitle>
        <SectionTitle className='mb-8 max-sm:text-xl md:mb-16'>
          {steps[currentStep].description}
        </SectionTitle>

        <div className='space-y-8'>{steps[currentStep].content}</div>

        <div className='mt-16 flex justify-between gap-4 max-md:mb-10'>
          <Button
            className='w-40'
            disabled={currentStep === 0}
            variant='secondary'
            onClick={prevStep}
          >
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              className='w-40'
              disabled={!isValid} // Disable the "Next" button if the form is not valid
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              className='w-40 bg-emerald-700 hover:bg-emerald-800'
              isLoading={isPending}
              leftIcon={<Rocket className='size-5' />}
              type='submit'
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
