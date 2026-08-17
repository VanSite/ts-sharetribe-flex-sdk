/**
 * @fileoverview Client for managing users in the Sharetribe Integration API.
 *
 * This privileged API allows querying users, updating profiles, approving accounts,
 * and managing permissions — typically used by admin tools or backend services.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#users
 */

import type {HttpClient, HttpResponse} from "../../types";
import IntegrationApi from "./index";
import {
  ExtraParameter,
  UsersApproveParameter,
  UsersQueryParameter,
  UsersResponse,
  UsersShowParameter,
  UsersUpdatePermissionsParameter,
  UsersUpdateProfileParameter,
  UsersVerifyEmailParameter,
} from "../../types";

/**
 * Users API client (privileged)
 */
class Users {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/users`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch a single user by ID or email
   *
   * @template P
   * @param {P & UsersShowParameter<true>} params - Either `id` or `email` is required
   * @returns {Promise<HttpResponse<UsersResponse<"show", P>>>}
   *
   * @example
   * const { data } = await sdk.users.show({ id: "user-abc123" });
   * const { data: userByEmail } = await sdk.users.show({ email: "john@example.com" });
   */
  async show<P extends UsersShowParameter<true>>(
    params: P
  ): Promise<HttpResponse<UsersResponse<"show", P, {expand: true}>>> {
    if (!params.id && !params.email) {
      throw new Error("Either 'id' or 'email' must be provided");
    }

    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Query users with privileged filters
   *
   * @template P
   * @param {P & UsersQueryParameter} params
   * @returns {Promise<HttpResponse<UsersResponse<"query", P>>>}
   */
  async query<P extends UsersQueryParameter>(
    params: P
  ): Promise<HttpResponse<UsersResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Update a user's profile
   *
   * @template P
   * @template EP
   * @param {P & UsersUpdateProfileParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<UsersResponse<"updateProfile", P, EP>>>}
   */
  async updateProfile<
    P extends UsersUpdateProfileParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<UsersResponse<"updateProfile", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/update_profile`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Approve a pending user account
   *
   * @template P
   * @template EP
   * @param {P & UsersApproveParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<UsersResponse<"approve", P, EP>>>}
   */
  async approve<
    P extends UsersApproveParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<UsersResponse<"approve", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/approve`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update a user's permissions
   *
   * @template P
   * @template EP
   * @param {P & UsersUpdatePermissionsParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<UsersResponse<"updatePermissions", P, EP>>>}
   */
  async updatePermissions<
    P extends UsersUpdatePermissionsParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<UsersResponse<"updatePermissions", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/update_permissions`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Verify a user's email address.
   *
   * `email` must match the user's current `email` or `pendingEmail`
   * (case-insensitive).
   *
   * @template P
   * @template EP
   * @param {P & UsersVerifyEmailParameter} params - `id` and `email`
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<UsersResponse<"verifyEmail", P, EP>>>}
   *
   * @example
   * await sdk.users.verifyEmail({ id: "user-abc123", email: "john@example.com" });
   */
  async verifyEmail<
    P extends UsersVerifyEmailParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<UsersResponse<"verifyEmail", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/verify_email`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Users;