/**
 * @fileoverview Provides the Transactions class for managing transactions in the Sharetribe Marketplace API.
 * This class includes methods for querying, initiating, transitioning, and managing transactions.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#transactions
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { TransactionsInitiateParameter, TransactionsInitiateSpeculativeParameter, TransactionsQueryParameter, TransactionsResponse, TransactionsShowParameter, TransactionsTransitionParameter, TransactionsTransitionSpeculativeParameter } from '../../types/marketplace/transaction';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Transactions API.
 *
 * The Transactions API provides methods for managing marketplace transactions, including querying, initiating, and transitioning them.
 */
declare class Transactions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the Transactions class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Retrieves details of a specific transaction.
     *
     * @template P
     * @param {P & TransactionsShowParameter} params - Parameters to identify the transaction.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'show', P>>>} - A promise resolving to the transaction details.
     *
     * @example
     * const response = await sdk.transactions.show({ id: 'transaction-id' });
     * const transactionDetails = response.data;
     */
    show<P extends TransactionsShowParameter>(params: P): Promise<AxiosResponse<TransactionsResponse<'show', P>>>;
    /**
     * Queries transactions based on specified filters.
     *
     * @template P
     * @param {P & TransactionsQueryParameter} params - Query parameters for filtering transactions.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'query', P>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.transactions.query({ perPage: 10 });
     * const transactions = response.data;
     */
    query<P extends TransactionsQueryParameter>(params: P): Promise<AxiosResponse<TransactionsResponse<'query', P>>>;
    /**
     * Initiates a new transaction.
     *
     * @template P
     * @template EP
     * @param {P & TransactionsInitiateParameter} params - Parameters for initiating the transaction.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'initiate', P, EP>>>} - A promise resolving to the initiated transaction details.
     *
     * @example
     * const response = await sdk.transactions.initiate({
     *   processAlias: 'order',
     *   transition: 'start',
     *   params: {}
     * });
     * const initiatedTransaction = response.data;
     */
    initiate<P extends TransactionsInitiateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<TransactionsResponse<'initiate', P, EP>>>;
    /**
     * Initiates a speculative transaction.
     *
     * @template P
     * @template EP
     * @param {P & TransactionsInitiateSpeculativeParameter} params - Parameters for the speculative transaction initiation.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'initiateSpeculative', P, EP>>>} - A promise resolving to the speculative transaction details.
     *
     * @example
     * const response = await sdk.transactions.initiateSpeculative({
     *   processAlias: 'order',
     *   transition: 'start',
     *   params: {}
     * });
     * const speculativeTransaction = response.data;
     */
    initiateSpeculative<P extends TransactionsInitiateSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<TransactionsResponse<'initiateSpeculative', P, EP>>>;
    /**
     * Transitions an existing transaction.
     *
     * @template P
     * @template EP
     * @param {P & TransactionsTransitionParameter} params - Parameters for transitioning the transaction.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'transition', P, EP>>>} - A promise resolving to the transitioned transaction details.
     *
     * @example
     * const response = await sdk.transactions.transition({
     *   id: 'transaction-id',
     *   transition: 'complete',
     *   params: { review: 5 }
     * });
     * const transitionedTransaction = response.data;
     */
    transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<TransactionsResponse<'transition', P, EP>>>;
    /**
     * Transitions a speculative transaction.
     *
     * @template P
     * @template EP
     * @param {P & TransactionsTransitionSpeculativeParameter} params - Parameters for the speculative transaction transition.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<TransactionsResponse<'transitionSpeculative', P, EP>>>} - A promise resolving to the speculative transitioned transaction details.
     *
     * @example
     * const response = await sdk.transactions.transitionSpeculative({
     *   id: 'transaction-id',
     *   transition: 'complete',
     *   params: { review: 5 }
     * });
     * const speculativeTransitionedTransaction = response.data;
     */
    transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<TransactionsResponse<'transitionSpeculative', P, EP>>>;
}
export default Transactions;
