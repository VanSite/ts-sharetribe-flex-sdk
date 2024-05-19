import { ApiMeta, ApiParameter, ExtraParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';

export type MessagesEndpoints = 'query' | 'send'
export type MessagesRelationshipsFields = 'sender' | 'transaction'

export interface Message {
  id: UUID,
  type: 'message',
  attributes: {
    content: string,
    createdAt: Date
  }
}

export interface MessageWithRelationships extends Message {
  relationships: {
    sender: Relationship<false, 'user'>,
    transaction: Relationship<false, 'transaction'>
  }
}

export type MessageType<R extends boolean> = R extends true ? MessageWithRelationships : Message;

export interface MessagesParameter extends ApiParameter {
  include?: MessagesRelationshipsFields[]
}


export interface MessagesQueryParameter extends MessagesParameter {
  transactionId: UUID | string
}

export interface MessagesSendParameter extends MessagesParameter {
  transactionId: UUID | string
  content: string
}

type AllMessagesParameter = MessagesQueryParameter | MessagesSendParameter

type MessagesType<P extends AllMessagesParameter> =
  'include' extends keyof P ? (P['include'] extends MessagesRelationshipsFields[] ? true : false) : false;

type IncludedType<P extends AllMessagesParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]> : never
    ) : never;

type ExpandReturnType<P extends AllMessagesParameter, EP> =
  EP extends { expand: true } ? MessageType<MessagesType<P>> :
    EP extends { expand: false } ? Omit<MessageType<MessagesType<P>>, 'attributes'> :
      Omit<MessageType<MessagesType<P>>, 'attributes'>

type DataType<
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameter | undefined
> =
  E extends 'query' ? MessageType<MessagesType<P>>[] :
    E extends 'send' ? ExpandReturnType<P, EP>
      : never;

type ExtraParameterType = ExtraParameter | undefined

export type MessagesResponse<
  E extends MessagesEndpoints,
  P extends AllMessagesParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {})