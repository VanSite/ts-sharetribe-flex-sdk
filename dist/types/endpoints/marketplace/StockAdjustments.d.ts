/**
 * @fileoverview Provides the StockAdjustments class for managing stock adjustments in the Sharetribe Marketplace API.
 * This class includes methods for querying and creating stock adjustments.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stock-adjustments
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { StockAdjustmentsCreateParameter, StockAdjustmentsQueryParameter, StockAdjustmentsResponse } from '../../types/marketplace/stockAdjustment';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Stock Adjustments API.
 *
 * The Stock Adjustments API provides methods for querying and creating adjustments to stock levels.
 */
declare class StockAdjustments {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the StockAdjustments class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Queries stock adjustments based on specified filters.
     *
     * @template P
     * @param {P & StockAdjustmentsQueryParameter} params - Query parameters to filter stock adjustments.
     * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<'query', P>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.stockAdjustments.query({
     *   listingId: 'listing-id',
     *   start: new Date('2022-01-01'),
     *   end: new Date('2022-01-31'),
     * });
     * const stockAdjustments = response.data;
     */
    query<P extends StockAdjustmentsQueryParameter>(params: P): Promise<AxiosResponse<StockAdjustmentsResponse<'query', P>>>;
    /**
     * Creates a stock adjustment for a specific resource.
     *
     * @template P
     * @template EP
     * @param {P & StockAdjustmentsCreateParameter} params - Parameters for the stock adjustment.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<StockAdjustmentsResponse<'create', P, EP>>>} - A promise resolving to the created stock adjustment details.
     *
     * @example
     * const response = await sdk.stockAdjustments.create({
     *   listingId: 'listing-id',
     *   quantity: 5,
     * });
     * const createdAdjustment = response.data;
     */
    create<P extends StockAdjustmentsCreateParameter, EP extends ExtraParameter | undefined>(params: P, extraParams?: EP): Promise<AxiosResponse<StockAdjustmentsResponse<'create', P, EP>>>;
}
export default StockAdjustments;
