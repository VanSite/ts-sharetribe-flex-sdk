/**
 * @fileoverview Type definitions for Reviews functionality in the Sharetribe Marketplace API.
 * This file defines the structure of review parameters and responses for the API endpoints.
 */
import { ApiMeta, ApiParameter, ExtraParameter, UUID, Relationship, RelationshipTypeMap, ExtraParameterType } from '../sharetribe';
export type ReviewsEndpoints = 'show' | 'query';
export type ReviewsRelationshipsFields = 'user' | 'listing' | 'subject';
export type ReviewTypes = 'ofProvider' | 'ofCustomer';
export type ReviewStates = 'public' | 'pending';
export interface Review {
    id: UUID;
    type: 'reviews';
    attributes: {
        type: string;
        rating: number;
        content: string;
        createdAt: Date;
        deleted: boolean;
    };
}
export interface ReviewWithRelationships extends Review {
    relationships: {
        user?: Relationship<false, 'user'>;
        listing?: Relationship<false, 'listing'>;
        subject?: Relationship<false, 'user'>;
    };
}
export type ReviewType<R extends boolean> = R extends true ? ReviewWithRelationships : Review;
export interface ReviewsParameter extends ApiParameter {
    include?: ReviewsRelationshipsFields[];
}
export interface ReviewsShowParameter extends ReviewsParameter {
    id: UUID | string;
}
export interface ReviewsQueryParameter extends ReviewsParameter {
    transactionId?: UUID | string;
    listingId?: UUID | string;
    subjectId?: UUID | string;
    type?: ReviewTypes;
    state?: ReviewStates;
}
type AllReviewsParameter = ReviewsShowParameter | ReviewsQueryParameter;
type ReviewsType<P extends AllReviewsParameter> = 'include' extends keyof P ? (P['include'] extends ReviewsRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllReviewsParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]> : never) : never;
type ExpandReturnType<P extends AllReviewsParameter, EP> = EP extends {
    expand: true;
} ? ReviewType<ReviewsType<P>> : EP extends {
    expand: false;
} ? Omit<ReviewType<ReviewsType<P>>, 'attributes'> : Omit<ReviewType<ReviewsType<P>>, 'attributes'>;
type DataType<E extends ReviewsEndpoints, P extends AllReviewsParameter, EP extends ExtraParameter | undefined> = E extends 'query' ? ReviewType<ReviewsType<P>>[] : E extends 'show' ? ExpandReturnType<P, EP> : never;
export type ReviewsResponse<E extends ReviewsEndpoints, P extends AllReviewsParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
