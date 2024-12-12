import {ApiMeta, ApiParameter, ExtraParameter, Relationship, RelationshipTypeMap, UUID} from '../sharetribe';

export type StockReservationsEndpoints = 'show'
export type StockReservationsRelationshipsFields = 'listing' | 'transaction' | 'stockAdjustments'
export type StockReservationState = 'pending' | 'proposed' | 'accepted' | 'declined' | 'cancelled'

export interface StockReservation {
  id: UUID
  type: 'stockReservation'
  attributes: {
    quantity: number
    state: StockReservationState
  }
}

export interface StockReservationWithRelationships extends StockReservation {
  relationships: {
    listing: Relationship<false, 'listing'>
    transaction: Relationship<false, 'transaction'>
    stockAdjustments: Relationship<false, 'stockAdjustment'>
  }
}

export type StockReservationType<R extends boolean> = R extends true ? StockReservationWithRelationships : StockReservation;

export interface StockReservationParameter extends ApiParameter {
}

export interface StockReservationShowParameter extends StockReservationParameter {
  id: UUID
}

type AllStockReservationsParameter = StockReservationShowParameter

type StockReservationsType<P extends AllStockReservationsParameter> =
  'include' extends keyof P ? (P['include'] extends StockReservationsRelationshipsFields[] ? true : false) : false;

type IncludedType<P extends AllStockReservationsParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[]
      ? Array<RelationshipTypeMap[P['include'][number]]> : never
    ) : never;

type ExpandReturnType<P extends AllStockReservationsParameter, EP> =
  EP extends { expand: true } ? StockReservationType<StockReservationsType<P>> :
    EP extends { expand: false } ? Omit<StockReservationType<StockReservationsType<P>>, 'attributes'> :
      Omit<StockReservationType<StockReservationsType<P>>, 'attributes'>

type DataType<
  E extends StockReservationsEndpoints,
  P extends AllStockReservationsParameter,
  EP extends ExtraParameter | undefined
> =
  E extends 'show' ? ExpandReturnType<P, EP> :
    never;

type ExtraParameterType = ExtraParameter | undefined

export type StockReservationsResponse<
  E extends StockReservationsEndpoints,
  P extends AllStockReservationsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
  & (E extends 'query' ? { meta: ApiMeta } : {})