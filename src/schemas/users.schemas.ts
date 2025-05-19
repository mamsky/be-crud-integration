import { z } from 'zod';

export const UsersSchemaDTO = z.object({
  username: z.string(),
  password: z.string(),
});

export type UsersSchemas = z.infer<typeof UsersSchemaDTO>;
