import React from 'react';

import { ArrowLeft } from 'lucide-react';

import BackgroundGlow from '@/components/background-glow';
import Logo from '@/components/logo';
import { Link } from '@/i18n/routing';

import MultiStepForm from '../_components/multi-step-form';
import StepperView from '../_components/StepperView';

const DriverOnboardingPage = () => {
  return (
    <div className='container relative h-screen w-full max-w-[1920px] p-4'>
      <div className='flex size-full flex-col gap-10 md:flex-row md:gap-0'>
        {/* Left Side - Logo, Stepper View & Back to home */}
        <div className='relative hidden w-1/3 overflow-hidden rounded-lg bg-muted/20 bg-hero-pattern md:block md:p-4 4xl:bg-none'>
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
                className='group flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:text-base'
                href='/'
              >
                <ArrowLeft
                  className='transition-transform group-hover:-translate-x-1'
                  size={17}
                />
                Back to home
              </Link>

              <Link
                className='group hidden w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:flex'
                href='/terms'
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* For small devices */}
        <div className='md:hidden'>
          <BackgroundGlow className='fixed' position={'top-right'} />
          <BackgroundGlow className='fixed' position={'bottom-left'} />

          <StepperView />
        </div>

        {/* Right Side - MultiStepper form */}
        <div className='flex w-full flex-col items-center justify-center rounded-lg md:w-2/3 md:p-4'>
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
};

export default DriverOnboardingPage;
