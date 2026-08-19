/**
 * @fileoverview Client for fetching marketplace configuration in the Sharetribe Marketplace API.
 *
 * Use this to get metadata about your marketplace — name, description, currency, logo,
 * supported countries, payout settings, and more.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#marketplace
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {MarketplaceResponse} from "../../types";

/**
 * Public Marketplace API client
 */
class Marketplace {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/marketplace`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch current marketplace configuration
   *
   * @returns {Promise<HttpResponse<MarketplaceResponse<"show">>>}
   *
   * @example
   * const { data } = await sdk.marketplace.show();
   * console.log(data.attributes.name);        // → "My Awesome Marketplace"
   * console.log(data.attributes.currency);    // → "USD"
   * console.log(data.attributes.country);     // → "FI"
   */
  async show(): Promise<HttpResponse<MarketplaceResponse<"show">>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
    });
  }
}

export default Marketplace;