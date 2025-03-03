'use client';

import React, { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import RouteFinder from './_components/route-finder';
import ScanQRCode from './_components/scan-qr-code';

const PassengerDashboardPage = () => {
  const [mode, setMode] = useState<'onboard' | 'exit'>('onboard');

  return (
    <div className='flex flex-col gap-4'>
      <ToggleGroup
        className='flex justify-center'
        type='single'
        value={mode}
        onValueChange={value => setMode(value as 'onboard' | 'exit')}
      >
        <ToggleGroupItem className='w-32' value='onboard'>
          Onboard
        </ToggleGroupItem>
        <ToggleGroupItem className='w-32' value='exit'>
          Exit
        </ToggleGroupItem>
      </ToggleGroup>

      <ScanQRCode mode={mode} />

      <RouteFinder />
    </div>
  );
};

export default PassengerDashboardPage;
