import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  UUID,
  LatLng,
  Money,
  QueryMeta,
  QueryPub,
  Relationship,
  RelationshipTypeMap
} from '../sharetribe';
import LatLngBounds from '../../sdkTypes/LatLngBounds';

export type ListingsEndpoints = 'show' | 'query'
export type ListingsRelationshipsFields = 'marketplace' | 'author' | 'images' | 'currentStock'

export type ListingState = 'published' | 'closed'
export type ListingAvailability = 'day-full' | 'day-partial' | 'time-full' | 'time-partial'

export interface Listing {
  id: UUID,
  type: 'listing',
  attributes: {
    availabilityPlan: { type: string },
    createdAt: Date,
    deleted: boolean,
    description: string,
    geolocation: LatLng,
    metadata: unknown,
    price: Money
    publicData: unknown,
    state: ListingState,
    title: string,
  }
}

export interface ListingWithRelationships extends Listing {
  relationships: {
    marketplace: Relationship<false, 'marketplace'>
    author: Relationship<false, 'user'>
    images: Relationship<true, 'image'>
    currentStock: Relationship<false, 'stock'>
  }
}

export type ListingType<R extends boolean> = R extends true ? ListingWithRelationships : Listing;

export interface ListingsParameter extends ApiParameter {
  include?: ListingsRelationshipsFields[]
}

export interface ListingsShowParameter extends ListingsParameter {
  id: UUID | string
}

export interface ListingsQueryParameter extends ListingsParameter {
  authorId?: UUID | string
  ids?: UUID[] | string[],
  keywords?: string
  origin?: LatLng | string
  bounds?: LatLngBounds | string
  price?: Money | [Money, Money] | string
  start?: Date | string
  end?: Date | string
  seats?: number
  availability?: ListingAvailability
  minDuration?: number
  minStock?: number

  [keyof: QueryPub]: string

  [keyof: QueryMeta]: string

  sort?: string
}

type AllListingsParameter = ListingsShowParameter | ListingsQueryParameter

type ListingsType<P extends AllListingsParameter> =
  'include' extends keyof P ? (P['include'] extends ListingsRelationshipsFields[] ? true : false) : false;

type IncludedType<P extends AllListingsParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]> : never
    ) : never;

type ExpandReturnType<P extends AllListingsParameter, EP> =
  EP extends { expand: true } ? ListingType<ListingsType<P>> :
    EP extends { expand: false } ? Omit<ListingType<ListingsType<P>>, 'attributes'> :
      Omit<ListingType<ListingsType<P>>, 'attributes'>

type DataType<
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameter | undefined
> =
  E extends 'query' ? ListingType<ListingsType<P>>[] :
    E extends 'show' ? ExpandReturnType<P, EP> :
      never;

type ExtraParameterType = ExtraParameter | undefined

export type ListingsResponse<
  E extends ListingsEndpoints,
  P extends AllListingsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {})
