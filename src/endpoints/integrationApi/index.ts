import {AxiosInstance} from "axios";
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

class IntegrationApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;
  authRequired: boolean;

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

  constructor(sdk: IntegrationSdk) {
    const config = sdk.apisConfigs.api(sdk.sdkConfig);
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