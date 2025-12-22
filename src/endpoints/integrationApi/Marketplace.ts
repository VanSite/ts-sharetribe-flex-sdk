/**
 * @fileoverview Client for fetching marketplace configuration in the Sharetribe Integration API.
 *
 * Use this to retrieve metadata about the marketplace (name, description, currency, etc.).
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#marketplace
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {MarketplaceResponse} from "../../types";

/**
 * Marketplace API client
 */
class Marketplace {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/marketplace`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch current marketplace configuration
   *
   * @returns {Promise<AxiosResponse<MarketplaceResponse<"show">>>}
   *
   * @example
   * const { data } = await sdk.marketplace.show();
   * console.log(data.attributes.name); // → "My Awesome Marketplace"
   */
  async show(): Promise<AxiosResponse<MarketplaceResponse<"show">>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
    });
  }
}

export default Marketplace;