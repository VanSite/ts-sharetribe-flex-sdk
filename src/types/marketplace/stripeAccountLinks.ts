/**
 * @fileoverview Type definitions for Stripe Account Links in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type StripeAccountLinksEndpoints = "create";

/**
 * Stripe Account Link resource
 */
export interface StripeAccountLink {
  id: UUID;
  type: "stripeAccountLink";
  attributes: {
    url: string;
    expiresAt: Date;
  };
}

/**
 * Base request parameters
 */
export interface StripeAccountLinksParameter extends ApiParameter {
}

/**
 * Parameters for creating an account link
 */
export interface StripeAccountLinksCreateParameter
  extends StripeAccountLinksParameter {
  failureURL: string;
  successURL: string;
  type: string;
  collectionOptions: {
    fields: Array<"currently_due" | "eventually_due">;
    future_requirements: Array<"include" | "omit">;
  };
}

/**
 * Expand behavior
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? StripeAccountLink
    : EP extends { expand: false }
      ? Omit<StripeAccountLink, "attributes">
      : Omit<StripeAccountLink, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StripeAccountLinksEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "create" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type StripeAccountLinksResponse<
  E extends StripeAccountLinksEndpoints = "create",
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};