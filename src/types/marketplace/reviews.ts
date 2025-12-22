/**
 * @fileoverview Type definitions for Reviews in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type ReviewsEndpoints = "show" | "query";

/**
 * Relationship fields that can be included
 */
export type ReviewsRelationshipsFields =
  | "author"
  | "author.profileImage"
  | "author.marketplace"
  | "author.stripeAccount"
  | "author.effectivePermissionSet"
  | "listing"
  | "listing.marketplace"
  | "listing.author"
  | "listing.images"
  | "listing.currentStock"
  | "subject"
  | "subject.profileImage"
  | "subject.marketplace"
  | "subject.stripeAccount"
  | "subject.effectivePermissionSet";

/**
 * Review types and states
 */
export type ReviewType = "ofProvider" | "ofCustomer";
export type ReviewState = "public" | "pending";

/**
 * Review resource
 */
export interface Review {
  id: UUID;
  type: "review";
  attributes: {
    type: ReviewType;
    state: ReviewState;
    rating: number;
    content: string;
    createdAt: Date;
    deleted: boolean;
  };
}

/**
 * With relationships
 */
export interface ReviewWithRelationships extends Review {
  relationships: {
    author: Relationship<false, "author">;
    listing?: Relationship<false, "listing">;
    subject: Relationship<false, "subject">;
  };
}

/**
 * Select type based on include
 */
export type ReviewResource<R extends boolean> =
  R extends true ? ReviewWithRelationships : Review;

/**
 * Base request parameters
 */
export interface ReviewsParameter extends ApiParameter {
  include?: ReviewsRelationshipsFields[];
}

/**
 * Show endpoint
 */
export interface ReviewsShowParameter extends ReviewsParameter {
  id: UUID | string;
}

/**
 * Query endpoint
 */
export interface ReviewsQueryParameter extends ReviewsParameter {
  transactionId?: UUID | string;
  listingId?: UUID | string;
  subjectId?: UUID | string;
  type?: ReviewType;
  state?: ReviewState;
}

/**
 * All parameter types
 */
type AllReviewsParameter = ReviewsShowParameter | ReviewsQueryParameter;

/**
 * Detect include — fixed for TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly ReviewsRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

/**
 * Included resources — bulletproof
 */
type IncludedResources<P> =
  P extends { include: infer I extends readonly ReviewsRelationshipsFields[] }
    ? RelationshipTypeMap[I[number]][]
    : never;

/**
 * Expand behavior
 */
type ExpandResult<T, EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? T
    : EP extends { expand: false }
      ? Omit<T, "attributes">
      : Omit<T, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends ReviewsEndpoints,
  P extends AllReviewsParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "query"
    ? ReviewResource<IncludesRelationships<P>>[]
    : E extends "show"
      ? ExpandResult<ReviewResource<IncludesRelationships<P>>, EP>
      : never;

/**
 * Final response type
 */
export type ReviewsResponse<
  E extends ReviewsEndpoints,
  P extends AllReviewsParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});