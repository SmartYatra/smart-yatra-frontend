import { useForm } from 'react-hook-form';

import { UserPlus } from 'lucide-react';
import * as z from 'zod';

import { Button, Input, Label } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    userType: z.enum(['passenger', 'driver', 'administrator']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and Confirm Password must match',
    params: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

const defaultValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'passenger',
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues,
    mode: 'all',
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

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
        <Select {...register('userType')}>
          <SelectTrigger>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passenger">Passenger</SelectItem>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="administrator">Administrator</SelectItem>
          </SelectContent>
        </Select>

        {errors.userType && (
          <div className="text-sm text-destructive">
            {errors.userType.message}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button className="w-full">
        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
