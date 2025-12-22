/**
 * @fileoverview Client for fetching marketplace configuration in the Sharetribe Marketplace API.
 *
 * Use this to get metadata about your marketplace — name, description, currency, logo,
 * supported countries, payout settings, and more.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#marketplace
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {MarketplaceResponse} from "../../types";

/**
 * Public Marketplace API client
 */
class Marketplace {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
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
   * console.log(data.attributes.name);        // → "My Awesome Marketplace"
   * console.log(data.attributes.currency);    // → "USD"
   * console.log(data.attributes.country);     // → "FI"
   */
  async show(): Promise<AxiosResponse<MarketplaceResponse<"show">>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
    });
  }
}

export default Marketplace;