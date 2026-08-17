/**
 * @fileoverview Client for Sharetribe Authentication API (OAuth2)
 *
 * @see https://www.sharetribe.com/api-reference/authentication.html
 */

import type {HttpClient, HttpResponse} from "../../types";
import SharetribeSdk from "../../sdk";
import IntegrationSdk from "../../integrationSdk";
import {
  AuthWithIdpParameter,
  RevokeResponse,
  TokenDetails,
  TokenRequest,
  TokenResponse,
  UserTokenRequest,
} from "../../types";

/**
 * Encodes object as application/x-www-form-urlencoded
 */
export const urlEncodeFormData = (obj: Record<string, any> | null): string => {
  if (!obj) return "";

  return Object.entries(obj)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => {
      const key = encodeURIComponent(k);
      const value = Array.isArray(v)
        ? encodeURIComponent(v.join(","))
        : typeof v === "object"
          ? encodeURIComponent(JSON.stringify(v))
          : encodeURIComponent(String(v));
      return `${key}=${value}`;
    })
    .join("&");
};

class AuthenticationApi {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(sdk: SharetribeSdk | IntegrationSdk) {
    const config = sdk.apisConfigs.auth(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = {...config.headers, "Content-Type": "application/x-www-form-urlencoded"};
    this.httpClient = sdk.httpClient;
  }

  /**
   * Request a token using any supported OAuth2 grant
   *
   * @template T - Token request type
   * @param {T} params - OAuth2 token request parameters
   * @returns {Promise<HttpResponse<TokenResponse<T>>>}
   */
  async token<T extends TokenRequest>(
    params: T
  ): Promise<HttpResponse<TokenResponse<T>>> {
    return this.httpClient.post(
      `${this.endpoint}/token`,
      urlEncodeFormData(params as Record<string, any>),
      {headers: this.headers}
    );
  }

  /**
   * Authenticate via external Identity Provider
   *
   * @param {AuthWithIdpParameter} params
   * @returns {Promise<HttpResponse<TokenResponse<UserTokenRequest>>>}
   */
  async authWithIdp(
    params: AuthWithIdpParameter
  ): Promise<HttpResponse<TokenResponse<UserTokenRequest>>> {
    return this.httpClient.post(
      `${this.endpoint}/auth_with_idp`,
      urlEncodeFormData(params),
      {headers: this.headers}
    );
  }

  /**
   * Revoke a refresh token
   *
   * @param {string} token - Refresh token to revoke
   */
  async revoke(token: string): Promise<HttpResponse<RevokeResponse>> {
    return this.httpClient.post(
      `${this.endpoint}/revoke`,
      urlEncodeFormData({token}),
      {headers: this.headers}
    );
  }

  /**
   * Introspect current access token
   */
  async details(): Promise<HttpResponse<TokenDetails>> {
    return this.httpClient.get(`${this.endpoint}/details`, {
      headers: this.headers,
    });
  }
}

export default AuthenticationApi;