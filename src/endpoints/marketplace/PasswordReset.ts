/**
 * @fileoverview Provides the PasswordReset class for managing password reset requests and operations in the Sharetribe Marketplace API.
 * This class includes methods for requesting a password reset and resetting the password using a token.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#password-reset
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import {
  PasswordResetRequestParams,
  PasswordResetResetParams,
  PasswordResetResponse,
} from '../../types/marketplace/passwordReset';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Password Reset API.
 *
 * The Password Reset API provides methods for requesting a password reset email and resetting the password.
 */
class PasswordReset {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the PasswordReset class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/password_reset';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Requests a password reset email.
   *
   * @template P
   * @template EP
   * @param {P & PasswordResetRequestParams} params - Parameters for the password reset request.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<PasswordResetResponse<'request', EP>>>} - A promise resolving to the password reset request response.
   *
   * @example
   * const response = await sdk.passwordReset.request({
   *   email: 'user@example.com',
   * });
   * const result = response.data;
   */
  async request<P extends PasswordResetRequestParams, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<PasswordResetResponse<'request', EP>>> {
    return this.axios.post<PasswordResetResponse<'request', EP>>(
      `${this.endpoint}/request`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Resets the user's password using a token.
   *
   * @template P
   * @template EP
   * @param {P & PasswordResetResetParams} params - Parameters for resetting the password.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<PasswordResetResponse<'reset', EP>>>} - A promise resolving to the password reset confirmation response.
   *
   * @example
   * const response = await sdk.passwordReset.reset({
   *   email: 'user@example.com',
   *   passwordResetToken: 'password-reset-token',
   *   newPassword: 'new-password',
   * });
   * const result = response.data;
   */
  async reset<P extends PasswordResetResetParams, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<PasswordResetResponse<'reset', EP>>> {
    return this.axios.post<PasswordResetResponse<'reset', EP>>(
      `${this.endpoint}/reset`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default PasswordReset;
