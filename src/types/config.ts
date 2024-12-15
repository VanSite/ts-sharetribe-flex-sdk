import { z } from 'zod';
import { tokenStore } from './store';
import MemoryStore from '../utils/stores/memory-store';
import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import Money from '../sdkTypes/Money';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import BigDecimal from "../sdkTypes/BigDecimal";

const sdkTypesSchema = z.union([
  z.instanceof(UUID),
  z.instanceof(LatLng),
  z.instanceof(LatLngBounds),
  z.instanceof(Money),
  z.instanceof(BigDecimal),
  z.instanceof(Date),
])

const appTypeSchema = z.any()

export const typeHandlerSchema = z.object({
  sdkType: sdkTypesSchema,
  appType: appTypeSchema,
  reader: z
    .function()
    .args(sdkTypesSchema)
    .returns(appTypeSchema)
    .optional(),
  writer: z
    .function()
    .args(appTypeSchema)
    .returns(sdkTypesSchema)
    .optional(),
  canHandle: z
    .function()
    .args(z.object({key: z.string(), value: z.any()}))
    .returns(z.boolean())
    .optional(),
})

export type TypeHandler = z.infer<typeof typeHandlerSchema>;

export const defaultSdkConfig = z.object({
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  baseUrl: z.string().default('https://flex-api.sharetribe.com'),
  assetCdnBaseUrl: z.string().default('https://cdn.st-api.com'),
  version: z.string().default('v1'),
  transitVerbose: z.boolean().default(false),
  tokenStore: tokenStore.default(new MemoryStore()),
  typeHandlers: z.array(typeHandlerSchema).default([]),
})

export const sdkConfig = z.object({
  clientId: z.string().refine(v => v.length > 0, "clientId is required'"),
  clientSecret: z.string().optional(),
  baseUrl: z.string().refine(v => v.charAt(v.length - 1) !== "/", "baseUrl should not finish with a \"/\".").optional(),
  assetCdnBaseUrl: z.string().refine(v => v.charAt(v.length - 1) !== "/", "assetCdnBaseUrl should not finish with a \"/\".").optional(),
  version: z.string().optional(),
  tokenStore: tokenStore.optional(),
  secure: z.boolean().optional(),
  transitVerbose: z.boolean().optional(),
  authToken: z.string().optional(),
  typeHandlers: z.array(typeHandlerSchema).optional()
})

export type SdkConfig = z.infer<typeof sdkConfig>;