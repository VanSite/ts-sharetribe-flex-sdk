import {SdkConfig} from './types/config';
import axios, { AxiosInstance } from 'axios';
import {ApiConfigs} from "./types/apiConfigs";
import IntegrationApi from "./endpoints/integrationApi";
import {createApisConfigs} from "./utils/apis";
import prepareAxiosInstance from "./utils/prepare-axios-instance";
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
import {DefaultSdkConfig} from "./utils/config";

class SharetribeIntegrationSdk {
  sdkConfig: SdkConfig;
  apisConfigs: ApiConfigs;
  axios: AxiosInstance;

  // Endpoints
  auth: AuthenticationApi;
  integration_api: IntegrationApi;

  // Api Endpoints
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

  constructor(config: SdkConfig) {
    this.sdkConfig = {
      ...DefaultSdkConfig,
      ...config
    };

    this.apisConfigs = createApisConfigs();
    this.axios = axios.create({
      baseURL: `${this.sdkConfig.baseUrl}/${this.sdkConfig.version}/`,
    });
    prepareAxiosInstance(this);

    this.auth = new AuthenticationApi(this)
    this.integration_api = new IntegrationApi(this)

    // Api Endpoints
    this.availabilityExceptions = this.integration_api.availabilityExceptions
    this.events = this.integration_api.events
    this.images = this.integration_api.images
    this.listings = this.integration_api.listings
    this.marketplace = this.integration_api.marketplace
    this.stock = this.integration_api.stock
    this.stockAdjustments = this.integration_api.stockAdjustments
    this.stockReservations = this.integration_api.stockReservations
    this.transactions = this.integration_api.transactions
    this.users = this.integration_api.users
  }
}

export default SharetribeIntegrationSdk
