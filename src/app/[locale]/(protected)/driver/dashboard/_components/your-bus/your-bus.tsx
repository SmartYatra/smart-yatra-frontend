'use client';

import React, { useEffect, useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import {
  Bus,
  Calendar,
  Clock,
  Edit,
  Map,
  Save,
  Tag,
  User,
  Users,
  X,
} from 'lucide-react';

import { useFetchRoutes } from '@/app/[locale]/(protected)/admin/dashboard/_hooks/useFetchRoutes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetYourBus } from '../../_hooks/useGetYourBus';
import { useUpdateBus } from '../../_hooks/useUpdateBus';
import { TYourBusData, yourBusSchema } from '../../_schema';
import { BusCardSkeleton } from '../../your-bus/page';

const YourBus = () => {
  const { data, isFetching } = useGetYourBus();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateBus } = useUpdateBus();
  const { data: routesData } = useFetchRoutes();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      bus_number: '',
      status: 'active' as 'active' | 'inactive',
      route_id: 0,
      model: '',
      capacity: 0,
    },
    resolver: zodResolver(yourBusSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        bus_number: data.bus_number,
        status: data.status,
        route_id: data.route_id,
        model: data.model,
        capacity: data.capacity,
      });
    }
  }, [data, reset]);

  if (isFetching) return <BusCardSkeleton />;
  if (!data) return <div>No data found</div>;

  const onSubmit = (formData: TYourBusData) => {
    updateBus(
      {
        busId: data.id,
        payload: {
          bus_number: formData.bus_number,
          status: formData.status,
          route_id: formData.route_id,
          model: formData.model,
          capacity: formData.capacity,
        },
      },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='flex items-center'>
            <Bus className='mr-2 h-6 w-6' />
            Your Bus
          </span>
          <Badge variant={data.status === 'active' ? 'success' : 'destructive'}>
            {data.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {isEditing ? (
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              label='Bus Number'
              name='bus_number'
              rules={{ required: 'Bus number is required' }}
            />
            <FormField
              control={control}
              label='Model'
              name='model'
              rules={{ required: 'Model is required' }}
            />
            <FormField
              control={control}
              label='Capacity'
              name='capacity'
              type='number'
              rules={{
                required: 'Capacity is required',
                min: { value: 1, message: 'Capacity must be at least 1' },
              }}
            />

            <Controller
              control={control}
              name='route_id'
              rules={{ required: 'Route is required' }}
              render={({ field }) => (
                <div className='space-y-2'>
                  <Label htmlFor='route_id'>Route</Label>
                  <Select
                    value={String(field.value)}
                    onValueChange={value => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Route' />
                    </SelectTrigger>
                    <SelectContent>
                      {routesData?.data.map(route => (
                        <SelectItem key={route.id} value={String(route.id)}>
                          {route.name} - {route.distance} km
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              control={control}
              name='status'
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <div className='space-y-2'>
                  <Label htmlFor='status'>Status</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='inactive'>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </form>
        ) : (
          <>
            <div className='grid grid-cols-2 gap-4'>
              <InfoItem
                icon={<Tag />}
                label='Bus Number'
                value={data.bus_number}
              />
              <InfoItem
                icon={<Users />}
                label='Capacity'
                value={data.capacity.toString()}
              />
            </div>
            <InfoItem icon={<Bus />} label='Model' value={data.model} />
            {/* <InfoItem
              icon={<MapPin />}
              label='Current Location'
              value={`${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}`}
            /> */}
            <div className='grid grid-cols-2 gap-4'>
              <InfoItem
                icon={<Calendar />}
                label='Created At'
                value={new Date(data.created_at).toLocaleDateString()}
              />
              <InfoItem
                icon={<Clock />}
                label='Last Updated'
                value={new Date(data.updated_at).toLocaleString()}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InfoItem
                icon={<User />}
                label='Driver ID'
                value={data.driver_id.toString()}
              />
              <InfoItem
                icon={<Map />}
                label='Route ID'
                value={data.route_id.toString()}
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        {isEditing ? (
          <>
            <Button type='submit' onClick={handleSubmit(onSubmit)}>
              <Save className='mr-2 h-4 w-4' />
              Save Changes
            </Button>
            <Button variant='outline' onClick={() => setIsEditing(false)}>
              <X className='mr-2 h-4 w-4' />
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className='mr-2 h-4 w-4' />
            Edit Bus Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className='flex items-center space-x-2'>
    {icon}
    <span className='font-medium'>{label}:</span>
    <span>{value}</span>
  </div>
);

interface IFormFieldProps {
  control: Control<TYourBusData>;
  name: keyof TYourBusData;
  label: string;
  rules: {
    required?: string | { value: boolean; message: string };
    min?: { value: number; message: string };
  };
  type?: string;
}

const FormField = ({
  control,
  name,
  label,
  rules,
  type = 'text',
}: IFormFieldProps) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <div className='space-y-2'>
        <Label htmlFor={name}>{label}</Label>
        <Input type={type} {...field} />
        {error && <p className='text-sm text-destructive'>{error.message}</p>}
      </div>
    )}
  />
);

export default YourBus;
