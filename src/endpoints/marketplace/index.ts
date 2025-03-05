/**
 * @fileoverview Provides the MarketplaceApi class for accessing all available endpoints in the Sharetribe Marketplace API.
 * This class serves as the entry point for interacting with various resources such as listings, bookings, users, and payments.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html
 */

import SharetribeSdk from "../../sdk";
import { AxiosInstance } from "axios";
import AvailabilityExceptions from "./AvailabilityExceptions";
import Listings from "./Listings";
import Bookings from "./Bookings";
import CurrentUser from "./CurrentUser";
import Images from "./Images";
import Marketplace from "./Marketplace";
import Messages from "./Messages";
import OwnListings from "./OwnListings";
import PasswordReset from "./PasswordReset";
import ProcessTransitions from "./ProcessTransitions";
import Reviews from "./Reviews";
import Stock from "./Stock";
import StockAdjustments from "./StockAdjustments";
import StripeAccount from "./StripeAccount";
import StripeAccountLinks from "./StripeAccountLinks";
import StripeCustomer from "./StripeCustomer";
import StripePersons from "./StripePersons";
import StripeSetupIntents from "./StripeSetupIntents";
import TimeSlots from "./TimeSlots";
import Transactions from "./Transactions";
import Users from "./Users";

/**
 * Class representing the Sharetribe Marketplace API.
 *
 * This class provides access to all available endpoints in the Sharetribe Marketplace API, enabling operations such as managing listings,
 * handling transactions, updating user profiles, and integrating with Stripe.
 */
class MarketplaceApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;
  authRequired: boolean;

  // API Endpoints
  availabilityExceptions: AvailabilityExceptions;
  bookings: Bookings;
  currentUser: CurrentUser;
  images: Images;
  listings: Listings;
  marketplace: Marketplace;
  messages: Messages;
  ownListings: OwnListings;
  passwordReset: PasswordReset;
  processTransitions: ProcessTransitions;
  reviews: Reviews;
  stock: Stock;
  stockAdjustments: StockAdjustments;
  stripeAccount: StripeAccount;
  stripeAccountLinks: StripeAccountLinks;
  stripeCustomer: StripeCustomer;
  stripePersons: StripePersons;
  stripeSetupIntents: StripeSetupIntents;
  timeslots: TimeSlots;
  transactions: Transactions;
  users: Users;

  /**
   * Creates an instance of the MarketplaceApi class.
   *
   * @param {SharetribeSdk} sdk - The Sharetribe SDK instance providing configuration and request handling.
   */
  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.api(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = config.headers;
    this.axios = sdk.axios;
    this.authRequired = false;

    // Initialize all API endpoints
    this.availabilityExceptions = new AvailabilityExceptions(this);
    this.bookings = new Bookings(this);
    this.currentUser = new CurrentUser(this);
    this.images = new Images(this);
    this.listings = new Listings(this);
    this.marketplace = new Marketplace(this);
    this.messages = new Messages(this);
    this.ownListings = new OwnListings(this);
    this.passwordReset = new PasswordReset(this);
    this.processTransitions = new ProcessTransitions(this);
    this.reviews = new Reviews(this);
    this.stock = new Stock(this);
    this.stockAdjustments = new StockAdjustments(this);
    this.stripeAccount = new StripeAccount(this);
    this.stripeAccountLinks = new StripeAccountLinks(this);
    this.stripeCustomer = new StripeCustomer(this);
    this.stripePersons = new StripePersons(this);
    this.stripeSetupIntents = new StripeSetupIntents(this);
    this.timeslots = new TimeSlots(this);
    this.transactions = new Transactions(this);
    this.users = new Users(this);
  }
}

export default MarketplaceApi;
