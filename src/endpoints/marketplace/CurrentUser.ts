/**
 * @fileoverview Client for managing the current authenticated user in the Sharetribe Marketplace API.
 *
 * This API allows users to view their profile, update personal info, change password/email,
 * verify email, and manage account lifecycle (signup, delete).
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#current-user
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {
  CurrentUserChangeEmailParameter,
  CurrentUserChangePasswordParameter,
  CurrentUserCreateParameter,
  CurrentUserCreateWithIdpParameter,
  CurrentUserDeleteParameter,
  CurrentUserResponse,
  CurrentUserSendVerificationEmailParameter,
  CurrentUserShowParameter,
  CurrentUserUpdateProfileParameter,
  CurrentUserVerifyEmailParameter,
  ExtraParameter,
} from "../../types";

/**
 * Current User API client
 */
class CurrentUser {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/current_user`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch current user profile
   *
   * @template P
   * @param {P & CurrentUserShowParameter} params
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"show", P>>>}
   */
  async show<P extends CurrentUserShowParameter>(
    params: P = {} as P
  ): Promise<AxiosResponse<CurrentUserResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Create a new user account (signup)
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"create", P, EP>>>}
   */
  async create<
    P extends CurrentUserCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"create", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Create account via external identity provider (Google, Facebook, etc.)
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserCreateWithIdpParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"create_with_idp", P, EP>>>}
   */
  async createWithIdp<
    P extends CurrentUserCreateWithIdpParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"create_with_idp", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/create_with_idp`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update current user profile
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserUpdateProfileParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"update_profile", P, EP>>>}
   */
  async updateProfile<
    P extends CurrentUserUpdateProfileParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"update_profile", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/update_profile`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Change password
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserChangePasswordParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"change_password", P, EP>>>}
   */
  async changePassword<
    P extends CurrentUserChangePasswordParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"change_password", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/change_password`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Change email address
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserChangeEmailParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"change_email", P, EP>>>}
   */
  async changeEmail<
    P extends CurrentUserChangeEmailParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"change_email", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/change_email`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Verify email using token from email link
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserVerifyEmailParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"verify_email", P, EP>>>}
   */
  async verifyEmail<
    P extends CurrentUserVerifyEmailParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"verify_email", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/verify_email`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Resend email verification
   *
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"send_verification_email">>>}
   */
  async sendVerificationEmail<P extends CurrentUserSendVerificationEmailParameter>(): Promise<
    AxiosResponse<CurrentUserResponse<"send_verification_email", P>>
  > {
    return this.axios.post(`${this.endpoint}/send_verification_email`, null, {
      headers: this.headers,
    });
  }

  /**
   * Delete current user account
   *
   * @returns {Promise<AxiosResponse<CurrentUserResponse<"delete">>>}
   */
  async delete<P extends CurrentUserDeleteParameter>(): Promise<AxiosResponse<CurrentUserResponse<"delete", P>>> {
    return this.axios.post(`${this.endpoint}/delete`, null, {
      headers: this.headers,
    });
  }

  /**
   * @deprecated Use `sdk.stripeAccount.create()` instead
   */
  createStripeAccount(): never {
    throw new Error(
      "DEPRECATED: Use sdk.stripeAccount.create() instead"
    );
  }

  /**
   * @deprecated Use `sdk.stripeAccount.update()` instead
   */
  updateStripeAccount(): never {
    throw new Error(
      "DEPRECATED: Use sdk.stripeAccount.update() instead"
    );
  }
}

export default CurrentUser;