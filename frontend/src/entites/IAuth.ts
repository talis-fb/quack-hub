import { z } from 'zod'

export const Auth = z.object({
  access_token: z.string()
});

export type IAuth = z.infer<typeof Auth>;
