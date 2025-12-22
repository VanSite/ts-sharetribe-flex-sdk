/**
 * @fileoverview Type definitions for Stripe Setup Intents in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type StripeSetupIntentsEndpoints = "create";

/**
 * Stripe Setup Intent resource
 */
export interface StripeSetupIntent {
  id: UUID;
  type: "stripeSetupIntent";
  attributes: {
    stripeSetupIntentId: string;
    clientSecret: string;
  };
}

/**
 * Base request parameters
 */
export interface StripeSetupIntentsParameter extends ApiParameter {
}

/**
 * Parameters for creating a setup intent
 */
export interface StripeSetupIntentsCreateParameter
  extends StripeSetupIntentsParameter {
}

/**
 * Expand behavior (controls whether `attributes` is included)
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? StripeSetupIntent
    : EP extends { expand: false }
      ? Omit<StripeSetupIntent, "attributes">
      : Omit<StripeSetupIntent, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StripeSetupIntentsEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "create" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type StripeSetupIntentsResponse<
  E extends StripeSetupIntentsEndpoints = "create",
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};