/**
 * @fileoverview Type definitions for Stock Adjustments in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stock Adjustments API endpoints.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  UUID,
  Relationship,
  RelationshipTypeMap,
  ExtraParameterType
} from '../sharetribe';

// Supported API endpoints for Stock Adjustments operations.
export type StockAdjustmentsEndpoints = 'query' | 'create' | 'delete';

// Supported relationships for Stock Adjustments.
export type StockAdjustmentsRelationshipsFields = 'ownListing' | 'stockReservation';

// Structure of a Stock Adjustment object.
export interface StockAdjustment {
  id: UUID;
  type: 'stockAdjustments';
  attributes: {
    at: Date ; // Timestamp of the stock adjustment.
    quantity: number; // Quantity adjusted.
  };
}

// Structure of a Stock Adjustment object with relationships.
export interface StockAdjustmentWithRelationships extends StockAdjustment {
  relationships: {
    ownListing: Relationship<false, 'ownListing'>; // The associated listing.
    stockReservation: Relationship<false, 'stock'>; // The associated stock reservation.
  };
}

// Conditional type for determining Stock Adjustment type based on relationship inclusion.
export type StockAdjustmentType<R extends boolean> = R extends true ? StockAdjustmentWithRelationships : StockAdjustment;

// Base parameters for Stock Adjustments operations.
export interface StockAdjustmentsParameter extends ApiParameter {
  include?: StockAdjustmentsRelationshipsFields[]; // Related resources to include in the response.
}

// Parameters for querying Stock Adjustments.
export interface StockAdjustmentsQueryParameter extends StockAdjustmentsParameter {
  listingId: UUID | string; // ID of the associated listing.
  start: Date | string; // Start date/time for filtering adjustments.
  end: Date | string; // End date/time for filtering adjustments.
}

// Parameters for creating a Stock Adjustment.
export interface StockAdjustmentsCreateParameter extends StockAdjustmentsParameter {
  listingId: UUID | string; // ID of the associated listing.
  quantity: number; // Quantity to adjust.
}

// Union type for all Stock Adjustments parameters.
type AllStockAdjustmentsParameter = StockAdjustmentsQueryParameter | StockAdjustmentsCreateParameter;

// Conditional type for determining if relationships are included in the response.
type StockAdjustmentsType<P extends AllStockAdjustmentsParameter> =
  'include' extends keyof P ? (P['include'] extends StockAdjustmentsRelationshipsFields[] ? true : false) : false;

// Type for included related resources.
type IncludedType<P extends AllStockAdjustmentsParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]> : never
    ) : never;

// Type for expanding or omitting attributes in the response.
type ExpandReturnType<P extends AllStockAdjustmentsParameter, EP> =
  EP extends { expand: true } ? StockAdjustmentType<StockAdjustmentsType<P>> :
    EP extends { expand: false } ? Omit<StockAdjustmentType<StockAdjustmentsType<P>>, 'attributes'> :
      Omit<StockAdjustmentType<StockAdjustmentsType<P>>, 'attributes'>;

// Type for determining the data structure of the response based on the endpoint.
type DataType<
  E extends StockAdjustmentsEndpoints,
  P extends AllStockAdjustmentsParameter,
  EP extends ExtraParameter | undefined
> =
  E extends 'query' ? StockAdjustmentType<StockAdjustmentsType<P>>[] :
    E extends 'create' ? ExpandReturnType<P, EP> :
      E extends 'delete' ? Pick<StockAdjustment, 'id' | 'type'> : never;

// Response structure for Stock Adjustments operations.
export type StockAdjustmentsResponse<
  E extends StockAdjustmentsEndpoints,
  P extends AllStockAdjustmentsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {});
