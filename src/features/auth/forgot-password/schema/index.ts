import * as z from 'zod';

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;
