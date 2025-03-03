'use client';

import React from 'react';

import {
  DashboardSubtitle,
  DashboardTitle,
} from '@/components/dashboard-components';

import DriverQrCode from './_components/driver-qr-code';
import { StartTrip } from './_components/start-trip';

const DriverDashboardPage = () => {
  return (
    <div className='my-8'>
      {/* Recent Trips */}
      <section className='flex flex-col gap-16 lg:flex-row'>
        {/* QR code for bus with download/extract option */}
        <div className='w-full max-w-[22rem]'>
          <DashboardTitle>QR Code for Bus</DashboardTitle>
          <DashboardSubtitle>
            Download or extract the QR code for your bus
          </DashboardSubtitle>

          <DriverQrCode />
        </div>

        {/* Select a route and start the trip */}
        <div className='w-full'>
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
