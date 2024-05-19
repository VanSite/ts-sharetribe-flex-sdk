import { ApiParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';

export type UsersEndpoints = 'show'
export type UsersRelationshipsFields = 'marketplace' | 'profileImage'

export interface User {
  id: UUID
  type: 'user'
  attributes: {
    banned: boolean
    deleted: boolean
    createdAt: Date
    profile: {
      displayName: string
      abbreviatedName: string
      bio: string
      publicData: unknown
      metadata: unknown
    }
  }
}

export interface UserWithRelationships extends User {
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
