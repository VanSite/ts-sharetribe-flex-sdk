/**
 * @fileoverview Type definitions for Transactions in the Sharetribe Marketplace API.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  Money,
  QueryMeta,
  QueryProt,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";
import {BookingState} from "./bookings";

/**
 * Available endpoints
 */
export type TransactionsEndpoints =
  | "show"
  | "query"
  | "initiate"
  | "initiateSpeculative"
  | "transition"
  | "transitionSpeculative"
  | "updateMetadata";

/**
 * Relationship fields that can be included
 */
export type TransactionsRelationshipsFields =
  | "marketplace"
  | "listing"
  | "listing.marketplace"
  | "listing.author"
  | "listing.images"
  | "listing.currentStock"
  | "provider"
  | "provider.profileImage"
  | "provider.stripeAccount"
  | "provider.effectivePermissionSet"
  | "customer"
  | "customer.profileImage"
  | "customer.stripeAccount"
  | "customer.effectivePermissionSet"
  | "booking"
  | "stockReservation"
  | "reviews"
  | "reviews.author"
  | "reviews.subject"
  | "messages"
  | "messages.sender";

/**
 * Roles in a transaction
 */
export type TransactionParty = "customer" | "provider";

/**
 * Transaction variety
 */
export type TransactionVariety = "sale" | "order";

/**
 * Line item in a transaction
 */
export interface LineItem {
  code: string;
  quantity?: number;
  units?: number;
  seats?: number;
  unitPrice: Money;
  percentage?: number;
  reversal?: boolean;
  lineTotal: Money;
  includeFor: TransactionParty[];
}

/**
 * Process transition record
 */
export interface Transition {
  transition: string;
  createdAt: Date | string;
  by: TransactionParty;
}

/**
 * Core transaction attributes (always present)
 */
export interface TransactionAttributes {
  createdAt: Date;
  processName: string;
  processVersion: number;
  lastTransition: string;
  lastTransitionedAt: string | Date;
  payinTotal: Money;
  payoutTotal: Money;
  lineItems: LineItem[];
  protectedData: TransactionProtectedData & TransactionCustomProtectedData;
  metadata: TransactionMetadata & TransactionCustomMetadata;
  transitions: Transition[];
}

/**
 * Base transaction type
 */
export interface Transaction {
  id: UUID;
  type: "transaction";
  attributes: TransactionAttributes;
}

/**
 * Transaction with relationships
 */
export interface TransactionWithRelationships extends Transaction {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    listing: Relationship<false, "listing">;
    provider: Relationship<false, "provider">;
    customer: Relationship<false, "customer">;
    booking: Relationship<false, "booking">;
    stockReservation: Relationship<false, "stockReservation">;
    reviews: Relationship<true, "reviews">;
    messages: Relationship<true, "messages">;
  };
}

/**
 * Select type based on include
 */
export type TransactionType<R extends boolean> =
  R extends true ? TransactionWithRelationships : Transaction;

/**
 * Base API parameter
 */
export interface TransactionsParameter extends ApiParameter {
  include?: TransactionsRelationshipsFields[];
}

/**
 * Show endpoint
 */
export interface TransactionsShowParameter extends TransactionsParameter {
  id: UUID | string;
}

/**
 * Query endpoint (with optional privileged fields when I = true)
 */
export type TransactionsQueryParameter<I extends boolean = false> =
  TransactionsParameter &
  {
    // Public / normal filters
    bookingEnd?: string;
    bookingStart?: string;
    bookingStates?: BookingState[];
    createdAtEnd?: string;
    createdAtStart?: string;
    hasBooking?: boolean;
    hasMessage?: boolean;
    hasPayin?: boolean;
    hasStockReservation?: boolean;
    lastTransitionedAtStart?: string;
    lastTransitions?: string[];
    listingId?: UUID | string;
    only?: TransactionVariety;
    processName?: string;
    stockReservationStates?: string[];
    userId?: UUID | string;

    sort?:
      | "bookingEnd"
      | "bookingStart"
      | "createdAt"
      | "lastMessageAt"
      | "lastTransitionedAt"
      | `meta_${string}`
      | `prot_${string}`;

    // Dynamic indexed query fields
    [keyof: QueryMeta]: string | undefined;
    [keyof: QueryProt]: string | undefined;
  } & (I extends true
  ? {
    customerId?: UUID | string;
    providerId?: UUID | string;
  }
  : {});

/**
 * Initiate / Speculative initiate
 */
export interface TransactionsInitiateParameter extends TransactionsParameter {
  processAlias: string;
  transition: string;
  params?: unknown;
}

export interface TransactionsInitiateSpeculativeParameter
  extends TransactionsInitiateParameter {
}

/**
 * Transition / Speculative transition
 */
export interface TransactionsTransitionParameter extends TransactionsParameter {
  id: UUID | string;
  transition: string;
  params?: unknown;
}

export interface TransactionsTransitionSpeculativeParameter
  extends TransactionsTransitionParameter {
}

/**
 * Update metadata
 */
export interface TransactionsUpdateMetadataParameter extends TransactionsParameter {
  id: UUID | string;
  metadata?: TransactionMetadata & TransactionCustomMetadata;
}

/**
 * Custom data structures
 */
export interface TransactionProtectedData {
  [key: string]: any
}

export interface TransactionCustomProtectedData extends Record<string, unknown> {
}

export interface TransactionMetadata {
  [key: string]: any
}

export interface TransactionCustomMetadata extends Record<string, unknown> {
}

/**
 * Helpers
 */
type HasInclude<P> = P extends { include: infer I extends TransactionsRelationshipsFields[] }
  ? I
  : never;

type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends TransactionsRelationshipsFields[]
    ? RelationshipTypeMap[Fields[number]][]
    : never;

/**
 * Expand behavior (for transition responses)
 */
type ExpandResult<T, EP extends ExtraParameter | undefined> =
  EP extends { expand: true }
    ? T
    : EP extends { expand: false }
      ? Omit<T, "attributes">
      : Omit<T, "attributes">;

/**
 * Union of all parameter types
 */
type AllTransactionsParameter =
  | TransactionsShowParameter
  | TransactionsQueryParameter<any>
  | TransactionsInitiateParameter
  | TransactionsInitiateSpeculativeParameter
  | TransactionsTransitionParameter
  | TransactionsTransitionSpeculativeParameter
  | TransactionsUpdateMetadataParameter;

/**
 * Final response data type
 */
type TransactionsResponseData<
  E extends TransactionsEndpoints,
  P extends AllTransactionsParameter,
  EP extends ExtraParameter | undefined
> = E extends "show"
  ? TransactionType<IncludesRelationships<P>>
  : E extends "query"
    ? TransactionType<IncludesRelationships<P>>[]
    : E extends "initiate" | "initiateSpeculative" | "transition" | "transitionSpeculative" | "updateMetadata"
      ? ExpandResult<TransactionType<IncludesRelationships<P>>, EP>
      : never;

/**
 * Final response type
 */
export type TransactionsResponse<
  E extends TransactionsEndpoints,
  P extends AllTransactionsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: TransactionsResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});