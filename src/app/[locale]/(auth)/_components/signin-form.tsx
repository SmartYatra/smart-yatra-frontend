'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Lock, LogIn, Mail } from 'lucide-react';

import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

import useSignin from '../_hooks/useSignin';
import { SigninFormSchema, SigninFormValues } from '../_schema';

const SigninForm = () => {
  const { mutate: signIn, isPending } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<SigninFormValues> = values => {
    signIn(values);
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
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

      {/* Submit */}
      <Button className='w-full'>
        {isPending ? <LoadingSpinner /> : <LogIn className='mr-2 size-5' />}
        Login
      </Button>
    </form>
  );
};

export { SigninForm };
