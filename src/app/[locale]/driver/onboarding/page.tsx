import React from 'react';

import { ArrowLeft } from 'lucide-react';

import BackgroundGlow from '@/components/background-glow';
import Logo from '@/components/logo';
import { Link } from '@/i18n/routing';

import MultiStepForm from '../_components/multi-step-form';
import StepperView from '../_components/StepperView';

const DriverOnboardingPage = () => {
  return (
    <div className='container h-screen w-full max-w-[1920px] p-4'>
      <div className='flex size-full'>
        {/* Left Side - Logo, Stepper View & Back to home */}
        <div className='relative w-1/3 overflow-hidden rounded-lg bg-muted/20 bg-hero-pattern p-4 4xl:bg-none'>
          <BackgroundGlow position={'top-right'} />
          <BackgroundGlow position={'bottom-left'} />

          <div className='flex h-full flex-col justify-between'>
            {/* Logo */}
            <Logo />

            {/* Stepper View */}
            <div className='mt-16 flex-1'>
              <StepperView />
            </div>

            <div className='flex items-center justify-between'>
              <Link
                className='group flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
                href='/'
              >
                <ArrowLeft
                  className='mt-0.5 transition-transform group-hover:-translate-x-1'
                  size={17}
                />
                Back to home
              </Link>

              <Link
                className='group flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
                href='/terms'
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - MultiStepper form */}
        <div className='flex w-2/3 flex-col items-center justify-center rounded-lg p-4'>
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
};

export default DriverOnboardingPage;
