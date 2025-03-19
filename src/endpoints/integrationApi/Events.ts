/**
 * @fileoverview Provides the Events class for querying event data in the Sharetribe Integration API.
 * This class allows querying events related to bookings or other entities in a Sharetribe marketplace.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#events
 */

import { AxiosInstance, AxiosResponse } from "axios";
import IntegrationApi from "./index";
import {
  EventQueryParameter,
  EventsResponse,
} from "../../types/integration/events";

/**
 * Class representing the Events API.
 *
 * The Events API provides access to event data, such as booking events, allowing integration with external systems.
 */
class Events {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Events class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/events";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries event data based on the specified parameters.
   *
   * @template P
   * @param {P & EventQueryParameter} params - Query parameters to filter events.
   * @returns {Promise<EventsResponse<'query'>>} - A promise resolving to the event query response.
   *
   * @example
   * const response = await integrationSdk.events.query({
   *  startAfterSequenceId: 'event-sequence-id',
   *  createdAtStart: '2021-01-01T00:00:00Z',
   *  resourceId: 'resource-id',
   *  relatedResourceId: 'related-resource-id',
   *  eventTypes: ['eventType1', 'eventType2'],
   * });
   *
   * // Access the list of events
   * const eventsList = response.data;
   */
  async query<P extends EventQueryParameter>(
    params: P
  ): Promise<AxiosResponse<EventsResponse<"query">>> {
    return this.axios.get<EventsResponse<"query">>(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Events;
