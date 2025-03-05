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
class IntegrationApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;
  authRequired: boolean;

  // API Endpoints
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
  constructor(sdk: IntegrationSdk) {
    const config = sdk.apisConfigs.integrationApi(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = config.headers;
    this.axios = sdk.axios;
    this.authRequired = false;

    this.availabilityExceptions = new AvailabilityExceptions(this);
    this.events = new Events(this);
    this.images = new Images(this);
    this.listings = new Listings(this);
    this.marketplace = new Marketplace(this);
    this.stock = new Stock(this);
    this.stockAdjustments = new StockAdjustments(this);
    this.stockReservations = new StockReservation(this);
    this.transactions = new Transactions(this);
    this.users = new Users(this);
  }
}

export default IntegrationApi;
