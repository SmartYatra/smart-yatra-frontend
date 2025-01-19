import React from 'react';
import { DateRange } from 'react-day-picker';

import { columns, Trip } from './columns';
import { DataTable } from './data-table';

interface IRecentTripsProps {
  trips: Trip[];
  dateRange?: DateRange;
  statusFilter?: string | null;
}

const RecentTrips = ({ trips, dateRange, statusFilter }: IRecentTripsProps) => {
  // Filter by status and date range
  const filteredTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date); // Convert the trip date to a Date object
    const inStatus =
      !statusFilter || statusFilter === 'All' || trip.status === statusFilter;
    const inDateRange =
      (!dateRange?.from || tripDate >= dateRange?.from) &&
      (!dateRange?.to || tripDate <= dateRange?.to);
    return inStatus && inDateRange;
  });

  return <DataTable columns={columns} data={filteredTrips} />;
};

export default RecentTrips;
