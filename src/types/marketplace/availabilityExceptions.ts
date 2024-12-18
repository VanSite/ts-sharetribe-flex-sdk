/**
 * @fileoverview Type definitions for managing availability exceptions in the Sharetribe Marketplace API.
 * These types define the structure of availability exception-related parameters, responses, and relationships.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  Relationship,
  RelationshipTypeMap,
  UUID
} from '../sharetribe';

// Supported API endpoints for availability exceptions.
export type AvailabilityExceptionsEndpoints = 'query' | 'create' | 'delete';

// Supported relationship fields for availability exceptions.
export type AvailabilityExceptionsRelationshipsFields = 'ownListing';

// Base structure for an availability exception.
export interface AvailabilityException {
  id: UUID;
  type: 'availabilityException';
  attributes?: {
    seats: number;
    start: Date;
    end: Date;
  };
}

// Availability exception with relationships.
export interface AvailabilityExceptionWithRelationships extends AvailabilityException {
  relationships: {
    ownListing: Relationship<false, 'ownListing'>;
  };
}

// Determine the availability exception type based on the relationship flag.
export type AvailabilityExceptionType<R extends boolean> = R extends true
  ? AvailabilityExceptionWithRelationships
  : AvailabilityException;

// Base parameters for availability exception operations.
export interface AvailabilityExceptionsParameter extends ApiParameter {
  include?: AvailabilityExceptionsRelationshipsFields[];
}

// Query parameters for fetching availability exceptions.
export interface AvailabilityExceptionsQueryParameter extends AvailabilityExceptionsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
}

// Parameters for creating an availability exception.
export interface AvailabilityExceptionsCreateParameter extends AvailabilityExceptionsParameter {
  listingId: UUID | string;
  seats: number;
  start: Date | string;
  end: Date | string;
}

// Parameters for deleting an availability exception.
export interface AvailabilityExceptionsDeleteParameter {
  id: UUID | string;
}

// Union type for all availability exception parameters.
type AllAvailabilityExceptionsParameter =
  | AvailabilityExceptionsQueryParameter
  | AvailabilityExceptionsCreateParameter
  | AvailabilityExceptionsDeleteParameter;

// Determine if the parameter includes relationships.
type AvailabilityExceptionsType<P extends AllAvailabilityExceptionsParameter> =
  'include' extends keyof P ? (P['include'] extends AvailabilityExceptionsRelationshipsFields[] ? true : false) : false;

// Extract the included relationships type based on the parameter.
type IncludedType<P extends AllAvailabilityExceptionsParameter> =
  'include' extends keyof P
    ? P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]>[]
      : never
    : never;

// Expand the return type based on the expand parameter.
type ExpandReturnType<P extends AllAvailabilityExceptionsParameter, EP> =
  EP extends { expand: true }
    ? AvailabilityExceptionType<AvailabilityExceptionsType<P>>
    : EP extends { expand: false }
      ? Omit<AvailabilityExceptionType<AvailabilityExceptionsType<P>>, 'attributes'>
      : Omit<AvailabilityExceptionType<AvailabilityExceptionsType<P>>, 'attributes'>;

// Define the possible data type for availability exceptions based on the endpoint and parameters.
type DataType<
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType
> =
  E extends 'query'
    ? AvailabilityExceptionType<AvailabilityExceptionsType<P>>[]
    : E extends 'create'
      ? ExpandReturnType<P, EP>
      : E extends 'delete'
        ? Pick<AvailabilityException, 'id' | 'type'>
        : never;

// Response structure for availability exception-related endpoints.
export type AvailabilityExceptionsResponse<
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {});
