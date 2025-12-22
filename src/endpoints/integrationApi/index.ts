/**
 * @fileoverview Client for the Sharetribe Integration API.
 *
 * This is the main entry point for server-side or trusted integrations.
 * It provides access to all privileged endpoints: availability exceptions, events,
 * image uploads, stock management, transactions, users, and more.
 *
 * Requires a client secret for authentication.
 *
 * @example
 * const sdk = new IntegrationSdk({
 *   clientId: "abc123",
 *   clientSecret: "super-secret",
 *   baseUrl: "https://api.sharetribe.com"
 * });
 *
 * // Query recent events
 * const { data: events } = await sdk.integration.events.query({
 *   createdAtStart: "2025-01-01T00:00:00Z"
 * });
 */

import type {AxiosInstance} from "axios";
import IntegrationSdk from "../../integrationSdk";

import AvailabilityExceptions from "./AvailabilityExceptions";
import Events from "./Events";
import Images from "./Images";
import Listings from "./Listings";
import Marketplace from "./Marketplace";
import Stock from "./Stock";
import StockAdjustments from "./StockAdjustments";
import StockReservations from "./StockReservations";
import Transactions from "./Transactions";
import Users from "./Users";

/**
 * Integration API client
 */
class IntegrationApi {
  /** Axios instance with auth headers */
  readonly axios: AxiosInstance;

  /** Base URL for all Integration API endpoints */
  readonly endpoint: string;

  /** Default headers (includes Authorization) */
  readonly headers: Record<string, string>;

  /** Most endpoints require authentication */
  readonly authRequired = true;

  // Sub-clients
  readonly availabilityExceptions: AvailabilityExceptions;
  readonly events: Events;
  readonly images: Images;
  readonly listings: Listings;
  readonly marketplace: Marketplace;
  readonly stock: Stock;
  readonly stockAdjustments: StockAdjustments;
  readonly stockReservations: StockReservations;
  readonly transactions: Transactions;
  readonly users: Users;

  constructor(sdk: IntegrationSdk) {
    const config = sdk.apisConfigs.integrationApi(sdk.sdkConfig);

    this.axios = sdk.axios;
    this.endpoint = config.baseUrl;
    this.headers = config.headers;

    // Initialize all sub-APIs
    this.availabilityExceptions = new AvailabilityExceptions(this);
    this.events = new Events(this);
    this.images = new Images(this);
    this.listings = new Listings(this);
    this.marketplace = new Marketplace(this);
    this.stock = new Stock(this);
    this.stockAdjustments = new StockAdjustments(this);
    this.stockReservations = new StockReservations(this);
    this.transactions = new Transactions(this);
    this.users = new Users(this);
  }
}

export default IntegrationApi;