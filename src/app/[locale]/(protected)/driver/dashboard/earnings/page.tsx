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

import EarningsTable from '../_components/earnings';
import { Earnings } from '../_components/earnings/columns';

const EarningsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  // Sample earnings data - replace with dynamic data
  const earningsData: Earnings[] = [
    {
      id: '1',
      date: '2025-01-20',
      route: 'Kathmandu to Bhaktapur',
      earnings: 3000,
      passengers: 30,
      status: 'Completed',
    },
    {
      id: '2',
      date: '2025-01-20',
      route: 'Patan to Kathmandu',
      earnings: 2500,
      passengers: 25,
      status: 'Ongoing',
    },
    {
      id: '3',
      date: '2025-01-20',
      route: 'Bhaktapur to Lalitpur',
      earnings: 4000,
      passengers: 40,
      status: 'Completed',
    },
    {
      id: '4',
      date: '2025-01-20',
      route: 'Kathmandu to Pokhara',
      earnings: 2000,
      passengers: 20,
      status: 'Scheduled',
    },
    {
      id: '5',
      date: '2025-01-20',
      route: 'Kathmandu to Bhaktapur',
      earnings: 3000,
      passengers: 30,
      status: 'Completed',
    },
  ];

  const totalEarnings = earningsData.reduce(
    (sum, trip) => sum + trip.earnings,
    0
  );
  const totalTrips = earningsData.length;

  // Export to CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(earningsData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'earnings_data.csv';
    link.click();
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Earnings Data', 10, 10);

    // Add table headers
    doc.text('ID', 10, 20);
    doc.text('Route', 30, 20);
    doc.text('Earnings', 90, 20);
    doc.text('Passengers', 130, 20);
    doc.text('Status', 170, 20);
    doc.text('Date', 200, 20);

    // Add data rows
    let yOffset = 30;
    earningsData.forEach(trip => {
      doc.text(String(trip.id), 10, yOffset);
      doc.text(trip.route, 30, yOffset);
      doc.text(trip.earnings.toLocaleString(), 90, yOffset);
      doc.text(String(trip.passengers), 130, yOffset);
      doc.text(trip.status, 170, yOffset);
      doc.text(trip.date, 200, yOffset);
      yOffset += 10;
    });

    doc.save('earnings_data.pdf');
  };

  // Handle export
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
        <h1 className='text-2xl font-bold'>Earnings</h1>
      </div>

      {/* Earnings Summary */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{`₹${totalEarnings}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalTrips}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Earnings per Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{`₹${(totalEarnings / totalTrips).toFixed(2)}`}</div>
          </CardContent>
        </Card>
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

      {/* Earnings Table */}
      <EarningsTable
        dateRange={date}
        earningsData={earningsData}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default EarningsPage;
