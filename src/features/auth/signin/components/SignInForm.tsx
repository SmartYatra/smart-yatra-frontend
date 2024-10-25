import { useForm } from 'react-hook-form';

import { Lock, LogIn, Mail } from 'lucide-react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button, Input, Label } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import useSignIn from '../hooks/useSignIn';
import { SignInFormSchema, SignInFormValues } from '../schema';

const SignInForm = () => {
  const { mutate: signIn, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (values: SignInFormValues) => {
    signIn(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Enter your password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          leftIcon={Lock}
        />
      </div>

      {/* Submit */}
      <Button className="w-full">
        {isPending ? <LoadingSpinner /> : <LogIn className="mr-2 size-5" />}
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
