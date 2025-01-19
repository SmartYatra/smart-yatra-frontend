import { useForm } from 'react-hook-form';

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

import { ManageRoutesValues } from '../../_schema/manage-routes.schema';

interface IRouteFormProps {
  onSubmit: (data: ManageRoutesValues) => void;
  initialData?: ManageRoutesValues;
}

export function RouteForm({ onSubmit, initialData }: IRouteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const onFormSubmit = (data: ManageRoutesValues) => {
    console.log(data);

    onSubmit(data);
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <Label htmlFor='name'>Route Name</Label>
        <Input
          required
          id='name'
          {...register('name')}
          error={errors.name?.message}
        />
      </div>
      <div>
        <Label htmlFor='type'>Type</Label>
        <Select {...register('type')}>
          <SelectTrigger>
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Bus'>Bus</SelectItem>
            <SelectItem value='Micro'>Micro</SelectItem>
            <SelectItem value='Tempo'>Tempo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='stops'>Number of Stops</Label>
        <Input
          required
          id='stops'
          type='number'
          {...register('stops')}
          error={errors.stops?.message}
        />
      </div>
      <div>
        <Label htmlFor='frequency'>Frequency</Label>
        <Input
          required
          id='frequency'
          {...register('frequency')}
          error={errors.frequency?.message}
        />
      </div>
      <Button className='w-full' type='submit'>
        {initialData?.id ? 'Update Route' : 'Add Route'}
      </Button>
    </form>
  );
}
