import * as z from 'zod';

export const LoginFormSchema = z.object({
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
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
