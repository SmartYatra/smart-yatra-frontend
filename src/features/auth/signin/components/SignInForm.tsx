import { useForm } from 'react-hook-form';

import { Lock } from 'lucide-react';

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

      {/* Submit */}
      <Button className="w-full">
        {isPending ? <LoadingSpinner /> : <Lock className="mr-2 size-4" />}
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
