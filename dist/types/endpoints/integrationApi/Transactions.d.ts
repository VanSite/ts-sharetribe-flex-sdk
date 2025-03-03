/**
 * @fileoverview Provides the Transactions class for managing transactions in the Sharetribe Integration API.
 * This class allows querying, transitioning, and updating metadata for transactions.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#transactions
 */
import { AxiosResponse } from 'axios';
import IntegrationApi from './index';
import { TransactionsQueryParameter, TransactionsResponse, TransactionsShowParameter, TransactionsTransitionParameter, TransactionsTransitionSpeculativeParameter, TransactionsUpdateMetadataParameter } from '../../types/marketplace/transaction';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Transactions API.
 *
 * The Transactions API provides methods to query, transition, and manage metadata for marketplace transactions.
 */
declare class Transactions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the Transactions class.
     *
     * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
     */
    constructor(api: IntegrationApi);
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
    show<P extends TransactionsShowParameter>(params: P): Promise<AxiosResponse<TransactionsResponse<'show', P>>>;
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
    query<P extends TransactionsQueryParameter<true>>(params: P): Promise<AxiosResponse<TransactionsResponse<'query', P>>>;
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
    transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<AxiosResponse<TransactionsResponse<'transition', P, EP>>>;
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
    transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<AxiosResponse<TransactionsResponse<'transitionSpeculative', P, EP>>>;
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
    updateMetadata<P extends TransactionsUpdateMetadataParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<AxiosResponse<TransactionsResponse<'updateMetadata', P, EP>>>;
}
export default Transactions;
