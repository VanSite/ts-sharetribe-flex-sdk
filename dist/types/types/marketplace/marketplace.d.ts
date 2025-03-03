/**
 * @fileoverview Type definitions for managing marketplace data in the Sharetribe Marketplace API.
 * These types define the structure for marketplace parameters, attributes, and responses.
 */
import { UUID } from '../sharetribe';
export type MarketplaceEndpoints = 'show';
export interface Marketplace {
    id: UUID;
    type: 'marketplace';
    attributes: {
        name: string;
        description: string;
    };
}
export type MarketplaceType = Marketplace;
type DataType<E extends MarketplaceEndpoints> = E extends 'show' ? MarketplaceType : never;
export type MarketplaceResponse<E extends MarketplaceEndpoints> = {
    data: DataType<E>;
};
export {};
