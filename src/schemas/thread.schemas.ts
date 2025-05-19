import { z } from 'zod';

export const ThreadSchemas = z.object({
  thread: z.string().min(1, { message: 'thread required' }),
});

export type ThreadSchemasDTO = z.infer<typeof ThreadSchemas>;
