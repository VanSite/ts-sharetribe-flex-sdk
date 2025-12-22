/**
 * @fileoverview Type definitions for Stock operations in the Sharetribe Marketplace API.
 */

import {ExtraParameterType, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type StockEndpoints = "compareAndSet";

/**
 * Stock resource
 */
export interface Stock {
  id: UUID;
  type: "stock";
  attributes: {
    quantity: number;
  };
}

/**
 * Parameters for compare-and-set operation
 */
export interface StockCompareAndSetParameter {
  listingId: UUID | string;
  oldTotal: number;
  newTotal: number;
}

/**
 * Expand behavior
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? Stock
    : EP extends { expand: false }
      ? Omit<Stock, "attributes">
      : Omit<Stock, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StockEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "compareAndSet" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type StockResponse<
  E extends StockEndpoints = "compareAndSet",
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};