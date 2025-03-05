import React, { Suspense } from 'react';

import PassengerTripSection from './_components/passenger-trip-section';
import RouteFinder from './_components/route-finder';
import RouteFinderSkeleton from './_components/route-finder-skeleton';
import ScanQRCodeSkeleton from './_components/scan-qr-code-skeleton';
import TripStatusSkeleton from './_components/trip-status-skeleton';
import UserBalance from './_components/user-balance';

const PassengerDashboardPage = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-col gap-4 2xl:flex-row'>
        <UserBalance />

        <div className='flex w-full flex-col justify-center gap-4 lg:flex-row'>
          <Suspense
            fallback={
              <>
                <TripStatusSkeleton />
                <ScanQRCodeSkeleton />
              </>
            }
          >
            <PassengerTripSection />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<RouteFinderSkeleton />}>
        <RouteFinder />
      </Suspense>
    </div>
  );
};

export default PassengerDashboardPage;
