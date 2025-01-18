'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';

import { columns, Earnings } from './columns';
import { DataTable } from './data-table';

interface IEarningsProps {
  earningsData: Earnings[];
  dateRange?: DateRange;
  statusFilter?: string | null;
}

const EarningsTable = ({
  earningsData,
  dateRange,
  statusFilter,
}: IEarningsProps) => {
  // Filter by status and date range
  const filteredEarnings = earningsData.filter(earning => {
    const earningDate = new Date(earning.date); // Convert the earning date to a Date object
    const inStatus =
      !statusFilter ||
      statusFilter === 'All' ||
      earning.status === statusFilter;
    const inDateRange =
      (!dateRange?.from || earningDate >= dateRange?.from) &&
      (!dateRange?.to || earningDate <= dateRange?.to);
    return inStatus && inDateRange;
  });

  return <DataTable columns={columns} data={filteredEarnings} />;
};

export default EarningsTable;
