/**
 * @fileoverview Type definitions for managing listings in the Sharetribe Marketplace API.
 * These types define the structure for listing parameters, attributes, relationships, and responses.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  LatLng,
  Money,
  QueryMeta,
  QueryPub,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";
import LatLngBounds from "../../sdkTypes/LatLngBounds";

// Supported API endpoints for listings operations.
export type ListingsEndpoints =
  | "show"
  | "query"
  | "create"
  | "update"
  | "close"
  | "open"
  | "approve";

// Fields for listing relationships.
export type ListingsRelationshipsFields =
  | "marketplace"
  | "author"
  | "author.profileImage"
  | "author.marketplace"
  | "author.stripeAccount"
  | "author.effectivePermissionSet"
  | "images"
  | "currentStock";

// State and availability types for listings.
export type ListingState = "published" | "closed" | "draft" | "pendingApproval";
export type ListingAvailability =
  | "day-full"
  | "day-partial"
  | "time-full"
  | "time-partial";

// Base structure for a listing.
export interface Listing<I extends boolean = false> {
  id: UUID;
  type: "listing";
  attributes: ListingAttributes<I>;
}

// Attributes for a listing, with optional private data.
type ListingAttributes<I extends boolean = false> = {
  availabilityPlan: ListingAvailabilityPlan;
  createdAt: Date;
  deleted: boolean;
  description: string;
  geolocation: LatLng;
  metadata: ListingMetadata & ListingCustomMetadata;
  price: Money;
  publicData: ListingPublicData & ListingCustomPublicData;
  state: ListingState;
  title: string;
} & (I extends true
  ? {
      privateData: ListingPrivateData & ListingCustomPrivateData;
    }
  : {});

// Availability plan types and structure.
type ListingAvailabilityPlanTypes =
  | "availability-plan/day"
  | "availability-plan/time";

type ListingAvailabilityPlanEntry<T extends ListingAvailabilityPlanTypes> = {
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  seats: number;
} & (T extends "availability-plan/time"
  ? {
      startTime: string;
      endTime: string;
    }
  : {});

type ListingAvailabilityPlan<
  T extends ListingAvailabilityPlanTypes = "availability-plan/day"
> = {
  type: string;
  timezone: string;
  entries: Array<ListingAvailabilityPlanEntry<T>>;
};

// Listing structure with relationships.
export interface ListingWithRelationships<I extends boolean = false>
  extends Listing<I> {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    author: Relationship<false, "user">;
    images: Relationship<true, "image">;
    currentStock: Relationship<false, "stock">;
  };
}

export type ListingType<
  R extends boolean,
  I extends boolean = false
> = R extends true ? ListingWithRelationships<I> : Listing<I>;

// Parameters for listing-related operations.
export interface ListingsParameter extends ApiParameter {
  include?: ListingsRelationshipsFields[];
}

// Specific parameters for different listing operations.
export interface ListingsShowParameter extends ListingsParameter {
  id: UUID | string;
}

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
  [keyof: QueryPub]: string;
  [keyof: QueryMeta]: string;
  sort?: string;
}

export interface ListingsCreateParameter extends ListingsParameter {
  title: string;
  authorId: UUID | string;
  state: ListingState;
  description?: string;
  geolocation?: LatLng | string;
  price?: Money | string;
  availabilityPlan?: ListingAvailabilityPlan;
  publicData?: ListingPublicData & ListingCustomPublicData;
  privateData?: ListingPrivateData & ListingCustomPrivateData;
  metadata?: ListingMetadata & ListingCustomMetadata;
  images?: UUID[] | string[];
}

export interface ListingsUpdateParameter extends ListingsParameter {
  id: UUID | string;
  title?: string;
  description?: string;
  price?: Money | string;
  availabilityPlan?: ListingAvailabilityPlan;
  publicData?: ListingPublicData & ListingCustomPublicData;
  privateData?: ListingPrivateData & ListingCustomPrivateData;
  metadata?: ListingMetadata & ListingCustomMetadata;
  images?: UUID[] | string[];
}

export interface ListingsCloseParameter extends ListingsParameter {
  id: UUID | string;
}

export interface ListingsOpenParameter extends ListingsParameter {
  id: UUID | string;
}

export interface ListingsApproveParameter extends ListingsParameter {
  id: UUID | string;
}

// Data for listing metadata and public/private custom fields.
export interface ListingPublicData {
  [key: string]: any;
}

export interface ListingCustomPublicData {}

export interface ListingPrivateData {
  [key: string]: any;
}

export interface ListingCustomPrivateData {}

export interface ListingMetadata {
  [key: string]: any;
}

export interface ListingCustomMetadata {}

type AllListingsParameter =
  | ListingsShowParameter
  | ListingsQueryParameter
  | ListingsCreateParameter
  | ListingsUpdateParameter;

// Response types and data mapping for listings.
type ListingsType<P extends AllListingsParameter> = "include" extends keyof P
  ? P["include"] extends ListingsRelationshipsFields[]
    ? true
    : false
  : false;

type IncludedType<
  P extends AllListingsParameter,
  I extends boolean
> = "include" extends keyof P
  ? P["include"] extends (keyof RelationshipTypeMap<I>)[]
    ? Array<RelationshipTypeMap<I>[P["include"][number]]>
    : never
  : never;

type ExpandReturnType<
  P extends AllListingsParameter,
  EP,
  I extends boolean
> = EP extends {
  expand: true;
}
  ? ListingType<ListingsType<P>, I>
  : EP extends { expand: false }
  ? Omit<ListingType<ListingsType<P>, I>, "attributes">
  : Omit<ListingType<ListingsType<P>, I>, "attributes">;

type DataType<
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameter | undefined,
  I extends boolean = false
> = E extends "query"
  ? ListingType<ListingsType<P>, I>[]
  : E extends "show"
  ? ListingType<ListingsType<P>, I>
  : E extends "create"
  ? ExpandReturnType<P, EP, I>
  : E extends "update"
  ? ExpandReturnType<P, EP, I>
  : E extends "close"
  ? ExpandReturnType<P, EP, I>
  : E extends "open"
  ? ExpandReturnType<P, EP, I>
  : E extends "approve"
  ? ExpandReturnType<P, EP, I>
  : never;

export type ListingsResponse<
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameterType = undefined,
  I extends boolean = false
> = {
  data: DataType<E, P, EP, I>;
} & ("include" extends keyof P ? { included: IncludedType<P, I> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});
