/**
 * @fileoverview Type definitions for Transactions in the Sharetribe Marketplace API.
 * This file defines the structure of transactions, their parameters, and response types for API requests.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameterType,
  Money,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";

/**
 * Available endpoints for the Transactions API.
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
 * Fields available for relationships in transactions.
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
 * Roles for parties in a transaction.
 */
export type TransactionsParties = "customer" | "provider";

/**
 * Varieties of transactions.
 */
export type TransactionsVariety = "sale" | "order";

/**
 * Defines a line item within a transaction.
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
  includeFor: TransactionsParties[];
}

/**
 * Defines a transition in a transaction.
 */
export type Transition = {
  transition: string;
  createdAt: Date | string;
  by: TransactionsParties;
};

/**
 * Defines the structure of a transaction.
 */
export interface Transaction {
  id: UUID;
  type: "transaction";
  attributes: {
    createdAt: Date;
    processName: string;
    processVersion: number;
    lastTransition: string;
    lastTransitionedAt: string;
    payinTotal: Money;
    payoutTotal: Money;
    lineItems: LineItem[];
    protectedData: TransactionProtectedData & TransactionCustomProtectedData;
    metadata: TransactionMetadata & TransactionCustomMetadata;
    transitions: Transition[];
  };
}

/**
 * Transaction with additional relationship information.
 */
export interface TransactionWithRelationships extends Transaction {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    listing: Relationship<false, "listing">;
    provider: Relationship<false, "user">;
    customer: Relationship<false, "user">;
    booking: Relationship<false, "booking">;
    stockReservation: Relationship<false, "stockReservation">;
    reviews: Relationship<true, "reviews">;
    messages: Relationship<true, "messages">;
  };
}

/**
 * Represents a transaction type based on the inclusion of relationships.
 */
export type TransactionType<R extends boolean> = R extends true
  ? TransactionWithRelationships
  : Transaction;

/**
 * Base parameters for Transactions API requests.
 */
export interface TransactionsParameter extends ApiParameter {
  include?: TransactionsRelationshipsFields[];
}

/**
 * Parameters for fetching a specific transaction.
 */
export interface TransactionsShowParameter extends TransactionsParameter {
  id: UUID | string;
}

/**
 * Parameters for querying transactions.
 */
export type TransactionsQueryParameter<I extends boolean = false> =
  TransactionsParameter &
    (I extends false
      ? {
          only?: TransactionsVariety;
          lastTransitions?: string[];
        }
      : {
          createdAtStart?: string;
          createdAtEnd?: string;
          userId?: UUID | string;
          customerId?: UUID | string;
          providerId?: UUID | string;
          listingId?: UUID | string;
        });

/**
 * Parameters for initiating a transaction.
 */
export interface TransactionsInitiateParameter extends TransactionsParameter {
  processAlias: string;
  transition: string;
  params: unknown;
}

/**
 * Parameters for speculative initiation of a transaction.
 */
export interface TransactionsInitiateSpeculativeParameter
  extends TransactionsParameter {
  processAlias: string;
  transition: string;
  params: unknown;
}

/**
 * Parameters for transitioning a transaction.
 */
export interface TransactionsTransitionParameter extends TransactionsParameter {
  id: UUID | string;
  transition: string;
  params: unknown;
}

/**
 * Parameters for speculative transitioning of a transaction.
 */
export interface TransactionsTransitionSpeculativeParameter
  extends TransactionsParameter {
  id: UUID | string;
  transition: string;
  params: unknown;
}

/**
 * Parameters for updating transaction metadata.
 */
export interface TransactionsUpdateMetadataParameter
  extends TransactionsParameter {
  id: UUID | string;
  metadata: TransactionMetadata & TransactionCustomMetadata;
}

/**
 * Protected data structure for a transaction.
 */
export interface TransactionProtectedData {
  [key: string]: any;
}

/**
 * Custom protected data structure for a transaction.
 */
export interface TransactionCustomProtectedData {}

/**
 * Metadata structure for a transaction.
 */
export interface TransactionMetadata {
  [key: string]: any;
}

/**
 * Custom metadata structure for a transaction.
 */
export interface TransactionCustomMetadata {}

type AllTransactionsParameter =
  | TransactionsShowParameter
  | TransactionsQueryParameter
  | TransactionsInitiateParameter
  | TransactionsInitiateSpeculativeParameter
  | TransactionsTransitionParameter
  | TransactionsTransitionSpeculativeParameter;

type TransactionsType<P extends AllTransactionsParameter> =
  "include" extends keyof P
    ? P["include"] extends TransactionsRelationshipsFields[]
      ? true
      : false
    : false;

type IncludedType<P extends AllTransactionsParameter> =
  "include" extends keyof P
    ? P["include"] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P["include"][number]]>
      : never
    : never;

type ExpandReturnType<P extends AllTransactionsParameter, EP> = EP extends {
  expand: true;
}
  ? TransactionType<TransactionsType<P>>
  : EP extends { expand: false }
  ? Omit<TransactionType<TransactionsType<P>>, "attributes">
  : Omit<TransactionType<TransactionsType<P>>, "attributes">;

/**
 * Defines the data type based on the Transactions API endpoint and parameters.
 */
type DataType<
  E extends TransactionsEndpoints,
  P extends AllTransactionsParameter,
  EP extends ExtraParameterType | undefined
> = E extends "show"
  ? TransactionType<TransactionsType<P>> // Return a single transaction for 'show'
  : E extends "query"
  ? TransactionType<TransactionsType<P>>[] // Return an array for 'query'
  : E extends "transition"
  ? ExpandReturnType<P, EP>
  : never;

/**
 * Response structure for Transactions API calls.
 */
export type TransactionsResponse<
  E extends TransactionsEndpoints,
  P extends AllTransactionsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});
