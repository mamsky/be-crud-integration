import { z } from 'zod';

export const UsersSchemaDTO = z.object({
  username: z.string().min(1, { message: 'username required' }),
  password: z.string().min(1, { message: 'password required' }),
});

export type UsersSchemas = z.infer<typeof UsersSchemaDTO>;
