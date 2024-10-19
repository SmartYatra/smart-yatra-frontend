import { Controller, useForm } from 'react-hook-form';

import { UserPlus } from 'lucide-react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button, Input, Label } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';

import useSignUp from '../hooks/useSignUp';
import { SignUpFormSchema, SignUpFormValues } from '../schema';

const defaultValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'passenger',
};

const SignUpForm = () => {
  const { mutate: signUp, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // Add control here
  } = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues,
    mode: 'all',
  });

  const onSubmit = (values: SignUpFormValues) => {
    signUp(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" {...register('name')} error={errors.name?.message} />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} error={errors.email?.message} />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* User Type */}
      <div className="space-y-2">
        <Label htmlFor="user-type">User Type</Label>
        <Controller
          control={control}
          name="userType"
          render={({ field }) => (
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.userType && (
          <div className="text-sm text-destructive">{errors.userType.message}</div>
        )}
      </div>

      {/* Submit */}
      <Button className="w-full">
        {isPending ? <LoadingSpinner /> : <UserPlus className="mr-2 h-4 w-4" />}
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
