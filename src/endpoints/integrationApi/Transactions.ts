/**
 * @fileoverview Provides the Transactions class for managing transactions in the Sharetribe Integration API.
 * This class allows querying, transitioning, and updating metadata for transactions.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#transactions
 */

import { AxiosInstance, AxiosResponse } from "axios";
import IntegrationApi from "./index";
import {
  TransactionsQueryParameter,
  TransactionsResponse,
  TransactionsShowParameter,
  TransactionsTransitionParameter,
  TransactionsTransitionSpeculativeParameter,
  TransactionsUpdateMetadataParameter,
} from "../../types/marketplace/transactions";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Transactions API.
 *
 * The Transactions API provides methods to query, transition, and manage metadata for marketplace transactions.
 */
class Transactions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the Transactions class.
   *
   * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/transactions";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details about a specific transaction.
   *
   * @template P
   * @param {P & TransactionsShowParameter} params - The parameters to identify the transaction.
   * @returns {Promise<AxiosResponse<TransactionsResponse<'show', P>>>} - A promise resolving to the transaction details.
   *
   * @example
   * const response = await integrationSdk.transactions.show({
   *   id: 'transaction-id',
   * });
   *
   * const transactionDetails = response.data;
   */
  async show<P extends TransactionsShowParameter>(
    params: P
  ): Promise<AxiosResponse<TransactionsResponse<"show", P>>> {
    return this.axios.get<TransactionsResponse<"show", P>>(
      `${this.endpoint}/show`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Queries transactions based on specified filters.
   *
   * @template P
   * @param {P & TransactionsQueryParameter<true>} params - Query parameters to filter transactions.
   * @returns {Promise<AxiosResponse<TransactionsResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await integrationSdk.transactions.query({
   *  createdAtStart: '2021-01-01T00:00:00Z',
   *  createdAtEnd: '2021-01-31T23:59:59Z',
   *  userId: 'user-id',
   *  customerId: 'customer-id',
   *  providerId: 'provider-id',
   *  listingId: 'listing-id',
   * });
   *
   * const transactions = response.data;
   */
  async query<P extends TransactionsQueryParameter<true>>(
    params: P
  ): Promise<AxiosResponse<TransactionsResponse<"query", P>>> {
    return this.axios.get<TransactionsResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Transitions a transaction to a new state.
   *
   * @template P
   * @template EP
   * @param {P & TransactionsTransitionParameter} params - Parameters specifying the transaction and the transition.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<TransactionsResponse<'transition', P, EP>>>} - A promise resolving to the transitioned transaction.
   *
   * @example
   * const response = await integrationSdk.transactions.transition({
   *   id: 'transaction-id',
   *   transition: 'accept',
   *   params: { key: 'value' },
   * });
   *
   * const updatedTransaction = response.data;
   */
  async transition<
    P extends TransactionsTransitionParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP | void
  ): Promise<AxiosResponse<TransactionsResponse<"transition", P, EP>>> {
    return this.axios.post<TransactionsResponse<"transition", P, EP>>(
      `${this.endpoint}/transition`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Transitions a transaction speculatively to a new state without persisting the transition.
   *
   * @template P
   * @template EP
   * @param {P & TransactionsTransitionSpeculativeParameter} params - Parameters specifying the speculative transition.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<TransactionsResponse<'transitionSpeculative', P, EP>>>} - A promise resolving to the speculative transition result.
   *
   * @example
   * const response = await integrationSdk.transactions.transitionSpeculative({
   *   id: 'transaction-id',
   *   transition: 'accept',
   *   params: { key: 'value' },
   * });
   *
   * const speculativeResult = response.data;
   */
  async transitionSpeculative<
    P extends TransactionsTransitionSpeculativeParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP | void
  ): Promise<
    AxiosResponse<TransactionsResponse<"transitionSpeculative", P, EP>>
  > {
    return this.axios.post<
      TransactionsResponse<"transitionSpeculative", P, EP>
    >(
      `${this.endpoint}/transition_speculative`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Updates metadata for a transaction.
   *
   * @template P
   * @template EP
   * @param {P & TransactionsUpdateMetadataParameter} params - Parameters specifying the transaction metadata to update.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<TransactionsResponse<'updateMetadata', P, EP>>>} - A promise resolving to the updated transaction metadata.
   *
   * @example
   * const response = await integrationSdk.transactions.updateMetadata({
   *   id: 'transaction-id',
   *   metadata: { key: 'value' },
   * });
   *
   * const updatedMetadata = response.data;
   */
  async updateMetadata<
    P extends TransactionsUpdateMetadataParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams: EP | void
  ): Promise<AxiosResponse<TransactionsResponse<"updateMetadata", P, EP>>> {
    return this.axios.post<TransactionsResponse<"updateMetadata", P, EP>>(
      `${this.endpoint}/update_metadata`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default Transactions;
