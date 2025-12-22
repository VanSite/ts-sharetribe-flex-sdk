/**
 * @fileoverview Type definitions for Stripe Customer operations in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type StripeCustomerEndpoints =
  | "create"
  | "addPaymentMethod"
  | "deletePaymentMethod";

/**
 * Relationship fields that can be included
 */
export type StripeCustomerRelationshipsFields = "defaultPaymentMethod";

/**
 * Stripe Customer resource
 */
export interface StripeCustomer {
  id: UUID;
  type: "stripeCustomer";
  attributes: {
    stripeCustomerId: string;
  };
}

/**
 * Stripe Customer with relationships
 */
export interface StripeCustomerWithRelationships extends StripeCustomer {
  relationships: {
    defaultPaymentMethod: Relationship<false, "defaultPaymentMethod">;
  };
}

/**
 * Select type based on include
 */
export type StripeCustomerType<R extends boolean> =
  R extends true ? StripeCustomerWithRelationships : StripeCustomer;

/**
 * Base request parameters
 */
export interface StripeCustomerParameter extends ApiParameter {
  include?: StripeCustomerRelationshipsFields[];
}

/**
 * Create endpoint
 */
export interface StripeCustomerCreateParameter extends StripeCustomerParameter {
  stripePaymentMethodId?: string;
  stripeCustomerEmail?: string;
}

/**
 * Add payment method
 */
export interface StripeCustomerAddPaymentMethodParameter
  extends StripeCustomerParameter {
  stripePaymentMethodId: string;
}

/**
 * Delete payment method (no body required)
 */
export interface StripeCustomerDeletePaymentMethodParameter
  extends StripeCustomerParameter {
}

/**
 * All parameter types
 */
type AllStripeCustomerParameter =
  | StripeCustomerCreateParameter
  | StripeCustomerAddPaymentMethodParameter
  | StripeCustomerDeletePaymentMethodParameter;

/**
 * Detect if relationships are requested
 */
type HasInclude<P> = P extends { include: infer I extends StripeCustomerRelationshipsFields[] }
  ? I
  : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

/**
 * Included resources (when include is used)
 */
type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends StripeCustomerRelationshipsFields[]
    ? RelationshipTypeMap[Fields[number]][]
    : never;

/**
 * Expand behavior
 */
type ExpandResult<T, EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? T
    : EP extends { expand: false }
      ? Omit<T, "attributes">
      : Omit<T, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends StripeCustomerEndpoints,
  P extends AllStripeCustomerParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "create" | "addPaymentMethod" | "deletePaymentMethod"
    ? ExpandResult<StripeCustomerType<IncludesRelationships<P>>, EP>
    : never;

/**
 * Final response type
 */
export type StripeCustomerResponse<
  E extends StripeCustomerEndpoints,
  P extends AllStripeCustomerParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {});