/**
 * @fileoverview Client for querying events in the Sharetribe Integration API.
 *
 * The Events API provides a stream of marketplace events (e.g. listing created, transaction transitioned)
 * for building integrations, webhooks, analytics, or real-time features.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#events
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {EventsQueryParameter, EventsResponse} from "../../types";

/**
 * Events API client
 */
class Events {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/events`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query marketplace events
   *
   * @template P
   * @param {P & EventsQueryParameter} params - Query filters and pagination
   * @returns {Promise<AxiosResponse<EventsResponse<"query">>>}
   *
   * @example
   * // Fetch events after a specific sequence ID
   * const response = await sdk.events.query({
   *   startAfterSequenceId: 12345,
   *   eventTypes: ["transaction/initiated", "booking/created"]
   * });
   *
   * @example
   * // Fetch recent events for a specific listing
   * await sdk.events.query({
   *   resourceId: "listing-abc-123",
   *   createdAtStart: "2025-01-01T00:00:00Z"
   * });
   */
  async query<P extends EventsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<EventsResponse<"query">>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Events;