import * as z from 'zod';

export const manageRoutesSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  status: z.enum(['active', 'inactive']),
  distance: z
    .number()
    .min(0, { message: 'Distance must be a positive number' }),
  duration: z
    .number()
    .min(0, { message: 'Duration must be a positive number' }),
  stops: z.array(
    z
      .object({
        name: z
          .string()
          .min(3, { message: 'Name must be at least 3 characters long' }),
        location_lat: z.string().min(1, { message: 'Location is required' }),
        location_lng: z.string().min(1, { message: 'Location is required' }),
        order: z
          .number()
          .min(1, { message: 'Order must be a positive number' }),
      })
      .strict()
  ),
});

export type ManageRoutesValues = z.infer<typeof manageRoutesSchema>;
