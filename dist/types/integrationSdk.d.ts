import { SdkConfig } from "./types/config";
import { AxiosInstance } from "axios";
import { ApiConfigs } from "./types/apiConfigs";
import IntegrationApi from "./endpoints/integrationApi";
import AuthenticationApi from "./endpoints/auth";
import AvailabilityExceptions from "./endpoints/integrationApi/AvailabilityExceptions";
import Events from "./endpoints/integrationApi/Events";
import Images from "./endpoints/integrationApi/Images";
import Listings from "./endpoints/integrationApi/Listings";
import Marketplace from "./endpoints/integrationApi/Marketplace";
import Stock from "./endpoints/integrationApi/Stock";
import StockAdjustments from "./endpoints/integrationApi/StockAdjustments";
import StockReservation from "./endpoints/integrationApi/StockReservation";
import Transactions from "./endpoints/integrationApi/Transactions";
import Users from "./endpoints/integrationApi/Users";
/**
 * The main Sharetribe Integration SDK for interacting with the Sharetribe Integration API.
 *
 * @class
 */
declare class IntegrationSdk {
    /**
     * Configuration for the SDK.
     *
     * @type {SdkConfig}
     */
    sdkConfig: SdkConfig;
    /**
     * Configuration for the API endpoints.
     *
     * @type {ApiConfigs<true>}
     */
    apisConfigs: ApiConfigs<true>;
    /**
     * Axios instance used for making API requests.
     *
     * @type {AxiosInstance}
     */
    axios: AxiosInstance;
    /**
     * Endpoint for handling authentication.
     *
     * @type {AuthenticationApi}
     */
    auth: AuthenticationApi;
    /**
     * Main integration API.
     *
     * @type {IntegrationApi}
     */
    integration_api: IntegrationApi;
    /**
     * Endpoint for managing availability exceptions.
     *
     * @type {AvailabilityExceptions}
     */
    availabilityExceptions: AvailabilityExceptions;
    /**
     * Endpoint for retrieving and managing events.
     *
     * @type {Events}
     */
    events: Events;
    /**
     * Endpoint for handling image-related operations.
     *
     * @type {Images}
     */
    images: Images;
    /**
     * Endpoint for managing listings.
     *
     * @type {Listings}
     */
    listings: Listings;
    /**
     * Endpoint for accessing marketplace details.
     *
     * @type {Marketplace}
     */
    marketplace: Marketplace;
    /**
     * Endpoint for managing stock.
     *
     * @type {Stock}
     */
    stock: Stock;
    /**
     * Endpoint for handling stock adjustments.
     *
     * @type {StockAdjustments}
     */
    stockAdjustments: StockAdjustments;
    /**
     * Endpoint for managing stock reservations.
     *
     * @type {StockReservation}
     */
    stockReservations: StockReservation;
    /**
     * Endpoint for managing transactions.
     *
     * @type {Transactions}
     */
    transactions: Transactions;
    /**
     * Endpoint for managing user data.
     *
     * @type {Users}
     */
    users: Users;
    /**
     * Initializes a new instance of the SharetribeIntegrationSdk class.
     *
     * @constructor
     * @param {SdkConfig} config - The configuration object for the SDK.
     */
    constructor(config: SdkConfig);
}
export default IntegrationSdk;
//# sourceMappingURL=integrationSdk.d.ts.map