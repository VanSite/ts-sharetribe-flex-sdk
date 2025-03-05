/**
 * @fileoverview Type definitions for managing assets in the Sharetribe Marketplace API.
 * These types define the structure and relationships of assets such as JSON data and image assets,
 * as well as the request and response formats for the asset-related endpoints.
 */

import { ImageVariantNames, ImageVariants } from "../marketplace/images";
import { ApiParameter, Relationship, UUID } from "../sharetribe";

// Define the mapping of relationship types to their corresponding data models.
type RelationshipTypeMap = {
  imageAsset: ImageAsset;
};

// Enum-like definition for supported asset endpoints.
export type AssetEndpoints =
  | "assetByAlias"
  | "assetsByAlias"
  | "assetByVersion"
  | "assetsByVersion";

// Supported fields for relationships in assets.
export type AssetRelationshipsFields = "imageAsset";

// Generic structure for JSON-based assets.
export type JsonAsset = {
  [key: string]: any;
};

// JSON-based assets with relationships.
export type JsonAssetWithRelationships = {
  images: Relationship<true, "imageAsset">;
};

// Structure for image-based assets.
export type ImageAsset = {
  id: UUID;
  type: "imageAsset";
  attributes: {
    assetPath: string;
    variants: { [key in ImageVariantNames]?: ImageVariants };
  };
};

// Type helper to determine if a given path is a JSON path.
type IsJsonPath<Path> = Path extends `${string}.json` ? true : false;

// Determine the asset type based on the provided parameter.
export type AssetType<P extends AllAssetParameter> = P extends {
  path: infer Path;
}
  ? IsJsonPath<Path>
  : P extends { paths: infer Paths }
  ? Paths extends string[]
    ? IsJsonPath<Paths[number]> extends true
      ? JsonAsset
      : ImageAsset
    : never
  : never;

// Base interface for asset parameters, allowing for optional relationships.
export interface AssetParameter extends ApiParameter {
  include?: JsonAssetWithRelationships[];
}

// Parameter structure for fetching a single asset by alias.
export interface AssetByAliasParameter extends AssetParameter {
  path: string;
  alias: string;
}

// Parameter structure for fetching multiple assets by alias.
export interface AssetsByAliasParameter extends AssetParameter {
  paths: string[];
  alias: string;
}

// Parameter structure for fetching a single asset by version.
export interface AssetByVersionParameter extends AssetParameter {
  path: string;
  version: string;
}

// Parameter structure for fetching multiple assets by version.
export interface AssetsByVersionParameter extends AssetParameter {
  paths: string[];
  version: string;
}

// Union type for all asset parameter types.
type AllAssetParameter =
  | AssetByAliasParameter
  | AssetsByAliasParameter
  | AssetByVersionParameter
  | AssetsByVersionParameter;

// Determine if the parameter includes relationships.
type AssetWithIncludeType<P extends AllAssetParameter> =
  "include" extends keyof P
    ? P["include"] extends AssetRelationshipsFields[]
      ? true
      : false
    : false;

// Extract the included relationships type based on the parameter.
export type IncludedType<P extends AllAssetParameter> =
  "include" extends keyof P
    ? P["include"] extends (keyof RelationshipTypeMap)[]
      ? Array<AssetWithIncludeType<P>>[]
      : never
    : never;

// Determine the data type for an asset endpoint based on the provided parameter.
type DataType<
  E extends AssetEndpoints,
  P extends AllAssetParameter
> = E extends
  | "assetByAlias"
  | "assetsByAlias"
  | "assetByVersion"
  | "assetsByVersion"
  ? AssetType<P>
  : never;

// Response structure for asset-related endpoints.
export type AssetResponse<
  E extends AssetEndpoints,
  P extends AllAssetParameter
> = {
  data: DataType<E, P>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {});
