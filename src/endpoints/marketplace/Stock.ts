/**
 * @fileoverview Client for managing listing stock in the Sharetribe Marketplace API.
 *
 * Use this to safely update stock levels using atomic compare-and-set operations.
 * Prevents race conditions when multiple users try to book simultaneously.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stock
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ExtraParameter, StockCompareAndSetParameter, StockResponse,} from "../../types";

/**
 * Stock API client (own listings only)
 */
class Stock {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stock`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Atomically update stock using compare-and-set
   *
   * Fails if current stock doesn't match `oldTotal` — prevents overselling.
   *
   * @template P
   * @template EP
   * @param {P & StockCompareAndSetParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<StockResponse<"compareAndSet", EP>>>}
   *
   * @example
   * // Reserve 2 units if current stock is 10
   * await sdk.stock.compareAndSet({
   *   listingId: "listing-abc123",
   *   oldTotal: 10,
   *   newTotal: 8
   * });
   *
   * @example
   * // Restock from 5 to 50
   * await sdk.stock.compareAndSet({
   *   listingId: "listing-abc123",
   *   oldTotal: 5,
   *   newTotal: 50
   * });
   */
  async compareAndSet<
    P extends StockCompareAndSetParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StockResponse<"compareAndSet", EP>>> {
    return this.axios.post(
      `${this.endpoint}/compare_and_set`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Stock;