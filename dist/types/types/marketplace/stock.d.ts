/**
 * @fileoverview Type definitions for Stock operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stock API endpoints.
 */
import { ExtraParameter, ExtraParameterType, UUID } from '../sharetribe';
export type StockEndpoints = 'compareAndSet';
export interface Stock {
    id: UUID;
    type: 'stock';
    attributes: {
        quantity: number;
    };
}
export interface StockCompareAndSetParameter {
    listingId: UUID | string;
    oldTotal: number;
    newTotal: number;
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? Stock : EP extends {
    expand: false;
} ? Omit<Stock, 'attributes'> : Omit<Stock, 'attributes'>;
type DataType<E extends StockEndpoints, EP extends ExtraParameter | undefined> = E extends 'compareAndSet' ? ExpandReturnType<EP> : never;
export type StockResponse<E extends StockEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
