/**
 * @fileoverview Type definitions for authentication in the Sharetribe Marketplace API.
 * These types define the structure of authentication-related parameters, endpoints, and responses.
 */
export type TokenTypes = "access_token" | "refresh_token";
export type GrantType = "client_credentials" | "password" | "refresh_token" | "token_exchange" | "authorization_code";
export type Scope = "public-read" | "user" | "trusted:user" | "integ";
export type ScopeType = "public-read" | "user" | "trusted:user" | "integ" | "details" | "refresh-token";
export type IdentityProviderType = "facebook" | "google" | string;
export type LoginParameterType = "user" | "auth_code";
export type LoginParameter<T extends LoginParameterType> = T extends "user" ? {
    username?: string;
    password?: string;
} : T extends "auth_code" ? {
    code?: string;
    redirect_uri?: string;
    code_verifier?: string;
} : never;
export type LoginWithIdpParameter = {
    idpId: string;
    idpClientId: string;
    idpToken: string;
};
export type AuthWithIdpParameter = {
    client_id: string;
    client_secret: string;
} & LoginWithIdpParameter;
export type IdentityProvider<P extends IdentityProviderType> = {
    idpId: P;
    idpToken: string;
};
type BaseEndpoint = {
    client_id: string;
};
export type AnonymousEndpoint = BaseEndpoint & {
    grant_type: "client_credentials";
    scope: "public-read";
};
type UserEndpoint = BaseEndpoint & {
    scope: "user";
};
export type UserPasswordEndpoint = UserEndpoint & {
    grant_type: "password" | "authorization_code";
    username?: string;
    password?: string;
    code?: string;
    redirect_uri?: string;
    code_verifier?: string;
};
export type UserLoginAsEndpoint = UserEndpoint & {
    grant_type: "authorization_code";
    code: string;
    redirect_uri: string;
    code_verifier: string;
};
export type TrustedUserEndpoint = BaseEndpoint & {
    client_secret: string;
    subject_token: string;
    grant_type: "token_exchange";
    scope: "trusted:user";
};
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
export type DetailsEndpoint = void;
export type Endpoint<S extends ScopeType> = S extends "public-read" ? AnonymousEndpoint : S extends "user" ? UserPasswordEndpoint | UserLoginAsEndpoint | UserLoginAsEndpoint : S extends "trusted:user" ? TrustedUserEndpoint : S extends "integ" ? IntegClientCredentialsEndpoint : S extends "details" ? DetailsEndpoint : S extends "refresh-token" ? RefreshTokenEndpoint : never;
/**
 * Represents an authentication token used for API requests.
 */
export interface AuthToken {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: Scope;
    refresh_token?: string;
}
export type TokenDetails = {
    "client-id": string;
    exp: number;
    scope: Scope;
    isLoggedInAs: boolean;
};
export type TokenResponse<S extends ScopeType> = S extends "public-read" | "user" | "trusted:user" | "integ" | "refresh-token" ? AuthToken : S extends "details" ? TokenDetails : never;
export type RevokeResponse = {
    revoked: boolean;
};
export type AuthInfoResponse = {
    scopes?: Scope[];
    isAnonymous?: boolean;
    grantType?: GrantType;
    isLoggedInAs?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map