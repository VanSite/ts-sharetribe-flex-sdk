/**
 * @fileoverview Type definitions for Stripe Customer operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stripe Customer API endpoints.
 */

import {
  ApiParameter,
  UUID,
  Relationship,
  RelationshipTypeMap,
  ExtraParameterType,
} from "../sharetribe";

// Supported API endpoints for Stripe Customer operations.
export type StripeCustomerEndpoints =
  | "create"
  | "addPaymentMethod"
  | "deletePaymentMethod";

// Possible relationship fields for a Stripe Customer.
export type StripeCustomerRelationshipsFields = "defaultPaymentMethod";

// Structure of a Stripe Customer object.
export interface StripeCustomer {
  id: UUID;
  type: "stripeCustomer";
  attributes: {
    stripeCustomerId: string; // The ID of the customer in Stripe.
  };
}

// Structure of a Stripe Customer object with relationships.
export interface StripeCustomerWithRelationships extends StripeCustomer {
  relationships: {
    defaultPaymentMethod: Relationship<false, "defaultPaymentMethod">; // Relationship to the default payment method.
  };
}

// Conditional type for a Stripe Customer object, with or without relationships.
export type StripeCustomerType<R extends boolean> = R extends true
  ? StripeCustomerWithRelationships
  : StripeCustomer;

// Base parameters for Stripe Customer operations.
export interface StripeCustomerParameter extends ApiParameter {
  include?: StripeCustomerRelationshipsFields[]; // Relationships to include in the response.
}

// Parameters for creating a Stripe Customer.
export interface StripeCustomerCreateParameter extends StripeCustomerParameter {
  stripePaymentMethodId?: string; // Optional payment method ID.
  stripeCustomerEmail?: string; // Optional customer email.
}

// Parameters for adding a payment method to a Stripe Customer.
export interface StripeCustomerAddPaymentMethodParameter
  extends StripeCustomerParameter {
  stripePaymentMethodId: string; // The payment method ID to add.
}

// Parameters for deleting a payment method from a Stripe Customer.
export interface StripeCustomerDeletePaymentMethodParameter
  extends StripeCustomerParameter {}

// Union type for all Stripe Customer parameters.
type AllStripeCustomerParameter =
  | StripeCustomerCreateParameter
  | StripeCustomerAddPaymentMethodParameter;

// Conditional type for determining if relationships should be included in the response.
type StripeCustomerTypeType<P extends AllStripeCustomerParameter> =
  "include" extends keyof P
    ? P["include"] extends StripeCustomerRelationshipsFields[]
      ? true
      : false
    : false;

// Conditional type for the included relationships in the response.
type IncludedType<P extends AllStripeCustomerParameter> =
  "include" extends keyof P
    ? P["include"] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P["include"][number]]>[]
      : never
    : never;

// Conditional type for expanding or omitting attributes in the response.
type ExpandReturnType<P extends AllStripeCustomerParameter, EP> = EP extends {
  expand: true;
}
  ? StripeCustomerType<StripeCustomerTypeType<P>>
  : EP extends { expand: false }
  ? Omit<StripeCustomerType<StripeCustomerTypeType<P>>, "attributes">
  : Omit<StripeCustomerType<StripeCustomerTypeType<P>>, "attributes">;

// Type for determining the data structure of the response based on the endpoint.
type DataType<
  E extends StripeCustomerEndpoints,
  P extends AllStripeCustomerParameter,
  EP extends ExtraParameterType
> = E extends "create"
  ? ExpandReturnType<P, EP>
  : E extends "addPaymentMethod"
  ? ExpandReturnType<P, EP>
  : E extends "deletePaymentMethod"
  ? ExpandReturnType<P, EP>
  : never;

// Response structure for Stripe Customer operations.
export type StripeCustomerResponse<
  E extends StripeCustomerEndpoints,
  P extends AllStripeCustomerParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {});
