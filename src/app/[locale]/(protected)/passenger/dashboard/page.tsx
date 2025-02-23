'use client';

import React from 'react';

import RouteFinder from './_components/route-finder';
import ScanQRCode from './_components/scan-qr-code';

const PassengerDashboardPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <ScanQRCode />
      <RouteFinder />
    </div>
  );
};

export default PassengerDashboardPage;
