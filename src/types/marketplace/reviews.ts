/**
 * @fileoverview Type definitions for Reviews functionality in the Sharetribe Marketplace API.
 * This file defines the structure of review parameters and responses for the API endpoints.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  UUID,
  Relationship,
  RelationshipTypeMap,
  ExtraParameterType,
} from "../sharetribe";

// Supported API endpoints for reviews operations.
export type ReviewsEndpoints = "show" | "query";

// Fields that can be included in reviews relationships.
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

// Types and states applicable to reviews.
export type ReviewTypes = "ofProvider" | "ofCustomer";
export type ReviewStates = "public" | "pending";

// Structure of a Review object.
export interface Review {
  id: UUID;
  type: "reviews";
  attributes: {
    type: string;
    state: "public" | "pending";
    rating: number;
    content: string;
    createdAt: Date;
    deleted: boolean;
  };
}

// Structure of a Review object with relationships.
export interface ReviewWithRelationships extends Review {
  relationships: {
    user?: Relationship<false, "user">;
    listing?: Relationship<false, "listing">;
    subject?: Relationship<false, "user">;
  };
}

// Utility type for determining if relationships should be included in the response.
export type ReviewType<R extends boolean> = R extends true
  ? ReviewWithRelationships
  : Review;

// Base parameters for reviews operations.
export interface ReviewsParameter extends ApiParameter {
  include?: ReviewsRelationshipsFields[];
}

// Parameters for retrieving a specific review.
export interface ReviewsShowParameter extends ReviewsParameter {
  id: UUID | string;
}

// Parameters for querying reviews.
export interface ReviewsQueryParameter extends ReviewsParameter {
  transactionId?: UUID | string;
  listingId?: UUID | string;
  subjectId?: UUID | string;
  type?: ReviewTypes;
  state?: ReviewStates;
}

// Utility type for handling relationships in review parameters.
type AllReviewsParameter = ReviewsShowParameter | ReviewsQueryParameter;

// Type to determine if relationships are included.
type ReviewsType<P extends AllReviewsParameter> = "include" extends keyof P
  ? P["include"] extends ReviewsRelationshipsFields[]
    ? true
    : false
  : false;

// Included relationship types based on review parameters.
type IncludedType<P extends AllReviewsParameter> = "include" extends keyof P
  ? P["include"] extends (keyof RelationshipTypeMap)[]
    ? Array<RelationshipTypeMap[P["include"][number]]>
    : never
  : never;

// Expanded return type based on extra parameters.
type ExpandReturnType<P extends AllReviewsParameter, EP> = EP extends {
  expand: true;
}
  ? ReviewType<ReviewsType<P>>
  : EP extends { expand: false }
  ? Omit<ReviewType<ReviewsType<P>>, "attributes">
  : Omit<ReviewType<ReviewsType<P>>, "attributes">;

// Data type based on endpoint and parameters.
type DataType<
  E extends ReviewsEndpoints,
  P extends AllReviewsParameter,
  EP extends ExtraParameter | undefined
> = E extends "query"
  ? ReviewType<ReviewsType<P>>[]
  : E extends "show"
  ? ExpandReturnType<P, EP>
  : never;

// Response structure for reviews operations.
export type ReviewsResponse<
  E extends ReviewsEndpoints,
  P extends AllReviewsParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});
