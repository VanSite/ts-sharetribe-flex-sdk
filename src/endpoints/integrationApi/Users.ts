/**
 * @fileoverview Client for managing users in the Sharetribe Integration API.
 *
 * This privileged API allows querying users, updating profiles, approving accounts,
 * and managing permissions — typically used by admin tools or backend services.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#users
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {
  ExtraParameter,
  UsersApproveParameter,
  UsersQueryParameter,
  UsersResponse,
  UsersShowParameter,
  UsersUpdatePermissionsParameter,
  UsersUpdateProfileParameter,
} from "../../types";

/**
 * Users API client (privileged)
 */
class Users {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/users`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a single user by ID or email
   *
   * @template P
   * @param {P & UsersShowParameter<true>} params - Either `id` or `email` is required
   * @returns {Promise<AxiosResponse<UsersResponse<"show", P>>>}
   *
   * @example
   * const { data } = await sdk.users.show({ id: "user-abc123" });
   * const { data: userByEmail } = await sdk.users.show({ email: "john@example.com" });
   */
  async show<P extends UsersShowParameter<true>>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<"show", P>>> {
    if (!params.id && !params.email) {
      throw new Error("Either 'id' or 'email' must be provided");
    }

    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Query users with privileged filters
   *
   * @template P
   * @param {P & UsersQueryParameter} params
   * @returns {Promise<AxiosResponse<UsersResponse<"query", P>>>}
   */
  async query<P extends UsersQueryParameter>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
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
   * @returns {Promise<AxiosResponse<UsersResponse<"updateProfile", P, EP>>>}
   */
  async updateProfile<
    P extends UsersUpdateProfileParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"updateProfile", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<UsersResponse<"approve", P, EP>>>}
   */
  async approve<
    P extends UsersApproveParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"approve", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<UsersResponse<"updatePermissions", P, EP>>>}
   */
  async updatePermissions<
    P extends UsersUpdatePermissionsParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"updatePermissions", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/update_permissions`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Users;