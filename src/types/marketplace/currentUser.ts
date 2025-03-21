/**
 * @fileoverview Type definitions for managing the current user in the Sharetribe Marketplace API.
 * These types define the structure of current user-related parameters, responses, and relationships.
 */

import {
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  Relationship,
  RelationshipTypeMap,
  UUID,
} from "../sharetribe";

// Supported API endpoints for current user operations.
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

// Supported relationship fields for current user.
export type CurrentUserRelationshipsFields =
  | "marketplace"
  | "profileImage"
  | "stripeAccount"
  | "stripeCustomer"
  | "stripeCustomer.defaultPaymentMethod"
  | "effectivePermissionSet";

// Base structure for a current user.
export interface CurrentUser {
  id: UUID;
  type: "currentUser";
  attributes: {
    banned: boolean;
    deleted: boolean;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    pendingEmail: boolean;
    stripeConnected: boolean;
    stripePayoutsEnabled: boolean;
    stripeChargesEnabled: boolean;
    identityProviders: { idpId: string; userId: string }[];
    profile: {
      firstName: string;
      lastName: string;
      displayName: string;
      abbreviatedName: string;
      bio: string;
      publicData: CurrentUserProfilePublicData &
        CurrentUserCustomProfilePublicData;
      protectedData: CurrentUserProfileProtectedData &
        CurrentUserCustomProfileProtectedData;
      privateData: CurrentUserProfilePrivateData &
        CurrentUserCustomProfilePrivateData;
      metadata: CurrentUserProfileMetadata & CurrentUserCustomProfileMetadata;
    };
  };
}

// Structure for a deleted current user.
export interface DeleteCurrentUser {
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
}

export interface CurrentUserPermissionSet {
  postListings:
    | "POST /own_listings/create_draft"
    | "POST /own_listings/publish_draft"
    | "POST /own_listings/create"
    | "POST /own_listings/open";
  initiateTransactions: "POST /transactions/initiate";
  read:
    | "GET /listings/query"
    | "GET /listings/show"
    | "GET /users/show"
    | "GET /timeslots/query"
    | "GET /reviews/query"
    | "GET /reviews/show";
}

// Current user with relationships.
export interface CurrentUserWithRelationships extends CurrentUser {
  relationships: {
    marketplace: Relationship<false, "marketplace">;
    profileImage: Relationship<false, "image">;
    stripeAccount: Relationship<false, "stripeAccount">;
    stripeCustomer: Relationship<false, "stripeCustomer">;
    effectivePermissionSet: Relationship<false, "permissionSet">;
  };
}

// Determine the current user type based on the relationship flag.
export type CurrentUserType<R extends boolean> = R extends true
  ? CurrentUserWithRelationships
  : CurrentUser;

// Base parameters for current user operations.
export interface CurrentUserParameter extends ApiParameter {
  include?: CurrentUserRelationshipsFields[];
}

// Parameters for various current user operations.
export interface CurrentUserShowParameter extends CurrentUserParameter {}
export interface CurrentUserDeleteParameter {}
export interface CurrentUserCreateParameter extends CurrentUserParameter {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  publicData?: unknown;
  protectedData?: unknown;
  privateData?: unknown;
}
export interface CurrentUserCreateWithIdpParameter
  extends CurrentUserCreateParameter {
  idpId: string;
  idpClientId: string;
  idpToken: string;
}
export interface CurrentUserUpdateProfileParameter
  extends CurrentUserParameter {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  publicData?: unknown;
  protectedData?: unknown;
  privateData?: unknown;
  profileImageId?: string;
}
export interface CurrentUserChangePasswordParameter
  extends CurrentUserParameter {
  currentPassword: string;
  newPassword: string;
}
export interface CurrentUserChangeEmailParameter extends CurrentUserParameter {
  currentPassword: string;
  email: string;
}
export interface CurrentUserVerifyEmailParameter extends CurrentUserParameter {
  verificationToken: string;
}

// Types for profile data.
export interface CurrentUserProfilePublicData {
  [key: string]: any;
}
export interface CurrentUserCustomProfilePublicData {}
export interface CurrentUserProfileProtectedData {
  [key: string]: any;
}
export interface CurrentUserCustomProfileProtectedData {}
export interface CurrentUserProfilePrivateData {
  [key: string]: any;
}
export interface CurrentUserCustomProfilePrivateData {}
export interface CurrentUserProfileMetadata {
  [key: string]: any;
}
export interface CurrentUserCustomProfileMetadata {}

// Union type for all current user parameters.
type AllCurrentUserParameter =
  | CurrentUserShowParameter
  | CurrentUserDeleteParameter
  | CurrentUserCreateParameter
  | CurrentUserCreateWithIdpParameter
  | CurrentUserUpdateProfileParameter
  | CurrentUserChangePasswordParameter
  | CurrentUserChangeEmailParameter
  | CurrentUserVerifyEmailParameter
  | void;

// Determine if the parameter includes relationships.
type CurrentUserTypeType<P extends AllCurrentUserParameter> =
  "include" extends keyof P
    ? P["include"] extends CurrentUserRelationshipsFields[]
      ? true
      : false
    : false;

// Extract the included relationships type based on the parameter.
type IncludedType<P extends AllCurrentUserParameter> = "include" extends keyof P
  ? P["include"] extends (keyof RelationshipTypeMap)[]
    ? Array<RelationshipTypeMap[P["include"][number]]>
    : never
  : never;

// Expand the return type based on the expand parameter.
type ExpandReturnType<P extends AllCurrentUserParameter, EP> = EP extends {
  expand: true;
}
  ? CurrentUserType<CurrentUserTypeType<P>>
  : EP extends { expand: false }
  ? Omit<CurrentUserType<CurrentUserTypeType<P>>, "attributes">
  : CurrentUserType<CurrentUserTypeType<P>>;

// Define the possible data type for current user based on the endpoint and parameters.
type DataType<
  E extends CurrentUserEndpoints,
  P extends AllCurrentUserParameter,
  EP extends ExtraParameter | undefined
> = E extends "show"
  ? CurrentUserType<CurrentUserTypeType<P>>
  : E extends "delete"
  ? Pick<DeleteCurrentUser, "id" | "type">
  : E extends
      | "create"
      | "create_with_idp"
      | "update_profile"
      | "change_password"
      | "change_email"
      | "verify_email"
  ? ExpandReturnType<P, EP>
  : never;

// Response structure for current user-related endpoints.
export type CurrentUserResponse<
  E extends CurrentUserEndpoints,
  P extends AllCurrentUserParameter,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, P, EP>;
} & ("include" extends keyof P ? { included: IncludedType<P> } : {});
