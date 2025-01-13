'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SectionSubtitle, SectionTitle } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { useStepStore } from '@/store/useStepStore';
import { zodResolver } from '@hookform/resolvers/zod';

import BusDetails from './BusDetails';
import FinishStep from './FinishStep';
import RouteDetails from './RouteDetails';
import UploadDocuments from './UploadDocuments';

import {
  busDetailsSchema,
  finishStepSchema,
  routeDetailsSchema,
  uploadDocumentsSchema,
} from '../../_schema';
import { IOnBoardingFormData } from '../../_types';

const MultiStepForm = () => {
  const { currentStep, nextStep, prevStep } = useStepStore();

  const defaultValues: IOnBoardingFormData = {
    busName: '',
    busNumber: '',
    routeStart: '',
    routeEnd: '',
    documents: [],
  };

  const methods = useForm({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(
      currentStep === 0
        ? busDetailsSchema
        : currentStep === 1
          ? routeDetailsSchema
          : currentStep === 2
            ? uploadDocumentsSchema
            : finishStepSchema
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Track the validity of the form
    trigger, // Used to trigger validation programmatically
  } = methods;

  const onSubmit = (data: IOnBoardingFormData) => {
    console.log(data);

    if (currentStep === 3) {
      // Call an API to submit the form data
    } else {
      nextStep();
    }
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
      content: <RouteDetails errors={errors} register={register} />,
    },
    {
      title: 'Upload Documents',
      description: 'Verify your information with necessary documents',
      content: <UploadDocuments />,
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
        <SectionTitle className='mb-16'>
          {steps[currentStep].description}
        </SectionTitle>

        <div className='space-y-8'>{steps[currentStep].content}</div>

        <div className='mt-16 flex justify-between'>
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
