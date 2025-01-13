'use client';

import React from 'react';

import { BusFront, Files, Rocket, Route } from 'lucide-react';

import { useStepStore } from '@/store/useStepStore';

const steps = [
  {
    title: 'Bus Details',
    description: 'Enter bus-related information',
    icon: BusFront,
  },
  { title: 'Route Details', description: 'Specify the bus route', icon: Route },
  {
    title: 'Upload Documents',
    description: 'Verify your information with necessary documents',
    icon: Files,
  },
  {
    title: 'Finish Setup',
    description: 'Review and confirm your details',
    icon: Rocket,
  },
];

const StepperView = () => {
  const { currentStep } = useStepStore();

  return (
    <div className='space-y-10'>
      {steps.map((step, index) => (
        <div className='flex items-center gap-4' key={index}>
          {/* Icon */}
          <div className='relative flex items-center'>
            {index !== steps.length - 1 && (
              <div className='absolute left-1/2 top-full h-12 w-[2px] -translate-x-[1.5px] translate-y-[1.5px] bg-muted' />
            )}
            <step.icon
              className={`h-6 w-6 ${
                index === currentStep
                  ? 'font-bold text-foreground'
                  : 'text-muted-foreground/70'
              }`}
            />
          </div>

          {/* Title & Description */}
          <div className='flex flex-col'>
            <span
              className={`text-sm font-medium ${
                index === currentStep
                  ? 'text-foreground'
                  : 'text-muted-foreground/70'
              }`}
            >
              {step.title}
            </span>
            <span
              className={`text-xs ${
                index === currentStep
                  ? 'text-foreground'
                  : 'text-muted-foreground/70'
              }`}
            >
              {step.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepperView;
