/**
 * @fileoverview Client for querying bookings in the Sharetribe Marketplace API.
 *
 * Use this to fetch your own bookings or bookings for listings you own.
 * Only returns data the current user is authorized to see.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#bookings
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {BookingsQueryParameter, BookingsResponse,} from "../../types";

/**
 * Bookings API client (own bookings only)
 */
class Bookings {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/bookings`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query your own bookings
   *
   * @template P
   * @param {P & BookingsQueryParameter} params
   * @returns {Promise<AxiosResponse<BookingsResponse<"query", P>>>}
   *
   * @example
   * // Fetch all bookings for one of your listings
   * const { data } = await sdk.bookings.query({
   *   listingId: "listing-abc123",
   *   start: "2025-01-01",
   *   end: "2025-01-31"
   * });
   *
   * @example
   * // Fetch upcoming bookings
   * await sdk.bookings.query({
   *   start: new Date().toISOString(),
   *   state: "accepted"
   * });
   */
  async query<P extends BookingsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<BookingsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Bookings;