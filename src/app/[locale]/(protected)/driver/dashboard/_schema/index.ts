import * as z from 'zod';

export const yourBusSchema = z.object({
  bus_number: z.string().min(1, { message: 'Bus number is required' }),
  status: z.enum(['active', 'inactive']),
  route_id: z.number().int().min(1, { message: 'Route ID is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  capacity: z.number().int().min(1, { message: 'Capacity is required' }),
});

export type TYourBusData = z.infer<typeof yourBusSchema>;
