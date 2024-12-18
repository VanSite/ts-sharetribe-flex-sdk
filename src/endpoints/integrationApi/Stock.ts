/**
 * @fileoverview Provides the Stock class for managing stock levels in the Sharetribe Integration API.
 * This class allows performing operations on stock, such as compare-and-set updates.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#stock
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import IntegrationApi from './index';
import { StockCompareAndSetParameter, StockResponse } from '../../types/marketplace/stock';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stock API.
 *
 * The Stock API provides methods to manage stock levels for marketplace resources.
 */
class Stock {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  public readonly authRequired = true;

  /**
   * Creates an instance of the Stock class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + '/stock';
    this.axios = api.axios;
  }

  /**
   * Updates stock levels using a compare-and-set operation.
   *
   * @template P
   * @template EP
   * @param {P & StockCompareAndSetParameter} params - Parameters specifying the stock to compare and set.
   * @param {EP & ExtraParameter} extraParams - Optional additional parameters for the request.
   * @returns {Promise<AxiosResponse<StockResponse<'compareAndSet', EP>>>} - A promise resolving to the stock update response.
   *
   * @example
   * const response = await integrationSdk.stock.compareAndSet({
   *   listingId: 'listing-id',
   *   oldTotal: 5,
   *   newTotal: 10,
   * });
   *
   * const updatedStock = response.data;
   */
  async compareAndSet<P extends StockCompareAndSetParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<StockResponse<'compareAndSet', EP>>> {
    return this.axios.post<StockResponse<'compareAndSet', EP>>(
      `${this.endpoint}/compare_and_set`,
      { ...params, ...extraParams }
    );
  }
}

export default Stock;
