import { ApiMeta, ApiParameter, ExtraParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';

export type AvailabilityExceptionsEndpoints = 'query' | 'create' | 'delete'
export type AvailabilityExceptionsRelationshipsFields = 'ownListing'

export interface AvailabilityException {
  id: UUID
  type: 'availabilityException',
  attributes?: {
    seats: number,
    start: Date,
    end: Date
  }
}

export interface AvailabilityExceptionWithRelationships extends AvailabilityException {
  relationships: {
    ownListing: Relationship<false, 'ownListing'>
  }
}

export type AvailabilityExceptionType<R extends boolean> = R extends true ? AvailabilityExceptionWithRelationships : AvailabilityException;

export interface AvailabilityExceptionsParameter extends ApiParameter {
  include?: AvailabilityExceptionsRelationshipsFields[]
}

export interface AvailabilityExceptionsQueryParameter extends AvailabilityExceptionsParameter {
  listingId: UUID | string
  start: Date | string
  end: Date | string
}

export interface AvailabilityExceptionsCreateParameter extends AvailabilityExceptionsParameter {
  listingId: UUID | string
  seats: number
  start: Date | string
  end: Date | string
}

export interface AvailabilityExceptionsDeleteParameter {
  id: UUID | string
}

type AllAvailabilityExceptionsParameter =
  AvailabilityExceptionsQueryParameter
  | AvailabilityExceptionsCreateParameter
  | AvailabilityExceptionsDeleteParameter

type AvailabilityExceptionsType<P extends AllAvailabilityExceptionsParameter> =
  'include' extends keyof P ? (P['include'] extends AvailabilityExceptionsRelationshipsFields[] ? true : false) : false;

type IncludedType<P extends AllAvailabilityExceptionsParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[] ?
      Array<RelationshipTypeMap[P['include'][number]]>[] : never
    ) : never;

type ExpandReturnType<P extends AllAvailabilityExceptionsParameter, EP> =
  EP extends { expand: true } ? AvailabilityExceptionType<AvailabilityExceptionsType<P>> :
    EP extends { expand: false } ? Omit<AvailabilityExceptionType<AvailabilityExceptionsType<P>>, 'attributes'> :
      Omit<AvailabilityExceptionType<AvailabilityExceptionsType<P>>, 'attributes'>

type ExtraParameterType = ExtraParameter | undefined

type DataType<
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType
> =
  E extends 'query' ? AvailabilityExceptionType<AvailabilityExceptionsType<P>>[] :
    E extends 'create' ? ExpandReturnType<P, EP> :
      E extends 'delete' ? Pick<AvailabilityException, 'id' | 'type'> : never;

export type AvailabilityExceptionsResponse<
  E extends AvailabilityExceptionsEndpoints,
  P extends AllAvailabilityExceptionsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {})