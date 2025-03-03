/**
 * @fileoverview Type definitions for Users in the Sharetribe Marketplace API.
 * This file defines the structure of users, their parameters, and response types for API requests.
 */
import { ApiMeta, ApiParameter, ExtraParameter, ExtraParameterType, QueryMeta, QueryPriv, QueryProt, QueryPub, Relationship, RelationshipTypeMap, UUID } from '../sharetribe';
/**
 * Available endpoints for the Users API.
 */
export type UsersEndpoints = 'show' | 'query' | 'updateProfile' | 'approve' | 'updatePermissions';
/**
 * Fields available for relationships in users.
 */
export type UsersRelationshipsFields = 'marketplace' | 'profileImage' | 'stripeAccount' | 'effectivePermissionSet';
/**
 * Possible states for a user.
 */
export type UserState = 'active' | 'banned' | 'pendingApproval';
/**
 * Permission levels for user actions.
 */
export type Permissions = 'permission/allow' | 'permission/deny';
/**
 * Defines the structure of a user.
 */
export interface User<I extends boolean = false> {
    id: UUID;
    type: 'user';
    attributes: UserAttributes<I>;
}
type UserAttributes<I extends boolean> = {
    banned: boolean;
    deleted: boolean;
    createdAt: Date;
    profile: UserAttributesProfile<I>;
} & (I extends true ? {
    state: UserState;
    email: string;
    emailVerified: boolean;
    pendingEmail: string | null;
    stripeConnected: boolean;
    identityProviders: {
        idpId: string;
        userId: string;
    }[];
} : {});
type UserAttributesProfile<I extends boolean> = {
    displayName: string;
    abbreviatedName: string;
    bio: string;
    publicData: UserCustomProfilePublicData;
    metadata: UserCustomProfileMetadata;
} & (I extends true ? {
    firstName: string;
    lastName: string;
    protectedData: UserCustomProfileProtectedData;
    privateData: UserCustomProfilePrivateData;
    permissions: {
        postListings: Permissions;
        initiateTransactions: Permissions;
        read: Permissions;
    };
} : {});
/**
 * User with additional relationship information.
 */
export interface UserWithRelationships<I extends boolean = false> extends User<I> {
    relationships: {
        marketplace: Relationship<false, 'marketplace'>;
        profileImage: Relationship<false, 'profileImage'>;
    };
}
export type UserType<R extends boolean> = R extends true ? UserWithRelationships : User;
/**
 * Base parameters for Users API requests.
 */
export interface UsersParameter extends ApiParameter {
    include?: UsersRelationshipsFields[];
}
/**
 * Parameters for fetching a specific user.
 */
export type UsersShowParameter<I extends boolean = false> = {
    id: UUID | string;
} & UsersParameter & (I extends false ? {
    id: UUID | string;
} : {
    id?: UUID | string;
    email?: string;
});
/**
 * Parameters for querying users.
 */
export interface UsersQueryParameter extends UsersParameter {
    createdAtStart?: Date | string;
    createdAtEnd?: Date | string;
    [keyof: QueryPub]: string;
    [keyof: QueryMeta]: string;
    [keyof: QueryPriv]: string;
    [keyof: QueryProt]: string;
    sort?: string;
}
/**
 * Parameters for updating a user's profile.
 */
export interface UsersUpdateProfileParameter extends UsersParameter {
    id: UUID | string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    bio?: string;
    publicData?: UserCustomProfilePublicData;
    protectedData?: UserCustomProfileProtectedData;
    privateData?: UserCustomProfilePrivateData;
    metadata?: UserCustomProfileMetadata;
    profileImageId?: UUID | string;
}
/**
 * Parameters for approving a user.
 */
export interface UsersApproveParameter extends UsersParameter {
    id: UUID | string;
}
/**
 * Parameters for updating a user's permissions.
 */
export interface UsersUpdatePermissionsParameter extends UsersParameter {
    id: UUID | string;
    postListings?: Permissions;
    initiateTransactions?: Permissions;
    read?: Permissions;
}
/**
 * Custom data types for user profiles.
 */
export interface UserCustomProfilePublicData {
}
export interface UserCustomProfileProtectedData {
}
export interface UserCustomProfilePrivateData {
}
export interface UserCustomProfileMetadata {
}
type AllUsersParameter = UsersShowParameter | UsersQueryParameter | UsersUpdateProfileParameter | UsersApproveParameter | UsersUpdatePermissionsParameter;
type UsersType<P extends AllUsersParameter> = 'include' extends keyof P ? (P['include'] extends UsersRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllUsersParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]>[] : never) : never;
type ExpandReturnType<P extends AllUsersParameter, EP> = EP extends {
    expand: true;
} ? UserType<UsersType<P>> : EP extends {
    expand: false;
} ? Omit<UserType<UsersType<P>>, 'attributes'> : Omit<UserType<UsersType<P>>, 'attributes'>;
/**
 * Defines the data type based on the Users API endpoint and parameters.
 */
type DataType<E extends UsersEndpoints, P extends AllUsersParameter, EP extends ExtraParameter | undefined> = (E extends 'show' ? UserType<UsersType<P>> : never) | (E extends 'query' ? UserType<UsersType<P>>[] : never) | (E extends 'updateProfile' | 'approve' | 'updatePermissions' ? ExpandReturnType<P, EP> : never);
/**
 * Response structure for Users API calls.
 */
export type UsersResponse<E extends UsersEndpoints, P extends AllUsersParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {}) & (E extends 'query' ? {
    meta: ApiMeta;
} : {});
export {};
