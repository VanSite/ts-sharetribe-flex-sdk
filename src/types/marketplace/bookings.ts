/**
 * @fileoverview Type definitions for managing bookings in the Sharetribe Marketplace API.
 * These types define the structure of booking-related parameters, responses, and relationships.
 */

import { ApiMeta, ApiParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';

// Supported API endpoints for bookings.
export type BookingsEndpoints = 'query';

// Supported relationship fields for bookings.
export type BookingsRelationshipsFields = 'transaction';

// States that a booking can be in.
export type BookingState = 'pending' | 'proposed' | 'accepted' | 'declined' | 'cancelled';

// Base structure for a booking.
export interface Booking {
  id: UUID;
  type: 'booking';
  attributes: {
    seats: number;
    start: Date;
    end: Date;
    displayStart: Date;
    displayEnd: Date;
    state: BookingState;
  };
}

// Booking with relationships.
export interface BookingWithRelationShips extends Booking {
  relationships: {
    transaction: Relationship<false, 'transaction'>;
  };
}

// Determine the booking type based on the relationship flag.
export type BookingType<R extends boolean> = R extends true ? BookingWithRelationShips : Booking;

// Base parameters for booking operations.
export interface BookingsParameter extends ApiParameter {
  include?: BookingsRelationshipsFields[];
}

// Parameters for querying bookings.
export interface BookingsQueryParameter extends BookingsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
  state?: BookingState;
}

// Determine if the parameter includes relationships.
type BookingsType<P extends BookingsQueryParameter> =
  'include' extends keyof P ? (P['include'] extends BookingsRelationshipsFields[] ? true : false) : false;

// Extract the included relationships type based on the parameter.
type IncludedType<P extends BookingsParameter> =
  'include' extends keyof P
    ? P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]>
      : never
    : never;

// Define the possible data type for bookings based on the endpoint and parameters.
type DataType<
  E extends BookingsEndpoints,
  P extends BookingsQueryParameter,
> = E extends 'query' ? BookingType<BookingsType<P>>[] : never;

// Response structure for booking-related endpoints.
export type BookingsResponse<
  E extends BookingsEndpoints,
  P extends BookingsQueryParameter,
> = {
  data: DataType<E, P>;
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {});
