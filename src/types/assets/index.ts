import { ImageVariantNames, ImageVariants } from '../marketplace/images';
import { ApiParameter, Relationship, UUID } from '../sharetribe';

type RelationshipTypeMap = {
  'imageAsset': ImageAsset
}

export type AssetEndpoints = 'assetByAlias' | 'assetsByAlias' | 'assetByVersion' | 'assetsByVersion'
export type AssetRelationshipsFields = 'imageAsset'

export type JsonAsset = {
  [key: string]: any
}

export type JsonAssetWithRelationships = {
  images: Relationship<true, 'imageAsset'>
}

export type ImageAsset = {
  id: UUID,
  type: 'imageAsset',
  attributes: {
    assetPath: string;
    variants: { [key in ImageVariantNames]?: ImageVariants }
  }
}

type IsJsonPath<Path> = Path extends `${string}.json` ? true : false;

export type AssetType<P extends AllAssetParameter> =
  P extends { path: infer Path } ? IsJsonPath<Path> :
    P extends {
        paths: infer Paths
      } ? Paths extends string[] ? (IsJsonPath<Paths[number]> extends JsonAsset ? JsonAsset : ImageAsset) : never :
      never;

export interface AssetParameter extends ApiParameter {
  include?: JsonAssetWithRelationships[]
}

export interface AssetByAliasParameter extends AssetParameter {
  path: string;
  alias: string;
}

export interface AssetsByAliasParameter extends AssetParameter {
  paths: string[];
  alias: string;
}

export interface AssetByVersionParameter extends AssetParameter {
  path: string
  version: string;
}

export interface AssetsByVersionParameter extends AssetParameter {
  paths: string[];
  version: string;
}

type AllAssetParameter =
  AssetByAliasParameter
  | AssetsByAliasParameter
  | AssetByVersionParameter
  | AssetsByVersionParameter

type AssetWithIncludeType<P extends AllAssetParameter> =
  'include' extends keyof P ? (P['include'] extends AssetRelationshipsFields[] ? true : false) : false;

export type IncludedType<P extends AllAssetParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[] ?
      Array<AssetWithIncludeType<P>>[] : never
    ) : never;


type DataType<E extends AssetEndpoints, P extends AllAssetParameter> =
  E extends 'assetByAlias' | 'assetsByAlias' | 'assetByVersion' | 'assetsByVersion' ? AssetType<P> : never

export type AssetResponse<
  E extends AssetEndpoints,
  P extends AllAssetParameter,
> = {
  data: DataType<E, P>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})