'use client';

import React from 'react';

import { BarChart, ClipboardList, Truck, Users } from 'lucide-react';

import {
  DashboardSubtitle,
  DashboardTitle,
} from '@/components/dashboard-components';

import RecentActivities from './_components/recent-activities';
import StatsCard from './_components/stats-card';

const statsData = [
  {
    id: 1,
    title: 'Active Drivers',
    value: 25,
    icon: Users,
  },
  {
    id: 2,
    title: 'Total Trips Completed',
    value: 1200,
    icon: BarChart,
  },
  {
    id: 3,
    title: 'Buses in Service',
    value: '40',
    icon: Truck,
  },
  {
    id: 4,
    title: 'Pending Issues',
    value: '3',
    icon: ClipboardList,
  },
];

const recentActivities = [
  {
    id: '1',
    action: 'Driver Registration',
    date: '2025-01-19',
    status: 'Completed',
    user: 'Diwash Bhattarai',
  },
  {
    id: '2',
    action: 'Trip Scheduling',
    date: '2025-01-18',
    status: 'Completed',
    user: 'Niroj Neupane',
  },
  {
    id: '3',
    action: 'Bus Inspection',
    date: '2025-01-17',
    status: 'Ongoing',
    user: 'Ayush Neupane',
  },
  {
    id: '4',
    action: 'System Update',
    date: '2025-01-16',
    status: 'Scheduled',
    user: 'Diwash Bhattarai',
  },
];

const AdminDashboardPage = () => {
  return (
    <div>
      <div className='mb-8 flex flex-col items-start'>
        <DashboardTitle>Admin Dashboard</DashboardTitle>
        <DashboardSubtitle>
          Welcome to the admin dashboard. Here you can view and manage all the
          activities and data related to the system.
        </DashboardSubtitle>
      </div>

      {/* Dashboard Stats */}
      <section className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
        {statsData.map(({ id, title, value, icon: Icon }) => (
          <StatsCard Icon={Icon} id={id} key={id} title={title} value={value} />
        ))}
      </section>

      {/* Recent Activities */}
      <section className='mt-8'>
        <DashboardTitle>Recent Activities</DashboardTitle>
        <DashboardSubtitle>
          A quick overview of recent actions taken by the system administrators
          and staff.
        </DashboardSubtitle>

        <RecentActivities activities={recentActivities} />
      </section>
    </div>
  );
};

export default AdminDashboardPage;
