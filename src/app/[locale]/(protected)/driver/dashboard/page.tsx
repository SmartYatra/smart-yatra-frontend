'use client';

import React from 'react';

import {
  DashboardSubtitle,
  DashboardTitle,
} from '@/components/dashboard-components';

import DriverQrCode from './_components/driver-qr-code';
import DriverStats from './_components/driver-stats';
import { StartTrip } from './_components/start-trip';

const DriverDashboardPage = () => {
  return (
    <div className='my-8 w-full space-y-8'>
      <DriverStats />

      {/* Recent Trips */}
      <section className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {/* QR code for bus with download/extract option */}
        <div className='w-full'>
          <DashboardTitle>QR Code for Bus</DashboardTitle>
          <DashboardSubtitle>
            Download or extract the QR code for your bus
          </DashboardSubtitle>

          <DriverQrCode />
        </div>

        {/* Select a route and start the trip */}
        <div className='flex size-full flex-col'>
          <DashboardTitle>Start a Trip</DashboardTitle>
          <DashboardSubtitle>
            Select a route and start the trip
          </DashboardSubtitle>

          <StartTrip />
        </div>
      </section>
    </div>
  );
};

export default DriverDashboardPage;
