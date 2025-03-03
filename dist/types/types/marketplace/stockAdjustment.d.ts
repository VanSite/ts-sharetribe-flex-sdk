/**
 * @fileoverview Type definitions for Stock Adjustments in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stock Adjustments API endpoints.
 */
import { ApiMeta, ApiParameter, ExtraParameter, UUID, Relationship, RelationshipTypeMap, ExtraParameterType } from '../sharetribe';
export type StockAdjustmentsEndpoints = 'query' | 'create' | 'delete';
export type StockAdjustmentsRelationshipsFields = 'ownListing' | 'stockReservation';
export interface StockAdjustment {
    id: UUID;
    type: 'stockAdjustments';
    attributes: {
        at: Date;
        quantity: number;
    };
}
export interface StockAdjustmentWithRelationships extends StockAdjustment {
    relationships: {
        ownListing: Relationship<false, 'ownListing'>;
        stockReservation: Relationship<false, 'stock'>;
    };
}
export type StockAdjustmentType<R extends boolean> = R extends true ? StockAdjustmentWithRelationships : StockAdjustment;
export interface StockAdjustmentsParameter extends ApiParameter {
    include?: StockAdjustmentsRelationshipsFields[];
}
export interface StockAdjustmentsQueryParameter extends StockAdjustmentsParameter {
    listingId: UUID | string;
    start: Date | string;
    end: Date | string;
}
export interface StockAdjustmentsCreateParameter extends StockAdjustmentsParameter {
    listingId: UUID | string;
    quantity: number;
}
type AllStockAdjustmentsParameter = StockAdjustmentsQueryParameter | StockAdjustmentsCreateParameter;
type StockAdjustmentsType<P extends AllStockAdjustmentsParameter> = 'include' extends keyof P ? (P['include'] extends StockAdjustmentsRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllStockAdjustmentsParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]> : never) : never;
type ExpandReturnType<P extends AllStockAdjustmentsParameter, EP> = EP extends {
    expand: true;
} ? StockAdjustmentType<StockAdjustmentsType<P>> : EP extends {
    expand: false;
} ? Omit<StockAdjustmentType<StockAdjustmentsType<P>>, 'attributes'> : Omit<StockAdjustmentType<StockAdjustmentsType<P>>, 'attributes'>;
type DataType<E extends StockAdjustmentsEndpoints, P extends AllStockAdjustmentsParameter, EP extends ExtraParameter | undefined> = E extends 'query' ? StockAdjustmentType<StockAdjustmentsType<P>>[] : E extends 'create' ? ExpandReturnType<P, EP> : E extends 'delete' ? Pick<StockAdjustment, 'id' | 'type'> : never;
export type StockAdjustmentsResponse<E extends StockAdjustmentsEndpoints, P extends AllStockAdjustmentsParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
