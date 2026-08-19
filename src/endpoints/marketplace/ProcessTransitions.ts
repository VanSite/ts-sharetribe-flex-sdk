/**
 * @fileoverview Client for querying process transitions in the Sharetribe Marketplace API.
 *
 * Process transitions define the state machine of a transaction process (e.g. booking, sale).
 * Use this endpoint to inspect available transitions and their parameters.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#process-transitions
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {ProcessTransitionsQueryParameter, ProcessTransitionsResponse,} from "../../types";

/**
 * Process Transitions API client
 */
class ProcessTransitions {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/process_transitions`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query available process transitions
   *
   * @template P
   * @param {P & ProcessTransitionsQueryParameter} params
   * @returns {Promise<HttpResponse<ProcessTransitionsResponse<"query">>>}
   *
   * @example
   * // Fetch all transitions for the default booking process
   * const { data } = await sdk.processTransitions.query({
   *   processAlias: "default-booking"
   * });
   *
   * @example
   * // Inspect a specific transition
   * await sdk.processTransitions.query({
   *   lastTransition: "transition/confirm-payment"
   * });
   */
  async query<P extends ProcessTransitionsQueryParameter>(
    params: P
  ): Promise<HttpResponse<ProcessTransitionsResponse<"query">>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default ProcessTransitions;