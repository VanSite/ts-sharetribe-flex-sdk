/**
 * @fileoverview Type definitions for Messages in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type MessagesEndpoints = "query" | "send";

/**
 * Relationship fields that can be included
 */
export type MessagesRelationshipsFields =
  | "sender"
  | "sender.profileImage"
  | "sender.marketplace"
  | "transaction"
  | "transaction.marketplace"
  | "transaction.listing"
  | "transaction.provider"
  | "transaction.customer"
  | "transaction.booking"
  | "transaction.stockReservation"
  | "transaction.reviews"
  | "transaction.messages";

/**
 * Message resource
 */
export interface Message {
  id: UUID;
  type: "message";
  attributes: {
    content: string;
    createdAt: Date;
  };
}

/**
 * With relationships
 */
export interface MessageWithRelationships extends Message {
  relationships: {
    sender: Relationship<false, "sender">;
    transaction: Relationship<false, "transaction">;
  };
}

export type MessageResource<R extends boolean> =
  R extends true ? MessageWithRelationships : Message;

/**
 * Base request parameters
 */
export interface MessagesParameter extends ApiParameter {
  include?: MessagesRelationshipsFields[];
}

/**
 * Query messages
 */
export interface MessagesQueryParameter extends MessagesParameter {
  transactionId: UUID | string;
}

/**
 * Send a message
 */
export interface MessagesSendParameter extends MessagesParameter {
  transactionId: UUID | string;
  content: string;
}

/**
 * All parameter types
 */
type AllMessagesParameter = MessagesQueryParameter | MessagesSendParameter;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly MessagesRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends MessagesRelationshipsFields[]
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
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "query"
    ? MessageResource<IncludesRelationships<P>>[]
    : E extends "send"
      ? ExpandResult<MessageResource<IncludesRelationships<P>>, EP>
      : never;

/**
 * Final response type
 */
export type MessagesResponse<
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});