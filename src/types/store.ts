import { z } from 'zod';

const authToken = z.object({
  access_token: z.string(),
  token_type: z.literal("bearer"),
  expires_in: z.number(),
  scope: z.enum(["public-read", "trusted:user", "user", 'integ']).optional(),
  refresh_token: z.string().optional(),
});

export type AuthToken = z.infer<typeof authToken>;

export const tokenStore = z.object({
  token: authToken.optional().nullable(),
  expiration: z.number().optional(),
  getToken: z.function().returns(z.promise(authToken.nullable())),
  setToken: z.function().args(z.object({
    access_token: z.string(),
    token_type: z.literal("bearer"),
    expires_in: z.number(),
    scope: z.enum(["public-read", "trusted:user", "user", 'integ']).optional(),
    refresh_token: z.string().optional()
  })).returns(z.void()),
  removeToken: z.function().returns(z.void()),
});

export type TokenStore = z.infer<typeof tokenStore>;