/**
 * @fileoverview Type definitions for managing messages in the Sharetribe Marketplace API.
 * These types define the structure for message parameters, attributes, and responses.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  UUID,
  Relationship,
  RelationshipTypeMap,
  ExtraParameterType
} from '../sharetribe';

// Supported API endpoints for messages operations.
export type MessagesEndpoints = 'query' | 'send';

// Fields for relationships in the message object.
export type MessagesRelationshipsFields = 'sender' | 'transaction';

// Base structure for a message.
export interface Message {
  id: UUID;
  type: 'message';
  attributes: {
    content: string;
    createdAt: Date;
  };
}

// Extended structure for a message with relationships.
export interface MessageWithRelationships extends Message {
  relationships: {
    sender: Relationship<false, 'user'>;
    transaction: Relationship<false, 'transaction'>;
  };
}

// Type alias for a message type with or without relationships.
export type MessageType<R extends boolean> = R extends true ? MessageWithRelationships : Message;

// Base parameters for message operations.
export interface MessagesParameter extends ApiParameter {
  include?: MessagesRelationshipsFields[];
}

// Parameters for querying messages.
export interface MessagesQueryParameter extends MessagesParameter {
  transactionId: UUID | string;
}

// Parameters for sending a message.
export interface MessagesSendParameter extends MessagesParameter {
  transactionId: UUID | string;
  content: string;
}

// Union type for all message parameters.
type AllMessagesParameter = MessagesQueryParameter | MessagesSendParameter;

// Determine if the message includes relationships.
type MessagesType<P extends AllMessagesParameter> =
  'include' extends keyof P ? (P['include'] extends MessagesRelationshipsFields[] ? true : false) : false;

// Extract included types for the message relationships.
type IncludedType<P extends AllMessagesParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]>
      : never
    ) : never;

// Expand the return type for the message based on extra parameters.
type ExpandReturnType<P extends AllMessagesParameter, EP> =
  EP extends { expand: true } ? MessageType<MessagesType<P>> :
    EP extends { expand: false } ? Omit<MessageType<MessagesType<P>>, 'attributes'> :
      Omit<MessageType<MessagesType<P>>, 'attributes'>;

// Map data types to endpoints and parameters.
type DataType<
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameter | undefined
> =
  E extends 'query' ? MessageType<MessagesType<P>>[] :
    E extends 'send' ? ExpandReturnType<P, EP>
      : never;

// Response structure for message operations.
export type MessagesResponse<
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {});
