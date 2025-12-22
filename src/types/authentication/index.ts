/**
 * @fileoverview Type definitions for Sharetribe Authentication API (OAuth2)
 *
 * @see https://www.sharetribe.com/api-reference/authentication.html
 */

import type {UUID} from "../sharetribe";

/**
 * OAuth2 grant types
 */
export type GrantType =
  | "client_credentials"
  | "password"
  | "authorization_code"
  | "refresh_token"
  | "token_exchange";

/**
 * Available scopes
 */
export type Scope =
  | "public-read"
  | "user"
  | "trusted:user"
  | "integ"
  | "details"
  | "refresh-token";

/**
 * Identity provider ID (built-in + custom)
 */
export type IdentityProviderId = "facebook" | "google" | string;

export type LoginParameterType = "user" | "auth_code";

/**
 * Base token request
 */
interface BaseTokenRequest {
  client_id: string;
}

/**
 * Public read access (anonymous)
 */
export type AnonymousTokenRequest = BaseTokenRequest & {
  grant_type: "client_credentials";
  scope: "public-read";
};

/**
 * User authentication (password or authorization code)
 */
export type UserTokenRequest = BaseTokenRequest & {
  scope: "user",
  grant_type: "password",
  username: string,
  password: string
}

export type UserTokenRequestWithAuthCode = BaseTokenRequest & {
  scope: "user",
  grant_type: "authorization_code",
  code: string,
  redirect_uri: string,
  code_verifier: string
}

/**
 * Admin "login as" flow
 */
export type LoginAsTokenRequest = BaseTokenRequest & {
  grant_type: "authorization_code";
  scope: "user";
  code: string;
  redirect_uri: string;
  code_verifier: string;
};

/**
 * Trusted impersonation
 */
export type TrustedUserTokenRequest = BaseTokenRequest & {
  client_secret: string;
  grant_type: "token_exchange";
  scope: "trusted:user";
  subject_token: string;
};

/**
 * Integration API access
 */
export type IntegrationTokenRequest = BaseTokenRequest & {
  client_secret: string;
  grant_type: "client_credentials";
  scope: "integ";
};

/**
 * Refresh token
 */
export type RefreshTokenRequest = BaseTokenRequest & {
  grant_type: "refresh_token";
  refresh_token: string;
};

/**
 * Token introspection endpoint (no body)
 */
export type DetailsRequest = void;

/**
 * All valid token request types
 */
export type TokenRequest =
  | AnonymousTokenRequest
  | UserTokenRequest
  | UserTokenRequestWithAuthCode
  | LoginAsTokenRequest
  | TrustedUserTokenRequest
  | IntegrationTokenRequest
  | RefreshTokenRequest
  | DetailsRequest;

/**
 * Login parameter
 */
export type LoginParameter<T extends LoginParameterType> = T extends "user"
  ? {
    username: string;
    password: string;
  }
  : T extends "auth_code"
    ? {
      code: string;
      redirect_uri: string;
      code_verifier: string;
    }
    : never;

export type LoginWithIdpParameter = {
  idpId: IdentityProviderId;
  idpClientId: string;
  idpToken: string;
};

/**
 * Login with external IdP
 */
export type AuthWithIdpParameter = {
  client_id: string;
  client_secret: string;
} & LoginWithIdpParameter;

/**
 * Successful token response
 */
export interface AuthToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope?: Scope | Scope[];
  refresh_token?: string;
}

/**
 * Token introspection response
 */
export interface TokenDetails {
  "client-id": string;
  exp: number;
  scope: Scope[];
  isLoggedInAs?: UUID | null;
}

/**
 * Token response by endpoint
 */
export type TokenResponse<T extends TokenRequest> =
  T extends DetailsRequest
    ? TokenDetails
    : AuthToken;

/**
 * Revoke response
 */
export interface RevokeResponse {
  revoked: boolean;
}

/**
 * Auth info response
 */
export type AuthInfoResponse = {
  scopes?: Scope[];
  isAnonymous?: boolean;
  grantType?: GrantType;
  isLoggedInAs?: string;
};