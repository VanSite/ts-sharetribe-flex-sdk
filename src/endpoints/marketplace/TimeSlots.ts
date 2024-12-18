/**
 * @fileoverview Provides the TimeSlots class for managing time slots in the Sharetribe Marketplace API.
 * This class includes methods for querying available time slots for marketplace resources.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#time-slots
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { TimeSlotsQueryParameter, TimeSlotsResponse } from '../../types/marketplace/timeSlots';

/**
 * Class representing the Time Slots API.
 *
 * The Time Slots API provides methods for querying available time slots for bookings.
 */
class TimeSlots {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the TimeSlots class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/timeslots';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries available time slots based on specified filters.
   *
   * @template P
   * @param {P & TimeSlotsQueryParameter} params - Query parameters for filtering time slots.
   * @returns {Promise<AxiosResponse<TimeSlotsResponse<'query'>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.timeSlots.query({
   *   listingId: 'listing-id',
   *   start: '2024-01-01T00:00:00Z',
   *   end: '2024-01-07T23:59:59Z',
   * });
   * const timeSlots = response.data;
   */
  async query<P extends TimeSlotsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<TimeSlotsResponse<'query'>>> {
    return this.axios.get<TimeSlotsResponse<'query'>>(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default TimeSlots;
