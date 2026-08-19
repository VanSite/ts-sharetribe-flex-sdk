/**
 * @fileoverview Client for querying events in the Sharetribe Integration API.
 *
 * The Events API provides a stream of marketplace events (e.g. listing created, transaction transitioned)
 * for building integrations, webhooks, analytics, or real-time features.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#events
 */

import type {HttpClient, HttpResponse} from "../../types";
import type IntegrationApi from "./index";
import {EventsQueryParameter, EventsResponse} from "../../types";

/**
 * Events API client
 */
class Events {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/events`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query marketplace events
   *
   * @template P
   * @param {P & EventsQueryParameter} params - Query filters and pagination
   * @returns {Promise<HttpResponse<EventsResponse<"query">>>}
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
  ): Promise<HttpResponse<EventsResponse<"query">>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Events;