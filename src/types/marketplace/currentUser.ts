/**
 * @fileoverview Type definitions for Current User in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, Relationship, RelationshipTypeMap, UUID,} from "../sharetribe";
import {Permissions} from "./user";

/**
 * Available endpoints
 */
export type CurrentUserEndpoints =
  | "show"
  | "delete"
  | "create"
  | "create_with_idp"
  | "update_profile"
  | "change_password"
  | "change_email"
  | "verify_email"
  | "send_verification_email";

/**
 * Relationship fields
 */
export type CurrentUserRelationshipsFields =
  | "marketplace"
  | "profileImage"
  | "stripeAccount"
  | "stripeCustomer"
  | "stripeCustomer.defaultPaymentMethod"
  | "effectivePermissionSet";

/**
 * Current User resource
 */
export interface CurrentUser {
  id: UUID;
  type: "currentUser";
  attributes: {
    banned: boolean;
    deleted: boolean;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    pendingEmail: string | null;
    stripeConnected: boolean;
    stripePayoutsEnabled: boolean;
    stripeChargesEnabled: boolean;
    identityProviders: { idpId: string; userId: string }[];
    profile: {
      firstName: string;
      lastName: string;
      displayName: string;
      abbreviatedName: string;
      bio: string | null;
      publicData: CurrentUserPublicData & CurrentUserCustomPublicData;
      protectedData: CurrentUserProtectedData & CurrentUserCustomProtectedData;
      privateData: CurrentUserPrivateData & CurrentUserCustomPrivateData;
      metadata: CurrentUserMetadata & CurrentUserCustomMetadata;
    };
  };
}

/**
 * Deleted user representation
 */
export type DeletedCurrentUser = {
  id: UUID;
  type: "currentUser";
  attributes: {
    banned: false;
    deleted: true;
    createdAt: null;
    email: null;
    emailVerified: false;
    pendingEmail: null;
    stripeConnected: false;
    stripePayoutsEnabled: false;
    stripeChargesEnabled: false;
    identityProviders: null;
    profile: {
      firstName: null;
      lastName: null;
      displayName: null;
      abbreviatedName: null;
      bio: null;
      publicData: null;
      protectedData: null;
      privateData: null;
      metadata: null;
    };
  };
};

/**
 * Current User permission set
 */
export type CurrentUserPermissionSet = {
  postListings: Permissions;
  initiateTransactions: Permissions;
  read: Permissions;
};

/**
 * With relationships
 */
export interface CurrentUserWithRelationships extends CurrentUser {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    profileImage?: Relationship<false, "profileImage">;
    stripeAccount?: Relationship<false, "stripeAccount">;
    stripeCustomer?: Relationship<false, "stripeCustomer">;
    effectivePermissionSet: Relationship<false, "effectivePermissionSet">;
  };
}

export type CurrentUserResource<R extends boolean> =
  R extends true ? CurrentUserWithRelationships : CurrentUser;

/**
 * Base request parameters
 */
export interface CurrentUserParameter extends ApiParameter {
  include?: CurrentUserRelationshipsFields[];
}

/**
 * Endpoint parameters
 */
export type CurrentUserShowParameter = CurrentUserParameter;
export type CurrentUserDeleteParameter = void;
export type CurrentUserSendVerificationEmailParameter = void;

export interface CurrentUserCreateParameter extends CurrentUserParameter {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  publicData?: CurrentUserPublicData & CurrentUserCustomPublicData;
  protectedData?: CurrentUserProtectedData & CurrentUserCustomProtectedData;
  privateData?: CurrentUserPrivateData & CurrentUserCustomPrivateData;
}

export interface CurrentUserCreateWithIdpParameter extends CurrentUserCreateParameter {
  idpId: string;
  idpClientId: string;
  idpToken: string;
}

export interface CurrentUserUpdateProfileParameter extends CurrentUserParameter {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string | null;
  publicData?: CurrentUserPublicData & CurrentUserCustomPublicData;
  protectedData?: CurrentUserProtectedData & CurrentUserCustomProtectedData;
  privateData?: CurrentUserPrivateData & CurrentUserCustomPrivateData;
  profileImageId?: UUID | string;
}

export interface CurrentUserChangePasswordParameter {
  currentPassword: string;
  newPassword: string;
}

export interface CurrentUserChangeEmailParameter {
  currentPassword: string;
  email: string;
}

export interface CurrentUserVerifyEmailParameter {
  verificationToken: string;
}

/**
 * Custom profile data
 */
export interface CurrentUserPublicData {
  [key: string]: any
}

export interface CurrentUserCustomPublicData extends Record<string, unknown> {
}

export interface CurrentUserProtectedData {
  [key: string]: any
}

export interface CurrentUserCustomProtectedData extends Record<string, unknown> {
}

export interface CurrentUserPrivateData {
  [key: string]: any
}

export interface CurrentUserCustomPrivateData extends Record<string, unknown> {
}

export interface CurrentUserMetadata {
  [key: string]: any
}

export interface CurrentUserCustomMetadata extends Record<string, unknown> {
}

/**
 * All parameter types
 */
type AllCurrentUserParameter =
  | CurrentUserShowParameter
  | CurrentUserDeleteParameter
  | CurrentUserCreateParameter
  | CurrentUserCreateWithIdpParameter
  | CurrentUserUpdateProfileParameter
  | CurrentUserChangePasswordParameter
  | CurrentUserChangeEmailParameter
  | CurrentUserVerifyEmailParameter
  | CurrentUserSendVerificationEmailParameter;

/**
 * Include detection — fixes TS2536
 */
type HasInclude<P> = P extends { include: infer I extends readonly CurrentUserRelationshipsFields[] } ? I : never;
type IncludesRelationships<P> = HasInclude<P> extends never ? false : true;
type IncludedResources<P> =
  HasInclude<P> extends infer Fields extends CurrentUserRelationshipsFields[]
    ? RelationshipTypeMap[Fields[number]][]
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
  E extends CurrentUserEndpoints,
  P extends AllCurrentUserParameter,
  EP extends ExtraParameterType | undefined
> =
  E extends "show"
    ? CurrentUserResource<IncludesRelationships<P>>
    : E extends "delete"
      ? Pick<DeletedCurrentUser, "id" | "type">
      : E extends "create" | "create_with_idp" | "update_profile" | "change_password" | "change_email" | "verify_email" | "send_verification_email"
        ? ExpandResult<CurrentUserResource<IncludesRelationships<P>>, EP>
        : never;

/**
 * Final response type
 */
export type CurrentUserResponse<
  E extends CurrentUserEndpoints,
  P extends AllCurrentUserParameter,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, P, EP>;
} & (IncludesRelationships<P> extends true ? { included: IncludedResources<P> } : {});