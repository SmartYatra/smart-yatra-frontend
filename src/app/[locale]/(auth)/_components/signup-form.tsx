'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Lock, Mail, UserPlus } from 'lucide-react';

import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

import useSignup from '../_hooks/useSignup';
import { SignupFormSchema, SignupFormValues } from '../_schema';

const SignupForm = () => {
  const { mutate: signup, isPending } = useSignup();

  const defaultValues: SignupFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'driver',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<SignupFormValues> = values => {
    signup(values);
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className='space-y-2'>
        <Label htmlFor='name'>Full Name</Label>
        <Input
          id='name'
          placeholder='Enter your full name'
          type='name'
          {...register('name')}
          error={errors.name?.message}
          leftIcon={Mail}
        />
      </div>

      {/* Email */}
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          placeholder='Enter your email'
          type='email'
          {...register('email')}
          error={errors.email?.message}
          leftIcon={Mail}
        />
      </div>

      {/* Password */}
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          placeholder='Enter your password'
          type='password'
          {...register('password')}
          error={errors.password?.message}
          leftIcon={Lock}
        />
      </div>

      {/* Confirm Password */}
      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input
          id='confirmPassword'
          placeholder='Confirm your password'
          type='password'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          leftIcon={Lock}
        />
      </div>

      {/* Submit */}
      <Button className='w-full'>
        {isPending ? <LoadingSpinner /> : <UserPlus className='mr-2 h-4 w-4' />}
        Sign up
      </Button>
    </form>
  );
};

export { SignupForm };
