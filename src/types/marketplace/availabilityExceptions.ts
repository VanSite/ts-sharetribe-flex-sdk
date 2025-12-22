/**
 * @fileoverview Type definitions for Availability Exceptions in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type AvailabilityExceptionsEndpoints = "query" | "create" | "delete";

/**
 * Relationship fields that can be included
 */
export type AvailabilityExceptionsRelationshipsFields =
  | "ownListing"
  | "ownListing.marketplace"
  | "ownListing.author"
  | "ownListing.images"
  | "ownListing.currentStock";

/**
 * Availability Exception resource
 */
export interface AvailabilityException {
  id: UUID;
  type: "availabilityException";
  attributes: {
    seats: number;
    start: Date;
    end: Date;
  };
}

/**
 * With relationships
 */
export interface AvailabilityExceptionWithRelationships
  extends AvailabilityException {
  relationships: {
    ownListing: Relationship<false, "ownListing">;
  };
}

export type AvailabilityExceptionResource<R extends boolean> =
  R extends true ? AvailabilityExceptionWithRelationships : AvailabilityException;

/**
 * Base request parameters
 */
export interface AvailabilityExceptionsParameter extends ApiParameter {
  include?: AvailabilityExceptionsRelationshipsFields[];
}

/**
 * Query endpoint
 */
export interface AvailabilityExceptionsQueryParameter
  extends AvailabilityExceptionsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
}

/**
 * Create endpoint
 */
export interface AvailabilityExceptionsCreateParameter
  extends AvailabilityExceptionsParameter {
  listingId: UUID | string;
  seats: number;
  start: Date | string;
  end: Date | string;
}

/**
 * Delete endpoint
 */
export type AvailabilityExceptionsDeleteParameter = {
  id: UUID | string;
};

/**
 * All parameter types
 */
type AllAvailabilityExceptionsParameter =
  | AvailabilityExceptionsQueryParameter
  | AvailabilityExceptionsCreateParameter
  | AvailabilityExceptionsDeleteParameter;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> =
  P extends { include: infer I extends readonly AvailabilityExceptionsRelationshipsFields[] }
    ? I
    : never;

type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  P extends { include: infer I extends readonly AvailabilityExceptionsRelationshipsFields[] }
    ? RelationshipTypeMap[I[number]][]
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
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "query"
    ? AvailabilityExceptionResource<IncludesRelationships<P>>[]
    : E extends "create"
      ? ExpandResult<AvailabilityExceptionResource<IncludesRelationships<P>>, EP>
      : E extends "delete"
        ? Pick<AvailabilityException, "id" | "type">
        : never;

/**
 * Final response type
 */
export type AvailabilityExceptionsResponse<
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});