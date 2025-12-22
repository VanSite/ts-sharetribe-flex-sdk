/**
 * @fileoverview Type definitions for Own Listings in the Sharetribe Marketplace API.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameterType,
  LatLng,
  Money,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";
import {AvailabilityPlan} from "./availabilityPlan";

/**
 * Listing states
 */
export type OwnListingState =
  | "draft"
  | "pendingApproval"
  | "published"
  | "closed";

/**
 * Available endpoints
 */
export type OwnListingsEndpoints =
  | "show"
  | "query"
  | "create"
  | "createDraft"
  | "update"
  | "publishDraft"
  | "discardDraft"
  | "close"
  | "open"
  | "addImage";

/**
 * Relationship fields
 */
export type OwnListingsRelationshipsFields =
  | "marketplace"
  | "author.profileImage"
  | "author.marketplace"
  | "author.stripeAccount"
  | "author.effectivePermissionSet"
  | "images"
  | "currentStock";

/**
 * Own Listing resource
 */
export interface OwnListing {
  id: UUID;
  type: "ownListing";
  attributes: {
    title: string;
    description: string;
    price: Money;
    geolocation: LatLng;
    state: OwnListingState;
    deleted: boolean;
    createdAt: Date;
    availabilityPlan: AvailabilityPlan | null;
    publicData: OwnListingPublicData & OwnListingCustomPublicData;
    privateData: OwnListingPrivateData & OwnListingCustomPrivateData;
    metadata: OwnListingMetadata & OwnListingCustomMetadata;
  };
}

/**
 * With relationships
 */
export interface OwnListingWithRelationships extends OwnListing {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    author: Relationship<false, "author">;
    images: Relationship<true, "images">;
    currentStock?: Relationship<false, "currentStock">;
  };
}

export type OwnListingResource<R extends boolean> =
  R extends true ? OwnListingWithRelationships : OwnListing;

/**
 * Base request parameters
 */
export interface OwnListingsParameter extends ApiParameter {
  include?: OwnListingsRelationshipsFields[];
}

/**
 * Endpoint-specific parameters
 */
export type OwnListingsShowParameter = OwnListingsParameter & { id: UUID | string };
export type OwnListingsQueryParameter = OwnListingsParameter;

export interface OwnListingsCreateParameter extends OwnListingsParameter {
  title: string;
  description?: string;
  price?: Money;
  geolocation?: LatLng;
  availabilityPlan?: AvailabilityPlan | null;
  publicData?: OwnListingPublicData & OwnListingCustomPublicData;
  privateData?: OwnListingPrivateData & OwnListingCustomPrivateData;
  metadata?: OwnListingMetadata & OwnListingCustomMetadata;
  images?: string[];
}

export type OwnListingsCreateDraftParameter = OwnListingsCreateParameter;

export interface OwnListingsUpdateParameter extends OwnListingsParameter {
  id: UUID | string;
  title?: string;
  description?: string;
  price?: Money;
  geolocation?: LatLng;
  availabilityPlan?: AvailabilityPlan | null;
  publicData?: OwnListingPublicData & OwnListingCustomPublicData;
  privateData?: OwnListingPrivateData & OwnListingCustomPrivateData;
  metadata?: OwnListingMetadata & OwnListingCustomMetadata;
  images?: string[];
}

export type OwnListingsPublishDraftParameter = OwnListingsParameter & { id: UUID | string };
export type OwnListingsDiscardDraftParameter = OwnListingsParameter & { id: UUID | string };
export type OwnListingsCloseParameter = OwnListingsParameter & { id: UUID | string };
export type OwnListingsOpenParameter = OwnListingsParameter & { id: UUID | string };
export type OwnListingsAddImageParameter = OwnListingsParameter & {
  id: UUID | string;
  imageId: UUID | string;
};

/**
 * Custom data
 */
export interface OwnListingPublicData {
  [key: string]: any
}

export interface OwnListingCustomPublicData extends Record<string, unknown> {
}

export interface OwnListingPrivateData {
  [key: string]: any
}

export interface OwnListingCustomPrivateData extends Record<string, unknown> {
}

export interface OwnListingMetadata {
  [key: string]: any
}

export interface OwnListingCustomMetadata extends Record<string, unknown> {
}

/**
 * All parameter types
 */
type AllOwnListingsParameter =
  | OwnListingsShowParameter
  | OwnListingsQueryParameter
  | OwnListingsCreateParameter
  | OwnListingsCreateDraftParameter
  | OwnListingsUpdateParameter
  | OwnListingsPublishDraftParameter
  | OwnListingsDiscardDraftParameter
  | OwnListingsCloseParameter
  | OwnListingsOpenParameter
  | OwnListingsAddImageParameter;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly OwnListingsRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends OwnListingsRelationshipsFields[]
    ? RelationshipTypeMap[Fields[number]][]
    : never;


/**
 * Expand behavior
 */
type ExpandResult<T, EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? T
    : EP extends { expand: false }
      ? Omit<T, "attributes">
      : Omit<T, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends OwnListingsEndpoints,
  P extends AllOwnListingsParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "show" | "create" | "createDraft" | "update" | "publishDraft" | "close" | "open" | "addImage"
    ? ExpandResult<OwnListingResource<IncludesRelationships<P>>, EP>
    : E extends "query"
      ? OwnListingResource<IncludesRelationships<P>>[]
      : E extends "discardDraft"
        ? Pick<OwnListing, "id" | "type">
        : never;

/**
 * Final response
 */
export type OwnListingsResponse<
  E extends OwnListingsEndpoints,
  P extends AllOwnListingsParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});