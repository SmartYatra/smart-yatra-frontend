'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Mail, Send } from 'lucide-react';

import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

import useForgotPassword from '../_hooks/useForgotPassword';
import { ForgotPasswordFormSchema, ForgotPasswordFormValues } from '../_schema';

const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const defaultValues: ForgotPasswordFormValues = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = values => {
    forgotPassword(values);
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

      {/* Submit */}
      <Button className='w-full'>
        {isPending ? <LoadingSpinner /> : <Send className='mr-2 h-4 w-4' />}
        Send Reset Link
      </Button>
    </form>
  );
};

export { ForgotPasswordForm };
