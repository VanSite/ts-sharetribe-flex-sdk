/**
 * @fileoverview Client for fetching public user profiles in the Sharetribe Marketplace API.
 *
 * Use this to retrieve publicly visible information about any user (e.g. name, bio, profile image).
 * Only returns data the current user is allowed to see.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#show-user
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {UsersResponse, UsersShowParameter,} from "../../types";

/**
 * Public Users API client
 */
class Users {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/users`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a public user profile by ID
   *
   * @template P
   * @param {P & UsersShowParameter} params
   * @returns {Promise<AxiosResponse<UsersResponse<"show", P>>>}
   *
   * @example
   * const { data } = await sdk.users.show({ id: "user-abc123" });
   * console.log(data.attributes.profile.displayName);
   * console.log(data.attributes.profile.bio);
   */
  async show<P extends UsersShowParameter>(
    params: P
  ): Promise<AxiosResponse<UsersResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }
}

export default Users;