import { ApiParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';

export type UsersEndpoints = 'show'
export type UsersRelationshipsFields = 'marketplace' | 'profileImage'
export type UserState = 'active' | 'banned' | 'pendingApproval'
export type Permissions = 'permission/allow' | 'permission/deny'

export interface User<I extends boolean = false> {
  id: UUID
  type: 'user'
  attributes: UserAttributes<I>
}

type UserAttributes<I extends boolean> = {
  banned: boolean
  deleted: boolean
  createdAt: Date
  profile: UserAttributesProfile<I>
} & (I extends true ? {
  state: UserState,
  email: string,
  emailVerified: boolean,
  pendingEmail: string | null,
  stripeConnected: boolean,
  identityProviders: { idpId: string, userId: string }[],
} : {})

type UserAttributesProfile<I extends boolean> = {
  displayName: string
  abbreviatedName: string
  bio: string
  publicData: UserCustomProfilePublicData
  metadata: UserCustomProfileMetadata
} & (I extends true ? {
  firstName: string
  lastName: string
  protectedData: UserCustomProfileProtectedData
  privateData: UserCustomProfilePrivateData
  permissions: {
    postListings: Permissions,
    initiateTransactions: Permissions,
    read: Permissions
  }
}: {})

export interface UserWithRelationships<I extends boolean = false> extends User<I> {
  relationships: {
    marketplace: Relationship<false, 'marketplace'>
    profileImage: Relationship<false, 'profileImage'>
  }
}

export type UserType<R extends boolean> = R extends true ? UserWithRelationships : User;

export interface UsersParameter extends ApiParameter {
  include?: UsersRelationshipsFields[]
}

export interface UsersShowParameter extends UsersParameter {
  id: UUID | string
}

export interface UserCustomProfilePublicData {}
export interface UserCustomProfileProtectedData {}
export interface UserCustomProfilePrivateData {}
export interface UserCustomProfileMetadata {}

type AllUsersParameter = UsersShowParameter

type UsersType<P extends AllUsersParameter> =
  'include' extends keyof P ? (P['include'] extends UsersRelationshipsFields[] ? true : false) : false;

type IncludedType<P extends AllUsersParameter> =
  'include' extends keyof P ? (
    P['include'] extends (keyof RelationshipTypeMap)[] ?
      Array<RelationshipTypeMap[P['include'][number]]>[] : never
    ) : never;

type DataType<
  E extends UsersEndpoints,
  P extends AllUsersParameter,
> =
  E extends 'show' ? UserType<UsersType<P>> : never

export type UsersResponse<
  E extends UsersEndpoints,
  P extends AllUsersParameter,
> = {
  data: DataType<E, P>
} & ('include' extends keyof P ? { included: IncludedType<P> } : {})
