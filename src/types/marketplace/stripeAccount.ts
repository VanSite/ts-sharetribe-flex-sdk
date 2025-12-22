/**
 * @fileoverview Type definitions for Stripe Account operations in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";
import type Stripe from "stripe";

/**
 * Available endpoints
 */
export type StripeAccountEndpoints = "fetch" | "create" | "update";

/**
 * Stripe Account resource
 */
export interface StripeAccount {
  id: UUID;
  type: "stripeAccount";
  attributes: {
    stripeAccountId: string;
    stripeAccountData: Stripe.Account;
  };
}

/**
 * Base request parameters
 */
export interface StripeAccountParameter extends ApiParameter {
}

/**
 * Parameters for creating a Stripe Account
 */
export interface StripeAccountCreateParameter extends StripeAccountParameter {
  country: string;
  accountToken?: string;
  bankAccountToken?: string;
  businessProfileMCC?: string;
  businessProfileURL?: string;
  businessProfileProductDescription?: string;
  requestedCapabilities?: string[];
}

/**
 * Parameters for updating a Stripe Account
 */
export interface StripeAccountUpdateParameter extends StripeAccountParameter {
  accountToken?: string;
  bankAccountToken?: string;
  businessProfileMCC?: string;
  businessProfileURL?: string;
  businessProfileProductDescription?: string;
  requestedCapabilities?: string[];
}

/**
 * Expand behavior
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? StripeAccount
    : EP extends { expand: false }
      ? Omit<StripeAccount, "attributes">
      : Omit<StripeAccount, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StripeAccountEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "fetch"
  ? StripeAccount
  : E extends "create" | "update"
    ? ExpandResult<EP>
    : never;

/**
 * Final response type
 */
export type StripeAccountResponse<
  E extends StripeAccountEndpoints,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};