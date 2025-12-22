/**
 * @fileoverview Client for querying public listings in the Sharetribe Marketplace API.
 *
 * Use this to search and fetch listing details in your frontend.
 * Only returns publicly visible data — no privileged operations.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#listings
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ListingsQueryParameter, ListingsResponse, ListingsShowParameter,} from "../../types";

/**
 * Public Listings API client
 */
class Listings {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/listings`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a single listing by ID
   *
   * @template P
   * @param {P & ListingsShowParameter} params
   * @returns {Promise<AxiosResponse<ListingsResponse<"show", P>>>}
   *
   * @example
   * const { data } = await sdk.listings.show({ id: "listing-abc123" });
   */
  async show<P extends ListingsShowParameter>(
    params: P
  ): Promise<AxiosResponse<ListingsResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Search and filter public listings
   *
   * @template P
   * @param {P & ListingsQueryParameter} params
   * @returns {Promise<AxiosResponse<ListingsResponse<"query", P>>>}
   *
   * @example
   * // Basic keyword search
   * await sdk.listings.query({ keywords: "yoga class" });
   *
   * @example
   * // Geo + price filter
   * await sdk.listings.query({
   *   origin: "60.1699,24.9384",
   *   bounds: "60.2,25.0,60.1,24.8",
   *   price: [0, 100]
   * });
   */
  async query<P extends ListingsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<ListingsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Listings;