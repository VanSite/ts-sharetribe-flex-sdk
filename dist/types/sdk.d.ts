import { SdkConfig } from './types/config';
import { ApiConfigs } from './types/apiConfigs';
import { AxiosInstance, AxiosResponse } from 'axios';
import AuthenticationApi from "./endpoints/auth";
import MarketplaceApi from './endpoints/marketplace';
import Listings from './endpoints/marketplace/Listings';
import AvailabilityExceptions from './endpoints/marketplace/AvailabilityExceptions';
import Bookings from './endpoints/marketplace/Bookings';
import CurrentUser from './endpoints/marketplace/CurrentUser';
import Images from './endpoints/marketplace/Images';
import Marketplace from './endpoints/marketplace/Marketplace';
import Messages from './endpoints/marketplace/Messages';
import OwnListings from './endpoints/marketplace/OwnListings';
import PasswordReset from './endpoints/marketplace/PasswordReset';
import ProcessTransitions from './endpoints/marketplace/ProcessTransitions';
import Reviews from './endpoints/marketplace/Reviews';
import Stock from './endpoints/marketplace/Stock';
import StockAdjustments from './endpoints/marketplace/StockAdjustments';
import StripeAccount from './endpoints/marketplace/StripeAccount';
import StripeAccountLinks from './endpoints/marketplace/StripeAccountLinks';
import StripeCustomer from './endpoints/marketplace/StripeCustomer';
import StripePersons from './endpoints/marketplace/StripePersons';
import StripeSetupIntents from './endpoints/marketplace/StripeSetupIntents';
import TimeSlots from './endpoints/marketplace/TimeSlots';
import Transactions from './endpoints/marketplace/Transactions';
import Users from './endpoints/marketplace/Users';
import { AuthInfoResponse, LoginParameter, LoginWithIdpParameter, RevokeResponse, TokenResponse } from './types/authentication';
import AssetsApi from './endpoints/assets';
declare class SharetribeSdk {
    /**
     * The SDK configuration object.
     * @type {SdkConfig}
     */
    sdkConfig: SdkConfig;
    /**
     * The API configuration object.
     * @type {ApiConfigs}
     */
    apisConfigs: ApiConfigs;
    /**
     * Axios instance for making HTTP requests.
     * @type {AxiosInstance}
     */
    axios: AxiosInstance;
    /**
     * Endpoint for handling authentication.
     * @type {AuthenticationApi}
     */
    auth: AuthenticationApi;
    /**
     * Main marketplace API instance.
     * @type {MarketplaceApi}
     */
    api: MarketplaceApi;
    /**
     * Assets API instance for managing assets.
     * @type {AssetsApi}
     */
    assetsApi: AssetsApi;
    /**
     * Endpoint for managing listings.
     * @type {Listings}
     */
    listings: Listings;
    /**
     * Endpoint for managing availability exceptions.
     * @type {AvailabilityExceptions}
     */
    availabilityExceptions: AvailabilityExceptions;
    /**
     * Endpoint for managing bookings.
     * @type {Bookings}
     * */
    bookings: Bookings;
    /**
     * Endpoint for managing the current user.
     *  @type {CurrentUser}
     */
    currentUser: CurrentUser;
    /**
     * Endpoint for handling images.
     * @type {Images}
     */
    images: Images;
    /**
     * Endpoint for accessing marketplace details.
     *  @type {Marketplace}
     */
    marketplace: Marketplace;
    /**
     * Endpoint for managing messages.
     * @type {Messages}
     */
    messages: Messages;
    /**
     * Endpoint for managing own listings.
     * @type {OwnListings} */
    ownListings: OwnListings;
    /**
     * Endpoint for managing password resets.
     * @type {PasswordReset} */
    passwordReset: PasswordReset;
    /**
     * Endpoint for managing process transitions.
     * @type {ProcessTransitions} */
    processTransitions: ProcessTransitions;
    /**
     * Endpoint for managing reviews.
     *  @type {Reviews} */
    reviews: Reviews;
    /**
     * Endpoint for managing stock.
     * @type {Stock} */
    stock: Stock;
    /**
     * Endpoint for managing stock adjustments.
     * @type {StockAdjustments} */
    stockAdjustments: StockAdjustments;
    /**
     * Endpoint for managing stripe accounts.
     * @type {StripeAccount} */
    stripeAccount: StripeAccount;
    /**
     * Endpoint for managing stripe account links.
     * @type {StripeAccountLinks} */
    stripeAccountLinks: StripeAccountLinks;
    /**
     * Endpoint for managing stripe customers.
     * @type {StripeCustomer} */
    stripeCustomer: StripeCustomer;
    /**
     * Endpoint for managing stripe persons.
     * @type {StripePersons} */
    stripePersons: StripePersons;
    /**
     * Endpoint for managing stripe setup intents.
     * @type {StripeSetupIntents} */
    stripeSetupIntents: StripeSetupIntents;
    /**
     * Endpoint for managing timeslots.
     * @type {TimeSlots} */
    timeslots: TimeSlots;
    /**
     * Endpoint for managing transactions.
     * @type {Transactions} */
    transactions: Transactions;
    /**
     * Endpoint for managing users.
     * @type {Users} */
    users: Users;
    /** @type {AssetsApi['assetByAlias']} */
    assetByAlias: AssetsApi['assetByAlias'];
    /** @type {AssetsApi['assetsByAlias']} */
    assetsByAlias: AssetsApi['assetsByAlias'];
    /** @type {AssetsApi['assetByVersion']} */
    assetByVersion: AssetsApi['assetByVersion'];
    /** @type {AssetsApi['assetsByVersion']} */
    assetsByVersion: AssetsApi['assetsByVersion'];
    /**
     * Creates an instance of the Sharetribe SDK.
     *
     * @constructor
     * @param {SdkConfig} config - The configuration object for the SDK.
     */
    constructor(config: SdkConfig);
    /**
     * Logs in a user using their credentials.
     *
     * @async
     * @param {LoginParameter} params - The login parameters.
     * @returns {Promise<AuthToken>} - The authentication token.
     */
    login(params: LoginParameter): Promise<AxiosResponse<TokenResponse<"user">>>;
    /**
     * Logs in a user using an identity provider (IDP).
     *
     * @async
     * @param {LoginWithIdpParameter} params - The IDP login parameters.
     * @returns {Promise<AuthToken>} - The authentication token.
     */
    loginWithIdp(params: LoginWithIdpParameter): Promise<AxiosResponse<TokenResponse<"user">>>;
    /**
     * Logs out the current user.
     *
     * @async
     * @returns {Promise<void>} - Resolves when the user is logged out.
     */
    logout(): Promise<AxiosResponse<RevokeResponse>>;
    /**
     * Exchanges the current token for a trusted user token.
     *
     * @async
     * @returns {Promise<AuthToken>} - The exchanged token.
     */
    exchangeToken(): Promise<AxiosResponse<TokenResponse<"trusted:user">>>;
    /**
     * Retrieves authentication info for the current user.
     *
     * @async
     * @returns {Promise<AuthInfoResponse>} - The authentication info.
     */
    authInfo(): Promise<AuthInfoResponse>;
}
export default SharetribeSdk;
