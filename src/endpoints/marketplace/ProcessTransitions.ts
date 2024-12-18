/**
 * @fileoverview Provides the ProcessTransitions class for managing process transitions in the Sharetribe Marketplace API.
 * This class includes a method for querying process transitions.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#process-transitions
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import {
  ProcessTransitionsQueryParameter,
  ProcessTransitionsResponse,
} from '../../types/marketplace/processTransitions';

/**
 * Class representing the Process Transitions API.
 *
 * The Process Transitions API provides methods for querying transitions within processes.
 */
class ProcessTransitions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the ProcessTransitions class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/process_transitions';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries process transitions based on specified filters.
   *
   * @template P
   * @param {P & ProcessTransitionsQueryParameter} params - Query parameters for filtering transitions.
   * @returns {Promise<AxiosResponse<ProcessTransitionsResponse<'query'>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.processTransitions.query({
   *   processAlias: 'booking-process',
   * });
   * const transitions = response.data;
   */
  async query<P extends ProcessTransitionsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<ProcessTransitionsResponse<'query'>>> {
    return this.axios.get<ProcessTransitionsResponse<'query'>>(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default ProcessTransitions;
