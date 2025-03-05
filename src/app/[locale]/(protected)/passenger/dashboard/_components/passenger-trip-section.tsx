'use client';

import React from 'react';

import ScanQRCode from './scan-qr-code';
import TripStatusCard from './trip-status-card';

import { usePassengerTripStatus } from '../_hooks/usePassengerTripStatus';

const PassengerTripSection = () => {
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
