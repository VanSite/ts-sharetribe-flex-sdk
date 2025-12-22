/**
 * @fileoverview Type definitions for Stock Reservations in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type StockReservationsEndpoints = "show";

/**
 * Relationship fields that can be included
 */
export type StockReservationsRelationshipsFields =
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
 * Possible reservation states
 */
export type StockReservationState =
  | "pending"
  | "proposed"
  | "accepted"
  | "declined"
  | "cancelled";

/**
 * Stock Reservation resource
 */
export interface StockReservation {
  id: UUID;
  type: "stockReservation";
  attributes: {
    quantity: number;
    state: StockReservationState;
  };
}

/**
 * With relationships
 */
export interface StockReservationWithRelationships extends StockReservation {
  relationships: {
    listing: Relationship<false, "listing">;
    transaction: Relationship<false, "transaction">;
    stockAdjustments: Relationship<true, "stockAdjustment">;
  };
}

/**
 * Select type based on include
 */
export type StockReservationType<R extends boolean> =
  R extends true ? StockReservationWithRelationships : StockReservation;

/**
 * Base request parameters
 */
export interface StockReservationParameter extends ApiParameter {
  include?: StockReservationsRelationshipsFields[];
}

/**
 * Show endpoint parameters
 */
export interface StockReservationShowParameter extends StockReservationParameter {
  id: UUID | string;
}

/**
 * All parameter types
 */
type AllStockReservationsParameter = StockReservationShowParameter;

/**
 * Detect include usage
 */
type HasInclude<P> = P extends { include: infer I extends StockReservationsRelationshipsFields[] }
  ? I
  : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

/**
 * Included resources — fixed version (no TS2536)
 */
type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends StockReservationsRelationshipsFields[]
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
 * Response data
 */
type ResponseData<
  E extends StockReservationsEndpoints,
  P extends AllStockReservationsParameter,
  EP extends ExtraParameterType | undefined
> = E extends "show"
  ? ExpandResult<StockReservationType<IncludesRelationships<P>>, EP>
  : never;

/**
 * Final response type
 */
export type StockReservationsResponse<
  E extends StockReservationsEndpoints = "show",
  P extends AllStockReservationsParameter = StockReservationShowParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {});