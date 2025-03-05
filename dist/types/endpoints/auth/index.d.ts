/**
 * @fileoverview Provides the AuthenticationApi class for interacting with the Sharetribe Authentication API.
 * This class includes methods to obtain and manage access tokens for authenticating requests to the Marketplace API and Integration API.
 *
 * For more information, refer to the Authentication API reference:
 * https://www.sharetribe.com/api-reference/authentication.html
 */
import { AuthWithIdpParameter, Endpoint, RevokeResponse, ScopeType, TokenResponse } from "../../types/authentication";
import { AxiosResponse } from "axios";
import SharetribeSdk from "../../sdk";
import IntegrationSdk from "../../integrationSdk";
/**
 * Class representing the Authentication API for obtaining and managing access tokens.
 *
 * The Authentication API follows the OAuth2 framework and supports various grant types to issue tokens for authenticating requests.
 *
 * @see https://www.sharetribe.com/api-reference/authentication.html
 */
declare class AuthenticationApi {
    private readonly endpoint;
    private readonly headers;
    private axios;
    /**
     * Creates an instance of AuthenticationApi.
     *
     * @param {SharetribeSdk | IntegrationSdk} sdk - The Sharetribe SDK or Integration SDK instance for configuration and request handling.
     */
    constructor(sdk: SharetribeSdk | IntegrationSdk);
    /**
     * Obtains an access token using the specified grant type and parameters.
     *
     * @template S
     * @param {Endpoint<S>} params - Parameters including grant type and necessary credentials.
     * @returns {Promise<TokenResponse<S>>} - A promise resolving to the token response.
     */
    token<S extends ScopeType>(params: Endpoint<S>): Promise<AxiosResponse<TokenResponse<S>>>;
    /**
     * Authenticates a user using an external identity provider (IdP) and obtains an access token.
     *
     * @param {AuthWithIdpParameter} params - Parameters including IdP token and provider details.
     * @returns {Promise<TokenResponse<'user'>>} - A promise resolving to the token response.
     */
    authWithIdp<P extends AuthWithIdpParameter>(params: P): Promise<AxiosResponse<TokenResponse<"user">>>;
    /**
     * Revokes a refresh token, effectively invalidating any associated access tokens.
     *
     * @param {string} token - The refresh token to be revoked.
     * @returns {Promise<RevokeResponse>} - A promise resolving to the revoke response.
     */
    revoke(token: string): Promise<AxiosResponse<RevokeResponse>>;
    /**
     * Retrieves details about the current access token.
     *
     * @returns {Promise<TokenResponse<'details'>>} - A promise resolving to the token details response.
     */
    details(): Promise<AxiosResponse<TokenResponse<"details">>>;
}
export default AuthenticationApi;
//# sourceMappingURL=index.d.ts.map