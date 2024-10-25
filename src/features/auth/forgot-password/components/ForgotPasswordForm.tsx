import { useForm } from 'react-hook-form';

import { Mail, SendHorizonal } from 'lucide-react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button, Input, Label } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import useForgotPassword from '../hooks/useForgotPassword';
import { ForgotPasswordFormSchema, ForgotPasswordFormValues } from '../schema';

const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword(values);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Enter your email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          leftIcon={Mail}
        />
      </div>

      {/* Submit */}
      <Button className="w-full">
        {isPending ? <LoadingSpinner /> : <SendHorizonal className="mr-2 size-5" />}
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
