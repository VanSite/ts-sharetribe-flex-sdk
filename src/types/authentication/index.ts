/**
 * @fileoverview Type definitions for authentication in the Sharetribe Marketplace API.
 * These types define the structure of authentication-related parameters, endpoints, and responses.
 */

// Basic Types
export type TokenTypes = "access_token" | "refresh_token";
export type GrantType = "client_credentials" | "password" | "refresh_token" | "token_exchange";
export type Scope = "public-read" | "user" | "trusted:user" | "integ";
export type ScopeType = "public-read" | "user" | "trusted:user" | "integ" | "details" | "refresh-token";
export type IdentityProviderType = "facebook" | "google" | string;

// Login Parameters
export type LoginParameter = {
  username: string;
  password: string;
};

export type LoginWithIdpParameter = {
  idpId: string;
  idpClientId: string;
  idpToken: string;
};

export type AuthWithIdpParameter = {
  client_id: string;
  client_secret: string;
} & LoginWithIdpParameter;

// Identity Provider
export type IdentityProvider<P extends IdentityProviderType> = {
  idpId: P;
  idpToken: string;
};

// Base Endpoint
type BaseEndpoint = {
  client_id: string;
};

// Public Read Endpoint
export type AnonymousEndpoint = BaseEndpoint & {
  grant_type: "client_credentials";
  scope: "public-read";
};

// User Endpoints
type UserEndpoint = BaseEndpoint & {
  scope: "user";
};
export type UserPasswordEndpoint = UserEndpoint & {
  grant_type: "password";
  username: string;
  password: string;
};

// Trusted User Endpoint
export type TrustedUserEndpoint = BaseEndpoint & {
  client_secret: string;
  subject_token: string;
  grant_type: "token_exchange";
  scope: "trusted:user";
};

// Integration API Endpoints
type IntegEndpoint = BaseEndpoint & {
  scope: "integ";
};
export type IntegClientCredentialsEndpoint = IntegEndpoint & {
  grant_type: "client_credentials";
  client_secret: string;
};

export type RefreshTokenEndpoint = BaseEndpoint & {
  grant_type: "refresh_token";
  refresh_token: string;
};

// Details Endpoint
export type DetailsEndpoint = void;

// Main Endpoint Type
export type Endpoint<S extends ScopeType> = S extends "public-read"
  ? AnonymousEndpoint
  : S extends "user"
    ? UserPasswordEndpoint
    : S extends "trusted:user"
      ? TrustedUserEndpoint
      : S extends "integ"
        ? IntegClientCredentialsEndpoint
        : S extends "details"
          ? DetailsEndpoint
          : S extends "refresh-token"
            ? RefreshTokenEndpoint
            : never;

// Authentication Token
export type AuthToken = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope?: Scope;
  refresh_token?: string;
};

// Token Details
export type TokenDetails = {
  "client-id": string;
  exp: number;
  scope: Scope;
};

// Token Response Type
export type TokenResponse<S extends ScopeType> = S extends "public-read" | "user" | "trusted:user" | "integ" | "refresh-token"
  ? AuthToken
  : S extends "details"
    ? TokenDetails
    : never;

// Revoke Response
export type RevokeResponse = {
  revoked: boolean;
};

// Authentication Info Response
export type AuthInfoResponse = {
  scopes?: Scope[];
  isAnonymous?: boolean;
  grantType?: GrantType;
  isLoggedInAs?: string;
};
