/**
 * @fileoverview Type definitions for Stock Reservations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stock Reservations API endpoints.
 */

import {
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";

// Supported API endpoints for Stock Reservations operations.
export type StockReservationsEndpoints = "show";

// Supported relationships for Stock Reservations.
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

// Possible states for a Stock Reservation.
export type StockReservationState =
  | "pending"
  | "proposed"
  | "accepted"
  | "declined"
  | "cancelled";

// Structure of a Stock Reservation object.
export interface StockReservation {
  id: UUID;
  type: "stockReservation";
  attributes: {
    quantity: number; // Quantity reserved.
    state: StockReservationState; // Current state of the reservation.
  };
}

// Structure of a Stock Reservation object with relationships.
export interface StockReservationWithRelationships extends StockReservation {
  relationships: {
    listing: Relationship<false, "listing">; // Associated listing.
    transaction: Relationship<false, "transaction">; // Associated transaction.
    stockAdjustments: Relationship<false, "stockAdjustment">; // Associated stock adjustments.
  };
}

// Conditional type for determining Stock Reservation type based on relationship inclusion.
export type StockReservationType<R extends boolean> = R extends true
  ? StockReservationWithRelationships
  : StockReservation;

// Base parameters for Stock Reservations operations.
export interface StockReservationParameter extends ApiParameter {}

// Parameters for showing a specific Stock Reservation.
export interface StockReservationShowParameter
  extends StockReservationParameter {
  id: UUID; // ID of the stock reservation to fetch.
}

// Union type for all Stock Reservations parameters.
type AllStockReservationsParameter = StockReservationShowParameter;

// Conditional type for determining if relationships are included in the response.
type StockReservationsType<P extends AllStockReservationsParameter> =
  "include" extends keyof P
    ? P["include"] extends StockReservationsRelationshipsFields[]
      ? true
      : false
    : false;

// Type for included related resources.
type IncludedType<P extends AllStockReservationsParameter> =
  "include" extends keyof P
    ? P["include"] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P["include"][number]]>
      : never
    : never;

// Type for expanding or omitting attributes in the response.
type ExpandReturnType<
  P extends AllStockReservationsParameter,
  EP
> = EP extends { expand: true }
  ? StockReservationType<StockReservationsType<P>>
  : EP extends { expand: false }
  ? Omit<StockReservationType<StockReservationsType<P>>, "attributes">
  : Omit<StockReservationType<StockReservationsType<P>>, "attributes">;

// Type for determining the data structure of the response based on the endpoint.
type DataType<
  E extends StockReservationsEndpoints,
  P extends AllStockReservationsParameter,
  EP extends ExtraParameter | undefined
> = E extends "show" ? ExpandReturnType<P, EP> : never;

// Response structure for Stock Reservations operations.
export type StockReservationsResponse<
  E extends StockReservationsEndpoints,
  P extends AllStockReservationsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {});
