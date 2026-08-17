/**
 * @fileoverview Client for managing availability exceptions in the Sharetribe Integration API.
 *
 * Availability exceptions override default availability rules for specific time ranges
 * (e.g. blocking off dates for maintenance or special events).
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#availability-exceptions
 */

import type {HttpClient, HttpResponse} from "../../types";
import IntegrationApi from "./index";
import {
  AvailabilityExceptionsCreateParameter,
  AvailabilityExceptionsDeleteParameter,
  AvailabilityExceptionsQueryParameter,
  AvailabilityExceptionsResponse,
  ExtraParameter,
} from "../../types";

/**
 * Availability exceptions API client
 */
class AvailabilityExceptions {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/availability_exceptions`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query availability exceptions
   *
   * @template P
   * @param {P & AvailabilityExceptionsQueryParameter} params
   * @returns {Promise<HttpResponse<AvailabilityExceptionsResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.availabilityExceptions.query({
   *   listingId: "123-abc",
   *   start: "2025-01-01",
   *   end: "2025-01-31"
   * });
   */
  async query<P extends AvailabilityExceptionsQueryParameter>(
    params: P
  ): Promise<HttpResponse<AvailabilityExceptionsResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Create a new availability exception
   *
   * @template P
   * @template EP
   * @param {P & AvailabilityExceptionsCreateParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. expand)
   * @returns {Promise<HttpResponse<AvailabilityExceptionsResponse<"create", P, EP>>>}
   *
   * @example
   * await sdk.availabilityExceptions.create({
   *   listingId: "123-abc",
   *   start: "2025-12-24",
   *   end: "2025-12-26",
   *   seats: 0
   * });
   */
  async create<
    P extends AvailabilityExceptionsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<AvailabilityExceptionsResponse<"create", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Delete an availability exception
   *
   * @template P
   * @param {P & AvailabilityExceptionsDeleteParameter} params
   * @returns {Promise<HttpResponse<AvailabilityExceptionsResponse<"delete", P>>>}
   *
   * @example
   * await sdk.availabilityExceptions.delete({ id: "exc-456-def" });
   */
  async delete<P extends AvailabilityExceptionsDeleteParameter>(
    params: P
  ): Promise<HttpResponse<AvailabilityExceptionsResponse<"delete", P>>> {
    return this.httpClient.post(`${this.endpoint}/delete`, params, {
      headers: this.headers,
    });
  }
}

export default AvailabilityExceptions;