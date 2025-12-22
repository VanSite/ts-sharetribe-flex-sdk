/**
 * @fileoverview Client for managing transactions in the Sharetribe Marketplace API.
 *
 * Use this to:
 * - Query your own transactions
 * - Initiate new orders/inquiries
 * - Transition transactions (accept, complete, cancel, etc.)
 * - Perform speculative transitions (dry-run)
 *
 * All operations require authentication.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#transactions
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  TransactionsInitiateParameter,
  TransactionsInitiateSpeculativeParameter,
  TransactionsQueryParameter,
  TransactionsResponse,
  TransactionsShowParameter,
  TransactionsTransitionParameter,
  TransactionsTransitionSpeculativeParameter,
} from "../../types";

/**
 * Transactions API client (current user)
 */
class Transactions {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
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
   * Query your own transactions
   *
   * @template P
   * @param {P & TransactionsQueryParameter} params
   * @returns {Promise<AxiosResponse<TransactionsResponse<"query", P>>>}
   */
  async query<P extends TransactionsQueryParameter>(
    params?: P
  ): Promise<AxiosResponse<TransactionsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Initiate a new transaction (e.g. place an order)
   *
   * @template P
   * @template EP
   * @param {P & TransactionsInitiateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<TransactionsResponse<"initiate", P, EP>>>}
   */
  async initiate<
    P extends TransactionsInitiateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<TransactionsResponse<"initiate", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/initiate`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Initiate a transaction speculatively (dry-run)
   *
   * @template P
   * @template EP
   * @param {P & TransactionsInitiateSpeculativeParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<TransactionsResponse<"initiateSpeculative", P, EP>>>}
   */
  async initiateSpeculative<
    P extends TransactionsInitiateSpeculativeParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<TransactionsResponse<"initiateSpeculative", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/initiate_speculative`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Transition a transaction to a new state
   *
   * @template P
   * @template EP
   * @param {P & TransactionsTransitionParameter} params
   * @param {EP} [extraParams]
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
}

export default Transactions;