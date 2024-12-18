/**
 * @fileoverview Provides the Stock class for managing stock levels in the Sharetribe Marketplace API.
 * This class includes methods for comparing and setting stock levels.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stock
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { StockCompareAndSetParameter, StockResponse } from '../../types/marketplace/stock';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stock API.
 *
 * The Stock API provides methods for comparing and setting stock levels for marketplace resources.
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
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stock';
    this.axios = api.axios;
  }

  /**
   * Compares and sets stock levels for a specific resource.
   *
   * @template P
   * @template EP
   * @param {P & StockCompareAndSetParameter} params - Parameters for comparing and setting stock levels.
   * @param {EP} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StockResponse<'compareAndSet', EP>>>} - A promise resolving to the result of the stock comparison and update.
   *
   * @example
   * const response = await sdk.stock.compareAndSet({
   *   listingId: 'listing-1',
   *   oldTotal: 10,
   *   newTotal: 100
   * });
   * const stockUpdateResult = response.data;
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
