import { useForm } from 'react-hook-form';

import { Mail } from 'lucide-react';
import * as z from 'zod';

import { Button, Input, Label } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgotPasswordFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

const ForgotPasswordForm = () => {
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
    console.log(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      {/* Submit */}
      <Button className="w-full">
        <Mail className="mr-2 h-4 w-4" /> Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
