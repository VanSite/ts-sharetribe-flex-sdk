/**
 * @fileoverview Provides the AvailabilityExceptions class for managing availability exceptions in the Sharetribe Marketplace API.
 * This class allows querying, creating, and deleting availability exceptions for listings.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#availability-exceptions
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import {
  AvailabilityExceptionsCreateParameter,
  AvailabilityExceptionsDeleteParameter,
  AvailabilityExceptionsQueryParameter,
  AvailabilityExceptionsResponse,
} from "../../types/marketplace/availabilityExceptions";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the AvailabilityExceptions API.
 *
 * The AvailabilityExceptions API provides methods to manage availability exceptions for listings, such as querying existing exceptions, creating new ones, and deleting them.
 */
class AvailabilityExceptions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the AvailabilityExceptions class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/availability_exceptions";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries availability exceptions based on specified filters.
   *
   * @template P
   * @param {P & AvailabilityExceptionsQueryParameter} params - Query parameters to filter availability exceptions.
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.availabilityExceptions.query({
   *   listingId: 'listing-id',
   *   start: '2024-12-01T00:00:00Z',
   *   end: '2024-12-31T23:59:59Z',
   * });
   *
   * const exceptions = response.data;
   */
  async query<P extends AvailabilityExceptionsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"query", P>>> {
    return this.axios.get<AvailabilityExceptionsResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Creates a new availability exception for a listing.
   *
   * @template P
   * @template EP
   * @param {P & AvailabilityExceptionsCreateParameter} params - Parameters for the new availability exception.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<'create', P, EP>>>} - A promise resolving to the created availability exception.
   *
   * @example
   * const response = await sdk.availabilityExceptions.create({
   *   listingId: 'listing-id',
   *   start: '2024-12-25T00:00:00Z',
   *   end: '2024-12-25T23:59:59Z',
   *   seats: 0,
   * });
   *
   * const newException = response.data;
   */
  async create<
    P extends AvailabilityExceptionsCreateParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"create", P, EP>>> {
    return this.axios.post<AvailabilityExceptionsResponse<"create", P, EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Deletes an existing availability exception.
   *
   * @template P
   * @template EP
   * @param {P & AvailabilityExceptionsDeleteParameter} params - Parameters to identify the availability exception to delete.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<AvailabilityExceptionsResponse<'delete', P>>>} - A promise resolving to the deletion result.
   *
   * @example
   * const response = await sdk.availabilityExceptions.delete({
   *   id: 'exception-id',
   * });
   *
   * const deletionResult = response.data;
   */
  async delete<
    P extends AvailabilityExceptionsDeleteParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<AvailabilityExceptionsResponse<"delete", P, EP>>> {
    return this.axios.post<AvailabilityExceptionsResponse<"delete", P, EP>>(
      `${this.endpoint}/delete`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default AvailabilityExceptions;
