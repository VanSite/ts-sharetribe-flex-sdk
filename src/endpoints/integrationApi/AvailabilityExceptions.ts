/**
 * @fileoverview Provides the AvailabilityExceptions class for managing availability exceptions in the Sharetribe Integration API.
 * This class allows querying, creating, and deleting availability exceptions for resources in a Sharetribe marketplace.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#availability-exceptions
 */

import {AxiosInstance, AxiosResponse} from 'axios';
import IntegrationApi from './index';
import {
  AvailabilityExceptionsCreateParameter,
  AvailabilityExceptionsDeleteParameter,
  AvailabilityExceptionsQueryParameter,
  AvailabilityExceptionsResponse
} from '../../types/marketplace/availabilityExceptions';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Availability Exceptions API.
 *
 * Availability exceptions are used to override default availability rules for specific time ranges.
 * This class provides methods to query, create, and delete such exceptions.
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
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + '/availability_exceptions';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries availability exceptions for a resource.
   *
   * @template P
   * @param {P & AvailabilityExceptionsQueryParameter} params - Query parameters to filter availability exceptions.
   * @returns {Promise<AvailabilityExceptionsResponse<'query', P>>} - A promise resolving to the query response.
   *
   * @example
   * const response = await integrationSdk.availabilityExceptions.query({
   *   listingId: 'listing-id',
   *   start: '2024-12-01T00:00:00Z',
   *   end: '2024-12-31T23:59:59Z'
   * });
   *
   * // Access the list of exceptions
   * const exceptions = response.data;
   */
  async query<P extends AvailabilityExceptionsQueryParameter>(params: P): Promise<AxiosResponse<AvailabilityExceptionsResponse<'query', P>>> {
    return this.axios.get<AvailabilityExceptionsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  /**
   * Creates a new availability exception for a resource.
   *
   * @template P
   * @template EP
   * @param {P & AvailabilityExceptionsCreateParameter} params - Parameters to define the availability exception.
   * @param {EP | void} [extraParams] - Optional additional parameters.
   * @returns {Promise<AvailabilityExceptionsResponse<'create', P, EP>>} - A promise resolving to the create response.
   *
   * @example
   * const response = await integrationSdk.availabilityExceptions.create({
   *   listingId: 'listing-id',
   *   start: '2024-12-10T10:00:00Z',
   *   end: '2024-12-10T12:00:00Z',
   *   seats: 0
   * });
   *
   * // Access the created exception
   * const createdException = response.data;
   */
  async create<P extends AvailabilityExceptionsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<AxiosResponse<AvailabilityExceptionsResponse<'create', P, EP>>> {
    return this.axios.post<AvailabilityExceptionsResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }

  /**
   * Deletes an availability exception for a resource.
   *
   * @template P
   * @param {P & AvailabilityExceptionsDeleteParameter} params - Parameters to specify the exception to delete.
   * @returns {Promise<AvailabilityExceptionsResponse<'delete', P>>} - A promise resolving to the delete response.
   *
   * @example
   * const response = await integrationSdk.availabilityExceptions.delete({
   *   id: 'exception-id'
   * });
   *
   * // Check the deletion result
   * const result = response.data;
   */
  async delete<P extends AvailabilityExceptionsDeleteParameter>(params: P): Promise<AxiosResponse<AvailabilityExceptionsResponse<'delete', P>>> {
    return this.axios.post<AvailabilityExceptionsResponse<'delete', P>>(`${this.endpoint}/delete`, params, this.headers);
  }
}

export default AvailabilityExceptions;
