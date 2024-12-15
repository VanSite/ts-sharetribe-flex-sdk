import { z } from 'zod';
import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import Money from '../sdkTypes/Money';
import LatLngBounds from '../sdkTypes/LatLngBounds';
declare const typeHandlerSchema: z.ZodObject<{
    sdkType: z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>;
    appType: z.ZodAny;
    reader: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>], z.ZodUnknown>, z.ZodAny>>;
    writer: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny], z.ZodUnknown>, z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>>>;
    canHandle: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        key: z.ZodString;
        value: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: any;
    }, {
        key: string;
        value?: any;
    }>], z.ZodUnknown>, z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    sdkType: Date | UUID | LatLng | LatLngBounds | Money;
    appType?: any;
    reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
    writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
    canHandle?: ((args_0: {
        key: string;
        value?: any;
    }, ...args: unknown[]) => boolean) | undefined;
}, {
    sdkType: Date | UUID | LatLng | LatLngBounds | Money;
    appType?: any;
    reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
    writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
    canHandle?: ((args_0: {
        key: string;
        value?: any;
    }, ...args: unknown[]) => boolean) | undefined;
}>;
export type TypeHandler = z.infer<typeof typeHandlerSchema>;
export declare const defaultSdkConfig: z.ZodObject<{
    clientId: z.ZodOptional<z.ZodString>;
    clientSecret: z.ZodOptional<z.ZodString>;
    baseUrl: z.ZodDefault<z.ZodString>;
    assetCdnBaseUrl: z.ZodDefault<z.ZodString>;
    version: z.ZodDefault<z.ZodString>;
    transitVerbose: z.ZodDefault<z.ZodBoolean>;
    tokenStore: z.ZodDefault<z.ZodObject<{
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
    }>>;
    typeHandlers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        sdkType: z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>;
        appType: z.ZodAny;
        reader: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>], z.ZodUnknown>, z.ZodAny>>;
        writer: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny], z.ZodUnknown>, z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>>>;
        canHandle: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            key: z.ZodString;
            value: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: any;
        }, {
            key: string;
            value?: any;
        }>], z.ZodUnknown>, z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }, {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    baseUrl: string;
    assetCdnBaseUrl: string;
    version: string;
    tokenStore: {
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
    };
    transitVerbose: boolean;
    typeHandlers: {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }[];
    clientId?: string | undefined;
    clientSecret?: string | undefined;
}, {
    clientId?: string | undefined;
    clientSecret?: string | undefined;
    baseUrl?: string | undefined;
    assetCdnBaseUrl?: string | undefined;
    version?: string | undefined;
    tokenStore?: {
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
    } | undefined;
    transitVerbose?: boolean | undefined;
    typeHandlers?: {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }[] | undefined;
}>;
export declare const sdkConfig: z.ZodObject<{
    clientId: z.ZodEffects<z.ZodString, string, string>;
    clientSecret: z.ZodOptional<z.ZodString>;
    baseUrl: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    assetCdnBaseUrl: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    version: z.ZodOptional<z.ZodString>;
    tokenStore: z.ZodOptional<z.ZodObject<{
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
    }>>;
    secure: z.ZodOptional<z.ZodBoolean>;
    transitVerbose: z.ZodOptional<z.ZodBoolean>;
    authToken: z.ZodOptional<z.ZodString>;
    typeHandlers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        sdkType: z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>;
        appType: z.ZodAny;
        reader: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>], z.ZodUnknown>, z.ZodAny>>;
        writer: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny], z.ZodUnknown>, z.ZodUnion<[z.ZodType<UUID, z.ZodTypeDef, UUID>, z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodType<LatLngBounds, z.ZodTypeDef, LatLngBounds>, z.ZodType<Money, z.ZodTypeDef, Money>, z.ZodType<Date, z.ZodTypeDef, Date>]>>>;
        canHandle: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            key: z.ZodString;
            value: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: any;
        }, {
            key: string;
            value?: any;
        }>], z.ZodUnknown>, z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }, {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    clientId: string;
    clientSecret?: string | undefined;
    baseUrl?: string | undefined;
    assetCdnBaseUrl?: string | undefined;
    version?: string | undefined;
    tokenStore?: {
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
    } | undefined;
    secure?: boolean | undefined;
    transitVerbose?: boolean | undefined;
    authToken?: string | undefined;
    typeHandlers?: {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }[] | undefined;
}, {
    clientId: string;
    clientSecret?: string | undefined;
    baseUrl?: string | undefined;
    assetCdnBaseUrl?: string | undefined;
    version?: string | undefined;
    tokenStore?: {
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
    } | undefined;
    secure?: boolean | undefined;
    transitVerbose?: boolean | undefined;
    authToken?: string | undefined;
    typeHandlers?: {
        sdkType: Date | UUID | LatLng | LatLngBounds | Money;
        appType?: any;
        reader?: ((args_0: Date | UUID | LatLng | LatLngBounds | Money, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => Date | UUID | LatLng | LatLngBounds | Money) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    }[] | undefined;
}>;
export type SdkConfig = z.infer<typeof sdkConfig>;
export {};
