import * as z from 'zod';

export const manageRoutesSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  distance: z.number(),
  duration: z.number(),
  stops: z.array(
    z.object({
      name: z.string(),
      location_lat: z.string(),
      location_lng: z.string(),
      order: z.number(),
    })
  ),
});

export type ManageRoutesValues = z.infer<typeof manageRoutesSchema>;
