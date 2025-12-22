/**
 * @fileoverview Client for managing transactions in the Sharetribe Integration API.
 *
 * This privileged API allows querying, transitioning, and updating metadata for transactions.
 * Use it for admin tools, backend services, or automated workflows.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#transactions
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {
  ExtraParameter,
  TransactionsQueryParameter,
  TransactionsResponse,
  TransactionsShowParameter,
  TransactionsTransitionParameter,
  TransactionsTransitionSpeculativeParameter,
  TransactionsUpdateMetadataParameter,
} from "../../types";

/**
 * Transactions API client (privileged)
 */
class Transactions {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/transactions`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a single transaction by ID
   *
   * @template P
   * @param {P & TransactionsShowParameter} params
   * @returns {Promise<AxiosResponse<TransactionsResponse<"show", P>>>}
   */
  async show<P extends TransactionsShowParameter>(
    params: P
  ): Promise<AxiosResponse<TransactionsResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Query transactions with privileged filters
   *
   * @template P
   * @param {P & TransactionsQueryParameter<true>} params - Note: `true` enables privileged fields like `customerId`, `providerId`
   * @returns {Promise<AxiosResponse<TransactionsResponse<"query", P>>>}
   */
  async query<P extends TransactionsQueryParameter<true>>(
    params: P
  ): Promise<AxiosResponse<TransactionsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Transition a transaction to a new state
   *
   * @template P
   * @template EP
   * @param {P & TransactionsTransitionParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<TransactionsResponse<"transition", P, EP>>>}
   *
   * @example
   * await sdk.transactions.transition({
   *   id: "tx-abc123",
   *   transition: "transition/confirm-payment"
   * });
   */
  async transition<
    P extends TransactionsTransitionParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<TransactionsResponse<"transition", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/transition`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Perform a speculative transition (dry-run)
   *
   * Does not persist changes — useful for validation before real transition.
   *
   * @template P
   * @template EP
   * @param {P & TransactionsTransitionSpeculativeParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<TransactionsResponse<"transitionSpeculative", P, EP>>>}
   */
  async transitionSpeculative<
    P extends TransactionsTransitionSpeculativeParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<TransactionsResponse<"transitionSpeculative", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/transition_speculative`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update transaction metadata
   *
   * @template P
   * @template EP
   * @param {P & TransactionsUpdateMetadataParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<TransactionsResponse<"updateMetadata", P, EP>>>}
   */
  async updateMetadata<
    P extends TransactionsUpdateMetadataParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<TransactionsResponse<"updateMetadata", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/update_metadata`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Transactions;