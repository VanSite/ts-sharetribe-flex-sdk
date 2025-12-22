/**
 * @fileoverview Type definitions for Users in the Sharetribe Marketplace API.
 */

import {
  ApiMeta,
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  QueryMeta,
  QueryPriv,
  QueryProt,
  QueryPub,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";

/**
 * Available endpoints for the Users API.
 */
export type UsersEndpoints =
  | "show"
  | "query"
  | "updateProfile"
  | "approve"
  | "updatePermissions";

/**
 * Fields available for relationships in users.
 */
export type UsersRelationshipsFields =
  | "marketplace"
  | "profileImage"
  | "stripeAccount"
  | "effectivePermissionSet";

/**
 * Possible states for a user.
 */
export type UserState = "active" | "banned" | "pendingApproval";

/**
 * Permission levels.
 */
export type Permissions = "permission/allow" | "permission/deny";

/**
 * Core user attributes (always present)
 */
interface BaseUserAttributes {
  banned: boolean;
  deleted: boolean;
  createdAt: Date;
  profile: {
    displayName: string;
    abbreviatedName: string;
    bio: string | null;
    publicData: UserProfilePublicData & UserCustomProfilePublicData;
    metadata: UserProfileMetadata & UserCustomProfileMetadata;
  };
}

/**
 * Private/admin-only attributes (only when I = true)
 */
interface PrivateUserAttributes {
  state: UserState;
  email: string;
  emailVerified: boolean;
  pendingEmail: string | null;
  stripeConnected: boolean;
  identityProviders: { idpId: string; userId: string }[];
  profile: {
    firstName: string;
    lastName: string;
    protectedData: UserProfileProtectedData & UserCustomProfileProtectedData;
    privateData: UserProfilePrivateData & UserCustomProfilePrivateData;
    permissions: {
      postListings: Permissions;
      initiateTransactions: Permissions;
      read: Permissions;
    };
  };
}

/**
 * Main User type with conditional private fields
 */
export interface User<I extends boolean = false> {
  id: UUID;
  type: "user";
  attributes: BaseUserAttributes & (I extends true ? PrivateUserAttributes : {});
}

/**
 * User with relationships
 */
export interface UserWithRelationships<I extends boolean = false> extends User<I> {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    profileImage: Relationship<false, "profileImage">;
    stripeAccount: Relationship<false, "stripeAccount">;
    effectivePermissionSet: Relationship<false, "effectivePermissionSet">;
  };
}

/**
 * Select user type based on whether relationships are included
 */
export type UserType<R extends boolean, I extends boolean = false> =
  R extends true ? UserWithRelationships<I> : User<I>;

/**
 * Base parameter shared across user endpoints
 */
export interface UsersParameter extends ApiParameter {
  include?: UsersRelationshipsFields[];
}

/**
 * Show endpoint parameters
 */
export type UsersShowParameter<I extends boolean = false> = UsersParameter &
  (I extends true
    ? { id?: UUID | string; email?: string }
    : { id: UUID | string });

/**
 * Query endpoint parameters
 */
export interface UsersQueryParameter extends UsersParameter {
  createdAtStart?: Date | string;
  createdAtEnd?: Date | string;
  sort?: string;

  // Dynamic query keys
  [keyof: QueryPub]: string | undefined;

  [keyof: QueryMeta]: string | undefined;

  [keyof: QueryPriv]: string | undefined;

  [keyof: QueryProt]: string | undefined;
}

/**
 * Update profile parameters
 */
export interface UsersUpdateProfileParameter extends UsersParameter {
  id: UUID | string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string | null;
  publicData?: UserProfilePublicData & UserCustomProfilePublicData;
  protectedData?: UserProfileProtectedData & UserCustomProfileProtectedData;
  privateData?: UserProfilePrivateData & UserCustomProfilePrivateData;
  metadata?: UserProfileMetadata & UserCustomProfileMetadata;
  profileImageId?: UUID | string;
}

/**
 * Approve & permissions parameters
 */
export interface UsersApproveParameter extends UsersParameter {
  id: UUID | string;
}

export interface UsersUpdatePermissionsParameter extends UsersParameter {
  id: UUID | string;
  postListings?: Permissions;
  initiateTransactions?: Permissions;
  read?: Permissions;
}

/**
 * Custom profile data types (extensible but typed)
 */
export interface UserProfilePublicData {
  [key: string]: any
}

export interface UserCustomProfilePublicData extends Record<string, unknown> {
}

export interface UserProfileProtectedData {
  [key: string]: any
}

export interface UserCustomProfileProtectedData extends Record<string, unknown> {
}

export interface UserProfilePrivateData {
  [key: string]: any
}

export interface UserCustomProfilePrivateData extends Record<string, unknown> {
}

export interface UserProfileMetadata {
  [key: string]: any
}

export interface UserCustomProfileMetadata extends Record<string, unknown> {
}

/**
 * Helper: does the parameter request includes?
 */
type HasInclude<P> = P extends { include: infer T extends UsersRelationshipsFields[] } ? T : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;

/**
 * Helper: extract included resources
 */
type IncludedResources<P, I> =
  P extends { include: infer I extends readonly UsersRelationshipsFields[] }
    ? RelationshipTypeMap[I[number]][]
    : never;

/**
 * Expand behavior
 */
type ExpandReturnType<T, EP extends ExtraParameter | undefined> =
  EP extends { expand: true }
    ? T
    : EP extends { expand: false }
      ? Omit<T, "attributes">
      : Omit<T, "attributes">;

/**
 * Final response data type per endpoint
 */
type UsersResponseData<
  E extends UsersEndpoints,
  P extends AllUsersParameter,
  EP extends ExtraParameter | undefined,
  I extends boolean
> = E extends "show"
  ? UserType<IncludesRelationships<P>, I>
  : E extends "query"
    ? UserType<IncludesRelationships<P>, I>[]
    : E extends "updateProfile" | "approve" | "updatePermissions"
      ? ExpandReturnType<UserType<IncludesRelationships<P>, I>, EP>
      : never;

/**
 * Union of all valid parameter types
 */
type AllUsersParameter =
  | UsersShowParameter<any>
  | UsersQueryParameter
  | UsersUpdateProfileParameter
  | UsersApproveParameter
  | UsersUpdatePermissionsParameter;

/**
 * Final response type
 */
export type UsersResponse<
  E extends UsersEndpoints,
  P extends AllUsersParameter,
  EP extends ExtraParameterType = undefined,
  I extends boolean = false
> = {
  data: UsersResponseData<E, P, EP, I>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P, I> } : {}) &
  (E extends "query" ? { meta: ApiMeta } : {});