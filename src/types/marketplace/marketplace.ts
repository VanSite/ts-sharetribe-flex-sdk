/**
 * @fileoverview Type definitions for managing marketplace data in the Sharetribe Marketplace API.
 * These types define the structure for marketplace parameters, attributes, and responses.
 */

import { UUID } from "../sharetribe";

// Supported API endpoints for marketplace operations.
export type MarketplaceEndpoints = "show";

// Base structure for a marketplace.
export interface Marketplace {
  id: UUID;
  type: "marketplace";
  attributes: {
    name: string;
    description: string;
  };
}

// Type alias for the marketplace type.
export type MarketplaceType = Marketplace;

// Mapping of data types for marketplace responses.
type DataType<E extends MarketplaceEndpoints> = E extends "show"
  ? MarketplaceType
  : never;

// Response structure for marketplace operations.
export type MarketplaceResponse<E extends MarketplaceEndpoints> = {
  data: DataType<E>;
};
