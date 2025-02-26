import * as z from 'zod';

export const busDetailsSchema = z.object({
  busNumber: z.string().min(1, 'Bus Number is required'),
  capacity: z.number().min(1, 'Capacity is required'),
  status: z.enum(['active', 'inactive']),
  model: z.string().min(1, 'Model is required'),
  driverId: z.number().nullable(),
});

export const routeDetailsSchema = z.object({
  routeId: z.number().min(1, 'Route is required'),
});

export const finishStepSchema = z.object({
  busNumber: z.string().min(1, 'Bus Number is required'),
  capacity: z.number().min(1, 'Capacity is required'),
  status: z.enum(['active', 'inactive']),
  model: z.string().min(1, 'Model is required'),
  driverId: z.number().nullable(),
  routeId: z.number().min(1, 'Route is required'),
});

export type TBusDetailsValues = z.infer<typeof busDetailsSchema>;
export type TRouteDetailsValues = z.infer<typeof routeDetailsSchema>;
export type TFinishStepValues = z.infer<typeof finishStepSchema>;
