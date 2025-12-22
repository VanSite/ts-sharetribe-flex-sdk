/**
 * @fileoverview Client for managing availability exceptions in the Sharetribe Marketplace API.
 *
 * Availability exceptions allow users to block or open specific time ranges on their listings,
 * overriding the default availability plan (e.g. closing for holidays, maintenance, or personal use).
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#availability-exceptions
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {
  AvailabilityExceptionsCreateParameter,
  AvailabilityExceptionsDeleteParameter,
  AvailabilityExceptionsQueryParameter,
  AvailabilityExceptionsResponse,
  ExtraParameter,
} from "../../types";

/**
 * Availability Exceptions API client (own listings only)
 */
class AvailabilityExceptions {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/availability_exceptions`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query your own availability exceptions
   *
   * @template P
   * @param {P & AvailabilityExceptionsQueryParameter} params
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.availabilityExceptions.query({
   *   listingId: "listing-abc123",
   *   start: "2025-12-01",
   *   end: "2025-12-31"
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
   * Create a new availability exception (e.g. block dates)
   *
   * @template P
   * @template EP
   * @param {P & AvailabilityExceptionsCreateParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"create", P, EP>>>}
   *
   * @example
   * // Block Christmas day
   * await sdk.availabilityExceptions.create({
   *   listingId: "listing-abc123",
   *   start: "2025-12-25T00:00:00Z",
   *   end: "2025-12-26T00:00:00Z",
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
   * @template EP
   * @param {P & AvailabilityExceptionsDeleteParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<"delete", P, EP>>>}
   *
   * @example
   * await sdk.availabilityExceptions.delete({ id: "exc-456def" });
   */
  async delete<
    P extends AvailabilityExceptionsDeleteParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"delete", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/delete`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default AvailabilityExceptions;