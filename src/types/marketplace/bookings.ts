/**
 * @fileoverview Type definitions for Bookings in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type BookingsEndpoints = "query";

/**
 * Relationship fields that can be included
 */
export type BookingsRelationshipsFields =
  | "transaction"
  | "transaction.marketplace"
  | "transaction.listing"
  | "transaction.provider"
  | "transaction.customer"
  | "transaction.booking"
  | "transaction.stockReservation"
  | "transaction.reviews"
  | "transaction.messages";

/**
 * Booking states
 */
export type BookingState =
  | "pending"
  | "proposed"
  | "accepted"
  | "declined"
  | "cancelled";

/**
 * Booking resource
 */
export interface Booking {
  id: UUID;
  type: "booking";
  attributes: {
    seats: number;
    start: Date;
    end: Date;
    displayStart: Date;
    displayEnd: Date;
    state: BookingState;
  };
}

/**
 * With relationships
 */
export interface BookingWithRelationships extends Booking {
  relationships: {
    transaction: Relationship<false, "transaction">;
  };
}

export type BookingResource<R extends boolean> =
  R extends true ? BookingWithRelationships : Booking;

/**
 * Base request parameters
 */
export interface BookingsParameter extends ApiParameter {
  include?: BookingsRelationshipsFields[];
}

/**
 * Query parameters
 */
export interface BookingsQueryParameter extends BookingsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
  state?: BookingState;
}

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly BookingsRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  P extends { include: infer Fields extends readonly BookingsRelationshipsFields[] }
    ? RelationshipTypeMap[Fields[number]][]
    : never;

/**
 * Response data
 */
type ResponseData<
  E extends BookingsEndpoints,
  P extends BookingsQueryParameter
> = E extends "query"
  ? BookingResource<IncludesRelationships<P>>[]
  : never;

/**
 * Final response type
 */
export type BookingsResponse<
  E extends BookingsEndpoints = "query",
  P extends BookingsQueryParameter = BookingsQueryParameter
> = {
  data: ResponseData<E, P>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  { meta: ApiMeta };