/**
 * @fileoverview Provides the IntegrationApi class for accessing various endpoints of the Sharetribe Integration API.
 * This class acts as a gateway to multiple sub-APIs, including availability exceptions, events, images, listings, stock, transactions, and users.
 */
import { AxiosInstance } from "axios";
import IntegrationSdk from "../../integrationSdk";
import AvailabilityExceptions from "./AvailabilityExceptions";
import Events from "./Events";
import Images from "./Images";
import Listings from "./Listings";
import Marketplace from "./Marketplace";
import Stock from "./Stock";
import StockAdjustments from "./StockAdjustments";
import StockReservation from "./StockReservation";
import Transactions from "./Transactions";
import Users from "./Users";
/**
 * Class representing the Sharetribe Integration API.
 *
 * This class provides access to various sub-APIs for managing marketplace resources such as availability exceptions,
 * events, images, listings, stock, transactions, and users.
 *
 * @example
 * const sdk = new IntegrationSdk(sdkConfig);
 * const integrationApi = new IntegrationApi(sdk);
 *
 * // Example: Query availability exceptions
 * const response = await integrationApi.availabilityExceptions.query({
 *   resource_id: 'resource-id',
 *   start: '2024-12-01T00:00:00Z',
 *   end: '2024-12-31T23:59:59Z'
 * });
 *
 * const exceptions = response.data;
 */
declare class IntegrationApi {
    axios: AxiosInstance;
    endpoint: string;
    headers: Record<string, string>;
    authRequired: boolean;
    availabilityExceptions: AvailabilityExceptions;
    events: Events;
    images: Images;
    listings: Listings;
    marketplace: Marketplace;
    stock: Stock;
    stockAdjustments: StockAdjustments;
    stockReservations: StockReservation;
    transactions: Transactions;
    users: Users;
    /**
     * Creates an instance of the IntegrationApi class.
     *
     * @param {IntegrationSdk} sdk - The Integration SDK instance providing configuration and request handling.
     */
    constructor(sdk: IntegrationSdk);
}
export default IntegrationApi;
