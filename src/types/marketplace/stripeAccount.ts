/**
 * @fileoverview Type definitions for Stripe Account operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stripe Account API endpoints.
 */

import { ApiParameter, ExtraParameterType, UUID } from "../sharetribe";
import type Stripe from "stripe";

// Supported API endpoints for Stripe Account operations.
export type StripeAccountEndpoints = "fetch" | "create" | "update";

// Structure of a Stripe Account object.
export interface StripeAccount {
  id: UUID;
  type: "stripeAccount";
  attributes: {
    stripeAccountId: string; // Unique identifier for the Stripe Account.
    stripeAccountData: Stripe.Account; // Full Stripe account data from the Stripe API.
  };
}

// Base parameters for Stripe Account operations.
export interface StripeAccountParameter extends ApiParameter {}

// Parameters for creating a Stripe Account.
export interface StripeAccountCreateParameter extends StripeAccountParameter {
  country: string; // Country where the Stripe Account is registered.
  accountToken?: string; // Optional token for account creation.
  bankAccountToken?: string; // Optional token for bank account linking.
  businessProfileMCC?: string; // Optional merchant category code.
  businessProfileURL?: string; // Optional business profile URL.
  businessProfileProductDescription?: string; // Optional description of products or services.
  requestedCapabilities?: string[]; // Optional capabilities for the Stripe Account.
}

// Parameters for updating a Stripe Account.
export interface StripeAccountUpdateParameter extends StripeAccountParameter {
  accountToken?: string; // Optional token for account updates.
  bankAccountToken?: string; // Optional token for updating the bank account.
  businessProfileMCC?: string; // Optional updated merchant category code.
  businessProfileURL?: string; // Optional updated business profile URL.
  businessProfileProductDescription?: string; // Optional updated description of products or services.
  requestedCapabilities?: string[]; // Optional updated capabilities for the Stripe Account.
}

// Conditional type for expanding or omitting attributes in the response.
type ExpandReturnType<EP> = EP extends { expand: true }
  ? StripeAccount
  : EP extends { expand: false }
  ? Omit<StripeAccount, "attributes">
  : Omit<StripeAccount, "attributes">;

// Type for determining the data structure of the response based on the endpoint.
type DataType<
  E extends StripeAccountEndpoints,
  EP extends ExtraParameterType
> = E extends "fetch"
  ? StripeAccount
  : E extends "create"
  ? ExpandReturnType<EP>
  : E extends "update"
  ? ExpandReturnType<EP>
  : never;

// Response structure for Stripe Account operations.
export type StripeAccountResponse<
  E extends StripeAccountEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};
