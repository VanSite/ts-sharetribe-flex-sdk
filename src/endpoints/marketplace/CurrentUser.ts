/**
 * @fileoverview Client for managing the current authenticated user in the Sharetribe Marketplace API.
 *
 * This API allows users to view their profile, update personal info, change password/email,
 * verify email, and manage account lifecycle (signup, delete).
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#current-user
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
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
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/current_user`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch current user profile
   *
   * @template P
   * @param {P & CurrentUserShowParameter} params
   * @returns {Promise<HttpResponse<CurrentUserResponse<"show", P>>>}
   */
  async show<P extends CurrentUserShowParameter>(
    params: P = {} as P
  ): Promise<HttpResponse<CurrentUserResponse<"show", P, {expand: true}>>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"create", P, EP>>>}
   */
  async create<
    P extends CurrentUserCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"create", P, EP>>> {
    return this.httpClient.post(
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"create_with_idp", P, EP>>>}
   */
  async createWithIdp<
    P extends CurrentUserCreateWithIdpParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"create_with_idp", P, EP>>> {
    return this.httpClient.post(
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"update_profile", P, EP>>>}
   */
  async updateProfile<
    P extends CurrentUserUpdateProfileParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"update_profile", P, EP>>> {
    return this.httpClient.post(
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"change_password", P, EP>>>}
   */
  async changePassword<
    P extends CurrentUserChangePasswordParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"change_password", P, EP>>> {
    return this.httpClient.post(
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"change_email", P, EP>>>}
   */
  async changeEmail<
    P extends CurrentUserChangeEmailParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"change_email", P, EP>>> {
    return this.httpClient.post(
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
   * @returns {Promise<HttpResponse<CurrentUserResponse<"verify_email", P, EP>>>}
   */
  async verifyEmail<
    P extends CurrentUserVerifyEmailParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"verify_email", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/verify_email`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Resend email verification
   *
   * @returns {Promise<HttpResponse<CurrentUserResponse<"send_verification_email">>>}
   */
  async sendVerificationEmail<P extends CurrentUserSendVerificationEmailParameter>(): Promise<
    HttpResponse<CurrentUserResponse<"send_verification_email", P>>
  > {
    return this.httpClient.post(`${this.endpoint}/send_verification_email`, null, {
      headers: this.headers,
    });
  }

  /**
   * Delete current user account
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserDeleteParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<CurrentUserResponse<"delete", P, EP>>>}
   */
  async delete<
    P extends CurrentUserDeleteParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<CurrentUserResponse<"delete", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/delete`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
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