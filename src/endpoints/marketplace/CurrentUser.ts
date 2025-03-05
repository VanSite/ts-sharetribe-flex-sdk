/**
 * @fileoverview Provides the CurrentUser class for managing the current user's account in the Sharetribe Marketplace API.
 * This class includes methods for retrieving, creating, updating, and deleting the current authenticated user.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#current-user
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import {
  CurrentUserChangeEmailParameter,
  CurrentUserChangePasswordParameter,
  CurrentUserCreateParameter,
  CurrentUserCreateWithIdpParameter,
  CurrentUserDeleteParameter,
  CurrentUserResponse,
  CurrentUserShowParameter,
  CurrentUserUpdateProfileParameter,
  CurrentUserVerifyEmailParameter,
} from "../../types/marketplace/currentUser";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Current User API.
 *
 * This class provides methods to manage the current authenticated user's account,
 * including viewing, creating, updating, and deleting the user profile.
 */
class CurrentUser {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the CurrentUser class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/current_user";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves the current authenticated user's details.
   *
   * @template P
   * @param {P & CurrentUserShowParameter} params - Parameters for the request.
   * @returns {Promise<CurrentUserResponse<'show', P>>} - A promise resolving to the user's details.
   *
   * @example
   * const response = await sdk.currentUser.show({});
   * const user = response.data;
   */
  async show<P extends CurrentUserShowParameter>(
    params: P
  ): Promise<AxiosResponse<CurrentUserResponse<"show", P>>> {
    return this.axios.get<CurrentUserResponse<"show", P>>(
      `${this.endpoint}/show`,
      {
        ...this.headers,
        params,
      }
    );
  }

  /**
   * Deletes the current authenticated user's account.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserDeleteParameter} params - Parameters for the request.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'delete', P>>} - A promise resolving to the deletion confirmation.
   *
   * @example
   * const response = await sdk.currentUser.delete();
   * const result = response.data;
   */
  async delete<P extends CurrentUserDeleteParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"delete", P>>> {
    return this.axios.post<CurrentUserResponse<"delete", P>>(
      `${this.endpoint}/delete`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Creates a new user account.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserCreateParameter} params - Parameters for the new user.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'create', P>>} - A promise resolving to the created user's details.
   *
   * @example
   * const response = await sdk.currentUser.create({
   *   email: 'user@example.com',
   *   password: 'secure-password',
   *   firstName: 'First',
   *   lastName: 'Last'
   * });
   * const newUser = response.data;
   */
  async create<P extends CurrentUserCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"create", P>>> {
    return this.axios.post<CurrentUserResponse<"create", P>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Creates a new user account using an identity provider.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserCreateWithIdpParameter} params - Parameters for the new user with identity provider details.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'create_with_idp', P>>} - A promise resolving to the created user's details.
   *
   * @example
   * const response = await sdk.currentUser.createWithIdp({
   *   idpId: 'provider-id',
   *   idpClientId: 'provider-client-id',
   *   idpToken: 'provider-token'
   * });
   * const newUser = response.data;
   */
  async createWithIdp<
    P extends CurrentUserCreateWithIdpParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"create_with_idp", P>>> {
    return this.axios.post<CurrentUserResponse<"create_with_idp", P>>(
      `${this.endpoint}/create_with_idp`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Updates the current authenticated user's profile.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserUpdateProfileParameter} params - Parameters for updating the profile.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'update_profile', P>>} - A promise resolving to the updated user's details.
   *
   * @example
   * const response = await sdk.currentUser.updateProfile({
   *   firstName: 'UpdatedFirst',
   *   lastName: 'UpdatedLast'
   * });
   * const updatedUser = response.data;
   */
  async updateProfile<
    P extends CurrentUserUpdateProfileParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"update_profile", P>>> {
    return this.axios.post<CurrentUserResponse<"update_profile", P>>(
      `${this.endpoint}/update_profile`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Changes the current authenticated user's password.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserChangePasswordParameter} params - Parameters for changing the password.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'change_password', P>>} - A promise resolving to the password change confirmation.
   *
   * @example
   * const response = await sdk.currentUser.changePassword({
   *   currentPassword: 'old-password',
   *   newPassword: 'new-secure-password'
   * });
   * const result = response.data;
   */
  async changePassword<
    P extends CurrentUserChangePasswordParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"change_password", P>>> {
    return this.axios.post<CurrentUserResponse<"change_password", P>>(
      `${this.endpoint}/change_password`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Changes the current authenticated user's email address.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserChangeEmailParameter} params - Parameters for changing the email address.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'change_email', P>>} - A promise resolving to the email change confirmation.
   *
   * @example
   * const response = await sdk.currentUser.changeEmail({
   *   newEmail: 'new-email@example.com',
   *   currentPassword: 'current-password'
   * });
   * const result = response.data;
   */
  async changeEmail<
    P extends CurrentUserChangeEmailParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"change_email", P>>> {
    return this.axios.post<CurrentUserResponse<"change_email", P>>(
      `${this.endpoint}/change_email`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Verifies the current authenticated user's email address.
   *
   * @template P
   * @template EP
   * @param {P & CurrentUserVerifyEmailParameter} params - Parameters for verifying the email address.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<CurrentUserResponse<'verify_email', P>>} - A promise resolving to the email verification confirmation.
   *
   * @example
   * const response = await sdk.currentUser.verifyEmail({
   *   verificationToken: 'verification-token'
   * });
   * const result = response.data;
   */
  async verifyEmail<
    P extends CurrentUserVerifyEmailParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<CurrentUserResponse<"verify_email", P>>> {
    return this.axios.post<CurrentUserResponse<"verify_email", P>>(
      `${this.endpoint}/verify_email`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }

  /**
   * Sends a verification email to the current authenticated user.
   *
   * @template P
   * @returns {Promise<CurrentUserResponse<'send_verification_email', P>>} - A promise resolving to the email sending confirmation.
   *
   * @example
   * const response = await sdk.currentUser.sendVerificationEmail();
   * const result = response.data;
   */
  async sendVerificationEmail<P extends void>(): Promise<
    AxiosResponse<CurrentUserResponse<"send_verification_email", P>>
  > {
    return this.axios.post<CurrentUserResponse<"send_verification_email", P>>(
      `${this.endpoint}/send_verification_email`,
      null,
      { ...this.headers }
    );
  }

  /**
   * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/create instead!
   * Throws an error to indicate that this method should not be used.
   */
  async createStripeAccount() {
    throw new Error(
      "This API endpoint is DEPRECATED. Use /stripe_account/create instead!"
    );
  }

  /**
   * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/update instead!
   * Throws an error to indicate that this method should not be used.
   */
  async updateStripeAccount() {
    throw new Error(
      "This API endpoint is DEPRECATED. Use /stripe_account/update instead!"
    );
  }
}

export default CurrentUser;
