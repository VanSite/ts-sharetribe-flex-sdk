/**
 * @fileoverview Client for the Sharetribe Marketplace API.
 *
 * This is the main entry point for client-side applications.
 * Provides access to all public and authenticated endpoints:
 * - Listings, bookings, messages, reviews
 * - Current user management (signup, profile, password)
 * - Image uploads, Stripe payments
 * - Availability & stock queries
 *
 * Use `sdk.marketplace` for all frontend or authenticated user flows.
 *
 * @example
 * const sdk = new SharetribeSdk({ clientId: "abc123" });
 *
 * // Fetch current user
 * const { data: user } = await sdk.marketplace.currentUser.show();
 *
 * // Query public listings
 * const { data: listings } = await sdk.marketplace.listings.query({ perPage: 20 });
 */

import type {AxiosInstance} from "axios";
import SharetribeSdk from "../../sdk";

import AvailabilityExceptions from "./AvailabilityExceptions";
import Bookings from "./Bookings";
import CurrentUser from "./CurrentUser";
import Images from "./Images";
import Listings from "./Listings";
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
 * Marketplace API client
 */
class MarketplaceApi {
  /** Axios instance with auth & base config */
  readonly axios: AxiosInstance;

  /** Base URL for all Marketplace API endpoints */
  readonly endpoint: string;

  /** Default headers (includes Authorization when logged in) */
  readonly headers: Record<string, string>;

  /** Most endpoints require authentication */
  readonly authRequired = true;

  // Public & authenticated sub-clients
  readonly availabilityExceptions: AvailabilityExceptions;
  readonly bookings: Bookings;
  readonly currentUser: CurrentUser;
  readonly images: Images;
  readonly listings: Listings;
  readonly marketplace: Marketplace;
  readonly messages: Messages;
  readonly ownListings: OwnListings;
  readonly passwordReset: PasswordReset;
  readonly processTransitions: ProcessTransitions;
  readonly reviews: Reviews;
  readonly stock: Stock;
  readonly stockAdjustments: StockAdjustments;
  readonly stripeAccount: StripeAccount;
  readonly stripeAccountLinks: StripeAccountLinks;
  readonly stripeCustomer: StripeCustomer;
  readonly stripePersons: StripePersons;
  readonly stripeSetupIntents: StripeSetupIntents;
  readonly timeslots: TimeSlots;
  readonly transactions: Transactions;
  readonly users: Users;

  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.api(sdk.sdkConfig);

    this.axios = sdk.axios;
    this.endpoint = config.baseUrl;
    this.headers = config.headers;

    // Initialize all sub-APIs
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