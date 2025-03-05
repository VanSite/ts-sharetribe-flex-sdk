/**
 * @fileoverview Type definitions for Stripe Account Links operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stripe Account Links API endpoints.
 */

import { ApiParameter, ExtraParameterType, UUID } from "../sharetribe";

// Supported API endpoints for Stripe Account Links operations.
export type StripeAccountLinksEndpoints = "create";

// Structure of a Stripe Account Link object.
export interface StripeAccountLink {
  id: UUID;
  type: "stripeAccountLink";
  attributes: {
    url: string; // The URL to the Stripe Account Link.
    expiresAt: Date; // Expiration time of the account link.
  };
}

// Base parameters for Stripe Account Links operations.
export interface StripeAccountLinksParameter extends ApiParameter {}

// Parameters for creating a Stripe Account Link.
export interface StripeAccountLinksCreateParameter
  extends StripeAccountLinksParameter {
  failureURL: string; // URL to redirect to upon failure.
  successURL: string; // URL to redirect to upon success.
  type: string; // Type of the account link.
  collectionOptions: {
    fields: Array<"currently_due" | "eventually_due">; // Fields to collect.
    future_requirements: Array<"include" | "omit">; // Handling future requirements.
  };
}

// Conditional type for expanding or omitting attributes in the response.
type ExpandReturnType<EP> = EP extends { expand: true }
  ? StripeAccountLink
  : EP extends { expand: false }
  ? Omit<StripeAccountLink, "attributes">
  : Omit<StripeAccountLink, "attributes">;

// Type for determining the data structure of the response based on the endpoint.
type DataType<
  E extends StripeAccountLinksEndpoints,
  EP extends ExtraParameterType
> = E extends "create" ? ExpandReturnType<EP> : never;

// Response structure for Stripe Account Links operations.
export type StripeAccountLinksResponse<
  E extends StripeAccountLinksEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};
