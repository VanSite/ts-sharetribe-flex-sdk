/**
 * @fileoverview Type definitions for Listings in the Sharetribe Marketplace API.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameterType,
  LatLng,
  LatLngBounds,
  Money,
  QueryMeta,
  QueryPub,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";
import {AvailabilityPlan} from "./availabilityPlan";

/**
 * Public listing states
 */
export type ListingState =
  | "published"
  | "closed"
  | "draft"
  | "pendingApproval";

/**
 * Availability mode returned in query results
 */
export type ListingAvailability =
  | "day-full"
  | "day-partial"
  | "time-full"
  | "time-partial";

/**
 * Listing resource
 */
export interface Listing<I extends boolean = false> {
  id: UUID;
  type: "listing";
  attributes: {
    title: string;
    description: string;
    price: Money;
    geolocation: LatLng;
    state: ListingState;
    deleted: boolean;
    createdAt: Date;
    availabilityPlan: AvailabilityPlan | null;
    publicData: ListingPublicData & ListingCustomPublicData;
    metadata: ListingMetadata & ListingCustomMetadata;
  } & (I extends true ? { privateData: ListingPrivateData & ListingCustomPrivateData } : {});
}

/**
 * With relationships
 */
export interface ListingWithRelationships<I extends boolean = false>
  extends Listing<I> {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    author: Relationship<false, "author">;
    images: Relationship<true, "images">;
    currentStock?: Relationship<false, "currentStock">;
  };
}

export type ListingResource<R extends boolean, I extends boolean = false> =
  R extends true ? ListingWithRelationships<I> : Listing<I>;

/**
 * Relationship fields
 */
export type ListingsRelationshipsFields =
  | "marketplace"
  | "author"
  | "author.profileImage"
  | "author.marketplace"
  | "author.stripeAccount"
  | "author.effectivePermissionSet"
  | "images"
  | "currentStock";

/**
 * Available endpoints
 */
export type ListingsEndpoints =
  | "show"
  | "query"
  | "create"
  | "update"
  | "close"
  | "open"
  | "approve";

/**
 * Base request parameters
 */
export interface ListingsParameter extends ApiParameter {
  include?: ListingsRelationshipsFields[];
}

/**
 * Endpoint parameters
 */
export type ListingsShowParameter = ListingsParameter & { id: UUID | string };

export interface ListingsQueryParameter extends ListingsParameter {
  authorId?: UUID | string;
  ids?: UUID[] | string[];
  keywords?: string;
  origin?: LatLng | string;
  bounds?: LatLngBounds | string;
  price?: Money | [Money, Money] | string;
  start?: Date | string;
  end?: Date | string;
  seats?: number;
  availability?: ListingAvailability;
  minDuration?: number;
  minStock?: number;
  sort?: string;

  [keyof: QueryPub]: string | undefined;

  [keyof: QueryMeta]: string | undefined;
}

export interface ListingsCreateParameter extends ListingsParameter {
  title: string;
  authorId: UUID | string;
  state: ListingState;
  description?: string;
  geolocation?: LatLng | string;
  price?: Money | string;
  availabilityPlan?: AvailabilityPlan | null;
  publicData?: ListingPublicData & ListingCustomPublicData;
  privateData?: ListingPrivateData & ListingCustomPrivateData;
  metadata?: ListingMetadata & ListingCustomMetadata;
  images?: UUID[] | string[];
}

export type ListingsUpdateParameter = ListingsParameter & {
  id: UUID | string;
  title?: string;
  description?: string;
  price?: Money | string;
  availabilityPlan?: AvailabilityPlan | null;
  publicData?: ListingPublicData & ListingCustomPublicData;
  privateData?: ListingPrivateData & ListingCustomPrivateData;
  metadata?: ListingMetadata & ListingCustomMetadata;
  images?: UUID[] | string[];
};

export type ListingsCloseParameter = ListingsParameter & { id: UUID | string };
export type ListingsOpenParameter = ListingsParameter & { id: UUID | string };
export type ListingsApproveParameter = ListingsParameter & { id: UUID | string };

/**
 * Custom data
 */
export interface ListingPublicData {
  [key: string]: any
}

export interface ListingCustomPublicData extends Record<string, unknown> {
}

export interface ListingPrivateData {
  [key: string]: any
}

export interface ListingCustomPrivateData extends Record<string, unknown> {
}

export interface ListingMetadata {
  [key: string]: any
}

export interface ListingCustomMetadata extends Record<string, unknown> {
}

/**
 * All parameter types
 */
type AllListingsParameter =
  | ListingsShowParameter
  | ListingsQueryParameter
  | ListingsCreateParameter
  | ListingsUpdateParameter
  | ListingsCloseParameter
  | ListingsOpenParameter
  | ListingsApproveParameter;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly ListingsRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends ListingsRelationshipsFields[]
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
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameterType | undefined,
  I extends boolean = false
> =
  E extends "query"
    ? ListingResource<IncludesRelationships<P>, I>[]
    : E extends "show" | "create" | "update" | "close" | "open" | "approve"
      ? ExpandResult<ListingResource<IncludesRelationships<P>, I>, EP>
      : never;

/**
 * Final response
 */
export type ListingsResponse<
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameterType | undefined = undefined,
  I extends boolean = false
> = {
  data: ResponseData<E, P, EP, I>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});