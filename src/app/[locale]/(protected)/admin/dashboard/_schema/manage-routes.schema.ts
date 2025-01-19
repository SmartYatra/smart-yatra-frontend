import * as z from 'zod';

export const manageRoutesSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  stops: z.number(),
  frequency: z.string(),
});

export type ManageRoutesValues = z.infer<typeof manageRoutesSchema>;
