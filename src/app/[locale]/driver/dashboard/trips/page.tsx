'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { addDays } from 'date-fns';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import RecentTrips from '../_components/recent-trips';
import { Trip } from '../_components/recent-trips/columns';

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

const TripsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  const exportToCSV = () => {
    const csv = Papa.unparse(trips);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'trips_data.csv';
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(12);
    doc.text('Recent Trips', 10, 10);

    // Add table headers
    doc.text('ID', 10, 20);
    doc.text('Status', 30, 20);
    doc.text('Date', 60, 20);
    doc.text('Route', 90, 20);
    doc.text('Passenger', 150, 20);
    doc.text('Earnings', 180, 20);

    // Add data rows
    let yOffset = 30;
    trips.forEach(trip => {
      doc.text(String(trip.id), 10, yOffset);
      doc.text(trip.status, 30, yOffset);
      doc.text(trip.date, 60, yOffset);
      doc.text(trip.route, 90, yOffset);
      doc.text(trip.passengers.toString(), 150, yOffset);
      doc.text(trip.earnings.toLocaleString(), 180, yOffset);
      yOffset += 10;
    });

    doc.save('trips_data.pdf');
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      exportToCSV();
    } else if (format === 'pdf') {
      exportToPDF();
    }
  };

  return (
    <div className='space-y-6 py-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Trips</h1>
      </div>

      {/* Filters */}
      <div className='flex flex-wrap items-center gap-4'>
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              {statusFilter || 'Filter by Status'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {['All', 'Completed', 'Ongoing', 'Canceled'].map(status => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Picker */}
        <DatePickerWithRange date={date} setDate={setDate} />

        {/* Export Buttons */}
        <div className='ml-auto flex gap-2'>
          <Button variant='outline' onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
          <Button variant='outline' onClick={() => handleExport('pdf')}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Recent Trips Table */}
      <Card className='border'>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTrips
            dateRange={date}
            statusFilter={statusFilter}
            trips={trips}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TripsPage;
