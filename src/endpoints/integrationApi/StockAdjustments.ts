/**
 * @fileoverview Provides the StockAdjustments class for managing stock adjustments in the Sharetribe Integration API.
 * This class allows querying and creating stock adjustment records.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#stock-adjustments
 */

import { AxiosInstance, AxiosResponse } from "axios";
import IntegrationApi from "./index";
import {
  StockAdjustmentsCreateParameter,
  StockAdjustmentsQueryParameter,
  StockAdjustmentsResponse,
} from "../../types/marketplace/stockAdjustment";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Stock Adjustments API.
 *
 * The Stock Adjustments API provides methods to query and create stock adjustments for marketplace resources.
 */
class StockAdjustments {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StockAdjustments class.
   *
   * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/stock_adjustments";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries stock adjustment records based on specified filters.
   *
   * @template P
   * @param {P & StockAdjustmentsQueryParameter} params - Query parameters to filter stock adjustment records.
   * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await integrationSdk.stockAdjustments.query({
   *   listingId: 'resource-id',
   *   start: '2024-12-01T00:00:00Z',
   *   end: '2024-12-31T23:59:59Z',
   * });
   *
   * const adjustments = response.data;
   */
  async query<P extends StockAdjustmentsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<StockAdjustmentsResponse<"query", P>>> {
    return this.axios.get<StockAdjustmentsResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Creates a new stock adjustment record.
   *
   * @template P
   * @template EP
   * @param {P & StockAdjustmentsCreateParameter} params - Parameters for the new stock adjustment.
   * @param {EP | undefined} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<'create', P, EP>>>} - A promise resolving to the created stock adjustment record.
   *
   * @example
   * const response = await integrationSdk.stockAdjustments.create({
   *   listingId: 'listing-id',
   *   quantity: 10,
   * });
   *
   * const newAdjustment = response.data;
   */
  async create<
    P extends StockAdjustmentsCreateParameter,
    EP extends ExtraParameter | undefined
  >(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<StockAdjustmentsResponse<"create", P, EP>>> {
    return this.axios.post<StockAdjustmentsResponse<"create", P, EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default StockAdjustments;
