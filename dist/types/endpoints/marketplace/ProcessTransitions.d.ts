/**
 * @fileoverview Provides the ProcessTransitions class for managing process transitions in the Sharetribe Marketplace API.
 * This class includes a method for querying process transitions.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#process-transitions
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { ProcessTransitionsQueryParameter, ProcessTransitionsResponse } from '../../types/marketplace/processTransitions';
/**
 * Class representing the Process Transitions API.
 *
 * The Process Transitions API provides methods for querying transitions within processes.
 */
declare class ProcessTransitions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the ProcessTransitions class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Queries process transitions based on specified filters.
     *
     * @template P
     * @param {P & ProcessTransitionsQueryParameter} params - Query parameters for filtering transitions.
     * @returns {Promise<AxiosResponse<ProcessTransitionsResponse<'query'>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.processTransitions.query({
     *   processAlias: 'booking-process',
     * });
     * const transitions = response.data;
     */
    query<P extends ProcessTransitionsQueryParameter>(params: P): Promise<AxiosResponse<ProcessTransitionsResponse<'query'>>>;
}
export default ProcessTransitions;
