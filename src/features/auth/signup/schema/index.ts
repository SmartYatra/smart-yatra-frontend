import * as z from 'zod';

export const SignUpFormSchema = z
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
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    userType: z.enum(['passenger', 'driver', 'administrator']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and Confirm Password must match',
    params: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
