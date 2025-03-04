import React, { Suspense } from 'react';

import PassengerTripSection from './_components/passenger-trip-section';
import RouteFinder from './_components/route-finder';
import RouteFinderSkeleton from './_components/route-finder-skeleton';

const PassengerDashboardPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <PassengerTripSection />

      <Suspense fallback={<RouteFinderSkeleton />}>
        <RouteFinder />
      </Suspense>
    </div>
  );
};

export default PassengerDashboardPage;
