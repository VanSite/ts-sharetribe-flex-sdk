/**
 * @fileoverview Type definitions for Stock Adjustments in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type StockAdjustmentsEndpoints = "query" | "create" | "delete";

/**
 * Relationship fields that can be included
 */
export type StockAdjustmentsRelationshipsFields =
  | "ownListing"
  | "ownListing.marketplace"
  | "ownListing.author"
  | "ownListing.images"
  | "ownListing.currentStock"
  | "stockReservation";

/**
 * Stock Adjustment resource
 */
export interface StockAdjustment {
  id: UUID;
  type: "stockAdjustment";
  attributes: {
    at: Date;
    quantity: number;
  };
}

/**
 * With relationships
 */
export interface StockAdjustmentWithRelationships extends StockAdjustment {
  relationships: {
    ownListing: Relationship<false, "ownListing">;
    stockReservation: Relationship<false, "stockReservation">;
  };
}

/**
 * Select type based on include
 */
export type StockAdjustmentType<R extends boolean> =
  R extends true ? StockAdjustmentWithRelationships : StockAdjustment;

/**
 * Base request parameters
 */
export interface StockAdjustmentsParameter extends ApiParameter {
  include?: StockAdjustmentsRelationshipsFields[];
}

/**
 * Query endpoint
 */
export interface StockAdjustmentsQueryParameter extends StockAdjustmentsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
}

/**
 * Create endpoint
 */
export interface StockAdjustmentsCreateParameter extends StockAdjustmentsParameter {
  listingId: UUID | string;
  quantity: number;
}

/**
 * All parameter types
 */
type AllStockAdjustmentsParameter =
  | StockAdjustmentsQueryParameter
  | StockAdjustmentsCreateParameter;

/**
 * Detect include + fix TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly StockAdjustmentsRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

/**
 * Included resources — bulletproof version (no TS2536)
 */
type IncludedResources<P> =
  P extends { include: infer I extends readonly StockAdjustmentsRelationshipsFields[] }
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
  E extends StockAdjustmentsEndpoints,
  P extends AllStockAdjustmentsParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "query"
    ? StockAdjustmentType<IncludesRelationships<P>>[]
    : E extends "create"
      ? ExpandResult<StockAdjustmentType<IncludesRelationships<P>>, EP>
      : E extends "delete"
        ? Pick<StockAdjustment, "id" | "type">
        : never;

/**
 * Final response type
 */
export type StockAdjustmentsResponse<
  E extends StockAdjustmentsEndpoints,
  P extends AllStockAdjustmentsParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});