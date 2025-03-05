/**
 * @fileoverview Type definitions for Own Listings in the Sharetribe Marketplace API.
 * These types define the structure for own listing parameters, attributes, and responses.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  UUID,
  LatLng,
  Money,
  Relationship,
  RelationshipTypeMap,
  ExtraParameterType,
} from "../sharetribe";

// Possible states for an Own Listing.
export type OwnListingState =
  | "draft"
  | "pendingApproval"
  | "published"
  | "closed";

// Supported API endpoints for own listings operations.
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

// Fields for relationships in the own listing object.
export type OwnListingsRelationshipsFields =
  | "marketplace"
  | "author"
  | "author.profileImage"
  | "images"
  | "currentStock";

// Availability plan types and entries.
type OwnListingsAvailabilityPlanTypes =
  | "availability-plan/day"
  | "availability-plan/time";
type OwnListingsAvailabilityPlanEntry<
  T extends OwnListingsAvailabilityPlanTypes
> = {
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  seats: number;
} & T extends "availability-plan/time"
  ? { startTime: string; endTime: string }
  : {};

// Availability plan for own listings.
export type OwnListingsAvailabilityPlan<
  T extends OwnListingsAvailabilityPlanTypes = "availability-plan/day"
> = {
  type: T;
  timezone?: string;
  entries: Array<OwnListingsAvailabilityPlanEntry<T>>;
};

// Base structure for an own listing.
export interface OwnListing {
  id: UUID;
  type: "ownListing";
  attributes: {
    description: string;
    deleted: boolean;
    geolocation: LatLng;
    createdAt: Date;
    state: OwnListingState;
    title: string;
    availabilityPlan: OwnListingsAvailabilityPlan;
    privateData: OwnListingPrivateData & OwnListingCustomPrivateData;
    publicData: OwnListingOwnListingPublicData & OwnListingCustomPublicData;
    metadata: OwnListingMetadata & OwnListingCustomMetadata;
    price: Money;
  };
}

// Extended structure for an own listing with relationships.
export interface OwnListingWithRelationships extends OwnListing {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    author: Relationship<false, "user">;
    images: Relationship<true, "image">;
    currentStock: Relationship<false, "currentStock">;
  };
}

// Type alias for an own listing type with or without relationships.
export type OwnListingType<R extends boolean> = R extends true
  ? OwnListingWithRelationships
  : OwnListing;

// Base parameters for own listings operations.
export interface OwnListingsParameter extends ApiParameter {
  include?: OwnListingsRelationshipsFields[];
}

// Parameter interfaces for each API operation.
export interface OwnListingsShowParameter extends OwnListingsParameter {
  id: UUID | string;
}
export interface OwnListingsQueryParameter extends OwnListingsParameter {}
export interface OwnListingsCreateParameter extends OwnListingsParameter {
  title: string;
  description?: string;
  geolocation?: LatLng;
  price?: Money;
  availabilityPlan?: OwnListingsAvailabilityPlan;
  privateData?: OwnListingPrivateData & OwnListingCustomPrivateData;
  publicData?: OwnListingOwnListingPublicData & OwnListingCustomPublicData;
  metaData?: OwnListingMetadata & OwnListingCustomMetadata;
  images?: string[];
}
export interface OwnListingsCreateDraftParameter
  extends OwnListingsCreateParameter {}
export interface OwnListingsUpdateParameter extends OwnListingsParameter {
  id: UUID | string;
  title?: string;
  description?: string;
  geolocation?: LatLng;
  price?: Money;
  availabilityPlan?: OwnListingsAvailabilityPlan;
  privateData?: OwnListingPrivateData & OwnListingCustomPrivateData;
  publicData?: OwnListingOwnListingPublicData & OwnListingCustomPublicData;
  metaData?: OwnListingMetadata & OwnListingCustomMetadata;
  images?: string[];
}
export interface OwnListingsPublishDraftParameter extends OwnListingsParameter {
  id: UUID | string;
}
export interface OwnListingsDiscardDraftParameter extends OwnListingsParameter {
  id: UUID | string;
}
export interface OwnListingsCloseParameter extends OwnListingsParameter {
  id: UUID | string;
}
export interface OwnListingsOpenParameter extends OwnListingsParameter {
  id: UUID | string;
}
export interface OwnListingsAddImageParameter extends OwnListingsParameter {
  id: UUID | string;
  imageId: UUID | string;
}

// Custom data types for own listings.
export interface OwnListingOwnListingPublicData {
  [key: string]: any;
}
export interface OwnListingCustomPublicData {}
export interface OwnListingPrivateData {
  [key: string]: any;
}
export interface OwnListingCustomPrivateData {}
export interface OwnListingMetadata {
  [key: string]: any;
}
export interface OwnListingCustomMetadata {}

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

// Define the response structure for own listings operations.
export type OwnListingsResponse<
  E extends OwnListingsEndpoints,
  P extends AllOwnListingsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});

// Additional utility types for processing responses.
type DataType<
  E extends OwnListingsEndpoints,
  P extends AllOwnListingsParameter,
  EP extends ExtraParameter | undefined
> = E extends "show"
  ? OwnListingType<OwnListingsType<P>>
  : E extends "query"
  ? OwnListingType<OwnListingsType<P>>[]
  : E extends "create"
  ? ExpandReturnType<P, EP>
  : E extends "createDraft"
  ? ExpandReturnType<P, EP>
  : E extends "update"
  ? ExpandReturnType<P, EP>
  : E extends "publishDraft"
  ? ExpandReturnType<P, EP>
  : E extends "discardDraft"
  ? Pick<OwnListing, "id" | "type">
  : E extends "close"
  ? ExpandReturnType<P, EP>
  : E extends "open"
  ? ExpandReturnType<P, EP>
  : E extends "addImage"
  ? ExpandReturnType<P, EP>
  : never;

type ExpandReturnType<P extends AllOwnListingsParameter, EP> = EP extends {
  expand: true;
}
  ? OwnListingType<OwnListingsType<P>>
  : EP extends { expand: false }
  ? Omit<OwnListingType<OwnListingsType<P>>, "attributes">
  : Omit<OwnListingType<OwnListingsType<P>>, "attributes">;

type OwnListingsType<P extends AllOwnListingsParameter> =
  "include" extends keyof P
    ? P["include"] extends OwnListingsRelationshipsFields[]
      ? true
      : false
    : false;

type IncludedType<P extends AllOwnListingsParameter> = "include" extends keyof P
  ? P["include"] extends (keyof RelationshipTypeMap)[]
    ? Array<RelationshipTypeMap[P["include"][number]]>
    : never
  : never;
