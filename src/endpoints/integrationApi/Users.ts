/**
 * @fileoverview Provides the Users class for managing user data in the Sharetribe Integration API.
 * This class allows retrieving details about a specific user.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#users
 */

import { AxiosInstance, AxiosResponse } from "axios";
import IntegrationApi from "./index";
import {
  UsersApproveParameter,
  UsersQueryParameter,
  UsersResponse,
  UsersShowParameter,
  UsersUpdatePermissionsParameter,
  UsersUpdateProfileParameter,
} from "../../types/marketplace/user";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Users API.
 *
 * The Users API provides methods to retrieve user data for marketplace resources.
 */
class Users {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Users class.
   *
   * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/users";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details about a specific user.
   *
   * @template P
   * @param {P & UsersShowParameter} params - The parameters to identify the user.
   * @returns {Promise<AxiosResponse<UsersResponse<'show', P, undefined, true>>>} - A promise resolving to the user details.
   *
   * @example
   * const response = await integrationSdk.users.show({
   *   id: 'user-id',
   * });
   *
   * const userDetails = response.data;
   */
  async show<P extends UsersShowParameter<true>>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<"show", P, undefined, true>>> {
    if (!params.id && !params.email) {
      throw new Error("Either 'id' or 'email' must be provided.");
    }

    return this.axios.get<UsersResponse<"show", P, undefined, true>>(
      `${this.endpoint}/show`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Queries users based on specified filters.
   *
   * @template P
   * @param {P & UsersQueryParameter} params - Query parameters for filtering users.
   * @returns {Promise<AxiosResponse<UsersResponse<'query', P, undefined, true>>>} - A promise resolving to the list of users.
   *
   * @example
   * const response = await integrationSdk.users.query({
   *   createdAtStart: '2021-01-01T00:00:00Z'
   * });
   * const users = response.data;
   */
  async query<P extends UsersQueryParameter>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<"query", P, undefined, true>>> {
    return this.axios.get<UsersResponse<"query", P, undefined, true>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Updates a user's profile.
   *
   * @template P
   * @template EP
   * @param {P & UsersUpdateProfileParameter} params - Parameters to update the user's profile.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<UsersResponse<'updateProfile', P, EP, true>>>} - A promise resolving to the updated profile details.
   *
   * @example
   * const response = await integrationSdk.users.updateProfile({
   *   id: 'user-id',
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   displayName: 'John Doe',
   * });
   * const updatedProfile = response.data;
   */
  async updateProfile<
    P extends UsersUpdateProfileParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"updateProfile", P, EP, true>>> {
    return this.axios.post<UsersResponse<"updateProfile", P, EP, true>>(
      `${this.endpoint}/update_profile`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Approves a user.
   *
   * @template P
   * @template EP
   * @param {P & UsersApproveParameter} params - Parameters to approve the user.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<UsersResponse<'approve', P, EP, true>>>} - A promise resolving to the approval confirmation.
   *
   * @example
   * const response = await integrationSdk.users.approve({ id: 'user-id' });
   * const approvalResult = response.data;
   */
  async approve<P extends UsersApproveParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"approve", P, EP, true>>> {
    return this.axios.post<UsersResponse<"approve", P, EP, true>>(
      `${this.endpoint}/approve`,
      { ...params, ...extraParams },
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Updates a user's permissions.
   *
   * @template P
   * @template EP
   * @param {P & UsersUpdatePermissionsParameter} params - Parameters to update the user's permissions.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<UsersResponse<'updatePermissions', P, EP, true>>>} - A promise resolving to the updated permissions details.
   *
   * @example
   * const response = await integrationSdk.users.updatePermissions(
   *   { id: 'user-id', permissions: ['permission-1', 'permission-2'] },
   *   { additionalParam: 'value' }
   * );
   * const updatedPermissions = response.data;
   */
  async updatePermissions<
    P extends UsersUpdatePermissionsParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<UsersResponse<"updatePermissions", P, EP, true>>> {
    return this.axios.post<UsersResponse<"updatePermissions", P, EP, true>>(
      `${this.endpoint}/update_permissions`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default Users;
