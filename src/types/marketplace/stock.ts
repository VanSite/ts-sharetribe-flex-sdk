/**
 * @fileoverview Type definitions for Stock operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stock API endpoints.
 */

import { ExtraParameter, ExtraParameterType, UUID } from "../sharetribe";

// Supported API endpoints for Stock operations.
export type StockEndpoints = "compareAndSet";

// Structure of a Stock object.
export interface Stock {
  id: UUID;
  type: "stock";
  attributes: {
    quantity: number;
  };
}

// Parameters for the `compareAndSet` operation.
export interface StockCompareAndSetParameter {
  listingId: UUID | string; // ID of the listing for which stock needs to be updated.
  oldTotal: number; // The expected current stock quantity.
  newTotal: number; // The new stock quantity to be set.
}

// Utility type for expanding or omitting the attributes in the Stock response based on extra parameters.
type ExpandReturnType<EP> = EP extends { expand: true }
  ? Stock
  : EP extends { expand: false }
  ? Omit<Stock, "attributes">
  : Omit<Stock, "attributes">;

// Data type based on the endpoint and extra parameters.
type DataType<
  E extends StockEndpoints,
  EP extends ExtraParameter | undefined
> = E extends "compareAndSet" ? ExpandReturnType<EP> : never;

// Response structure for Stock operations.
export type StockResponse<
  E extends StockEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};
