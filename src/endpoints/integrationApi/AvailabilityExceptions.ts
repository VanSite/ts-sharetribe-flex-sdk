/**
 * @fileoverview Client for managing availability exceptions in the Sharetribe Integration API.
 *
 * Availability exceptions override default availability rules for specific time ranges
 * (e.g. blocking off dates for maintenance or special events).
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#availability-exceptions
 */

import type {AxiosInstance, AxiosResponse} from "axios";
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
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/availability_exceptions`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query availability exceptions
   *
   * @template P
   * @param {P & AvailabilityExceptionsQueryParameter} params
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"query", P>>>}
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
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
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
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"create", P, EP>>>}
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
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"create", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"delete", P>>>}
   *
   * @example
   * await sdk.availabilityExceptions.delete({ id: "exc-456-def" });
   */
  async delete<P extends AvailabilityExceptionsDeleteParameter>(
    params: P
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"delete", P>>> {
    return this.axios.post(`${this.endpoint}/delete`, params, {
      headers: this.headers,
    });
  }
}

export default AvailabilityExceptions;