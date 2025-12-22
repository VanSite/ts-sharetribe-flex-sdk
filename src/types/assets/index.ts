/**
 * @fileoverview Type definitions for Assets in the Sharetribe Marketplace API.
 */

import type {ApiParameter, Relationship, RelationshipTypeMap, UUID} from "../sharetribe";
import type {ImageVariant, ImageVariantName} from "../marketplace/images";

/**
 * Available endpoints
 */
export type AssetEndpoints =
  | "assetByAlias"
  | "assetsByAlias"
  | "assetByVersion"
  | "assetsByVersion";

/**
 * Relationship fields
 */
export type AssetRelationshipsFields = "imageAsset";

/**
 * Image asset resource
 */
export interface ImageAsset {
  id: UUID;
  type: "imageAsset";
  attributes: {
    assetPath: string;
    variants: Partial<Record<ImageVariantName, ImageVariant>>;
  };
}

/**
 * Generic JSON asset (e.g. config, translations)
 */
export type JsonAsset = Record<string, unknown>;

/**
 * JSON asset with embedded image relationships
 */
export interface JsonAssetWithRelationships {
  images: Relationship<true, "imageAsset">;
}

/**
 * Base request parameters
 */
export interface AssetParameter extends ApiParameter {
  include?: AssetRelationshipsFields[];
}

/**
 * Single asset by alias/version
 */
export interface AssetByAliasParameter extends AssetParameter {
  path: string;
  alias: string;
}

export interface AssetByVersionParameter extends AssetParameter {
  path: string;
  version: string;
}

/**
 * Multiple assets by alias/version
 */
export interface AssetsByAliasParameter extends AssetParameter {
  paths: string[];
  alias: string;
}

export interface AssetsByVersionParameter extends AssetParameter {
  paths: string[];
  version: string;
}

/**
 * All parameter types
 */
type AllAssetParameter =
  | AssetByAliasParameter
  | AssetsByAliasParameter
  | AssetByVersionParameter
  | AssetsByVersionParameter;

/**
 * Detect if path ends with .json
 */
type IsJsonPath<Path extends string> = Path extends `${string}.json` ? true : false;

/**
 * Resolve asset data type from path(s)
 */
type ResolveAssetType<P extends AllAssetParameter> =
  P extends { path: infer Path extends string }
    ? IsJsonPath<Path> extends true ? JsonAsset : ImageAsset
    : P extends { paths: infer Paths extends string[] }
      ? Paths extends [string]
        ? IsJsonPath<Paths[0]> extends true ? JsonAsset : ImageAsset
        : JsonAsset | ImageAsset
      : never;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly AssetRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  P extends { include: infer I extends readonly AssetRelationshipsFields[] }
    ? RelationshipTypeMap["imageAsset"][]
    : never;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends AssetEndpoints,
  P extends AllAssetParameter
> = ResolveAssetType<P>;

/**
 * Final response type
 */
export type AssetResponse<
  E extends AssetEndpoints,
  P extends AllAssetParameter
> = {
  data: ResponseData<E, P>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {});