import {
  Controller,
  useFieldArray,
  useForm,
  UseFormReset,
} from 'react-hook-form';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

import {
  manageRoutesSchema,
  ManageRoutesValues,
} from '../../_schema/manage-routes.schema';

interface IRouteFormProps {
  initialData?: ManageRoutesValues;
  isLoading?: boolean;
  onSubmit: (
    data: ManageRoutesValues,
    reset: UseFormReset<ManageRoutesValues>
  ) => void;
}

export function RouteForm({
  isLoading,
  initialData,
  onSubmit,
}: IRouteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      stops: [{ name: '', location_lat: '', location_lng: '', order: 0 }], // Initialize with one empty stop
    },
    resolver: zodResolver(manageRoutesSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stops',
  });

  const onFormSubmit = (data: ManageRoutesValues) => onSubmit(data, reset);

  return (
    <form
      className='relative max-h-[calc(100vh-96px)] space-y-4 overflow-y-auto px-1'
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className='space-y-2'>
        <Label htmlFor='name'>Route Name</Label>
        <Input
          required
          id='name'
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Input
          id='description'
          {...register('description')}
          error={errors.description?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <Controller
          control={control}
          defaultValue='active'
          name='status'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='distance'>Distance (km)</Label>
        <Input
          required
          id='distance'
          type='number'
          {...register('distance')}
          error={errors.distance?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='duration'>Duration (minutes)</Label>
        <Input
          required
          id='duration'
          type='number'
          {...register('duration')}
          error={errors.duration?.message}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='stops'>Stops</Label>
        {fields.map((stop, index) => (
          <div className='flex items-center gap-2' key={stop.id}>
            <div className='space-y-1'>
              <Label htmlFor={`stops.${index}.name`}>Stop Name</Label>
              <Input
                placeholder='Stop Name'
                {...register(`stops.${index}.name`)}
                defaultValue={stop.name}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor={`stops.${index}.location_lat`}>Latitude</Label>
              <Input
                placeholder='Latitude'
                type='number'
                {...register(`stops.${index}.location_lat`)}
                defaultValue={stop.location_lat}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor={`stops.${index}.location_lng`}>Longitude</Label>
              <Input
                placeholder='Longitude'
                type='number'
                {...register(`stops.${index}.location_lng`)}
                defaultValue={stop.location_lng}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor={`stops.${index}.order`}>Order</Label>
              <Input
                placeholder='Order'
                type='number'
                {...register(`stops.${index}.order`)}
                defaultValue={stop.order}
              />
            </div>
            <Button
              className='mt-6 p-3'
              type='button'
              variant='destructive'
              onClick={() => remove(index)}
            >
              <Trash2 className='h-6 w-6' />
            </Button>
          </div>
        ))}

        {/* Button to add new stop */}
        <Button
          type='button'
          variant='outline'
          onClick={() =>
            append({
              name: '',
              location_lat: '',
              location_lng: '',
              order: 0,
            })
          }
        >
          Add Stop
        </Button>
      </div>

      <div className='sticky bottom-0 mt-4 bg-background pt-4'>
        <Button className='w-full' isLoading={isLoading} type='submit'>
          {initialData?.id ? 'Update Route' : 'Add Route'}
        </Button>
      </div>
    </form>
  );
}
