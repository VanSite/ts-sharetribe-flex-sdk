/**
 * @fileoverview Type definitions for Stripe Persons in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type StripePersonsEndpoints = "create";

/**
 * Stripe Person resource
 */
export interface StripePerson {
  id: UUID;
  type: "stripePerson";
  attributes: {
    stripePersonId: string;
  };
}

/**
 * Base request parameters
 */
export interface StripePersonsParameter extends ApiParameter {
}

/**
 * Parameters for creating a Stripe Person
 */
export interface StripePersonsCreateParameter extends StripePersonsParameter {
  personToken: string;
}

/**
 * Expand behavior (controls inclusion of `attributes`)
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? StripePerson
    : EP extends { expand: false }
      ? Omit<StripePerson, "attributes">
      : Omit<StripePerson, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StripePersonsEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "create" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type StripePersonsResponse<
  E extends StripePersonsEndpoints = "create",
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};