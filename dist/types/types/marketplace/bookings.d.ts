import { ApiMeta, ApiParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';
export type BookingsEndpoints = 'query';
export type BookingsRelationshipsFields = 'transaction';
export type BookingState = 'pending' | 'proposed' | 'accepted' | 'declined' | 'cancelled';
export interface Booking {
    id: UUID;
    type: 'booking';
    attributes: {
        seats: number;
        start: Date;
        end: Date;
        displayStart: Date;
        displayEnd: Date;
        state: BookingState;
    };
}
export interface BookingWithRelationShips extends Booking {
    relationships: {
        transaction: Relationship<false, 'transaction'>;
    };
}
export type BookingType<R extends boolean> = R extends true ? BookingWithRelationShips : Booking;
export interface BookingsParameter extends ApiParameter {
    include?: BookingsRelationshipsFields[];
}
export interface BookingsQueryParameter extends BookingsParameter {
    listingId: UUID | string;
    start: Date | string;
    end: Date | string;
    state?: BookingState;
}
type BookingsType<P extends BookingsQueryParameter> = 'include' extends keyof P ? (P['include'] extends BookingsRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends BookingsParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]> : never) : never;
type DataType<E extends BookingsEndpoints, P extends BookingsQueryParameter> = E extends 'query' ? BookingType<BookingsType<P>>[] : never;
export type BookingsResponse<E extends BookingsEndpoints, P extends BookingsQueryParameter> = {
    data: DataType<E, P>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
