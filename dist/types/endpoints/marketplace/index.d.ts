/**
 * @fileoverview Provides the MarketplaceApi class for accessing all available endpoints in the Sharetribe Marketplace API.
 * This class serves as the entry point for interacting with various resources such as listings, bookings, users, and payments.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html
 */
import SharetribeSdk from '../../sdk';
import { AxiosInstance } from 'axios';
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
/**
 * Class representing the Sharetribe Marketplace API.
 *
 * This class provides access to all available endpoints in the Sharetribe Marketplace API, enabling operations such as managing listings,
 * handling transactions, updating user profiles, and integrating with Stripe.
 */
declare class MarketplaceApi {
    axios: AxiosInstance;
    endpoint: string;
    headers: Record<string, string>;
    authRequired: boolean;
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
    constructor(sdk: SharetribeSdk);
}
export default MarketplaceApi;
