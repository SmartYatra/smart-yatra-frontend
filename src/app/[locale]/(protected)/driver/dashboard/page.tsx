'use client';

import React from 'react';

import { BarChart, Calendar, ClipboardList } from 'lucide-react';

import DriverQrCode from './_components/driver-qr-code';
import {
  DashboardSubtitle,
  DashboardTitle,
} from './_components/page-components';
import RecentTrips from './_components/recent-trips';
import { Trip } from './_components/recent-trips/columns';
import StatsCard from './_components/stats-card';

const trips: Trip[] = [
  {
    id: '1',
    route: 'Kathmandu to Bhaktapur',
    passengers: 30,
    earnings: 3000,
    date: '2025-01-20',
    status: 'Completed',
  },
  {
    id: '2',
    route: 'Patan to Kathmandu',
    passengers: 25,
    earnings: 2500,
    date: '2025-01-20',
    status: 'Ongoing',
  },
  {
    id: '3',
    route: 'Bhaktapur to Lalitpur',
    passengers: 40,
    earnings: 4000,
    date: '2025-01-20',
    status: 'Completed',
  },
  {
    id: '4',
    route: 'Kathmandu to Pokhara',
    passengers: 20,
    earnings: 2000,
    date: '2025-01-20',
    status: 'Scheduled',
  },
  {
    id: '5',
    route: 'Kathmandu to Bhaktapur',
    passengers: 30,
    earnings: 3000,
    date: '2025-01-20',
    status: 'Completed',
  },
];

const statsData = [
  {
    id: 1,
    title: 'Trips Completed',
    value: 145,
    icon: BarChart,
  },
  {
    id: 2,
    title: 'Passengers Transported',
    value: '1,320',
    icon: ClipboardList,
  },
  {
    id: 3,
    title: 'Current Route',
    value: 'Kathmandu - Bhaktapur',
    icon: Calendar,
  },
  {
    id: 4,
    title: 'Next Scheduled Trip',
    value: '2:30 PM',
    icon: Calendar,
  },
];

const DriverDashboardPage = () => {
  return (
    <div>
      <div className='mb-8 flex flex-col items-start'>
        <DashboardTitle>
          Welcome Back!{' '}
          <span className='ml-1 text-xl text-muted-foreground'>
            Diwash Bhattarai
          </span>
        </DashboardTitle>
        <DashboardSubtitle>
          Here&apos;s a quick overview of your recent activities and earnings.
        </DashboardSubtitle>
      </div>

      {/* Dashboard Stats */}
      <section className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
        {statsData.map(({ id, title, value, icon: Icon }) => (
          <StatsCard Icon={Icon} id={id} key={id} title={title} value={value} />
        ))}
      </section>

      {/* Recent Trips */}
      <section className='mt-8 flex gap-4'>
        <div className='flex-1'>
          <DashboardTitle>Recent Trips</DashboardTitle>
          <DashboardSubtitle>
            Here&apos;s a list of your recent trips and their details.
          </DashboardSubtitle>

          <RecentTrips trips={trips} />
        </div>

        {/* QR code for bus with download/extract option */}
        <div>
          <DashboardTitle>QR Code for Bus</DashboardTitle>
          <DashboardSubtitle>
            Download or extract the QR code for your bus
          </DashboardSubtitle>

          <DriverQrCode />
        </div>
      </section>
    </div>
  );
};

export default DriverDashboardPage;
