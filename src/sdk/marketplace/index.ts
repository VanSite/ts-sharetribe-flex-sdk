import SharetribeSdk from '../index';
import { AxiosInstance, AxiosResponse } from 'axios';
import AvailabilityExceptions from './availabilityExceptions';
import Listings from './listings';
import Bookings from './bookings';
import CurrentUser from './currentUser';
import Images from './images';
import Marketplace from './marketplace';
import Messages from './messages';
import OwnListings from './ownListings';
import PasswordReset from './passwordReset';
import ProcessTransitions from './processTransitions';
import Reviews from './reviews';
import Stock from './stock';
import StockAdjustments from './stockAdjustments';
import StripeAccount from './stripeAccount';
import StripeAccountLinks from './stripeAccountLinks';
import StripeCustomer from './stripeCustomer';
import StripePersons from './stripePersons';
import StripeSetupIntents from './stripeSetupIntents';
import TimeSlots from './timeSlots';
import Transactions from './transactions';
import Users from './users';

class MarketplaceApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;

  // All marketplace API endpoints are available
  availabilityExceptions: AvailabilityExceptions;
  listings: Listings;
  bookings: Bookings;
  currentUser: CurrentUser;
  images: Images;
  marketplace: Marketplace;
  messages: Messages;
  ownListings: OwnListings;
  passwordReset: PasswordReset;
  processTransitions: ProcessTransitions;
  review: Reviews;
  stock: Stock;
  stockAdjustments: StockAdjustments;
  stripeAccount: StripeAccount;
  stripeAccountLinks: StripeAccountLinks;
  stripeCustomer: StripeCustomer;
  stripePersons: StripePersons;
  stripeSetupIntents: StripeSetupIntents;
  timeSlots: TimeSlots;
  transactions: Transactions;
  users: Users;

  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.api(sdk.sdkConfig);
    this.endpoint = config.baseUrl + '/api';
    this.headers = config.headers;
    this.axios = sdk.axios;

    this.availabilityExceptions = new AvailabilityExceptions(this)
    this.bookings = new Bookings(this)
    this.currentUser = new CurrentUser(this)
    this.images = new Images(this)
    this.listings = new Listings(this)
    this.marketplace = new Marketplace(this)
    this.messages = new Messages(this)
    this.ownListings = new OwnListings(this);
    this.passwordReset = new PasswordReset(this);
    this.processTransitions = new ProcessTransitions(this);
    this.review = new Reviews(this);
    this.stock = new Stock(this);
    this.stockAdjustments = new StockAdjustments(this);
    this.stripeAccount = new StripeAccount(this);
    this.stripeAccountLinks = new StripeAccountLinks(this);
    this.stripeCustomer = new StripeCustomer(this);
    this.stripePersons = new StripePersons(this);
    this.stripeSetupIntents = new StripeSetupIntents(this);
    this.timeSlots = new TimeSlots(this);
    this.transactions = new Transactions(this);
    this.users = new Users(this);
  }
}

export default MarketplaceApi;