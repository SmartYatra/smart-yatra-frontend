import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';

// Define the shape of the data
export type Trip = {
  id: string;
  route: string;
  passengers: number;
  earnings: number;
  status: 'Completed' | 'Ongoing' | 'Scheduled';
};

// Columns definition for the data table
export const columns: ColumnDef<Trip>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'route',
    header: 'Route',
  },
  {
    accessorKey: 'passengers',
    header: 'Passengers',
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('passengers')}</span>
    ),
  },
  {
    accessorKey: 'earnings',
    header: 'Earnings',
    cell: ({ row }) => {
      const earnings = row.getValue('earnings');
      return (
        <span className='font-medium text-green-600'>
          NPR {(earnings as number).toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      const statusColor =
        status === 'Completed'
          ? 'text-green-500'
          : status === 'Ongoing'
            ? 'text-yellow-500'
            : 'text-gray-500';
      return (
        <span className={`font-medium ${statusColor}`}>{status as string}</span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const trip = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-8 w-8 p-0' variant='ghost'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>View Trip Details</DropdownMenuItem>
            <DropdownMenuItem>Download Trip Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
