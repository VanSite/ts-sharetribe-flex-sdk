/**
 * @fileoverview Client for querying time slots in the Sharetribe Marketplace API.
 *
 * Use this to fetch availability for listings that use time-based booking
 * (e.g. hourly rentals, appointments, classes).
 *
 * Returns day or time-range slots with seat availability.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#time-slots
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {TimeSlotsQueryParameter, TimeSlotsResponse,} from "../../types";

/**
 * Time Slots API client
 */
class TimeSlots {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/timeslots`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query available time slots for a listing
   *
   * @template P
   * @param {P & TimeSlotsQueryParameter} params
   * @returns {Promise<HttpResponse<TimeSlotsResponse<"query">>>}
   *
   * @example
   * const { data } = await sdk.timeSlots.query({
   *   listingId: "listing-abc123",
   *   start: "2025-06-01T00:00:00Z",
   *   end: "2025-06-07T23:59:59Z"
   * });
   *
   * // `data` contains TimeSlot[] with `seats` and `start`/`end`
   */
  async query<P extends TimeSlotsQueryParameter>(
    params: P
  ): Promise<HttpResponse<TimeSlotsResponse<"query">>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default TimeSlots;