import * as z from 'zod';

export const busDetailsSchema = z.object({
  busName: z.string().min(1, 'Bus Name is required'),
  busNumber: z.string().min(1, 'Bus Number is required'),
});

export const routeDetailsSchema = z.object({
  routeStart: z.string().min(1, 'Start Location is required'),
  routeEnd: z.string().min(1, 'End Location is required'),
});

export const uploadDocumentsSchema = z.object({
  documents: z
    .array(z.instanceof(File))
    .min(1, 'At least one document is required'),
});

export const finishStepSchema = z.object({
  busName: z.string(),
  busNumber: z.string(),
  routeStart: z.string(),
  routeEnd: z.string(),
  documents: z.array(z.instanceof(File)),
});

export type TBusDetailsValues = z.infer<typeof busDetailsSchema>;
export type TRouteDetailsValues = z.infer<typeof routeDetailsSchema>;
export type TUploadDocumentsValues = z.infer<typeof uploadDocumentsSchema>;
export type TFinishStepValues = z.infer<typeof finishStepSchema>;
