import {ApiConfigs, SdkConfig} from "./types";
import type {HttpClient} from "./types";
import {createHttpClient} from "./utils/http-client";
import IntegrationApi from "./endpoints/integrationApi";
import {createApisConfigs} from "./utils/apis";
import {createHttpConfig, prepareHttpClient,} from "./utils/prepare-http-client";
import AuthenticationApi from "./endpoints/auth";
import AvailabilityExceptions from "./endpoints/integrationApi/AvailabilityExceptions";
import Events from "./endpoints/integrationApi/Events";
import FileAttachments from "./endpoints/integrationApi/FileAttachments";
import Files from "./endpoints/integrationApi/Files";
import Images from "./endpoints/integrationApi/Images";
import Listings from "./endpoints/integrationApi/Listings";
import Marketplace from "./endpoints/integrationApi/Marketplace";
import Messages from "./endpoints/integrationApi/Messages";
import Stock from "./endpoints/integrationApi/Stock";
import StockAdjustments from "./endpoints/integrationApi/StockAdjustments";
import StockReservations from "./endpoints/integrationApi/StockReservations";
import Transactions from "./endpoints/integrationApi/Transactions";
import Users from "./endpoints/integrationApi/Users";
import {DefaultIntegrationSdkConfig} from "./utils/config";

/**
 * The main Sharetribe Integration SDK for interacting with the Sharetribe Integration API.
 *
 * @class
 */
class IntegrationSdk {
  /**
   * Discriminator used instead of `instanceof` checks in the shared HTTP
   * layer — see the note on SharetribeSdk._sdkType.
   */
  readonly _sdkType = "integration" as const;

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
   * Fetch-based HTTP client used for making API requests.
   *
   * @type {HttpClient}
   */
  httpClient: HttpClient;

  /**
   * @deprecated Use `httpClient` instead. Alias kept for 3.x compatibility.
   */
  get axios(): HttpClient {
    return this.httpClient;
  }

  // Endpoints
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

  // API Endpoints
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
   * Endpoint for querying file attachments.
   *
   * @type {FileAttachments}
   */
  fileAttachments: FileAttachments;

  /**
   * Endpoint for querying files.
   *
   * @type {Files}
   */
  files: Files;

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
   * Endpoint for querying messages.
   *
   * @type {Messages}
   */
  messages: Messages;

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
   * @type {StockReservations}
   */
  stockReservations: StockReservations;

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
  constructor(config: SdkConfig) {
    this.sdkConfig = {
      ...DefaultIntegrationSdkConfig,
      ...config,
    };

    this.apisConfigs = createApisConfigs(true);
    this.httpClient = createHttpClient(
      createHttpConfig(this, {
        baseURL: `${this.sdkConfig.baseUrl}/${this.sdkConfig.version}/`,
      })
    );
    prepareHttpClient(this);

    this.auth = new AuthenticationApi(this);
    this.integration_api = new IntegrationApi(this);

    // Api Endpoints
    this.availabilityExceptions = this.integration_api.availabilityExceptions;
    this.events = this.integration_api.events;
    this.fileAttachments = this.integration_api.fileAttachments;
    this.files = this.integration_api.files;
    this.images = this.integration_api.images;
    this.listings = this.integration_api.listings;
    this.marketplace = this.integration_api.marketplace;
    this.messages = this.integration_api.messages;
    this.stock = this.integration_api.stock;
    this.stockAdjustments = this.integration_api.stockAdjustments;
    this.stockReservations = this.integration_api.stockReservations;
    this.transactions = this.integration_api.transactions;
    this.users = this.integration_api.users;
  }
}

export default IntegrationSdk;
