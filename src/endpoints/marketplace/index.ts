import SharetribeSdk from '../../sdk';
import {AxiosInstance} from 'axios';
import AvailabilityExceptions from './AvailabilityExceptions';
import Listings from './Listings';
import Bookings from './Bookings';
import CurrentUser from './CurrentUser';
import Images from './Images';
import Marketplace from './Marketplace';
import Messages from './Messages';
import OwnListings from './OwnListings';
import PasswordReset from './PasswordReset';
import ProcessTransitions from './ProcessTransitions';
import Reviews from './Reviews';
import Stock from './Stock';
import StockAdjustments from './StockAdjustments';
import StripeAccount from './StripeAccount';
import StripeAccountLinks from './StripeAccountLinks';
import StripeCustomer from './StripeCustomer';
import StripePersons from './StripePersons';
import StripeSetupIntents from './StripeSetupIntents';
import TimeSlots from './TimeSlots';
import Transactions from './Transactions';
import Users from './Users';

class MarketplaceApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;
  authRequired: boolean;

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
  reviews: Reviews;
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
    this.endpoint = config.baseUrl;
    this.headers = config.headers;
    this.axios = sdk.axios;
    this.authRequired = false;

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
    this.reviews = new Reviews(this);
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