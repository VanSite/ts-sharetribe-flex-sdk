import { ApiMeta, ApiParameter, ExtraParameter, LatLng, Money, QueryMeta, QueryPub, Relationship, RelationshipTypeMap, UUID } from '../sharetribe';
import LatLngBounds from '../../sdkTypes/LatLngBounds';
export type ListingsEndpoints = 'show' | 'query' | 'create' | 'update' | 'close' | 'open' | 'approve';
export type ListingsRelationshipsFields = 'marketplace' | 'author' | 'images' | 'currentStock';
export type ListingState = 'published' | 'closed';
export type ListingAvailability = 'day-full' | 'day-partial' | 'time-full' | 'time-partial';
export interface Listing<I extends boolean = false> {
    id: UUID;
    type: 'listing';
    attributes: ListingAttributes<I>;
}
type ListingAttributes<I extends boolean = false> = {
    availabilityPlan: ListingAvailabilityPlan;
    createdAt: Date;
    deleted: boolean;
    description: string;
    geolocation: LatLng;
    metadata: ListingMetadata & ListingCustomMetadata;
    price: Money;
    publicData: ListingPublicData & ListingCustomPublicData;
    state: ListingState;
    title: string;
} & (I extends true ? {
    privateData: ListingPrivateData & ListingCustomPrivateData;
} : {});
type ListingAvailabilityPlanTypes = 'availability-plan/day' | 'availability-plan/time';
type ListingAvailabilityPlanEntry<T extends ListingAvailabilityPlanTypes> = {
    dayOfWeek: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    seats: number;
} & T extends 'availability-plan/time' ? {
    startTime: string;
    endTime: string;
} : {};
type ListingAvailabilityPlan<T extends ListingAvailabilityPlanTypes = 'availability-plan/day'> = {
    type: string;
    timezone: string;
    entries: Array<ListingAvailabilityPlanEntry<T>>;
};
export interface ListingWithRelationships<I extends boolean = false> extends Listing<I> {
    relationships: {
        marketplace: Relationship<false, 'marketplace'>;
        author: Relationship<false, 'user'>;
        images: Relationship<true, 'image'>;
        currentStock: Relationship<false, 'stock'>;
    };
}
export type ListingType<R extends boolean> = R extends true ? ListingWithRelationships : Listing;
export interface ListingsParameter extends ApiParameter {
    include?: ListingsRelationshipsFields[];
}
export interface ListingsShowParameter extends ListingsParameter {
    id: UUID | string;
}
export interface ListingsQueryParameter extends ListingsParameter {
    authorId?: UUID | string;
    ids?: UUID[] | string[];
    keywords?: string;
    origin?: LatLng | string;
    bounds?: LatLngBounds | string;
    price?: Money | [Money, Money] | string;
    start?: Date | string;
    end?: Date | string;
    seats?: number;
    availability?: ListingAvailability;
    minDuration?: number;
    minStock?: number;
    [keyof: QueryPub]: string;
    [keyof: QueryMeta]: string;
    sort?: string;
}
export interface ListingsCreateParameter extends ListingsParameter {
    title: string;
    authorId: UUID | string;
    state: ListingState;
    description?: string;
    geolocation?: LatLng | string;
    price?: Money | string;
    availabilityPlan?: ListingAvailabilityPlan;
    publicData?: ListingPublicData & ListingCustomPublicData;
    privateData?: ListingPrivateData & ListingCustomPrivateData;
    metadata?: ListingMetadata & ListingCustomMetadata;
    images?: UUID[] | string[];
}
export interface ListingsUpdateParameter extends ListingsParameter {
    id: UUID | string;
    title?: string;
    description?: string;
    price?: Money | string;
    availabilityPlan?: ListingAvailabilityPlan;
    publicData?: ListingPublicData & ListingCustomPublicData;
    privateData?: ListingPrivateData & ListingCustomPrivateData;
    metadata?: ListingMetadata & ListingCustomMetadata;
    images?: UUID[] | string[];
}
export interface ListingsCloseParameter extends ListingsParameter {
    id: UUID | string;
}
export interface ListingsOpenParameter extends ListingsParameter {
    id: UUID | string;
}
export interface ListingsApproveParameter extends ListingsParameter {
    id: UUID | string;
}
export interface ListingPublicData {
    [key: string]: any;
}
export interface ListingCustomPublicData {
}
export interface ListingPrivateData {
    [key: string]: any;
}
export interface ListingCustomPrivateData {
}
export interface ListingMetadata {
    [key: string]: any;
}
export interface ListingCustomMetadata {
}
type AllListingsParameter = ListingsShowParameter | ListingsQueryParameter | ListingsCreateParameter | ListingsUpdateParameter;
type ListingsType<P extends AllListingsParameter> = 'include' extends keyof P ? (P['include'] extends ListingsRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllListingsParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]> : never) : never;
type ExpandReturnType<P extends AllListingsParameter, EP> = EP extends {
    expand: true;
} ? ListingType<ListingsType<P>> : EP extends {
    expand: false;
} ? Omit<ListingType<ListingsType<P>>, 'attributes'> : Omit<ListingType<ListingsType<P>>, 'attributes'>;
type DataType<E extends ListingsEndpoints, P extends AllListingsParameter, EP extends ExtraParameter | undefined> = E extends 'query' ? ListingType<ListingsType<P>>[] : E extends 'show' ? ExpandReturnType<P, EP> : E extends 'create' ? ExpandReturnType<P, EP> : E extends 'update' ? ExpandReturnType<P, EP> : E extends 'close' ? ExpandReturnType<P, EP> : E extends 'open' ? ExpandReturnType<P, EP> : E extends 'approve' ? ExpandReturnType<P, EP> : never;
type ExtraParameterType = ExtraParameter | undefined;
export type ListingsResponse<E extends ListingsEndpoints, P extends AllListingsParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
