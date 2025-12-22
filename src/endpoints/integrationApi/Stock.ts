/**
 * @fileoverview Client for managing stock levels in the Sharetribe Integration API.
 *
 * The Stock API provides atomic `compareAndSet` operations to safely update listing stock
 * in concurrent environments (e.g. during checkout or inventory sync).
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#stock
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {ExtraParameter, StockCompareAndSetParameter, StockResponse,} from "../../types";

/**
 * Stock API client (privileged)
 */
class Stock {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/stock`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Atomically update stock using compare-and-set
   *
   * Fails if current stock doesn't match `oldTotal` — prevents race conditions.
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