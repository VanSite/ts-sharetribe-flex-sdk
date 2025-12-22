/**
 * @fileoverview Type definitions for Marketplace in the Sharetribe Marketplace API.
 */

import {UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type MarketplaceEndpoints = "show";

/**
 * Marketplace resource
 */
export interface Marketplace {
  id: UUID;
  type: "marketplace";
  attributes: {
    name: string;
    description: string;
  };
}

/**
 * Response data per endpoint
 */
type ResponseData<E extends MarketplaceEndpoints> =
  E extends "show" ? Marketplace : never;

/**
 * Final response type
 */
export type MarketplaceResponse<E extends MarketplaceEndpoints = "show"> = {
  data: ResponseData<E>;
};