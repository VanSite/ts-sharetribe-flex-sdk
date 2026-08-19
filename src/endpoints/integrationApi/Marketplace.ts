/**
 * @fileoverview Client for fetching marketplace configuration in the Sharetribe Integration API.
 *
 * Use this to retrieve metadata about the marketplace (name, description, currency, etc.).
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#marketplace
 */

import type {HttpClient, HttpResponse} from "../../types";
import type IntegrationApi from "./index";
import {MarketplaceResponse} from "../../types";

/**
 * Marketplace API client
 */
class Marketplace {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
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
   * console.log(data.attributes.name); // → "My Awesome Marketplace"
   */
  async show(): Promise<HttpResponse<MarketplaceResponse<"show">>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
    });
  }
}

export default Marketplace;