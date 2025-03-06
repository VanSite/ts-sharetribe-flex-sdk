/**
 * @fileoverview Provides the AuthenticationApi class for interacting with the Sharetribe Authentication API.
 * This class includes methods to obtain and manage access tokens for authenticating requests to the Marketplace API and Integration API.
 *
 * For more information, refer to the Authentication API reference:
 * https://www.sharetribe.com/api-reference/authentication.html
 */

import {
  AuthWithIdpParameter,
  Endpoint,
  RevokeResponse,
  ScopeType,
  TokenResponse,
} from "../../types/authentication";
import { AxiosInstance, AxiosResponse } from "axios";
import SharetribeSdk from "../../sdk";
import IntegrationSdk from "../../integrationSdk";

/**
 * Converts an object to URL-encoded form data string.
 *
 * @param {Record<string, any> | void} obj - The object to convert
 * @returns {string} URL-encoded form data string
 */
function urlEncodeFormData(obj: Record<string, any> | void): string {
  if (!obj) {
    return "";
  }

  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      if (value === undefined || value === null) {
        return "";
      }
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      return `${encodedKey}=${encodedValue}`;
    })
    .filter(Boolean)
    .join("&");
}

/**
 * Class representing the Authentication API for obtaining and managing access tokens.
 *
 * The Authentication API follows the OAuth2 framework and supports various grant types to issue tokens for authenticating requests.
 *
 * @see https://www.sharetribe.com/api-reference/authentication.html
 */
class AuthenticationApi {
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;
  private axios: AxiosInstance;

  /**
   * Creates an instance of AuthenticationApi.
   *
   * @param {SharetribeSdk | IntegrationSdk} sdk - The Sharetribe SDK or Integration SDK instance for configuration and request handling.
   */
  constructor(sdk: SharetribeSdk | IntegrationSdk) {
    const config = sdk.apisConfigs.auth(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = config.headers;
    this.axios = sdk.axios;
  }

  /**
   * Obtains an access token using the specified grant type and parameters.
   *
   * @template S
   * @param {Endpoint<S>} params - Parameters including grant type and necessary credentials.
   * @returns {Promise<TokenResponse<S>>} - A promise resolving to the token response.
   */
  async token<S extends ScopeType>(
    params: Endpoint<S>
  ): Promise<AxiosResponse<TokenResponse<S>>> {
    return this.axios.post<TokenResponse<S>>(
      `${this.endpoint}/token`,
      urlEncodeFormData(params),
      { headers: this.headers }
    );
  }

  /**
   * Authenticates a user using an external identity provider (IdP) and obtains an access token.
   *
   * @param {AuthWithIdpParameter} params - Parameters including IdP token and provider details.
   * @returns {Promise<TokenResponse<'user'>>} - A promise resolving to the token response.
   */
  async authWithIdp<P extends AuthWithIdpParameter>(
    params: P
  ): Promise<AxiosResponse<TokenResponse<"user">>> {
    return this.axios.post<TokenResponse<"user">>(
      `${this.endpoint}/auth_with_idp`,
      urlEncodeFormData(params),
      { headers: this.headers }
    );
  }

  /**
   * Revokes a refresh token, effectively invalidating any associated access tokens.
   *
   * @param {string} token - The refresh token to be revoked.
   * @returns {Promise<RevokeResponse>} - A promise resolving to the revoke response.
   */
  async revoke(token: string): Promise<AxiosResponse<RevokeResponse>> {
    return this.axios.post<RevokeResponse>(
      `${this.endpoint}/revoke`,
      urlEncodeFormData({ token }),
      { headers: this.headers }
    );
  }

  /**
   * Retrieves details about the current access token.
   *
   * @returns {Promise<TokenResponse<'details'>>} - A promise resolving to the token details response.
   */
  async details(): Promise<AxiosResponse<TokenResponse<"details">>> {
    return this.axios.get<TokenResponse<"details">>(
      `${this.endpoint}/details`,
      { headers: this.headers }
    );
  }
}

export default AuthenticationApi;
