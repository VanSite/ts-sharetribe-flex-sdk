import { z } from 'zod';
declare const authToken: z.ZodObject<{
    access_token: z.ZodString;
    token_type: z.ZodLiteral<"bearer">;
    expires_in: z.ZodNumber;
    scope: z.ZodOptional<z.ZodEnum<["public-read", "trusted:user", "user", "integ"]>>;
    refresh_token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
    refresh_token?: string | undefined;
}, {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
    refresh_token?: string | undefined;
}>;
export type AuthToken = z.infer<typeof authToken>;
export declare const tokenStore: z.ZodObject<{
    token: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        access_token: z.ZodString;
        token_type: z.ZodLiteral<"bearer">;
        expires_in: z.ZodNumber;
        scope: z.ZodOptional<z.ZodEnum<["public-read", "trusted:user", "user", "integ"]>>;
        refresh_token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }>>>;
    expiration: z.ZodOptional<z.ZodNumber>;
    getToken: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodPromise<z.ZodNullable<z.ZodObject<{
        access_token: z.ZodString;
        token_type: z.ZodLiteral<"bearer">;
        expires_in: z.ZodNumber;
        scope: z.ZodOptional<z.ZodEnum<["public-read", "trusted:user", "user", "integ"]>>;
        refresh_token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }>>>>;
    setToken: z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        access_token: z.ZodString;
        token_type: z.ZodLiteral<"bearer">;
        expires_in: z.ZodNumber;
        scope: z.ZodOptional<z.ZodEnum<["public-read", "trusted:user", "user", "integ"]>>;
        refresh_token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }, {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }>], z.ZodUnknown>, z.ZodVoid>;
    removeToken: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodVoid>;
}, "strip", z.ZodTypeAny, {
    getToken: (...args: unknown[]) => Promise<{
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    } | null>;
    setToken: (args_0: {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }, ...args: unknown[]) => void;
    removeToken: (...args: unknown[]) => void;
    token?: {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    } | null | undefined;
    expiration?: number | undefined;
}, {
    getToken: (...args: unknown[]) => Promise<{
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    } | null>;
    setToken: (args_0: {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    }, ...args: unknown[]) => void;
    removeToken: (...args: unknown[]) => void;
    token?: {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    } | null | undefined;
    expiration?: number | undefined;
}>;
export type TokenStore = z.infer<typeof tokenStore>;
export {};
