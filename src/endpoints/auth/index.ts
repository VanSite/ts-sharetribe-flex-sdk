/**
 * @fileoverview Client for Sharetribe Authentication API (OAuth2)
 *
 * @see https://www.sharetribe.com/api-reference/authentication.html
 */

import type {AxiosInstance, AxiosResponse} from "axios";
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
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(sdk: SharetribeSdk | IntegrationSdk) {
    const config = sdk.apisConfigs.auth(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = {...config.headers, "Content-Type": "application/x-www-form-urlencoded"};
    this.axios = sdk.axios;
  }

  /**
   * Request a token using any supported OAuth2 grant
   *
   * @template T - Token request type
   * @param {T} params - OAuth2 token request parameters
   * @returns {Promise<AxiosResponse<TokenResponse<T>>>}
   */
  async token<T extends TokenRequest>(
    params: T
  ): Promise<AxiosResponse<TokenResponse<T>>> {
    return this.axios.post(
      `${this.endpoint}/token`,
      urlEncodeFormData(params as Record<string, any>),
      {headers: this.headers}
    );
  }

  /**
   * Authenticate via external Identity Provider
   *
   * @param {AuthWithIdpParameter} params
   * @returns {Promise<AxiosResponse<TokenResponse<UserTokenRequest>>>}
   */
  async authWithIdp(
    params: AuthWithIdpParameter
  ): Promise<AxiosResponse<TokenResponse<UserTokenRequest>>> {
    return this.axios.post(
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
  async revoke(token: string): Promise<AxiosResponse<RevokeResponse>> {
    return this.axios.post(
      `${this.endpoint}/revoke`,
      urlEncodeFormData({token}),
      {headers: this.headers}
    );
  }

  /**
   * Introspect current access token
   */
  async details(): Promise<AxiosResponse<TokenDetails>> {
    return this.axios.get(`${this.endpoint}/details`, {
      headers: this.headers,
    });
  }
}

export default AuthenticationApi;