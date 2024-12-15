import { ApiMeta, ApiParameter, ExtraParameter, UUID, Money, Relationship, RelationshipTypeMap } from '../sharetribe';
export type TransactionsEndpoints = 'show' | 'query' | 'initiate' | 'initiateSpeculative' | 'transition' | 'transitionSpeculative' | 'updateMetadata';
export type TransactionsRelationshipsFields = 'marketplace' | 'listing' | 'provider' | 'customer' | 'booking' | 'stockReservation' | 'reviews' | 'messages';
export type TransactionsParties = 'customer' | 'provider';
export type TransactionsVariety = 'sale' | 'order';
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
export type Transition = {
    transition: string;
    createdAt: Date | string;
    by: TransactionsParties;
};
export interface Transaction {
    id: UUID;
    type: 'transaction';
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
export interface TransactionWithRelationships extends Transaction {
    relationships: {
        marketplace: Relationship<false, 'marketplace'>;
        listing: Relationship<false, 'listing'>;
        provider: Relationship<false, 'provider'>;
        customer: Relationship<false, 'customer'>;
        booking: Relationship<false, 'booking'>;
        stockReservation: Relationship<false, 'stockReservation'>;
        reviews: Relationship<true, 'reviews'>;
        messages: Relationship<true, 'messages'>;
    };
}
export type TransactionType<R extends boolean> = R extends true ? TransactionWithRelationships : Transaction;
export interface TransactionsParameter extends ApiParameter {
    include?: TransactionsRelationshipsFields[];
}
export interface TransactionsShowParameter extends TransactionsParameter {
    id: UUID | string;
}
export type TransactionsQueryParameter<I extends boolean = false> = {} & TransactionsParameter & (I extends false ? {
    only?: TransactionsVariety;
    lastTransitions?: string[];
} : {
    createdAtStart?: string;
    createdAtEnd?: string;
    userId?: UUID | string;
    customerId?: UUID | string;
    providerId?: UUID | string;
    listingId?: UUID | string;
});
export interface TransactionsInitiateParameter extends TransactionsParameter {
    processAlias: string;
    transition: string;
    params: unknown;
}
export interface TransactionsInitiateSpeculativeParameter extends TransactionsParameter {
    processAlias: string;
    transition: string;
    params: unknown;
}
export interface TransactionsTransitionParameter extends TransactionsParameter {
    id: UUID | string;
    transition: string;
    params: unknown;
}
export interface TransactionsTransitionSpeculativeParameter extends TransactionsParameter {
    id: UUID | string;
    transition: string;
    params: unknown;
}
export interface TransactionsUpdateMetadataParameter extends TransactionsParameter {
    id: UUID | string;
    metadata: TransactionMetadata & TransactionCustomMetadata;
}
export interface TransactionProtectedData {
    [key: string]: any;
}
export interface TransactionCustomProtectedData {
}
export interface TransactionMetadata {
    [key: string]: any;
}
export interface TransactionCustomMetadata {
}
type AllTransactionsParameter = TransactionsShowParameter | TransactionsQueryParameter | TransactionsInitiateParameter | TransactionsInitiateSpeculativeParameter | TransactionsTransitionParameter | TransactionsTransitionSpeculativeParameter;
type TransactionsType<P extends AllTransactionsParameter> = 'include' extends keyof P ? (P['include'] extends TransactionsRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllTransactionsParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]> : never) : never;
type ExpandReturnType<P extends AllTransactionsParameter, EP> = EP extends {
    expand: true;
} ? TransactionType<TransactionsType<P>> : EP extends {
    expand: false;
} ? Omit<TransactionType<TransactionsType<P>>, 'attributes'> : Omit<TransactionType<TransactionsType<P>>, 'attributes'>;
type ExtraParameterType = ExtraParameter | undefined;
type DataType<E extends TransactionsEndpoints, P extends AllTransactionsParameter, EP extends ExtraParameterType> = E extends 'show' | 'query' ? TransactionType<TransactionsType<P>>[] : E extends 'initiate' | 'initiateSpeculative' | 'transition' | 'transitionSpeculative' ? ExpandReturnType<P, EP> : never;
export type TransactionsResponse<E extends TransactionsEndpoints, P extends AllTransactionsParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
