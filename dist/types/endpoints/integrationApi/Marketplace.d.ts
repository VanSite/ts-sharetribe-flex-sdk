/**
 * @fileoverview Provides the Marketplace class for interacting with the Sharetribe Integration API.
 * This class allows fetching details about the marketplace configuration.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#marketplace
 */
import { AxiosResponse } from "axios";
import IntegrationApi from "./index";
import { MarketplaceResponse } from "../../types/marketplace/marketplace";
/**
 * Class representing the Marketplace API.
 *
 * The Marketplace API provides methods to retrieve marketplace configuration details.
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
    constructor(api: IntegrationApi);
    /**
     * Retrieves details about the marketplace configuration.
     *
     * @returns {Promise<AxiosResponse<MarketplaceResponse<'show'>>>} - A promise resolving to the marketplace details.
     *
     * @example
     * const response = await integrationSdk.marketplace.show();
     *
     * const marketplaceDetails = response.data;
     */
    show(): Promise<AxiosResponse<MarketplaceResponse<"show">>>;
}
export default Marketplace;
//# sourceMappingURL=Marketplace.d.ts.map