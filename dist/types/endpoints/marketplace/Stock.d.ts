/**
 * @fileoverview Provides the Stock class for managing stock levels in the Sharetribe Marketplace API.
 * This class includes methods for comparing and setting stock levels.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stock
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { StockCompareAndSetParameter, StockResponse } from "../../types/marketplace/stock";
import { ExtraParameter } from "../../types/sharetribe";
/**
 * Class representing the Stock API.
 *
 * The Stock API provides methods for comparing and setting stock levels for marketplace resources.
 */
declare class Stock {
    private readonly endpoint;
    private readonly axios;
    readonly authRequired = true;
    /**
     * Creates an instance of the Stock class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Compares and sets stock levels for a specific resource.
     *
     * @template P
     * @template EP
     * @param {P & StockCompareAndSetParameter} params - Parameters for comparing and setting stock levels.
     * @param {EP} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<StockResponse<'compareAndSet', EP>>>} - A promise resolving to the result of the stock comparison and update.
     *
     * @example
     * const response = await sdk.stock.compareAndSet({
     *   listingId: 'listing-1',
     *   oldTotal: 10,
     *   newTotal: 100
     * });
     * const stockUpdateResult = response.data;
     */
    compareAndSet<P extends StockCompareAndSetParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<AxiosResponse<StockResponse<"compareAndSet", EP>>>;
}
export default Stock;
//# sourceMappingURL=Stock.d.ts.map