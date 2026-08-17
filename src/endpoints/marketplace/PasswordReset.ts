/**
 * @fileoverview Client for password reset operations in the Sharetribe Marketplace API.
 *
 * Use this to request a password-reset email and to complete the password reset flow.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#password-reset
 */

import type {HttpClient, HttpResponse} from "../../types";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  PasswordResetRequestParameter,
  PasswordResetResetParameter,
  PasswordResetResponse,
} from "../../types";

/**
 * Password Reset API client
 */
class PasswordReset {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/password_reset`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Request a password-reset email
   *
   * @template P
   * @template EP
   * @param {P & PasswordResetRequestParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<PasswordResetResponse<"request", EP>>>}
   *
   * @example
   * await sdk.passwordReset.request({ email: "user@example.com" });
   */
  async request<
    P extends PasswordResetRequestParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<PasswordResetResponse<"request", EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/request`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Complete password reset using the token received by email
   *
   * @template P
   * @template EP
   * @param {P & PasswordResetResetParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<PasswordResetResponse<"reset", EP>>>}
   *
   * @example
   * await sdk.passwordReset.reset({
   *   email: "user@example.com",
   *   passwordResetToken: "abc123...",
   *   newPassword: "newSecurePassword123"
   * });
   */
  async reset<
    P extends PasswordResetResetParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<PasswordResetResponse<"reset", EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/reset`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default PasswordReset;