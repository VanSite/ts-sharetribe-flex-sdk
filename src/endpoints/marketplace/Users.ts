/**
 * @fileoverview Provides the Users class for managing user data in the Sharetribe Marketplace API.
 * This class includes methods for retrieving details about a specific user.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#show-user
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { UsersResponse, UsersShowParameter } from '../../types/marketplace/user';

/**
 * Class representing the Users API.
 *
 * The Users API provides methods for managing user data in the marketplace.
 */
class Users {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Users class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/users';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details of a specific user.
   *
   * @template P
   * @param {P & UsersShowParameter} params - Parameters to identify the user.
   * @returns {Promise<AxiosResponse<UsersResponse<'show', P>>>} - A promise resolving to the user details.
   *
   * @example
   * const response = await sdk.users.show({
   *   id: 'user-id',
   * });
   * const userDetails = response.data;
   */
  async show<P extends UsersShowParameter>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<'show', P>>> {
    return this.axios.get<UsersResponse<'show', P>>(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }
}

export default Users;
