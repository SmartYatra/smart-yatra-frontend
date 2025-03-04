'use client';

import React, { Suspense } from 'react';

import ScanQRCode from './scan-qr-code';
import ScanQRCodeSkeleton from './scan-qr-code-skeleton';
import TripStatusCard from './trip-status-card';
import TripStatusSkeleton from './trip-status-skeleton';

import { usePassengerTripStatus } from '../_hooks/usePassengerTripStatus';

const PassengerTripSection = () => {
  return (
    <div className='flex flex-col justify-center gap-4 lg:flex-row'>
      <Suspense
        fallback={
          <>
            <TripStatusSkeleton />
            <ScanQRCodeSkeleton />
          </>
        }
      >
        <PassengerTripContent />
      </Suspense>
    </div>
  );
};

const PassengerTripContent = () => {
  const { data: tripStatus } = usePassengerTripStatus();
  const isOnTrip = !!tripStatus && !tripStatus.alighting_time;

  return (
    <>
      {isOnTrip && <TripStatusCard tripStatus={tripStatus} />}
      <ScanQRCode mode={isOnTrip ? 'exit' : 'onboard'} />
    </>
  );
};

export default PassengerTripSection;
