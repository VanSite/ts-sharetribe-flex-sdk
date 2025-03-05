/**
 * @fileoverview Provides the Marketplace class for retrieving marketplace details from the Sharetribe Marketplace API.
 * This class allows accessing configuration and metadata about the marketplace.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#marketplace
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { MarketplaceResponse } from "../../types/marketplace/marketplace";
/**
 * Class representing the Marketplace API.
 *
 * The Marketplace API provides methods to retrieve configuration and metadata about the marketplace.
 */
declare class Marketplace {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Marketplace class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Retrieves the configuration and metadata of the marketplace.
     *
     * @returns {Promise<AxiosResponse<MarketplaceResponse<'show'>>>} - A promise resolving to the marketplace details.
     *
     * @example
     * const response = await sdk.marketplace.show();
     * const marketplaceDetails = response.data;
     */
    show(): Promise<AxiosResponse<MarketplaceResponse<"show">>>;
}
export default Marketplace;
//# sourceMappingURL=Marketplace.d.ts.map