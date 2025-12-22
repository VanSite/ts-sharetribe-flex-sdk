/**
 * @fileoverview Client for managing stock adjustments in the Sharetribe Integration API.
 *
 * Stock adjustments are manual changes to listing stock (e.g. restocking, corrections, damage write-offs).
 * They appear in the stock history and are separate from automatic reservation-based changes.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#stock-adjustments
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {
  ExtraParameter,
  StockAdjustmentsCreateParameter,
  StockAdjustmentsQueryParameter,
  StockAdjustmentsResponse,
} from "../../types";

/**
 * Stock Adjustments API client (privileged)
 */
class StockAdjustments {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/stock_adjustments`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query stock adjustment history
   *
   * @template P
   * @param {P & StockAdjustmentsQueryParameter} params
   * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.stockAdjustments.query({
   *   listingId: "listing-abc123",
   *   start: "2025-01-01",
   *   end: "2025-01-31"
   * });
   */
  async query<P extends StockAdjustmentsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<StockAdjustmentsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Create a manual stock adjustment
   *
   * Positive `quantity` = add stock
   * Negative `quantity` = remove stock
   *
   * @template P
   * @template EP
   * @param {P & StockAdjustmentsCreateParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<"create", P, EP>>>}
   *
   * @example
   * // Restock 50 units
   * await sdk.stockAdjustments.create({
   *   listingId: "listing-abc123",
   *   quantity: 50
   * });
   *
   * @example
   * // Write off 3 damaged units
   * await sdk.stockAdjustments.create({
   *   listingId: "listing-abc123",
   *   quantity: -3
   * });
   */
  async create<
    P extends StockAdjustmentsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StockAdjustmentsResponse<"create", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StockAdjustments;